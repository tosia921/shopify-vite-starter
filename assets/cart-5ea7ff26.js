import{a as y,i as p}from"./iziToast-385631db.js";import{f as u}from"./formatMoney-7b8119d5.js";class S extends HTMLElement{constructor(){super(),this.querySelectorAll(".remove").forEach(n=>{n.addEventListener("click",this.removeItem)}),this.querySelectorAll(".quanity").forEach(n=>{n.addEventListener("click",()=>{console.log("clicked"),this.updateQuanity(n)})})}updateCartIconQuanity(o){}removeItem(){const o=this.querySelector(".lds-ring"),n=document.querySelector(".remove"),r=this.querySelector(".remove span");n.style.pointerEvents="none",o.style.display="inline-block",r.style.display="none";const a=this.closest(".item"),i=a.getAttribute("data-itemid");y.post("cart/change.js",{id:i,quantity:0}).then(e=>{if(e.data.items.length===0){console.log(e.data),document.querySelector(".cart-content").remove();const c=document.createElement("div");c.innerHTML='<div class="cart__empty"><h3>Your Cart is empty</h3></div>',document.querySelector(".cart").appendChild(c);const t=document.querySelector(".cart-icon-count span");t.innerHTML=e.data.item_count,p.show({title:"Item removed from the cart",color:"#ff6863"})}else{console.log(e.data);const c=document.querySelector("[data-money-format]").getAttribute(["data-money-format"]),t=u(e.data.total_price,c);document.querySelector(".total_price").textContent=t,a.remove();const s=document.querySelector(".cart-icon-count span");s.innerHTML=e.data.item_count,p.show({title:"Item removed from the cart",color:"#ff6863"})}})}updateQuanity(o){const r=o.closest(".item__quanity-selector").querySelector(".item_count_input"),a=Number(r.value),i=o.classList.contains("plus"),e=o.closest(".item").getAttribute("data-itemid");console.log(e);function c(t,s){y.post("/cart/change.js",{id:t,quantity:s}).then(l=>{const m=document.querySelector("[data-money-format]").getAttribute(["data-money-format"]),f=u(l.data.total_price,m),h=l.data.items.find(q=>q.key===t),d=u(h.final_line_price,m);console.log(d),document.querySelector(".total_price").textContent=f,document.querySelector(`[data-itemid="${t}"] .item_price`).textContent=d;const v=document.querySelector(".cart-icon-count span");v.innerHTML=l.data.item_count})}if(i){const t=a+1;r.value=t,c(e,t)}else if(a>1){const t=a-1;r.value=t,c(e,t)}}}customElements.define("cart-page",S);
