(function kereso() {
    if (!document.querySelector('body').classList.contains('page-id-10409')) {
        return;
    }

    // The dictionary to convert the names and the slugs
    const encodedCategories = {
        eloadasok: 'Előadások',
        'tabori-alkotasok': 'Tábori alkotások',
        'huba-alkotasok': 'Huba alkotások',
        hubaratok: 'Hubarátok',
        fotok: 'Fotók',
        egyeb: 'Egyéb',
        irodalom: 'Irodalom',
        kiallitasok: 'Kiállítások',
        bejelentes: 'Bejelentés',
        videok: 'Videók',
        emlekezunk: 'Emlékezünk',
        eletrajz: 'Életrajz',
        'eloadás-osszeallitasok': 'Előadás-összeállítások',
        hangok: 'Hangok',
        jokivansagok: 'Jókívánságok',
        'alice-publikacioi': 'Alice publikációi',
        'hubarat-irasok': 'Hubarát írások',
    };

    const decodedCategories = Object.keys(encodedCategories).reduce((acc, key) => {
        const newKey = encodedCategories[key];
        const newValue = key;

        return {
            ...acc,
            [newKey]: newValue,
        };
    }, {});

    // Step 2. Update the getters to use the encoded/decoded values
    function getCategorySlug(name) {
        const encodedName = decodedCategories[name] || name;
        return encodedName.split(' ').map(encodeURIComponent).join('-');
    }

    function getCategoryName(slug) {
        const decodedSlug = encodedCategories[slug] || slug;
        return decodedSlug.split('-').map(decodeURIComponent).join(' ');
    }

    /* global instantsearch algoliasearch */
    const iName = 'huba_dev';
    /* Algolia init */
    const search = instantsearch({
        indexName: iName,
        searchClient: algoliasearch('0EGGAY0T4P', 'bb6553eb864cfa477645762d34f8929a'),
        // This prevents autosearch at empty state I guess
        searchFunction(helper) {
            const searchFilters = document.querySelector('.search-filters');
            if (helper.state.query) {
                // Perform the search upon a meaningful query
                helper.search();
                searchFilters.classList.add('show-filters');
            } else {
                // First state pretend to not do anything and/or reset to base state
                // Reset page title
                updateTitle({counter: '', page: '', facet: '', justImages: false, query: ''});
                // Hide filter part of the search bar and clear whatever was there
                searchFilters.classList.remove('show-filters');
                helper.clearRefinements();
                // Clear hits
                document.querySelector('.text-hits').innerHTML = '';
                document.querySelector('.image-hits').innerHTML = '';
                document.querySelector('.pagination').innerHTML = '';
            }
        },
        routing: {
            router: instantsearch.routers.history({
                createURL({qsModule, routeState, location}) {
                    const queryParameters = [];
                    let searchQuery = '';
                    if (routeState.query) {
                        searchQuery = removeDiacritics(routeState.query).split(' ').map(encodeURIComponent).join('+');
                    }
                    if (routeState.category) {
                        queryParameters.push(routeState.category.map(getCategorySlug).join(','));
                    }
                    if (routeState.kepek) {
                        queryParameters.push('kepek');
                    }
                    if (routeState.page !== 1) {
                        queryParameters.push(routeState.page);
                    }

                    const filters = ensureSlashes(queryParameters.join('/'));
                    return `${location.protocol}//${location.hostname}${location.pathname}?${searchQuery}${filters}`;
                },

                // ?qsqsqs/eloadasok,huba-alkotasok/kepek/50/
                parseURL({qsModule, location}) {
                    const route = {};
                    if (location.search === '') {
                        return route;
                    }
                    const searchPayload = location.search.replace(/\/$/gim, ''); /*.substr(1)*/
                    const searchBits = searchPayload.split('/');
                    // If last one is digits
                    if (/^\d+$/im.test(searchBits[searchBits.length - 1])) {
                        route.page = searchBits.pop();
                    }
                    // If last (remaining) is kepek
                    if (searchBits[searchBits.length - 1] === 'kepek') {
                        route.kepek = true;
                        searchBits.pop();
                    }
                    // If last remaining is not the search query
                    if (searchBits[searchBits.length - 1].charAt(0) !== '?') {
                        route.category = searchBits.pop().split(',').map(getCategoryName);
                    }
                    // Last or only one must be the search query or undef
                    route.query = searchBits.pop();
                    if (route.query.charAt(0) === '?') {
                        route.query = route.query.substr(1).split('+').map(encodeURIComponent).join(' ');
                    }
                    return route;
                },
            }),

            stateMapping: {
                // Flatten state to URL bits
                stateToRoute(uiState) {
                    const indexUiState = uiState[iName] || {};
                    return {
                        query: indexUiState.query,
                        category: indexUiState.refinementList && indexUiState.refinementList.category,
                        kepek: indexUiState.toggle && indexUiState.toggle.type,
                        page: indexUiState.page,
                    };
                },
                // Create state from what's in the URL
                routeToState(routeState) {
                    return {
                        [iName]: {
                            query: routeState.query,
                            refinementList: {
                                category: routeState.category,
                            },
                            toggle: {
                                type: routeState.kepek,
                            },
                            page: routeState.page,
                        },
                    };
                },
            },
        },
    });

    /* Custom search result display */
    function singleHitDisplay(item) {
        const title = instantsearch.highlight({attribute: 'title', hit: item});
        let parentTitle = '';
        if (item.parentTitle) {
            parentTitle = `
                <span class="search-hit-parent-title">${instantsearch.highlight({
                    attribute: 'parentTitle',
                    hit: item,
                })} » </span>`;
        }
        let author = '';
        let time = '';
        if (item.type === 'article') {
            author = `
                <div>
                    <svg><use xlink:href="#lnr-pencil"></use></svg>
                    <span>${instantsearch.highlight({
                        attribute: 'author',
                        hit: item,
                    })}</span>
                </div>`;

            if (
                typeof item._highlightResult.time.matchedWords !== 'undefined' &&
                item._highlightResult.time.matchedWords.length > 0
            ) {
                time = `
                <div>
                    <svg><use xlink:href="#lnr-clock"></use></svg>
                    <span>${instantsearch.highlight({attribute: 'time', hit: item})}</span>
                </div> `;
            }
        }
        const category = `
            <div>
                <svg><use xlink:href="#lnr-tag"></use></svg>
                <span>${
                    item.breadcrumb ? instantsearch.highlight({attribute: 'breadcrumb', hit: item}) : item.category
                }</span>
            </div>`.replace(/»/g, '<span class="bc-separator">»</span>');
        const snippet = instantsearch.snippet({attribute: 'content', hit: item}).replace(/___/gi, ' ');

        return `
        <a class="search-result" href="${item.url}">
            <div class="search-img-box">
                <img src="${item.thumbnail}"
                    width="${item.thumbnailW}"
                    height="${item.thumbnailH}"
                    alt="${escAttr(item.title)}" />
            </div>
            <div class="search-texts">
                <h4>${parentTitle}${title}</h4>
                <p>${snippet}</p>
                <div class="search-meta">
                    ${time}${category}${author}
                </div>   
            </div>
        </a>`;
    }
    // Render custom search results
    function renderCustomHits(renderOptions) {
        const {hits, widgetParams} = renderOptions;
        const itemsForJIG = [];
        const cards = [];

        for (const item of hits) {
            if (item.type === 'image') {
                itemsForJIG.push(item);
            } else {
                cards.push(singleHitDisplay(item));
            }
        }

        widgetParams.container.innerHTML = cards.join('');
        showImageTypesWithJIG(itemsForJIG, widgetParams.imageHitsContainer, cards.length);
    }
    function renderCustomPagination(renderOptions) {
        const {currentRefinement, nbHits, nbPages, isFirstPage, isLastPage, refine, createURL, widgetParams} =
            renderOptions;
        let {pages} = renderOptions;
        const container = widgetParams.container;
        if (nbPages === 1 || nbHits === 0) {
            container.innerHTML = ``;
            return;
        }

        // Correspond to WP pagination midsize (these pages on each side of the current one)
        const midSize = 2;
        // Keep only 2 on the LEFT side of the current one 1 ... 3 4 [5]
        posOfCurrentInPages = pages.indexOf(currentRefinement);
        if (posOfCurrentInPages > midSize) {
            pages.splice(0, posOfCurrentInPages - midSize);
        }
        // Keep only 2 on the RIGHT side of the current one [1] 2 3 ... 22
        posOfCurrentInPages = pages.indexOf(currentRefinement);
        if (posOfCurrentInPages + midSize < pages.length) {
            pages.splice(posOfCurrentInPages + midSize + 1);
        }

        // Init 3 pars of the pages display
        const buttons = {
            prev: [],
            pages: [],
            next: [],
        };

        if (!isFirstPage) {
            buttons.prev.push(`
                <a class="prev page-numbers"
                    href="${createURL(currentRefinement - 1)}"
                    data-value="${currentRefinement - 1}">
                        Előző
                </a>`);
            // 1 is missing from pages
            if (pages[0] !== 0) {
                buttons.prev.push(`<a class="page-numbers" data-value="0" href="${createURL(0)}">1</a>`);
            }
            // Pages starts with 3 or larger: ...
            if (pages[0] > 1) {
                buttons.prev.push('<span class="page-numbers dots">…</span>');
            }
        }

        if (!isLastPage) {
            // Page ends 2 before last page or earlier: ...
            if (pages[pages.length - 1] < nbPages - 2) {
                buttons.next.push(`<span class="page-numbers dots">…</span>`);
            }
            // Last page is missing from pages
            if (pages[pages.length - 1] !== nbPages - 1) {
                buttons.next.push(`
                    <a class="page-numbers"
                        data-value="${nbPages - 1}"
                        href="${createURL(nbPages - 1)}">${nbPages}</a>`);
            }
            buttons.next.push(`
                <a class="next page-numbers"
                    href="${createURL(currentRefinement + 1)}"
                    data-value="${currentRefinement + 1}">
                    Következő
                </a>`);
        }

        for (const page of pages) {
            if (currentRefinement === page) {
                buttons.pages.push(`<span aria-current="page" class="page-numbers current">${page + 1}</span>`);
            } else {
                buttons.pages.push(
                    `<a class="page-numbers" data-value="${page}" href="${createURL(page)}">${page + 1}</a>`
                );
            }
        }

        container.innerHTML = `
            <nav class="navigation pagination" role="navigation" aria-label="Lapozgasson összesen ${nbHits} találat között!">
                <h2 class="">Lapozgasson összesen ${nbHits} találat között!</h2>
                <div class="nav-links">
                ${buttons.prev.join('')}
                ${buttons.pages.join('')}
                ${buttons.next.join('')}
                </div>
            </nav>`;

        [...container.querySelectorAll('a')].forEach((element) => {
            element.addEventListener('click', (event) => {
                event.preventDefault();
                window.scrollTo(0, 0);
                refine(event.currentTarget.dataset.value);
            });
        });
    }
    function renderCustomStats(renderOptions) {
        const {hitsPerPage, nbHits, areHitsSorted, nbSortedHits, nbPages, page, processingTimeMS, query, widgetParams} =
            renderOptions;
        if (nbHits > 0) {
            updateTitle({counter: nbHits, page: page > 0 ? page + 1 : '', query: query});
        } else if (query) {
            updateTitle({counter: 'Nincs', page: '', query: query});
        }
    }
    function renderActiveFacet(renderOptions) {
        // Rendering logic
        const {items, widgetParams} = renderOptions;
        const container = widgetParams.container;
        const input = widgetParams.input;
        const filtered = items.filter((item) => item.isRefined).map((item) => item.label);
        const filteredCount = filtered.length;
        let label = 'Szűrők';

        if (filteredCount > 0) {
            label = `${filteredCount} szűrő`;
            if (filteredCount === 1) {
                updateTitle({facet: filtered});
            } else {
                if (filteredCount !== 5) {
                    updateTitle({facet: `a ${filteredCount} kategóriában`});
                } else {
                    updateTitle({facet: `az ${filteredCount} kategóriában`});
                }
            }
            input.classList.add('filter-active');
        } else {
            updateTitle({facet: ''});
            input.classList.remove('filter-active');
        }
        container.innerHTML = `<svg><use xlink:href="#lg-filter"></use></svg> ${label}`;
    }

    function renderCustomRefinementList(renderOptions, isFirstRender) {
        let items = renderOptions.items;
        const {refine, createURL, widgetParams} = renderOptions;
        if (isFirstRender) {
            return;
        }
        const container = widgetParams.container;
        const customLimit = widgetParams.customLimit;

        // Reorder items to ensure refined ones always show up
        // When ordering by count desc, they otherwise could become unreachable
        const refined = items.filter((elem) => elem.isRefined);
        const notRefined = items.filter((elem) => !elem.isRefined);
        items = refined.concat(notRefined.slice(0, customLimit - refined.length)).sort((a, b) => b.count - a.count);

        // If there is a discrepancy beween the composition of items vs. the dislayed
        // Just rerender because the change came from search/justitems, not my refine
        // Not just number, but they all must be found in the ul to gracefully update!
        const labelCount = container.querySelectorAll('a').length;
        let reRender =
            items.length === 0 ||
            items.length !== labelCount ||
            !items.every((item) => {
                const a = container.querySelector(`a[data-value="${item.label}"`);
                if (a !== null) {
                    // Ok we have it but is it the same count?
                    return a.querySelector('.cat-count').innerText == item.count;
                } else {
                    return false;
                }
            });
        if (reRender) {
            if (items.length === 0) {
                container.innerHTML = 'Nincs mi alapján szűrni!';
                return;
            }
            container.innerHTML = items
                .map(
                    (item) => `
              <a href="${createURL(item.value)}" class="${
                        item.isRefined ? 'cat-item cat-selected' : 'cat-item'
                    }" data-value="${item.value}">
                    <svg><use xlink:href="#checkmark"></use></svg>
                    <span class="cat-text">${item.label}</span>
                    <span class="cat-count">${item.count}</span>
              </a>`
                )
                .join('');

            [...container.querySelectorAll('a')].forEach((element) => {
                element.addEventListener('click', (event) => {
                    event.preventDefault();
                    event.currentTarget.classList.toggle('cat-selected');
                    refine(event.currentTarget.dataset.value);
                });
            });
        }
    }

    // Create the custom widgets
    const customHits = instantsearch.connectors.connectHits(renderCustomHits);
    const customPagination = instantsearch.connectors.connectPagination(renderCustomPagination);
    const customStats = instantsearch.connectors.connectStats(renderCustomStats);
    const activeFacetIndicator = instantsearch.connectors.connectRefinementList(renderActiveFacet);
    const customRefinementList = instantsearch.connectors.connectRefinementList(renderCustomRefinementList);

    let timerId;
    search.addWidgets([
        instantsearch.widgets.searchBox({
            container: '.search-box',
            autofocus: true,
            placeholder: 'Írjon be pár betűt!',
            showReset: true,
            showSubmit: true,
            searchAsYouType: false,
            queryHook(query, refine) {
                //debounce
                clearTimeout(timerId);
                timerId = setTimeout(() => {
                    refine(query);
                }, 1);
            },
        }),
        instantsearch.widgets.toggleRefinement({
            container: '.just-images',
            attribute: 'type',
            on: 'image',
            templates: {
                labelText: '<svg><use xlink:href="#lg-image"></use></svg><span class="csak">Csak&nbsp;</span>képek',
            },
            cssClasses: {
                root: 'toggle-refinement',
                label: 'filter-label',
                checkbox: 'filter-checkbox',
                labelText: 'filter-text',
            },
        }),
        activeFacetIndicator({
            container: document.querySelector('.category-dropdown-switch .filter-text'),
            input: document.querySelector('.category-dropdown-switch .filter-checkbox'),
            attribute: 'category',
        }),
        customRefinementList({
            container: document.querySelector('.category-dropdown'),
            attribute: 'category',
            sortBy: ['count:desc', 'name:asc'],
            limit: 25,
            customLimit: 10,
        }),
        customStats(),
        instantsearch.widgets.poweredBy({
            container: '.powered-by',
            theme: 'dark',
        }),
        customHits({
            container: document.querySelector('.text-hits'),
            imageHitsContainer: document.querySelector('.image-hits'),
        }),
        customPagination({
            container: document.querySelector('.pagination'),
        }),
    ]);

    function showImageTypesWithJIG(itemsForJIG, container, hitsBeforeJIG) {
        if (itemsForJIG.length === 0) {
            container.innerHTML = '';
            return;
        }
        container.innerHTML =
            '<div id="jig1" class="justified-image-grid jig-preset-c2"><div class="jig-clearfix"></div></div>';

        // Showing deferred results with JIG

        const thumbnailH = 300;
        const itemsLength = itemsForJIG.length;
        const newItems = [];
        const encounteredIDs = {};
        let previousEncounter, imageID, item, hitCount, contextDisplay;
        for (let i = 0; i < itemsLength; i++) {
            item = itemsForJIG[i];

            // Medium is not created if not tall enough, full is always there I hope :D
            item.usableURL = item.medium ? item.medium : item.full;
            // Without mediumW, the fullW is not scaled proportionally to match expected thumb height
            item.usableW = item.mediumW ? item.mediumW : Math.round((item.fullW / item.fullH) * thumbnailH);

            contextDisplay = `<a href="${item.context.url}">${item.context.title}</a> (${item.context.category})`;
            item.description = `A kép itt szerepel: ${contextDisplay}`;
            //imageID = item.objectID.split('#').pop(); // due to RML shortcuts, IDs aren't unique :D ...
            imageID = item.usableURL;
            previousEncounter = encounteredIDs[imageID];
            if (typeof previousEncounter !== 'undefined') {
                if (typeof itemsForJIG[previousEncounter].allContexts === 'undefined') {
                    // Establish a registry for all contexts and add the previous encounter's own hit
                    itemsForJIG[previousEncounter].allContexts = [
                        `<a href="${itemsForJIG[previousEncounter].context.url}">${itemsForJIG[previousEncounter].context.title}</a> (${itemsForJIG[previousEncounter].context.category})`,
                    ];
                }
                // Push the current hit, maybe there will be more
                itemsForJIG[previousEncounter].allContexts.push(contextDisplay);
                hitCount = itemsForJIG[previousEncounter].allContexts.length;
                // Update the displayed hit's desc with all subsequent hits
                itemsForJIG[previousEncounter].description =
                    `A kép ${hitCount} helyen is megtalálható az oldalon:<br>` +
                    itemsForJIG[previousEncounter].allContexts.join(',<br>');
                // Indicate in the caption that it's a multi-result
                itemsForJIG[previousEncounter].caption = `${hitCount} helyen szerepel!`;
                // This prevents duplicates from showing up
                item.skip = true;
                continue; // Serious deduplicating
            }
            encounteredIDs[imageID] = i;
        }
        for (const item of itemsForJIG) {
            if (typeof item.skip !== 'undefined') {
                continue;
            }
            // Craft a relevant title
            item.displayTitle = [];
            if (item._highlightResult && item._highlightResult.title) {
                item.displayTitle[0] = item._highlightResult.title.value;
            } else if (item.title) {
                item.displayTitle[0] = item.title;
            }
            if (
                item._snippetResult &&
                item._snippetResult.content &&
                item._snippetResult.content.matchLevel !== 'none'
            ) {
                item.displayTitle.push(item._snippetResult.content.value);
            }
            // Create an item in JIG's "items"
            newItems.push({
                url: item.usableURL,
                width: item.usableW,
                title: escAttr(item.displayTitle.join(', ')),
                description: escAttr(item.description),
                caption: item.caption ? escAttr(item.caption) : '',
                wh: item.fullW + 'x' + item.fullH,
                link: item.full,
                link_target: 'video',
                extra_class: `jig-contentID-ML-${item.objectID.replace(/.*-(?=\d+$)/gi, '')}`,
                unencoded_url: item.usableURL,
                photon: item.usableURL,
            });
        }
        window['jigAddLightbox1'] = function () {
            jQuery('#jig1 a.jig-link').JIGphotoSwipe({
                lightboxSlug: 'jig',
                shareEl: false,
                loop: true,
                bgOpacity: 1,
                spacing: 0.12,
                closeOnScroll: true,
                fullscreenEl: true,
                zoomEl: true,
                counterEl: true,
                history: false,
                indexIndicatorSep: ' / ',
            });
        };
        const options = {
            items: newItems,
            targetHeight: thumbnailH,
            heightDeviation: 0,
            disableCropping: 'yes',
            margins: 4,
            animSpeed: 200,
            linkRel: 'jig-*instance*',
            caption: 'reverse-slide',
            captionField: 'caption',
            captionMatchWidth: 'yes',
            lightbox: 'photoswipe',
            overlay: 'off',
            incompleteLastRow: 'normal',
            suppressErrors: 'publicly',
            innerBorderWidth: 0,
        };

        if (hitsBeforeJIG > 2) {
            // We can use loadmore to lazyload JIG if it's below the fold
            Object.assign(options, {
                incompleteLastRow: 'flexible',
                limit: 5,
                loadMore: 'scroll',
                initiallyLoad: 5,
                loadMoreText: 'Tov\u00e1bbiak bet\u00f6lt\u00e9se',
                loadMoreCountText: '(m\u00e9g *count* k\u00e9p maradt)',
                loadMoreOffset: 300,
            });
        }

        jQuery('#jig1').justifiedImageGrid(options);
    }

    function ensureSlashes(str) {
        if (str === '') {
            return str;
        }
        if (str.charAt(0) !== '/') {
            str = `/${str}`;
        }
        if (str.charAt(str.length - 1) !== '/') {
            str = `${str}/`;
        }
        return str;
    }
    function removeDiacritics(str) {
        var defaultDiacriticsRemovalMap = [
            {base: 'a', letters: '\u00e1\u00c1'},
            {base: 'e', letters: '\u00e9\u00c9'},
            {base: 'i', letters: '\u00ed\u00cd'},
            {base: 'o', letters: '\u00f6\u00d6\u0151\u0150\u00f3\u00d3'},
            {base: 'u', letters: '\u00fa\u00da\u0171\u0170\u00fc\u00dc'},
        ];

        var diacriticsMap = {};
        for (var i = 0; i < defaultDiacriticsRemovalMap.length; i++) {
            var letters = defaultDiacriticsRemovalMap[i].letters;
            for (var j = 0; j < letters.length; j++) {
                diacriticsMap[letters[j]] = defaultDiacriticsRemovalMap[i].base;
            }
        }
        return str.replace(/[^\u0000-\u007E]/g, function (a) {
            return diacriticsMap[a] || a;
        });
    }

    function escAttr(text) {
        var map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;',
        };

        return text.replace(/[&<>"']/g, function (m) {
            return map[m];
        });
    }
    function setupEventHandlers() {
        const searchFilters = document.querySelector('.search-filters');
        searchFilters.querySelector('.category-picker .filter-checkbox').addEventListener('change', (event) => {
            if (event.target.checked === true) {
                searchFilters.classList.add('dropdown-open');
            } else {
                searchFilters.classList.remove('dropdown-open');
            }
        });
        const searchBox = document.querySelector('.search-box');
        const searchInput = searchBox.querySelector('input');
        searchInput.addEventListener('focus', (event) => {
            searchBox.classList.add('search-focused');
        });
        searchInput.addEventListener('blur', (event) => {
            searchBox.classList.remove('search-focused');
        });
    }
    const titleData = {
        heading: document.querySelector('h1'),
        title: document.querySelector('title'),
        original: document.querySelector('h1').innerText,
        counter: '',
        page: '',
        facet: '',
        justImages: false,
        query: '',
    };
    function updateTitle(newData) {
        Object.assign(titleData, newData);
        // Craft the h1 tag value
        let newTitle = titleData.original;
        if (titleData.counter) {
            const justImagesCheckbox = document.querySelector('.just-images .filter-checkbox');
            let type = justImagesCheckbox && justImagesCheckbox.checked ? 'kép' : 'találat';
            newTitle += ` - ${titleData.counter} ${type}`;
        }
        if (titleData.page) {
            newTitle += `, ${titleData.page}. oldal`;
        }
        if (titleData.facet) {
            newTitle += ', csak ' + titleData.facet;
        }
        titleData.heading.innerHTML = newTitle;

        // Now doc/window title
        newTitle = titleData.original;
        if (titleData.query) {
            newTitle += `: ${titleData.query}`;
        }
        newTitle += ' - Bálványos Huba';
        titleData.title.innerHTML = newTitle;
    }
    function maybeScrollSearchIntoView() {
        // Only if mobile/small height
        // Only if scrollpos is at 0
        // Only if input value is empty
        // Scroll brown area into view
        if (window.screen.availHeight > 700) {
            return;
        }
        if (window.pageYOffset > 0) {
            return;
        }
        if (document.querySelector('input[type="search"]').value !== '') {
            return;
        }
        console.log('wanna scroll');
        window.scrollTo(0, document.querySelector('#right').offsetTop);
    }
    search.start();
    setupEventHandlers();
    maybeScrollSearchIntoView();
})();
