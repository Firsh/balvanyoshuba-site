!function(){const e=document.getElementById("menu-opener"),t=document.getElementById("menu-closer");function n(e){e.preventDefault();const t=e.target.parentElement;(t.classList.contains("open")?c:o)(t)}function o(e){if(null!==e){const t=e.querySelector(".sub-menu");t&&(document.querySelectorAll(".open").forEach(e=>c(e)),e.classList.add("open"),t.style.height=t.getAttribute("data-height")+"px")}}function c(e){const t=e.querySelector(".sub-menu");t&&(e.classList.remove("current-menu-parent","open"),t.style.height="")}function i(){document.body.classList.contains("menu-pulled")&&document.body.classList.remove("menu-pulled")}e&&t&&(document.querySelectorAll(".menu-item-has-children > a").forEach(e=>{e.addEventListener("click",n)}),e.addEventListener("click",function(){document.body.classList.contains("menu-pulled")||(document.body.classList.add("menu-pulled"),o(document.querySelector(".current-menu-ancestor")))}),t.addEventListener("click",i),document.getElementById("menu").addEventListener("click",e=>{e.target==e.currentTarget&&i()}),function(){const e=document.querySelectorAll(".menu-item-has-children ul");e.forEach(e=>{e.style.height="auto"}),e.forEach(e=>{e.setAttribute("data-height",e.offsetHeight)}),e.forEach(e=>{e.style.height=""})}(),o(document.querySelector(".current-menu-parent")))}(),function(){if(-1!==window.location.href.indexOf("alkotasok-kozgyujtemenyekben")){document.querySelector("table").classList.add("alkotasok");const e=document.querySelectorAll("td:nth-child(2):last-child");e.forEach(e=>{var t=e.previousElementSibling;4!==t.innerHTML.length&&""!=t.innerHTML||(e.setAttribute("colspan",3),e.parentElement.classList.add("mainRow"))});const t=document.querySelectorAll("td:not(:nth-child(2))");t.forEach(e=>{"&nbsp;"!=e.innerHTML&&" "!=e.innerHTML||e.classList.add("emptyCell")})}}(),navigator.clipboard&&window.isSecureContext&&(document.querySelector("body").classList.contains("archive")||document.querySelector("article").addEventListener("click",e=>{e.ctrlKey&&"H3"===e.target.tagName&&(e=window.location.href.split("#")[0]+"#"+e.target.getAttribute("id"),navigator.clipboard.writeText(e))})),function(){function n(e){e.language=navigator.language,navigator.sendBeacon("/.netlify/functions/stats",JSON.stringify(e))}function t(e){n({type:"event",eventCategory:"Eloadasok",eventAction:"Letoltes",eventLabel:e.target.getAttribute("href").split("/").pop()})}function o(e){n({type:"event",eventCategory:"Dokumentumok",eventAction:"Letoltes",eventLabel:e.target.getAttribute("href").split("/").pop()})}function c(e){const t={type:"event",eventCategory:"AUDIO"==e.currentTarget.tagName?"Hangok":"Videok",eventLabel:e.currentTarget.getAttribute("src").split("/").pop(),eventAction:""};"play"==e.type?t.eventAction="Elkezdve":"ended"==e.type&&(t.eventAction="Befejezve"),n(t)}"sendBeacon"in navigator!=!1&&("balvanyoshuba.hu"!==window.location.hostname&&-1===window.location.hostname.indexOf("netlify.app")||(n({type:"pageview",title:document.title,url:location.href,ref:document.referrer,resolution:window.screen.width+"x"+window.screen.height,viewport:window.screen.availWidth+"x"+window.screen.availHeight}),document.querySelectorAll('#content a[href$=".ppt"]').forEach(e=>{e.addEventListener("click",t)}),document.querySelectorAll('#content a[href$=".pdf"]').forEach(e=>{e.addEventListener("click",o)}),document.querySelectorAll("#content audio, #content video").forEach(e=>{e.addEventListener("play",c),e.addEventListener("ended",c)})))}();