!function(){if(document.querySelector("body").classList.contains("page-id-10409")){var e="huba_dev";const t=instantsearch({indexName:e,searchClient:algoliasearch("0EGGAY0T4P","bb6553eb864cfa477645762d34f8929a"),initialUiState:{huba_dev:{query:"",page:1}},searchFunction(e){const t=document.querySelector(".search-filters");e.state.query?(e.search(),t.classList.add("show-filters")):(c({counter:"",page:"",facet:"",justImages:!1}),t.classList.remove("show-filters"),e.clearRefinements(),document.querySelector(".text-hits").innerHTML="",document.querySelector(".image-hits").innerHTML="",document.querySelector(".pagination").innerHTML="")},routing:!0}),n=instantsearch.connectors.connectHits(function(e){const{hits:t,widgetParams:a}=e,n=[],s=[];for(const i of t)"image"===i.type?n.push(i):s.push(function(e){var t=instantsearch.highlight({attribute:"title",hit:e});let a="";e.parentTitle&&(a=`
                <span class="search-hit-parent-title">${instantsearch.highlight({attribute:"parentTitle",hit:e})} » </span>`);let n="",s="";"article"===e.type&&(n=`
                <div>
                    <svg><use xlink:href="#lnr-pencil"></use></svg>
                    <span>${instantsearch.highlight({attribute:"author",hit:e})}</span>
                </div>`,void 0!==e._highlightResult.time.matchedWords&&0<e._highlightResult.time.matchedWords.length&&(s=`
                <div>
                    <svg><use xlink:href="#lnr-clock"></use></svg>
                    <span>${instantsearch.highlight({attribute:"time",hit:e})}</span>
                </div> `));var i=`
            <div>
                <svg><use xlink:href="#lnr-tag"></use></svg>
                <span>${e.breadcrumb?instantsearch.highlight({attribute:"breadcrumb",hit:e}):e.category}</span>
            </div>`.replace(/»/g,'<span class="bc-separator">»</span>'),r=instantsearch.snippet({attribute:"content",hit:e}).replace(/___/gi," ");return`
        <a class="search-result" href="${e.url}">
            <div class="search-img-box">
                <img src="${e.thumbnail}"
                    width="${e.thumbnailW}"
                    height="${e.thumbnailH}"
                    alt="${h(e.title)}" />
            </div>
            <div class="search-texts">
                <h4>${a}${t}</h4>
                <p>${r}</p>
                <div class="search-meta">
                    ${s}${i}${n}
                </div>   
            </div>
        </a>`}(i));a.container.innerHTML=s.join(""),function(r,e,c){if(0!==r.length){e.innerHTML='<div id="jig1" class="justified-image-grid jig-e3ed5f6a5e5bfcbb72f50950a75ae738 jig-preset-c2 jig-source-wp-gallery"><div class="jig-clearfix"></div></div>';var o=r.length;const u=[],g={};let t,a,n,s,i;for(let e=0;e<o;e++)n=r[e],n.usableURL=n.medium||n.full,n.usableW=n.mediumW||Math.round(n.fullW/n.fullH*300),i=`<a href="${n.context.url}">${n.context.title}</a> (${n.context.category})`,n.description=`A kép itt szerepel: ${i}`,a=n.usableURL,void 0===(t=g[a])?g[a]=e:(void 0===r[t].allContexts&&(r[t].allContexts=[`<a href="${r[t].context.url}">${r[t].context.title}</a> (${r[t].context.category})`]),r[t].allContexts.push(i),s=r[t].allContexts.length,r[t].description=`A kép ${s} helyen is megtalálható az oldalon:<br>`+r[t].allContexts.join(",<br>"),r[t].caption=`${s} helyen szerepel!`,n.skip=!0);for(const e of r)void 0===e.skip&&u.push({url:e.usableURL,width:e.usableW,title:h(e._highlightResult.title.value),description:h(e.description),caption:e.caption?h(e.caption):"",wh:e.fullW+"x"+e.fullH,link:e.full,link_target:"video",extra_class:`jig-contentID-ML-${e.objectID.replace(/.*-(?=\d+$)/gi,"")}`,unencoded_url:e.usableURL,photon:e.usableURL});window.jigAddLightbox1=function(){jQuery("#jig1 a.jig-link").JIGphotoSwipe({lightboxSlug:"jig",shareEl:!1,loop:!0,bgOpacity:1,spacing:.12,closeOnScroll:!0,fullscreenEl:!0,zoomEl:!0,counterEl:!0,history:!1,indexIndicatorSep:" / "})};var l={items:u,targetHeight:300,heightDeviation:0,disableCropping:"yes",margins:4,animSpeed:200,linkRel:"jig-*instance*",caption:"reverse-slide",captionField:"caption",captionMatchWidth:"yes",lightbox:"photoswipe",overlay:"off",incompleteLastRow:"normal",suppressErrors:"publicly",innerBorderWidth:0};2<c&&Object.assign(l,{incompleteLastRow:"flexible",limit:5,loadMore:"scroll",initiallyLoad:5,loadMoreText:"Továbbiak betöltése",loadMoreCountText:"(még *count* kép maradt)",loadMoreOffset:300}),jQuery("#jig1").justifiedImageGrid(l)}else e.innerHTML=""}(n,a.imageHitsContainer,s.length)}),s=instantsearch.connectors.connectPagination(function(e){const{currentRefinement:t,nbHits:a,nbPages:n,isFirstPage:s,isLastPage:i,refine:r,createURL:c,widgetParams:o}=e;let l=e["pages"];const u=o.container;if(1!==n&&0!==a){posOfCurrentInPages=l.indexOf(t),2<posOfCurrentInPages&&l.splice(0,posOfCurrentInPages-2),posOfCurrentInPages=l.indexOf(t),posOfCurrentInPages+2<l.length&&l.splice(posOfCurrentInPages+2+1);const g={prev:[],pages:[],next:[]};s||(g.prev.push(`
                <a class="prev page-numbers"
                    href="${c(t-1)}"
                    data-value="${t-1}">
                        Előző
                </a>`),0!==l[0]&&g.prev.push(`<a class="page-numbers" data-value="0" href="${c(0)}">1</a>`),1<l[0]&&g.prev.push('<span class="page-numbers dots">…</span>')),i||(l[l.length-1]<n-2&&g.next.push('<span class="page-numbers dots">…</span>'),l[l.length-1]!==n-1&&g.next.push(`
                    <a class="page-numbers"
                        data-value="${n-1}"
                        href="${c(n-1)}">${n}</a>`),g.next.push(`
                <a class="next page-numbers"
                    href="${c(t+1)}"
                    data-value="${t+1}">
                    Következő
                </a>`));for(const h of l)t===h?g.pages.push(`<span aria-current="page" class="page-numbers current">${h+1}</span>`):g.pages.push(`<a class="page-numbers" data-value="${h}" href="${c(h)}">${h+1}</a>`);u.innerHTML=`
            <nav class="navigation pagination" role="navigation" aria-label="Lapozgasson összesen ${a} találat között!">
                <h2 class="">Lapozgasson összesen ${a} találat között!</h2>
                <div class="nav-links">
                ${g.prev.join("")}
                ${g.pages.join("")}
                ${g.next.join("")}
                </div>
            </nav>`,[...u.querySelectorAll("a")].forEach(e=>{e.addEventListener("click",e=>{e.preventDefault(),window.scrollTo(0,0),r(e.currentTarget.dataset.value)})})}else u.innerHTML=""}),i=instantsearch.connectors.connectStats(function(e){var{nbHits:t,page:a,query:e}=e;0<t?c({counter:t,page:0<a?a+1:""}):e&&c({counter:"Nincs",page:""})}),r=instantsearch.connectors.connectRefinementList(function(e){const{items:t,widgetParams:a}=e,n=a.container,s=a.input;var i=t.filter(e=>e.isRefined).map(e=>e.label),e=i.length;let r="Szűrők";0<e?(r=`${e} szűrő`,c(1===e?{facet:i}:5!==e?{facet:`a ${e} kategóriában`}:{facet:`az ${e} kategóriában`}),s.classList.add("filter-active")):(c({facet:""}),s.classList.remove("filter-active")),n.innerHTML=`<svg><use xlink:href="#lg-filter"></use></svg> ${r}`}),o=instantsearch.connectors.connectRefinementList(function(e,t){let a=e.items;const{refine:n,widgetParams:s}=e;if(!t){const i=s.container;t=s.customLimit;const r=a.filter(e=>e.isRefined),c=a.filter(e=>!e.isRefined);a=r.concat(c.slice(0,t-r.length)).sort((e,t)=>t.count-e.count);t=i.querySelectorAll("a").length;(0===a.length||a.length!==t||!a.every(e=>{const t=i.querySelector(`a[data-value="${e.label}"`);return null!==t&&t.querySelector(".cat-count").innerText==e.count}))&&(0!==a.length?(i.innerHTML=a.map(e=>`
              <a href="#" class="${e.isRefined?"cat-item cat-selected":"cat-item"}" data-value="${e.value}">
                    <svg><use xlink:href="#checkmark"></use></svg>
                    <span class="cat-text">${e.label}</span>
                    <span class="cat-count">${e.count}</span>
              </a>`).join(""),[...i.querySelectorAll("a")].forEach(e=>{e.addEventListener("click",e=>{e.preventDefault(),e.currentTarget.classList.toggle("cat-selected"),n(e.currentTarget.dataset.value)})})):i.innerHTML="Nincs mi alapján szűrni!")}});let a;t.addWidgets([instantsearch.widgets.searchBox({container:".search-box",autofocus:!0,placeholder:"Írjon be pár betűt!",showReset:!0,showSubmit:!0,searchAsYouType:!1,queryHook(e,t){clearTimeout(a),a=setTimeout(()=>{t(e)},1)}}),instantsearch.widgets.toggleRefinement({container:".just-images",attribute:"type",on:"image",templates:{labelText:'<svg><use xlink:href="#lg-image"></use></svg><span class="csak">Csak&nbsp;</span>képek'},cssClasses:{root:"toggle-refinement",label:"filter-label",checkbox:"filter-checkbox",labelText:"filter-text"}}),r({container:document.querySelector(".category-dropdown-switch .filter-text"),input:document.querySelector(".category-dropdown-switch .filter-checkbox"),attribute:"category"}),o({container:document.querySelector(".category-dropdown"),attribute:"category",sortBy:["count:desc","name:asc"],limit:25,customLimit:10}),i(),instantsearch.widgets.poweredBy({container:".powered-by",theme:"dark"}),n({container:document.querySelector(".text-hits"),imageHitsContainer:document.querySelector(".image-hits")}),s({container:document.querySelector(".pagination")})]);const l={heading:document.querySelector("h1"),title:document.querySelector("title"),original:document.querySelector("h1").innerText,counter:"",page:"",facet:"",justImages:!1};function h(e){var t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"};return e.replace(/[&<>"']/g,function(e){return t[e]})}function c(e){Object.assign(l,e);let t=l.original;l.counter&&(e=(e=document.querySelector(".just-images .filter-checkbox"))&&e.checked?"kép":"találat",t+=` - ${l.counter} ${e}`),l.page&&(t+=`, ${l.page}. oldal`),l.facet&&(t+=", csak "+l.facet),l.title.innerHTML=`${t} - Bálványos Huba`,l.heading.innerHTML=t}t.start(),function(){const t=document.querySelector(".search-filters");t.querySelector(".category-picker .filter-checkbox").addEventListener("change",e=>{!0===e.target.checked?t.classList.add("dropdown-open"):t.classList.remove("dropdown-open")});const a=document.querySelector(".search-box"),e=a.querySelector("input");e.addEventListener("focus",e=>{a.classList.add("search-focused")}),e.addEventListener("blur",e=>{a.classList.remove("search-focused")})}(),700<window.screen.availHeight||0<window.pageYOffset||""===document.querySelector('input[type="search"]').value&&window.scrollTo(0,document.querySelector("#right").offsetTop)}}();