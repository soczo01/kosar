const products = [
    {
        "id": 1,
        "name": "Laptop",
        "img": 'img/laptop.png',
        "description": "14 inches, 8GB RAM, 256GB SSD",
        "price": 299.99,
        "category": "Electronics",
        "in_stock": true
    },
    {
        "id": 2,
        "name": "Headphones",
        "img": 'img/headphones.jpg',
        "description": "Noise-cancelling wireless headphones",
        "price": 79.99,
        "category": "Accessories",
        "in_stock": true
    },
    {
        "id": 3,
        "name": "Desk Lamp",
        "img": 'img/desklamp.jpg',
        "description": "LED desk lamp with adjustable brightness",
        "price": 19.99,
        "category": "Home",
        "in_stock": false
    },
    {
        "id": 4,
        "name": "Smartphone",
        "img": 'img/smartphone.jpg',
        "description": "6.5 inch display, 128GB storage, dual camera",
        "price": 499.99,
        "category": "Electronics",
        "in_stock": true
    },
    {
        "id": 5,
        "name": "Gaming Mouse",
        "img": 'img/gamingmouse.jpg',
        "description": "Ergonomic gaming mouse with RGB lighting",
        "price": 39.99,
        "category": "Accessories",
        "in_stock": true
    },
    {
        "id": 6,
        "name": "Bluetooth Speaker",
        "img": 'img/bluetoothspeaker.jpg',
        "description": "Portable speaker with 12-hour battery life",
        "price": 59.99,
        "category": "Electronics",
        "in_stock": true
    },
    {
        "id": 7,
        "name": "Backpack",
        "img": 'img/backpack.jpg',
        "description": "Waterproof backpack with multiple compartments",
        "price": 49.99,
        "category": "Accessories",
        "in_stock": true
    },
    {
        "id": 8,
        "name": "Office Chair",
        "img": 'img/officechair.jpg',
        "description": "Ergonomic chair with lumbar support",
        "price": 129.99,
        "category": "Furniture",
        "in_stock": false
    },
    {
        "id": 9,
        "name": "Keyboard",
        "img": 'img/keyboard.jpg',
        "description": "Mechanical keyboard with customizable keys",
        "price": 69.99,
        "category": "Accessories",
        "in_stock": true
    },
    {
        "id": 10,
        "name": "Smartwatch",
        "img": 'img/smartwatch.jpg',
        "description": "Fitness tracking and notifications",
        "price": 199.99,
        "category": "Electronics",
        "in_stock": true
    },
    {
        "id": 11,
        "name": "Coffee Maker",
        "img": 'img/coffeemaker.jpg',
        "description": "Programmable coffee maker with timer",
        "price": 89.99,
        "category": "Home",
        "in_stock": false
    },
    {
        "id": 12,
        "name": "Yoga Mat",
        "img": 'img/yogamat.jpg',
        "description": "Non-slip yoga mat for fitness exercises",
        "price": 29.99,
        "category": "Fitness",
        "in_stock": true
    }
];

class Cart {
    constructor() {
        this.items = [];
    }

    viewCart() {
        const kosarList = document.getElementById('kosarList');
        kosarList.innerHTML = '';
        this.items.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${item.product.name} x${item.quantity} - ${item.product.price * item.quantity} Ft
                <button onclick="incrementItem(${item.product.id})">+</button>
                <button onclick="decrementItem(${item.product.id})">-</button>
                <button onclick="removeItem(${item.product.id})">Töröl</button>
            `;
            kosarList.appendChild(li);
        });
        this.updateTotal();
    }

    addProduct(productId, quantity = 1) {
        const product = products.find(p => p.id === productId);
        const existingItem = this.items.find(item => item.product.id === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({product, quantity});
        }
        this.viewCart();
    }

    incrementProduct(productId) {
        const existingItem = this.items.find(item => item.product.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        }
        this.viewCart();
    }

    decrementProduct(productId) {
        const existingItem = this.items.find(item => item.product.id === productId);
        if (existingItem && existingItem.quantity > 1) {
            existingItem.quantity--;
        } else {
            this.removeProduct(productId);
        }
        this.viewCart();
    }

    removeProduct(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.viewCart();
    }

    updateTotal() {
        const totalPrice = this.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
        document.getElementById('totalPrice').textContent = totalPrice;
    }

    clearCart() {
        this.items = [];
        this.viewCart();
    }
}

const myCart = new Cart();

function renderProducts() {
    const termekekDiv = document.getElementById('termekek');
    termekekDiv.innerHTML = '';

    products.forEach(item => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${item.img}" alt="${item.name}"/>
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p>${item.price} Ft</p>
            <button onclick="addToCart(${item.id})">Kosárba</button>
        `;
        termekekDiv.appendChild(productDiv);
    });
}

function addToCart(productId) {
    myCart.addProduct(productId);
}

function incrementItem(productId) {
    myCart.incrementProduct(productId);
}

function decrementItem(productId) {
    myCart.decrementProduct(productId);
}

function removeItem(productId) {
    myCart.removeProduct(productId);
}

renderProducts();