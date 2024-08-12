class Product {
    constructor(name, price, stock, image) {
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.image = image; 
    }
}

const products = [
    new Product('Cerveza', 2000, 20, 'https://ardiaprod.vtexassets.com/arquivos/ids/282214/Cerveza-Warsteiner-473-Ml-_1.jpg?v=638326237924330000'),
    new Product('Papas Fritas', 3500, 15, 'https://statics.dinoonline.com.ar/imagenes/large_460x460/2550734_l.jpg'),
    new Product('Vino Malbec', 5000, 10, 'https://vinologos.com/wp-content/uploads/2021/08/Luigi-bosca-Malbec.webp'),
    new Product('Agua Mineral', 1500, 50, 'https://http2.mlstatic.com/D_NQ_NP_874021-MLU72637585307_112023-O.webp'),
    new Product('Leche para Bebes', 25000, 25, 'https://cdn.batitienda.com/baticloud/images/product_picture_bf6b11c4fe484beb9a378491c6ec51e4_638337635497399094_0_m.webp'),
];

let cart = [];

function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach((product, index) => {
        const productElement = document.createElement('div');
        productElement.className = 'col-md-4 mb-4';
        productElement.innerHTML = `
            <div class="card">
                <img src="${product.image}" class="card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">Precio: $${product.price}</p>
                    <p class="card-text">Stock: ${product.stock}</p>
                    <button class="btn btn-primary" onclick="addToCart(${index})">Agregar al carrito</button>
                </div>
            </div>
        `;
        productList.appendChild(productElement);
    });
}

function addToCart(productIndex) {
    const product = products[productIndex];
    if (product.stock > 0) {
        cart.push(product);
        product.stock--;
        updateCart();
        displayProducts();
    } else {
        displayMessage('No hay stock disponible para este producto.', 'error');
    }
}

function updateCart() {
    const cartElement = document.getElementById('cart');
    const totalPriceElement = document.getElementById('total-price');
    cartElement.innerHTML = '';
    let totalPrice = 0;

    cart.forEach((product, index) => {
        const cartItem = document.createElement('li');
        cartItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        cartItem.innerHTML = `
            ${product.name} - $${product.price}
            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Eliminar</button>
        `;
        cartElement.appendChild(cartItem);
        totalPrice += product.price;
    });

    totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}

function removeFromCart(productIndex) {
    cart.splice(productIndex, 1);
    updateCart();
}

function displayMessage(message, type) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.className = type;
    setTimeout(() => {
        messageElement.textContent = '';
    }, 5000);
}

function validatePhoneNumber(phone) {
    return /^[0-9]+$/.test(phone);
}

function handleCheckout(event) {
    event.preventDefault();
    if (cart.length === 0) {
        displayMessage('No hay productos en el carrito. Agrega productos antes de confirmar la compra.', 'error');
        return;
    }

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    if (!validatePhoneNumber(phone)) {
        displayMessage('El campo de teléfono solo puede contener números.', 'error');
        return;
    }

    const order = {
        name,
        email,
        phone,
        cart
    };

    localStorage.setItem('order', JSON.stringify(order));

    cart = [];
    updateCart();
    displayProducts();

    displayMessage('Compra confirmada. Los datos se han guardado en el almacenamiento local.', 'success');
}

document.getElementById('checkout-form').addEventListener('submit', handleCheckout);

displayProducts();



