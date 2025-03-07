import { cart, removeFromCart, updateDeliveryOption } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "../util/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"
import { deliveryOptions } from "../data/deliveryOption.js";


 function renderOrderSummaryHTML() {
 let cartSummaryHTML = '';
 cart.forEach((cartItem) => {
 const productId = cartItem.productId
   let matchingProduct;
  products.forEach((product) => {
   if (product.id === productId) {
     matchingProduct = product
   }
  
  })
  console.log(matchingProduct);

  const deliveryOptionId = cartItem.deliveryOptionId;
  let deliveryOption;
  deliveryOptions.forEach((option) =>{
  if(option.id === deliveryOptionId) {
    deliveryOption = option;
  }
  });
  
  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');

  const dateString = deliveryDate.format('dddd, MMMM, D');

  cartSummaryHTML += `
  <div class="cart-item-container 
  js-cart-item-container-${matchingProduct.id}">
  <div class="delivery-date">
    Delivery date: ${dateString}
  </div>

  <div class="cart-item-details-grid">
    <img class="product-image"
      src="${matchingProduct.image}">

    <div class="cart-item-details">
      <div class="product-name">
       ${matchingProduct.name}
      </div>
      <div class="product-price">
       $${formatCurrency(matchingProduct.priceCents)}
      </div>
      <div class="product-quantity">
        <span>
          Quantity: <span class="quantity-label">${cartItem.quantity}</span>
        </span>
        <span class="update-quantity-link link-primary">
          Update
        </span>
        <span class="delete-quantity-link link-primary js-delete-link" 
        data-product-id='${matchingProduct.id}'>
          Delete
        </span>
      </div>
    </div>

    <div class="delivery-options js-delivery-option">
      ${deliveryOptionsHTML(matchingProduct, cartItem)}
    </div>
  </div>
</div>
  `;
 });

 function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = '';
  deliveryOptions.forEach((deliveryOption) =>{

    const today = dayjs();
    const deliveryDate = today.add
    (deliveryOption.deliveryDays, 'days');

   const dateString = deliveryDate.format('dddd, MMMM, D')

   const priceString = deliveryOption.priceCents 
   === 0
    ? 'free'
    : `$${formatCurrency(deliveryOption.priceCents)} -`;
  
   const isChecked = deliveryOption.id === 
      cartItem.deliveryOptionId;


  html += `
  <div class="delivery-option js-delivery-option"
  data-product-id="${matchingProduct.id}"
  data-delivery-option-id="${deliveryOption.id}">
  <input type="radio"
    ${isChecked ? 'checked' : ''}
    class="delivery-option-input"
    name="delivery-option-${matchingProduct.id}">
  <div>
    <div class="delivery-option-date">
     ${dateString}
    </div>
    <div class="delivery-option-price">
     ${priceString} Shipping
    </div>
  </div>
</div>
  `;
  })

  return html;
 
 }

 document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;
//  console.log(cartSummaryHTML)

document.querySelectorAll('.js-delete-link').
forEach((link) => {
link.addEventListener('click', () => {
  // console.log('delete link');
  const productId = link.dataset.productId
  
  removeFromCart(productId);

  const container = document.querySelector
  (`.js-cart-item-container-${productId}`);
  container.remove()
  console.log(cart)
})
})
// document.querySelector('.js-item-quantity').
// innerHTML = cartQuantity


document.querySelectorAll('.js-delivery-option').forEach((element)=>{
 element.addEventListener('click', () => {
  const {productId, deliveryOptionId} = element.dataset;
  updateDeliveryOption(productId, deliveryOptionId);
  renderOrderSummaryHTML();
  console.log('option');
 })
})
 }

 renderOrderSummaryHTML();