import { deliveryOptions } from "./deliveryOption.js";

export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart =  [{
      productId: 'a01', 
      quantity: 2,
      deliveryOptionId: '1'
    },
    {
      productId:'a02', 
      quantity: 2,
      deliveryOptionId: '2'
    }
    ];

}


function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function addToCart(productId) {
  let matchingItem;
  cart.forEach((cartItem) => {
   if (productId === cartItem.productId ) {
      matchingItem = cartItem;
   }
  });


  const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
   const quantity = Number(quantitySelector.value);
  if (matchingItem) {
    matchingItem.quantity += quantity
  } else {
    cart.push({
      productId:productId, 
      quantity:quantity,
      deliveryOptionId: '1'
    });
  }
  saveToStorage()

 }


export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
  if (productId !== cartItem.productId) {
    newCart.push(cartItem);
  }

  })
  cart = newCart;

  saveToStorage()
 
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
   if (productId === cartItem.productId ) {
      matchingItem = cartItem;
   }
  });
    matchingItem.deliveryOptionId = deliveryOptionId;

 saveToStorage();
}

console.log(cart)