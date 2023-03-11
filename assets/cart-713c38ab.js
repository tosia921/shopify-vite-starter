var p=Object.defineProperty;var f=(i,r,e)=>r in i?p(i,r,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[r]=e;var y=(i,r,e)=>(f(i,typeof r!="symbol"?r+"":r,e),e);class S extends HTMLElement{constructor(){super(),this.addEventListener("click",r=>{r.preventDefault(),(this.closest("cart-items")||this.closest("cart-drawer-items")).updateQuantity(this.dataset.index,0)})}}customElements.define("cart-remove-button",S);class b extends HTMLElement{constructor(){super();y(this,"cartUpdateUnsubscriber");this.lineItemStatusElement=document.getElementById("shopping-cart-line-item-status")||document.getElementById("CartDrawer-LineItemStatus");const e=debounce(s=>{this.onChange(s)},ON_CHANGE_DEBOUNCE_TIMER);this.addEventListener("change",e.bind(this))}connectedCallback(){this.cartUpdateUnsubscriber=subscribe(PUB_SUB_EVENTS.cartUpdate,e=>{e.source!=="cart-items"&&this.onCartUpdate()})}disconnectedCallback(){this.cartUpdateUnsubscriber&&this.cartUpdateUnsubscriber()}onChange(e){this.updateQuantity(e.target.dataset.index,e.target.value,document.activeElement.getAttribute("name"))}onCartUpdate(){fetch(`${routes.cart_url}?section_id=main-cart-items`).then(e=>e.text()).then(e=>{const n=new DOMParser().parseFromString(e,"text/html").querySelector("cart-items");this.innerHTML=n.innerHTML}).catch(e=>{console.error(e)})}getSectionsToRender(){return[{id:"main-cart-items",section:document.getElementById("main-cart-items").dataset.id,selector:".js-contents"},{id:"cart-icon-bubble",section:"cart-icon-bubble",selector:".shopify-section"},{id:"cart-live-region-text",section:"cart-live-region-text",selector:".shopify-section"},{id:"main-cart-footer",section:document.getElementById("main-cart-footer").dataset.id,selector:".js-contents"}]}updateQuantity(e,s,n){this.enableLoading(e);const o=JSON.stringify({line:e,quantity:s,sections:this.getSectionsToRender().map(t=>t.section),sections_url:window.location.pathname});fetch(`${routes.cart_change_url}`,{...fetchConfig(),body:o}).then(t=>t.text()).then(t=>{const a=JSON.parse(t),l=document.getElementById(`Quantity-${e}`)||document.getElementById(`Drawer-quantity-${e}`),E=document.querySelectorAll(".cart-item");if(a.errors){l.value=l.getAttribute("value"),this.updateLiveRegions(e,a.errors);return}this.classList.toggle("is-empty",a.item_count===0);const c=document.querySelector("cart-drawer"),h=document.getElementById("main-cart-footer");h&&h.classList.toggle("is-empty",a.item_count===0),c&&c.classList.toggle("is-empty",a.item_count===0),this.getSectionsToRender().forEach(d=>{const I=document.getElementById(d.id).querySelector(d.selector)||document.getElementById(d.id);I.innerHTML=this.getSectionInnerHTML(a.sections[d.section],d.selector)});const u=a.items[e-1]?a.items[e-1].quantity:void 0;let g="";E.length===a.items.length&&u!==parseInt(l.value)&&(typeof u>"u"?g=window.cartStrings.error:g=window.cartStrings.quantityError.replace("[quantity]",u)),this.updateLiveRegions(e,g);const m=document.getElementById(`CartItem-${e}`)||document.getElementById(`CartDrawer-Item-${e}`);m&&m.querySelector(`[name="${n}"]`)?c?trapFocus(c,m.querySelector(`[name="${n}"]`)):m.querySelector(`[name="${n}"]`).focus():a.item_count===0&&c?trapFocus(c.querySelector(".drawer__inner-empty"),c.querySelector("a")):document.querySelector(".cart-item")&&c&&trapFocus(c,document.querySelector(".cart-item__name")),publish(PUB_SUB_EVENTS.cartUpdate,{source:"cart-items"})}).catch(()=>{this.querySelectorAll(".loading-overlay").forEach(a=>a.classList.add("hidden"));const t=document.getElementById("cart-errors")||document.getElementById("CartDrawer-CartErrors");t.textContent=window.cartStrings.error}).finally(()=>{this.disableLoading(e)})}updateLiveRegions(e,s){const n=document.getElementById(`Line-item-error-${e}`)||document.getElementById(`CartDrawer-LineItemError-${e}`);n&&(n.querySelector(".cart-item__error-text").innerHTML=s),this.lineItemStatusElement.setAttribute("aria-hidden",!0);const o=document.getElementById("cart-live-region-text")||document.getElementById("CartDrawer-LiveRegionText");o.setAttribute("aria-hidden",!1),setTimeout(()=>{o.setAttribute("aria-hidden",!0)},1e3)}getSectionInnerHTML(e,s){return new DOMParser().parseFromString(e,"text/html").querySelector(s).innerHTML}enableLoading(e){(document.getElementById("main-cart-items")||document.getElementById("CartDrawer-CartItems")).classList.add("cart__items--disabled");const n=this.querySelectorAll(`#CartItem-${e} .loading-overlay`),o=this.querySelectorAll(`#CartDrawer-Item-${e} .loading-overlay`);[...n,...o].forEach(t=>t.classList.remove("hidden")),document.activeElement.blur(),this.lineItemStatusElement.setAttribute("aria-hidden",!1)}disableLoading(e){(document.getElementById("main-cart-items")||document.getElementById("CartDrawer-CartItems")).classList.remove("cart__items--disabled");const n=this.querySelectorAll(`#CartItem-${e} .loading-overlay`),o=this.querySelectorAll(`#CartDrawer-Item-${e} .loading-overlay`);n.forEach(t=>t.classList.add("hidden")),o.forEach(t=>t.classList.add("hidden"))}}customElements.define("cart-items",b);customElements.get("cart-note")||customElements.define("cart-note",class extends HTMLElement{constructor(){super(),this.addEventListener("change",debounce(r=>{const e=JSON.stringify({note:r.target.value});fetch(`${routes.cart_update_url}`,{...fetchConfig(),body:e})},ON_CHANGE_DEBOUNCE_TIMER))}});
