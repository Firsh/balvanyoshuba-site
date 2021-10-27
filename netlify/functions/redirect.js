exports.handler = async (event, context) => {
    const alapok = {
        kiallitasok: {
            egyeni: '/egyeni-kiallitasok/',
            'kulfoldi-egyeni': '/kulfoldi-egyeni-kiallitasok/',
            'hazai-kollektiv': '/hazai-kollektiv-kiallitasok/',
            'kulfoldi-kollektiv': '/kulfoldi-kollektiv-kiallitasok/',
            'kulfoldi-grafikai-biennalek': '/kulfoldi-grafikai-biennalek/',
        },
        eletrajz: {
            muveszeti: '/muveszeti-tevekenyseg/',
            pedagogiai: '/pedagogiai-tevekenyseg/',
            kritikak: '/meltatasok-kritikak/',
            kituntetesek: '/dijak-kituntetesek/',
        },
        alkotasok: {
            kozgyujtemenyekben: '/alkotasok-kozgyujtemenyekben/',
            kozzetett: '/kozzetett-alkotasok/',
        },
        kapcsolat: {
            kapcsolat: '/',
        },
        // https://balvanyoshuba.netlify.app/?kategoria=fooldal&oldal=fooldal
        fooldal: {
            fooldal: '/',
        },
        publikaciok: {
            publikaciok: '/publikaciok/',
        },
        linkajanlo: {
            linkajanlo: '/linkajanlo/',
        },
    };
    const cats = {
        cat2: '/galeria/album/litografiak/',
        cat3: '/galeria/album/tusrajzok/',
        cat4: '/galeria/album/rajzok-vegyes-technikaval/',
        cat5: '/galeria/album/rajzok-munkahelyeken/',
        cat6: '/galeria/album/rajzok-kiadvanyokban/',
        cat7: '/galeria/album/kozteruleti-alkotasok/',
        cat8: '/galeria/album/mappak/',
        cat9: '/galeria/album/egyeb/',
    };
    const albums = {
        album3: '/galeria/album/rajzok-munkahelyeken/uzemi-vazlatok-fekete/',
        album4: '/galeria/album/rajzok-munkahelyeken/uzemi-vazlatok-szines/',
        album5: '/galeria/album/rajzok-munkahelyeken/arcok-munkahelyeken/',
        album6: '/galeria/album/tusrajzok/1972-1974/',
        album7: '/galeria/album/litografiak/1967-1977/',
        album8: '/galeria/album/litografiak/1978-1990/',
        album9: '/galeria/album/litografiak/koltokhoz-1991/',
        album10: '/galeria/album/tusrajzok/1975-1979/',
        album11: '/galeria/album/tusrajzok/1980-1993/',
        album12: '/galeria/album/rajzok-kiadvanyokban/naptar/',
        album13: '/galeria/album/mappak/rajz-mappa-1976-1981/',
        album14: '/galeria/album/mappak/ad-astra-1984/',
        album15: '/galeria/album/rajzok-kiadvanyokban/simor-andras-almok-es-jelenesek-1987/',
        album16: '/galeria/album/rajzok-kiadvanyokban/europai-idill-1990/',
        album17: '/galeria/album/mappak/salgotarjan-mappa-1980/',
        album18: '/galeria/album/mappak/teglas-mappa-1981/',
        album19: '/galeria/album/rajzok-kiadvanyokban/baranyi-ferenc-a-honfoglalas-felszamolasa-1998/',
        album20: '/galeria/album/rajzok-kiadvanyokban/szokoly-tamas-2002/',
        album21: '/galeria/album/rajzok-kiadvanyokban/simor-andras-ezredvegi-szatirak-2003/',
        album22: '/galeria/album/egyeb/eljenek-a-fak-1987/',
        album23: '/galeria/album/egyeb/cimlapok/',
        album24: '/galeria/album/rajzok-vegyes-technikaval/kompoziciok/',
        album25: '/galeria/album/rajzok-vegyes-technikaval/ketten/',
        album27: '/galeria/album/kozteruleti-alkotasok/plasztika-muralia/',
        album28: '/galeria/album/kozteruleti-alkotasok/kreszta-haz-nyomatai-gyor/',
        album29: '/galeria/album/kozteruleti-alkotasok/petofi-fal/',
        album33: '/galeria/album/rajzok-vegyes-technikaval/nagy-rajzok-2009-2010/',
        album34: '/galeria/album/rajzok-kiadvanyokban/ladanyi-mihaly-spanyol-nyelvu-kotetebe-2011/',
        album35: '/galeria/album/rajzok-kiadvanyokban/radnoti-miklos-spanyol-nyelvu-kotetebe-2010/',
    };

    const kategoria = event.queryStringParameters.kategoria;
    const oldal = event.queryStringParameters.oldal;
    const cat = event.queryStringParameters.cat;
    const album = event.queryStringParameters.album;
    let loc;
    if (oldal && kategoria) {
        loc = alapok[kategoria][oldal];
    } else if (cat) {
        loc = cats['cat' + cat];
    } else if (album) {
        loc = albums['album' + album];
    }
    return {
        statusCode: 301,
        headers: {
            Location: loc + '?atiranyitva',
        },
    };
};
