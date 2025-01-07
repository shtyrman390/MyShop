// Initialize cart and total price
let cart = [];
let totalPrice = 0;

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    const savedTotalPrice = localStorage.getItem('totalPrice');
    if (savedCart) cart = JSON.parse(savedCart);
    if (savedTotalPrice) totalPrice = parseFloat(savedTotalPrice);
    updateCartUI();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('totalPrice', totalPrice);
}

// Add product to cart
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    totalPrice += price;
    updateCartUI();
    alert(`${name} добавлен в корзину!`);
}

// Update cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    cartCount.textContent = cart.length;
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price} грн. x ${item.quantity}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Удалить';
        removeButton.onclick = () => removeFromCart(index);
        li.appendChild(removeButton);
        cartItems.appendChild(li);
    });
    totalPriceElement.textContent = totalPrice.toFixed(2);
    saveCart();
}

// Remove product from cart
function removeFromCart(index) {
    const item = cart[index];
    totalPrice -= item.price * item.quantity;
    cart.splice(index, 1);
    updateCartUI();
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Корзина пуста!');
    } else {
        alert('Спасибо за заказ!');
        cart = [];
        totalPrice = 0;
        updateCartUI();
    }
}

// Initialize the cart when the page loads
loadCart();

