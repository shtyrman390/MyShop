let cart = [];

function addToCart(product, price) {
    cart.push({ product, price });
    alert(`${product} добавлен в корзину!`);
}
