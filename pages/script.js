// Корзина
let cart = [];
let totalPrice = 0;

// Добавление товара в корзину
function addToCart(name, price) {
    cart.push({ name, price });
    totalPrice += price;
    updateCartUI();
    alert(`${name} добавлен в корзину!`);
}

// Обновление UI корзины
function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const cartCount = document.getElementById('cart-count');

    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price} грн.`;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Удалить';
        removeBtn.onclick = () => removeFromCart(index);
        li.appendChild(removeBtn);
        cartItems.appendChild(li);
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
    cartCount.textContent = cart.length;
}

// Удаление из корзины
function removeFromCart(index) {
    totalPrice -= cart[index].price;
    cart.splice(index, 1);
    updateCartUI();
}

// Оформление заказа
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

// Поиск
function searchProducts() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        const name = product.querySelector('h3').textContent.toLowerCase();
        if (name.includes(query)) {
            product.style.display = '';
        } else {
            product.style.display = 'none';
        }
    });
}
