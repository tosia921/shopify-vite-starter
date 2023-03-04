import axios from 'axios';
import iziToast from 'iziToast';


class addToCartButton extends HTMLElement {
  constructor() {
    super();
    console.log('running');
    const minus = this.querySelector('.minus');
    const plus = this.querySelector('.plus');

    const button = this.querySelector('.js-add-to-cart');
    const price = this.querySelector('.price');

    minus.addEventListener('click', this.decreaseQuanity);
    plus.addEventListener('click', this.increaseQuanity);
    button.addEventListener('click', this.addToCart);

    console.log(minus);
  }

  addToCart() {

    const spinnerIcon = this.querySelector('.lds-ring')
    const addToCartButton = document.querySelector('.js-add-to-cart');
    const buttonText = this.querySelector('.js-add-to-cart span')
    console.log(addToCartButton)
    addToCartButton.style.pointerEvents = "none";
    spinnerIcon.style.display = "inline-block"
    buttonText.style.display = "none"

    const form = document.querySelector('.product-form');
    const itemID = form.getAttribute('data-id');

    const quanity = document.querySelector('.quanity').value;

    // Adding item to the cart
    axios
      .post(window.Shopify.routes.root + 'cart/add.js', {
        id: +itemID,
        quantity: +quanity,
      })
      .then((res) => {
        // fetching cart object to update the cart icon count
        axios.get(window.Shopify.routes.root + 'cart.js').then((res) => {

          //updating cart icon
          const cartIconCount = document.querySelector('.cart-icon-count span');
          cartIconCount.innerHTML = res.data.item_count;

          iziToast.show({
            title: 'Item Added to the cart!',
            color: '#abf7b1'
        });

          // disabling spinner
          spinnerIcon.style.display = "none"
          buttonText.style.display = "inline-block"
          addToCartButton.style.pointerEvents = "all";
        });
      });
  }

  increaseQuanity() {
    const quanity = document.querySelector('.quanity');

    if (+quanity.value < 100) {
      quanity.value = +quanity.value + 1;
    }
  }
  decreaseQuanity() {
    const quanity = document.querySelector('.quanity');

    if (+quanity.value > 0) {
      quanity.value = +quanity.value - 1;
    }
  }
}

customElements.define('add-to-cart-button', addToCartButton);
