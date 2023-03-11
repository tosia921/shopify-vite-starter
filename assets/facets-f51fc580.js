class n extends HTMLElement{constructor(){super(),this.onActiveFilterClick=this.onActiveFilterClick.bind(this),this.debouncedOnSubmit=debounce(r=>{this.onSubmitHandler(r)},500),this.querySelector("form").addEventListener("input",this.debouncedOnSubmit.bind(this));const t=this.querySelector("#FacetsWrapperDesktop");t&&t.addEventListener("keyup",onKeyUpEscape)}static setListeners(){const e=t=>{const r=t.state?t.state.searchParams:n.searchParamsInitial;r!==n.searchParamsPrev&&n.renderPage(r,null,!1)};window.addEventListener("popstate",e)}static toggleActiveFacets(e=!0){document.querySelectorAll(".js-facet-remove").forEach(t=>{t.classList.toggle("disabled",e)})}static renderPage(e,t,r=!0){n.searchParamsPrev=e;const s=n.getSections(),o=document.getElementById("ProductCount"),i=document.getElementById("ProductCountDesktop");document.getElementById("ProductGridContainer").querySelector(".collection").classList.add("loading"),o&&o.classList.add("loading"),i&&i.classList.add("loading"),s.forEach(a=>{const c=`${window.location.pathname}?section_id=${a.section}&${e}`,l=u=>u.url===c;n.filterData.some(l)?n.renderSectionFromCache(l,t):n.renderSectionFromFetch(c,t)}),r&&n.updateURLHash(e)}static renderSectionFromFetch(e,t){fetch(e).then(r=>r.text()).then(r=>{const s=r;n.filterData=[...n.filterData,{html:s,url:e}],n.renderFilters(s,t),n.renderProductGridContainer(s),n.renderProductCount(s)})}static renderSectionFromCache(e,t){const r=n.filterData.find(e).html;n.renderFilters(r,t),n.renderProductGridContainer(r),n.renderProductCount(r)}static renderProductGridContainer(e){document.getElementById("ProductGridContainer").innerHTML=new DOMParser().parseFromString(e,"text/html").getElementById("ProductGridContainer").innerHTML}static renderProductCount(e){const t=new DOMParser().parseFromString(e,"text/html").getElementById("ProductCount").innerHTML,r=document.getElementById("ProductCount"),s=document.getElementById("ProductCountDesktop");r.innerHTML=t,r.classList.remove("loading"),s&&(s.innerHTML=t,s.classList.remove("loading"))}static renderFilters(e,t){const r=new DOMParser().parseFromString(e,"text/html"),s=r.querySelectorAll("#FacetFiltersForm .js-filter, #FacetFiltersFormMobile .js-filter, #FacetFiltersPillsForm .js-filter"),o=c=>{const l=t?t.target.closest(".js-filter"):void 0;return l?c.dataset.index===l.dataset.index:!1},i=Array.from(s).filter(c=>!o(c)),a=Array.from(s).find(o);i.forEach(c=>{document.querySelector(`.js-filter[data-index="${c.dataset.index}"]`).innerHTML=c.innerHTML}),n.renderActiveFacets(r),n.renderAdditionalElements(r),a&&n.renderCounts(a,t.target.closest(".js-filter"))}static renderActiveFacets(e){[".active-facets-mobile",".active-facets-desktop"].forEach(r=>{const s=e.querySelector(r);s&&(document.querySelector(r).innerHTML=s.innerHTML)}),n.toggleActiveFacets(!1)}static renderAdditionalElements(e){[".mobile-facets__open",".mobile-facets__count",".sorting"].forEach(r=>{e.querySelector(r)&&(document.querySelector(r).innerHTML=e.querySelector(r).innerHTML)}),document.getElementById("FacetFiltersFormMobile").closest("menu-drawer").bindEvents()}static renderCounts(e,t){const r=t.querySelector(".facets__selected"),s=e.querySelector(".facets__selected"),o=t.querySelector(".facets__summary"),i=e.querySelector(".facets__summary");s&&r&&(t.querySelector(".facets__selected").outerHTML=e.querySelector(".facets__selected").outerHTML),o&&i&&(t.querySelector(".facets__summary").outerHTML=e.querySelector(".facets__summary").outerHTML)}static updateURLHash(e){history.pushState({searchParams:e},"",`${window.location.pathname}${e&&"?".concat(e)}`)}static getSections(){return[{section:document.getElementById("product-grid").dataset.id}]}createSearchParams(e){const t=new FormData(e);return new URLSearchParams(t).toString()}onSubmitForm(e,t){n.renderPage(e,t)}onSubmitHandler(e){e.preventDefault();const t=document.querySelectorAll("facet-filters-form form");if(e.srcElement.className=="mobile-facets__checkbox"){const r=this.createSearchParams(e.target.closest("form"));this.onSubmitForm(r,e)}else{const r=[],s=e.target.closest("form").id==="FacetFiltersFormMobile";t.forEach(o=>{s?o.id==="FacetFiltersFormMobile"&&r.push(this.createSearchParams(o)):(o.id==="FacetSortForm"||o.id==="FacetFiltersForm"||o.id==="FacetSortDrawerForm")&&(document.querySelectorAll(".no-js-list").forEach(a=>a.remove()),r.push(this.createSearchParams(o)))}),this.onSubmitForm(r.join("&"),e)}}onActiveFilterClick(e){e.preventDefault(),n.toggleActiveFacets();const t=e.currentTarget.href.indexOf("?")==-1?"":e.currentTarget.href.slice(e.currentTarget.href.indexOf("?")+1);n.renderPage(t)}}n.filterData=[];n.searchParamsInitial=window.location.search.slice(1);n.searchParamsPrev=window.location.search.slice(1);customElements.define("facet-filters-form",n);n.setListeners();class m extends HTMLElement{constructor(){super(),this.querySelectorAll("input").forEach(e=>e.addEventListener("change",this.onRangeChange.bind(this))),this.setMinAndMaxValues()}onRangeChange(e){this.adjustToValidValues(e.currentTarget),this.setMinAndMaxValues()}setMinAndMaxValues(){const e=this.querySelectorAll("input"),t=e[0],r=e[1];r.value&&t.setAttribute("max",r.value),t.value&&r.setAttribute("min",t.value),t.value===""&&r.setAttribute("min",0),r.value===""&&t.setAttribute("max",r.getAttribute("max"))}adjustToValidValues(e){const t=Number(e.value),r=Number(e.getAttribute("min")),s=Number(e.getAttribute("max"));t<r&&(e.value=r),t>s&&(e.value=s)}}customElements.define("price-range",m);class f extends HTMLElement{constructor(){super();const e=this.querySelector("a");e.setAttribute("role","button"),e.addEventListener("click",this.closeFilter.bind(this)),e.addEventListener("keyup",t=>{t.preventDefault(),t.code.toUpperCase()==="SPACE"&&this.closeFilter(t)})}closeFilter(e){e.preventDefault(),(this.closest("facet-filters-form")||document.querySelector("facet-filters-form")).onActiveFilterClick(e)}}customElements.define("facet-remove",f);
