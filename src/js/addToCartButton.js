import axios from "axios";
import iziToast from "izitoast";

class addToCartButton extends HTMLElement {
  constructor() {
    super();

    this.minus = this.querySelector(".minus");
    this.plus = this.querySelector(".plus");
    this.button = this.querySelector(".js-add-to-cart");
    this.price = this.querySelector(".price");

    this.quanity = document.querySelector(".quanity");
  }

  connectedCallback() {
    this.minus.addEventListener("click", this.decreaseQuanity.bind(this));
    this.plus.addEventListener("click", this.increaseQuanity.bind(this));
    this.button.addEventListener("click", this.addToCart.bind(this));
  }

  addToCart() {
    const spinnerIcon = this.querySelector(".lds-ring");
    const CartButton = document.querySelector(".js-add-to-cart");
    const buttonText = this.querySelector(".js-add-to-cart span");

    CartButton.style.pointerEvents = "none";
    spinnerIcon.style.display = "inline-block";
    buttonText.style.display = "none";

    const form = document.querySelector(".product-form");
    const itemID = form.getAttribute("data-id");

    const quanity = document.querySelector(".quanity").value;

    // Adding item to the cart
    axios
      .post(`${window.Shopify.routes.root}cart/add.js`, {
        id: +itemID,
        quantity: +quanity,
      })
      .then(() => {
        // fetching cart object to update the cart icon count
        axios.get(`${window.Shopify.routes.root}cart.js`).then((res) => {
          // updating cart icon
          const cartIconCount = document.querySelector(".cart-icon-count span");
          cartIconCount.innerHTML = res.data.item_count;

          iziToast.show({
            title: "Item Added to the cart!",
            color: "#abf7b1",
          });

          // disabling spinner
          spinnerIcon.style.display = "none";
          buttonText.style.display = "inline-block";
          CartButton.style.pointerEvents = "all";
        });
      });
  }

  increaseQuanity() {
    if (+this.quanity.value < 100) {
      this.quanity.value = +this.quanity.value + 1;
    }
  }

  decreaseQuanity() {
    if (+this.quanity.value > 0) {
      this.quanity.value = +this.quanity.value - 1;
    }
  }
}

customElements.define("add-to-cart-button", addToCartButton);
