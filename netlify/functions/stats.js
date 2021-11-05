import fetch from 'node-fetch';

const cyrb53 = function (str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed,
        h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

export async function handler(event) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed',
        };
    }
    if (event.body == null) {
        return {
            statusCode: 400,
            body: 'Bad Request',
        };
    }
    if (event.headers['user-agent'].indexOf('Algolia') !== -1) {
        return {
            statusCode: 200,
            body: 'Not counting you!',
        };
    }
    const body = JSON.parse(event.body);
    const endpoint = 'https://www.google-analytics.com/collect?';

    const visitorIP = event.headers['x-nf-client-connection-ip'];
    const rawClientID = visitorIP + ';' + event.headers['user-agent'] + ';' + body.language + ';';
    const hashedClientID = cyrb53(rawClientID).toString(16);
    // https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters
    const params = [
        ['v', '1'],
        ['t', body.type], // pageview/event (ec/ea - category/action required for event)
        ['tid', 'UA-113124215-3'], // Netlifys temporary
        //['tid', 'UA-4197479-3'], // Original
        ['aip', '1'],
        ['uip', visitorIP],
        ['cid', hashedClientID],
        ['geoid', event.headers['x-country']],
        ['ul', body.language],
        ['ua', event.headers['user-agent']],
    ];

    if (body.type === 'pageview') {
        params.push(['dt', body.title]);
        params.push(['dl', body.url]);
        params.push(['dr', body.ref]);
        params.push(['sr', body.resolution]);
        params.push(['vp', body.viewport]);
    } else if (body.type === 'event') {
        params.push(['ec', body.eventCategory]); // Eloadasok .. Hangok
        params.push(['ea', body.eventAction]); // Letoltes .. Hallgatas
        params.push(['el', body.eventLabel]); // Csontvary .. Kerenyi
    }

    const payload = new URLSearchParams(params);

    try {
        const response = await fetch(endpoint + payload, {
            method: 'POST',
            cache: 'no-cache',
        });
        if (response.ok) {
            return {
                statusCode: response.status,
                body: JSON.stringify({
                    responseStatusText: response.statusText,
                    paramsSent: params,
                    eventHeaders: event.headers,
                }),
            };
        }
    } catch (err) {
        console.error('Error: ' + err);
    }
}
