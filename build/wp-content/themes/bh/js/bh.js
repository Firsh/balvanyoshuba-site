'use strict';
(function bhMenu() {
    const menuOpener = document.getElementById('menu-opener');
    const menuCloser = document.getElementById('menu-closer');
    if (!menuOpener || !menuCloser) {
        return;
    }
    document.querySelectorAll('.menu-item-has-children > a').forEach((i) => {
        i.addEventListener('click', toggle);
    });
    // Calls open/close for the submenu
    function toggle(e) {
        e.preventDefault();
        const li = e.target.parentElement;
        if (/*li.classList.contains('current-menu-parent') ||*/ li.classList.contains('open')) {
            close(li);
        } else {
            open(li);
        }
    }
    // Opens a submenu in specified li, closes the rest
    function open(li) {
        if (li === null) {
            return;
        }

        const sub = li.querySelector('.sub-menu');
        if (sub) {
            document.querySelectorAll('.open').forEach((i) => close(i));
            li.classList.add('open');
            sub.style.height = sub.getAttribute('data-height') + 'px';
        }
    }
    // Closes a submenu in specified li
    function close(li) {
        const sub = li.querySelector('.sub-menu');
        if (sub) {
            li.classList.remove('current-menu-parent', 'open');
            sub.style.height = '';
        }
    }
    // Pulls offcanvas menu into view
    function openMenu() {
        if (!document.body.classList.contains('menu-pulled')) {
            document.body.classList.add('menu-pulled');
            open(document.querySelector('.current-menu-ancestor'));
        }
    }
    // Sends offcanvas menu away
    function closeMenu() {
        if (document.body.classList.contains('menu-pulled')) {
            document.body.classList.remove('menu-pulled');
        }
    }
    // Listeners on the menu cotrols
    menuOpener.addEventListener('click', openMenu);
    menuCloser.addEventListener('click', closeMenu);
    // Shaded area close
    document.getElementById('menu').addEventListener('click', (e) => {
        if (e.target == e.currentTarget) {
            closeMenu();
        }
    });
    // Without layout thrashing
    function measureMenus() {
        const subs = document.querySelectorAll('.menu-item-has-children ul');
        // Write cycle
        subs.forEach((ul) => {
            ul.style.height = 'auto';
        });
        // Read cycle
        subs.forEach((ul) => {
            ul.setAttribute('data-height', ul.offsetHeight);
        });
        // Write cycle
        subs.forEach((ul) => {
            ul.style.height = '';
        });
    }
    measureMenus();
    // Triggers showing the current menu parent on load
    open(document.querySelector('.current-menu-parent'));
})();

(function alkotasokTable() {
    if (window.location.href.indexOf('alkotasok-kozgyujtemenyekben') !== -1) {
        document.querySelector('table').classList.add('alkotasok');
        // Make actual header main rows span 3 columns
        // These have a year or nothing in them
        const mainRows = document.querySelectorAll('td:nth-child(2):last-child');
        mainRows.forEach((el) => {
            let prev = el.previousElementSibling;
            if (prev.innerHTML.length === 4 || prev.innerHTML == '') {
                el.setAttribute('colspan', 3);
                el.parentElement.classList.add('mainRow');
            }
        });
        // Mark empty cells: with a space or non-breaking space
        // Actually empty doesn't need to be marked as it barely gets rendered!
        const maybeEmptyTd = document.querySelectorAll('td:not(:nth-child(2))');
        maybeEmptyTd.forEach((el) => {
            if (el.innerHTML == '&nbsp;' || el.innerHTML == ' ') {
                el.classList.add('emptyCell');
            }
        });
    }
})();

(function headingLinks() {
    if (!navigator.clipboard || !window.isSecureContext) {
        return;
    }
    if (document.querySelector('body').classList.contains('archive')) {
        return;
    }
    document.querySelector('article').addEventListener('click', (event) => {
        if (!event.ctrlKey) {
            return;
        }
        if (event.target.tagName !== 'H3') {
            return;
        }
        const deeplink = window.location.href.split('#')[0] + '#' + event.target.getAttribute('id');
        navigator.clipboard.writeText(deeplink);
    });
})();

(function analytics() {
    if ('sendBeacon' in navigator === false) {
        return;
    }
    if (window.location.hostname !== 'balvanyoshuba.hu' && window.location.hostname.indexOf('netlify.app') === -1) {
        return;
    }
    function sendStatsToNetlify(data) {
        data.language = navigator.language;
        navigator.sendBeacon('/.netlify/functions/stats', JSON.stringify(data));
    }
    sendStatsToNetlify({
        type: 'pageview',
        title: document.title,
        url: location.href,
        ref: document.referrer,
        resolution: window.screen.width + 'x' + window.screen.height,
        viewport: window.innerWidth + 'x' + window.innerHeight,
    });
    // Eloadas letoltesek
    document.querySelectorAll('#content a[href$=".ppt"]').forEach((i) => {
        i.addEventListener('click', trackPresentationDownloads);
    });
    function trackPresentationDownloads(e) {
        sendStatsToNetlify({
            type: 'event',
            eventCategory: 'Eloadasok',
            eventAction: 'Letoltes',
            eventLabel: e.target.getAttribute('href').split('/').pop(),
        });
    }
    // PDF letoltesek
    document.querySelectorAll('#content a[href$=".pdf"]').forEach((i) => {
        i.addEventListener('click', trackDocumentDownloads);
    });
    function trackDocumentDownloads(e) {
        sendStatsToNetlify({
            type: 'event',
            eventCategory: 'Dokumentumok',
            eventAction: 'Letoltes',
            eventLabel: e.target.getAttribute('href').split('/').pop(),
        });
    }
    // Media
    document.querySelectorAll('#content audio, #content video').forEach((i) => {
        i.addEventListener('play', trackMediaInteractions);
        i.addEventListener('ended', trackMediaInteractions);
    });
    function trackMediaInteractions(e) {
        const data = {
            type: 'event',
            eventCategory: e.currentTarget.tagName == 'AUDIO' ? 'Hangok' : 'Videok',
            eventLabel: e.currentTarget.getAttribute('src').split('/').pop(),
            eventAction: '',
        };
        if (e.type == 'play') {
            data.eventAction = 'Elkezdve';
        } else if (e.type == 'ended') {
            data.eventAction = 'Befejezve';
        }
        sendStatsToNetlify(data);
    }
})();
(function enableTransitions() {
    document.querySelector('body').classList.remove('preload');
})();
