console.log("Добро пожаловать в магазин Shtyrman390!");

let cart = [];
let totalPrice = 0;

// Загрузка корзины из localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    const savedTotalPrice = localStorage.getItem('totalPrice');
    if (savedCart) cart = JSON.parse(savedCart);
    if (savedTotalPrice) totalPrice = parseFloat(savedTotalPrice);
    updateCartUI();
}

// Сохранение корзины в localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('totalPrice', totalPrice);
}

// Добавление товара в корзину
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1; // Увеличиваем количество, если товар уже есть
    } else {
        cart.push({ name, price, quantity: 1 }); // Добавляем новый товар
    }
    totalPrice += price;
    updateCartUI();
    alert(`${name} добавлен в корзину!`);
}

// Обновление интерфейса корзины
function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0); // Общее количество товаров
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

// Удаление товара из корзины
function removeFromCart(index) {
    const item = cart[index];
    totalPrice -= item.price * item.quantity; // Уменьшаем сумму на цену удаляемого товара
    cart.splice(index, 1); // Удаляем товар из массива
    updateCartUI();
}

// Оформление заказа
function checkout() {
    if (cart.length === 0) {
        alert('Корзина пуста!');
    } else {
        alert(`Спасибо за заказ! Итоговая сумма: ${totalPrice.toFixed(2)} грн.`);
        cart = [];
        totalPrice = 0;
        updateCartUI();
    }
}

// Инициализация корзины при загрузке страницы
loadCart();
