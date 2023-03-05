import Swiper, { Navigation, Pagination } from 'swiper';
import iziToast from 'iziToast';
import axios from 'axios';

class ProductCarousel extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const swiper = new Swiper('.mySwiper', {
      modules: [Navigation, Pagination],
      slidesPerView: 4,
      spaceBetween: 40,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}

customElements.define('product-carousel', ProductCarousel);

class AddToCart extends HTMLElement {
  constructor() {
    super();

    // selectors
    this.button = this.querySelector('button');
    this.buttonSpinner = this.querySelector('.lds-ring');
    this.buttonText = this.querySelector('button span');
    this.productID = this.closest('.carousel-item').dataset.product;

    // eventListeners
    this.button.addEventListener('click', this.addToCart.bind(this));
  }

  connectedCallback() {}

  addToCart() {
    this.button.style.pointerEvents = 'none';
    this.buttonSpinner.style.display = 'inline-block';
    this.buttonText.style.display = 'none';

    axios
      .post(`${window.Shopify.routes.root}cart/add.js`, {
        id: this.productID,
        quantity: 1,
      })
      .then((res) => {
        // fetching cart object to update the cart icon count
        axios.get(`${window.Shopify.routes.root}cart.js`).then((res) => {
          // updating cart icon
          const cartIconCount = document.querySelector('.cart-icon-count span');
          cartIconCount.innerHTML = res.data.item_count;

          iziToast.show({
            title: 'Item Added to the cart!',
            color: '#abf7b1',
          });

          // disabling spinner
          this.buttonSpinner.style.display = 'none';
          this.buttonText.style.display = 'inline-block';
          this.button.style.pointerEvents = 'all';
        });
      });
  }
}

customElements.define('add-to-cart', AddToCart);
