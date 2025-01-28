const products = [
    {
        "id": 1,
        "name": "Laptop",
        "img": '<li><img src="img/laptop.png"/></li>',
        "description": "14 inches, 8GB RAM, 256GB SSD",
        "price": 299.99,
        "category": "Electronics",
        "in_stock": true

      },
      {
        "id": 2,
        "name": "Headphones",
        "img": '<li><img src="img/headphones.jpg"/></li>',
        "description": "Noise-cancelling wireless headphones",
        "price": 79.99,
        "category": "Accessories",
        "in_stock": true
      },
      {
        "id": 3,
        "name": "Desk Lamp",
        "img": '<li><img src="img/desklamp.jpg"/></li>',
        "description": "LED desk lamp with adjustable brightness",
        "price": 19.99,
        "category": "Home",
        "in_stock": false
      },
      {
        "id": 4,
        "name": "Smartphone",
        "img": '<li><img src="img/smartphone.jpg"/></li>',
        "description": "6.5 inch display, 128GB storage, dual camera",
        "price": 499.99,
        "category": "Electronics",
        "in_stock": true
      },
      {
        "id": 5,
        "name": "Gaming Mouse",
        "img": '<li><img src="img/gamingmouse.jpg"/></li>',
        "description": "Ergonomic gaming mouse with RGB lighting",
        "price": 39.99,
        "category": "Accessories",
        "in_stock": true
      },
      {
        "id": 6,
        "name": "Bluetooth Speaker",
        "img": '<li><img src="img/bluetoothspeaker.jpg"/></li>',
        "description": "Portable speaker with 12-hour battery life",
        "price": 59.99,
        "category": "Electronics",
        "in_stock": true
      },
      {
        "id": 7,
        "name": "Backpack",
        "img": '<li><img src="img/backpack.jpg"/></li>',
        "description": "Waterproof backpack with multiple compartments",
        "price": 49.99,
        "category": "Accessories",
        "in_stock": true
      },
      {
        "id": 8,
        "name": "Office Chair",
        "img": '<li><img src="img/officechair.jpg"/></li>',
        "description": "Ergonomic chair with lumbar support",
        "price": 129.99,
        "category": "Furniture",
        "in_stock": false
      },
      {
        "id": 9,
        "name": "Keyboard",
        "img": '<li><img src="img/keyboard.jpg"/></li>',
        "description": "Mechanical keyboard with customizable keys",
        "price": 69.99,
        "category": "Accessories",
        "in_stock": true
      },
      {
        "id": 10,
        "name": "Smartwatch",
        "img": '<li><img src="img/smartwatch.jpg"/></li>',
        "description": "Fitness tracking and notifications",
        "price": 199.99,
        "category": "Electronics",
        "in_stock": true
      },
      {
        "id": 11,
        "name": "Coffee Maker",
        "img": '<li><img src="img/coffeemaker.jpg"/></li>',
        "description": "Programmable coffee maker with timer",
        "price": 89.99,
        "category": "Home",
        "in_stock": false
      },
      {
        "id": 12,
        "name": "Yoga Mat",
        "img": '<li><img src="img/yogamat.jpg"/></li>',
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
        productDiv.innerHTML = `
            <div>
                
                ${item.name} 
                ${item.img}
                ${item.price}$
                <button onclick="addToCart(${item.id})">Kosárba</button>
            </div>
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
