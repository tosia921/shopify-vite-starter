class n extends HTMLElement{constructor(){super(),this.addEventListener("keyup",e=>e.code==="Escape"&&this.close()),this.querySelector("#CartDrawer-Overlay").addEventListener("click",this.close.bind(this)),this.setHeaderCartIconAccessibility()}setHeaderCartIconAccessibility(){const e=document.querySelector("#cart-icon-bubble");e.setAttribute("role","button"),e.setAttribute("aria-haspopup","dialog"),e.addEventListener("click",t=>{t.preventDefault(),this.open(e)}),e.addEventListener("keydown",t=>{t.code.toUpperCase()==="SPACE"&&(t.preventDefault(),this.open(e))})}open(e){e&&this.setActiveElement(e);const t=this.querySelector('[id^="Details-"] summary');t&&!t.hasAttribute("role")&&this.setSummaryAccessibility(t),setTimeout(()=>{this.classList.add("animate","active")}),this.addEventListener("transitionend",()=>{const r=this.classList.contains("is-empty")?this.querySelector(".drawer__inner-empty"):document.getElementById("CartDrawer"),i=this.querySelector(".drawer__inner")||this.querySelector(".drawer__close");trapFocus(r,i)},{once:!0}),document.body.classList.add("overflow-hidden")}close(){this.classList.remove("active"),removeTrapFocus(this.activeElement),document.body.classList.remove("overflow-hidden")}setSummaryAccessibility(e){e.setAttribute("role","button"),e.setAttribute("aria-expanded","false"),e.nextElementSibling.getAttribute("id")&&e.setAttribute("aria-controls",e.nextElementSibling.id),e.addEventListener("click",t=>{t.currentTarget.setAttribute("aria-expanded",!t.currentTarget.closest("details").hasAttribute("open"))}),e.parentElement.addEventListener("keyup",onKeyUpEscape)}renderContents(e){this.querySelector(".drawer__inner").classList.contains("is-empty")&&this.querySelector(".drawer__inner").classList.remove("is-empty"),this.productId=e.id,this.getSectionsToRender().forEach(t=>{const r=t.selector?document.querySelector(t.selector):document.getElementById(t.id);r.innerHTML=this.getSectionInnerHTML(e.sections[t.id],t.selector)}),setTimeout(()=>{this.querySelector("#CartDrawer-Overlay").addEventListener("click",this.close.bind(this)),this.open()})}getSectionInnerHTML(e,t=".shopify-section"){return new DOMParser().parseFromString(e,"text/html").querySelector(t).innerHTML}getSectionsToRender(){return[{id:"cart-drawer",selector:"#CartDrawer"},{id:"cart-icon-bubble"}]}getSectionDOM(e,t=".shopify-section"){return new DOMParser().parseFromString(e,"text/html").querySelector(t)}setActiveElement(e){this.activeElement=e}}customElements.define("cart-drawer",n);class c extends CartItems{getSectionsToRender(){return[{id:"CartDrawer",section:"cart-drawer",selector:".drawer__inner"},{id:"cart-icon-bubble",section:"cart-icon-bubble",selector:".shopify-section"}]}}customElements.define("cart-drawer-items",c);
