let cart = [];
let total = 0;

// Add item to cart
function addToCart(item, price) {
  cart.push({ item, price });
  updateCart();
}

// Update cart display
function updateCart() {
  const cartItems = document.getElementById('cartItems');
  const totalPrice = document.getElementById('totalPrice');
  cartItems.innerHTML = '';
  total = 0;

  cart.forEach((product, index) => {
    const li = document.createElement('li');
    li.textContent = `${product.item} - $${product.price}`;
    cartItems.appendChild(li);
    total += product.price;
  });

  totalPrice.textContent = total;
}

// Proceed to checkout
function checkout() {
  document.getElementById('checkout').style.display = 'block';
  document.getElementById('checkoutTotal').textContent = total;
}

// Complete the order (Placeholder)
function completeOrder() {
  alert('Order completed. Thank you for your purchase!');
  cart = [];
  updateCart();
  document.getElementById('checkout').style.display = 'none';
}
