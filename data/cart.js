export const cart = [{
  productId: 'a01', 
  quantity: 2
},
{
  productId:'a02', 
  quantity:1
}
];

export function addToCart(productId) {
  let matchingItem;
  cart.forEach((cartItem) => {
   if (productId === cartItem.productId ) {
      matchingItem = cartItem;
   }
  });
  if (matchingItem) {
    matchingItem.quantity += 1
  } else {
    cart.push({
      productId:productId, 
      quantity:1
    });
  }
 }