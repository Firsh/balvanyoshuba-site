"use strict";function _createForOfIteratorHelper(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,a=function(){};return{s:a,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.In order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,s=!0,o=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return s=e.done,e},e:function(e){o=!0,i=e},f:function(){try{s||null==n.return||n.return()}finally{if(o)throw i}}}}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function ownKeys(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function _objectSpread(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ownKeys(Object(n),!0).forEach((function(t){_defineProperty(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ownKeys(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}!function(){if(!document.querySelector("body").classList.contains("page-id-10409"))return;const e={eloadasok:"Előadások","tabori-alkotasok":"Tábori alkotások","huba-alkotasok":"Huba alkotások",hubaratok:"Hubarátok",fotok:"Fotók",egyeb:"Egyéb",irodalom:"Irodalom",kiallitasok:"Kiállítások",bejelentes:"Bejelentés",videok:"Videók",emlekezunk:"Emlékezünk",eletrajz:"Életrajz","eloadás-osszeallitasok":"Előadás-összeállítások",hangok:"Hangok",jokivansagok:"Jókívánságok","alice-publikacioi":"Alice publikációi","hubarat-irasok":"Hubarát írások"},t=Object.keys(e).reduce(((t,n)=>{const r=e[n],a=n;return _objectSpread(_objectSpread({},t),{},{[r]:a})}),{});function n(e){return(t[e]||e).split(" ").map(encodeURIComponent).join("-")}function r(t){return(e[t]||t).split("-").map(decodeURIComponent).join(" ")}const a="huba",i=instantsearch({indexName:a,searchClient:algoliasearch("0EGGAY0T4P","bb6553eb864cfa477645762d34f8929a"),searchFunction(e){const t=document.querySelector(".search-filters");e.state.query?(e.search(),t.classList.add("show-filters")):(f({counter:"",page:"",facet:"",justImages:!1,query:""}),t.classList.remove("show-filters"),e.clearRefinements(),document.querySelector(".text-hits").innerHTML="",document.querySelector(".image-hits").innerHTML="",document.querySelector(".pagination").innerHTML="")},routing:{router:instantsearch.routers.history({createURL(e){e.qsModule;let t=e.routeState,r=e.location;const a=[];let i="";t.query&&(i=function(e){for(var t=[{base:"a",letters:"áÁ"},{base:"e",letters:"éÉ"},{base:"i",letters:"íÍ"},{base:"o",letters:"öÖőŐóÓ"},{base:"u",letters:"úÚűŰüÜ"}],n={},r=0;r<t.length;r++)for(var a=t[r].letters,i=0;i<a.length;i++)n[a[i]]=t[r].base;return e.replace(/[^\u0000-\u007E]/g,(function(e){return n[e]||e}))}(t.query).split(" ").map(encodeURIComponent).join("+")),t.category&&a.push(t.category.map(n).join(",")),t.kepek&&a.push("kepek"),1!==t.page&&a.push(t.page);const s=function(e){if(""===e)return e;"/"!==e.charAt(0)&&(e=`/${e}`);"/"!==e.charAt(e.length-1)&&(e=`${e}/`);return e}(a.join("/"));return`${r.protocol}//${r.hostname}${r.pathname}?${i}${s}`},parseURL(e){e.qsModule;let t=e.location;const n={};if(""===t.search)return n;const a=t.search.replace(/\/$/gim,"").split("/");return/^\d+$/im.test(a[a.length-1])&&(n.page=a.pop()),"kepek"===a[a.length-1]&&(n.kepek=!0,a.pop()),"?"!==a[a.length-1].charAt(0)&&(n.category=a.pop().split(",").map(r)),n.query=a.pop(),"?"===n.query.charAt(0)&&(n.query=n.query.substr(1).split("+").map(encodeURIComponent).join(" ")),n}}),stateMapping:{stateToRoute(e){const t=e.huba||{};return{query:t.query,category:t.refinementList&&t.refinementList.category,kepek:t.toggle&&t.toggle.type,page:t.page}},routeToState:e=>({[a]:{query:e.query,refinementList:{category:e.category},toggle:{type:e.kepek},page:e.page}})}}});function s(e){const t=instantsearch.highlight({attribute:"title",hit:e});let n="";e.parentTitle&&(n=`<span class="search-hit-parent-title">${instantsearch.highlight({attribute:"parentTitle",hit:e})} » </span>`);let r="",a="";"article"===e.type&&(r=`<div><svg><use xlink:href="#lnr-pencil"></use></svg><span>${instantsearch.highlight({attribute:"author",hit:e})}</span></div>`,void 0!==e._highlightResult.time.matchedWords&&e._highlightResult.time.matchedWords.length>0&&(a=`<div><svg><use xlink:href="#lnr-clock"></use></svg><span>${instantsearch.highlight({attribute:"time",hit:e})}</span></div>`));const i=`<div><svg><use xlink:href="#lnr-tag"></use></svg><span>${e.breadcrumb?instantsearch.highlight({attribute:"breadcrumb",hit:e}):e.category}</span></div>`.replace(/»/g,'<span class="bc-separator">»</span>'),s=instantsearch.snippet({attribute:"content",hit:e}).replace(/___/gi," ");return`<a class="search-result" href="${e.url}"><div class="search-img-box"><img src="${e.thumbnail}" width="${e.thumbnailW}" height="${e.thumbnailH}" alt="${h(e.title)}" /></div><div class="search-texts"><h4>${n}${t}</h4><p>${s}</p><div class="search-meta"> ${a}${i}${r} </div></div></a>`}const o=instantsearch.connectors.connectHits((function(e){const t=e.hits,n=e.widgetParams,r=[],a=[];var i,o=_createForOfIteratorHelper(t);try{for(o.s();!(i=o.n()).done;){const e=i.value;"image"===e.type?r.push(e):a.push(s(e))}}catch(e){o.e(e)}finally{o.f()}n.container.innerHTML=a.join(""),function(e,t,n){if(0===e.length)return void(t.innerHTML="");t.innerHTML='<div id="jig1" class="justified-image-grid jig-preset-c2"><div class="jig-clearfix"></div></div>';const r=300,a=e.length,i=[],s={};let o,l,c,u,p;for(let t=0;t<a;t++)c=e[t],c.usableURL=c.medium?c.medium:c.full,c.usableW=c.mediumW?c.mediumW:Math.round(c.fullW/c.fullH*r),p=`<a href="${c.context.url}">${c.context.title}</a> (${c.context.category})`,c.description=`A kép itt szerepel: ${p}`,l=c.usableURL,o=s[l],void 0===o?s[l]=t:(void 0===e[o].allContexts&&(e[o].allContexts=[`<a href="${e[o].context.url}">${e[o].context.title}</a> (${e[o].context.category})`]),e[o].allContexts.push(p),u=e[o].allContexts.length,e[o].description=`A kép ${u} helyen is megtalálható az oldalon:<br>`+e[o].allContexts.join(",<br>"),e[o].caption=`${u} helyen szerepel!`,c.skip=!0);var g,d=_createForOfIteratorHelper(e);try{for(d.s();!(g=d.n()).done;){const e=g.value;void 0===e.skip&&(e.displayTitle=[],e._highlightResult&&e._highlightResult.title?e.displayTitle[0]=e._highlightResult.title.value:e.title&&(e.displayTitle[0]=e.title),e._snippetResult&&e._snippetResult.content&&"none"!==e._snippetResult.content.matchLevel&&e.displayTitle.push(e._snippetResult.content.value),i.push({url:e.usableURL,width:e.usableW,title:h(e.displayTitle.join(", ")),description:h(e.description),caption:e.caption?h(e.caption):"",wh:e.fullW+"x"+e.fullH,link:e.full,link_target:"video",extra_class:`jig-contentID-ML-${e.objectID.replace(/.*-(?=\d+$)/gi,"")}`,unencoded_url:e.usableURL,photon:e.usableURL}))}}catch(e){d.e(e)}finally{d.f()}window.jigAddLightbox1=function(){jQuery("#jig1 a.jig-link").JIGphotoSwipe({lightboxSlug:"jig",shareEl:!1,loop:!0,bgOpacity:1,spacing:.12,closeOnScroll:!0,fullscreenEl:!0,zoomEl:!0,counterEl:!0,history:!1,indexIndicatorSep:" / "})};const f={items:i,targetHeight:r,heightDeviation:0,disableCropping:"yes",margins:4,animSpeed:200,linkRel:"jig-*instance*",caption:"reverse-slide",captionField:"caption",captionMatchWidth:"yes",lightbox:"photoswipe",overlay:"off",incompleteLastRow:"normal",suppressErrors:"publicly",innerBorderWidth:0};n>2&&Object.assign(f,{incompleteLastRow:"flexible",limit:5,loadMore:"scroll",initiallyLoad:5,loadMoreText:"Továbbiak betöltése",loadMoreCountText:"(még *count* kép maradt)",loadMoreOffset:300});jQuery("#jig1").justifiedImageGrid(f)}(r,n.imageHitsContainer,a.length)})),l=instantsearch.connectors.connectPagination((function(e){const t=e.currentRefinement,n=e.nbHits,r=e.nbPages,a=e.isFirstPage,i=e.isLastPage,s=e.refine,o=e.createURL,l=e.widgetParams;let c=e.pages;const u=l.container;if(1===r||0===n)return void(u.innerHTML="");let p;p=c.indexOf(t),p>2&&c.splice(0,p-2),p=c.indexOf(t),p+2<c.length&&c.splice(p+2+1);const g={prev:[],pages:[],next:[]};a||(g.prev.push(`<a class="prev page-numbers" href="${o(t-1)}" data-value="${t-1}"> Előző </a>`),0!==c[0]&&g.prev.push(`<a class="page-numbers" data-value="0" href="${o(0)}">1</a>`),c[0]>1&&g.prev.push('<span class="page-numbers dots">…</span>')),i||(c[c.length-1]<r-2&&g.next.push('<span class="page-numbers dots">…</span>'),c[c.length-1]!==r-1&&g.next.push(`<a class="page-numbers" data-value="${r-1}" href="${o(r-1)}">${r}</a>`),g.next.push(`<a class="next page-numbers" href="${o(t+1)}" data-value="${t+1}"> Következő </a>`));var h,d=_createForOfIteratorHelper(c);try{for(d.s();!(h=d.n()).done;){const e=h.value;t===e?g.pages.push(`<span aria-current="page" class="page-numbers current">${e+1}</span>`):g.pages.push(`<a class="page-numbers" data-value="${e}" href="${o(e)}">${e+1}</a>`)}}catch(e){d.e(e)}finally{d.f()}u.innerHTML=`<nav class="navigation pagination" role="navigation" aria-label="Lapozgasson összesen ${n} találat között!"><h2 class="">Lapozgasson összesen ${n} találat között!</h2><div class="nav-links"> ${g.prev.join("")} ${g.pages.join("")} ${g.next.join("")} </div></nav>`,[...u.querySelectorAll("a")].forEach((e=>{e.addEventListener("click",(e=>{e.preventDefault(),window.scrollTo(0,0),s(e.currentTarget.dataset.value)}))}))})),c=instantsearch.connectors.connectStats((function(e){e.hitsPerPage;const t=e.nbHits,n=(e.areHitsSorted,e.nbSortedHits,e.nbPages,e.page),r=(e.processingTimeMS,e.query);e.widgetParams,t>0?f({counter:t,page:n>0?n+1:"",query:r}):r&&f({counter:"Nincs",page:"",query:r})})),u=instantsearch.connectors.connectRefinementList((function(e){const t=e.items,n=e.widgetParams,r=n.container,a=n.input,i=t.filter((e=>e.isRefined)).map((e=>e.label)),s=i.length;let o="Szűrők";s>0?(o=`${s} szűrő`,f(1===s?{facet:i}:5!==s?{facet:`a ${s} kategóriában`}:{facet:`az ${s} kategóriában`}),a.classList.add("filter-active")):(f({facet:""}),a.classList.remove("filter-active")),r.innerHTML=`<svg><use xlink:href="#lg-filter"></use></svg> ${o}`})),p=instantsearch.connectors.connectRefinementList((function(e,t){let n=e.items;const r=e.refine,a=e.createURL,i=e.widgetParams;if(t)return;const s=i.container,o=i.customLimit,l=n.filter((e=>e.isRefined)),c=n.filter((e=>!e.isRefined));n=l.concat(c.slice(0,o-l.length)).sort(((e,t)=>t.count-e.count));const u=s.querySelectorAll("a").length;if(0===n.length||n.length!==u||!n.every((e=>{const t=s.querySelector(`a[data-value="${e.label}"`);return null!==t&&t.querySelector(".cat-count").innerText==e.count}))){if(0===n.length)return void(s.innerHTML="Nincs mi alapján szűrni!");s.innerHTML=n.map((e=>`<a href="${a(e.value)}" class="${e.isRefined?"cat-item cat-selected":"cat-item"}" data-value="${e.value}"><svg><use xlink:href="#checkmark"></use></svg><span class="cat-text">${e.label}</span><span class="cat-count">${e.count}</span></a>`)).join(""),[...s.querySelectorAll("a")].forEach((e=>{e.addEventListener("click",(e=>{e.preventDefault(),e.currentTarget.classList.toggle("cat-selected"),r(e.currentTarget.dataset.value)}))}))}}));let g;function h(e){var t={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"};return e.replace(/[&<>"']/g,(function(e){return t[e]}))}i.addWidgets([instantsearch.widgets.searchBox({container:".search-box",autofocus:!0,placeholder:"Írjon be pár betűt!",showReset:!0,showSubmit:!0,searchAsYouType:!1,queryHook(e,t){clearTimeout(g),g=setTimeout((()=>{t(e)}),1)}}),instantsearch.widgets.toggleRefinement({container:".just-images",attribute:"type",on:"image",templates:{labelText:'<svg><use xlink:href="#lg-image"></use></svg><span class="csak">Csak&nbsp;</span>képek'},cssClasses:{root:"toggle-refinement",label:"filter-label",checkbox:"filter-checkbox",labelText:"filter-text"}}),u({container:document.querySelector(".category-dropdown-switch .filter-text"),input:document.querySelector(".category-dropdown-switch .filter-checkbox"),attribute:"category"}),p({container:document.querySelector(".category-dropdown"),attribute:"category",sortBy:["count:desc","name:asc"],limit:25,customLimit:10}),c(),instantsearch.widgets.poweredBy({container:".powered-by",theme:"dark"}),o({container:document.querySelector(".text-hits"),imageHitsContainer:document.querySelector(".image-hits")}),l({container:document.querySelector(".pagination")})]);const d={heading:document.querySelector("h1"),title:document.querySelector("title"),original:document.querySelector("h1").innerText,counter:"",page:"",facet:"",justImages:!1,query:""};function f(e){Object.assign(d,e);let t=d.original;if(d.counter){const e=document.querySelector(".just-images .filter-checkbox");let n=e&&e.checked?"kép":"találat";t+=` - ${d.counter} ${n}`}d.page&&(t+=`, ${d.page}. oldal`),d.facet&&(t+=", csak "+d.facet),d.heading.innerHTML=t,t=d.original,d.query&&(t+=`: ${d.query}`),t+=" - Bálványos Huba",d.title.innerHTML=t}i.start(),function(){const e=document.querySelector(".search-filters");e.querySelector(".category-picker .filter-checkbox").addEventListener("change",(t=>{!0===t.target.checked?e.classList.add("dropdown-open"):e.classList.remove("dropdown-open")}));const t=document.querySelector(".search-box"),n=t.querySelector("input");n.addEventListener("focus",(e=>{t.classList.add("search-focused")})),n.addEventListener("blur",(e=>{t.classList.remove("search-focused")}))}(),window.screen.availHeight>700||window.pageYOffset>0||""===document.querySelector('input[type="search"]').value&&window.scrollTo(0,document.querySelector("#right").offsetTop)}();