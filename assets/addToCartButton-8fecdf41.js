import{a as n,i}from"./iziToast-385631db.js";class u extends HTMLElement{constructor(){super(),console.log("running");const t=this.querySelector(".minus"),e=this.querySelector(".plus"),o=this.querySelector(".js-add-to-cart");this.querySelector(".price"),t.addEventListener("click",this.decreaseQuanity),e.addEventListener("click",this.increaseQuanity),o.addEventListener("click",this.addToCart),console.log(t)}addToCart(){const t=this.querySelector(".lds-ring"),e=document.querySelector(".js-add-to-cart"),o=this.querySelector(".js-add-to-cart span");console.log(e),e.style.pointerEvents="none",t.style.display="inline-block",o.style.display="none";const s=document.querySelector(".product-form").getAttribute("data-id"),r=document.querySelector(".quanity").value;n.post(window.Shopify.routes.root+"cart/add.js",{id:+s,quantity:+r}).then(y=>{n.get(window.Shopify.routes.root+"cart.js").then(c=>{const a=document.querySelector(".cart-icon-count span");a.innerHTML=c.data.item_count,i.show({title:"Item Added to the cart!",color:"#abf7b1"}),t.style.display="none",o.style.display="inline-block",e.style.pointerEvents="all"})})}increaseQuanity(){const t=document.querySelector(".quanity");+t.value<100&&(t.value=+t.value+1)}decreaseQuanity(){const t=document.querySelector(".quanity");+t.value>0&&(t.value=+t.value-1)}}customElements.define("add-to-cart-button",u);