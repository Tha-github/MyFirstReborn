document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.querySelector('.product-grid');
    
    // Mock de produtos (substitua por dados reais ou API)
    const products = [
        {
            name: "Bebê Emma",
            price: "R$ 699,90",
            image: "images/bebe-emma.jpg"
        },
        {
            name: "Bebê Noah",
            price: "R$ 749,90",
            image: "images/bebe-noah.jpg"
        },
        {
            name: "Bebê Olivia",
            price: "R$ 659,90",
            image: "images/bebe-olivia.jpg"
        }
    ];

    // Renderiza os produtos
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="price">${product.price}</p>
            <button class="button">Adicionar ao Carrinho</button>
        `;
        productGrid.appendChild(productCard);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-grid') || document.querySelector('.product-grid');
    
    // Dados dos produtos (pode ser substituído por uma API)
    const products = [
        {
            id: 1,
            name: "Bebê Emma",
            price: "R$ 699,90",
            image: "images/bebe-emma.jpg",
            category: "meninas"
        },
        {
            id: 2,
            name: "Bebê Noah",
            price: "R$ 749,90",
            image: "images/bebe-noah.jpg",
            category: "meninos"
        },
        {
            id: 3,
            name: "Bebê Olivia",
            price: "R$ 659,90",
            image: "images/bebe-olivia.jpg",
            category: "meninas"
        },
        {
            id: 4,
            name: "Bebê Liam",
            price: "R$ 799,90",
            image: "images/bebe-liam.jpg",
            category: "meninos"
        }
    ];

    // Renderiza todos os produtos
    function renderProducts(productsToRender) {
        productGrid.innerHTML = '';
        productsToRender.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">${product.price}</p>
                <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
            `;
            productGrid.appendChild(productCard);
        });
    }

    // Filtros (opcional)
    if (document.querySelector('.filters')) {
        document.querySelectorAll('.filter-button').forEach(button => {
            button.addEventListener('click', () => {
                const category = button.dataset.category;
                const filteredProducts = category === 'all' 
                    ? products 
                    : products.filter(p => p.category === category);
                renderProducts(filteredProducts);
            });
        });
    }

    // Carrinho (simplificado)
    window.addToCart = (productId) => {
        alert(`Produto ${productId} adicionado ao carrinho!`);
        // Implemente lógica real com localStorage ou API
    };

    // Renderiza inicialmente
    renderProducts(products);
});

// Funções do Carrinho (com localStorage)
document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    // Carrega o carrinho do localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Renderiza os itens do carrinho
    function renderCartItems() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Seu carrinho está vazio.</p>';
            cartTotalElement.textContent = 'R$ 0,00';
            return;
        }

        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p class="price">${item.price}</p>
                </div>
                <div class="cart-item-quantity">
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <button onclick="removeItem(${index})" class="remove-btn">Remover</button>
            `;
            cartItemsContainer.appendChild(itemElement);

            // Calcula o total (remove "R$ " e substitui "," por ".")
            const price = parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
            total += price * item.quantity;
        });

        cartTotalElement.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }

    // Atualiza a quantidade de um item
    window.updateQuantity = (index, change) => {
        cart[index].quantity += change;
        
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }

        saveCart();
        renderCartItems();
    };

    // Remove um item do carrinho
    window.removeItem = (index) => {
        cart.splice(index, 1);
        saveCart();
        renderCartItems();
    };

    // Salva o carrinho no localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Botão de checkout (simulado)
    checkoutBtn.addEventListener('click', () => {
        alert('Compra finalizada! Obrigado por sua compra.');
        cart = [];
        saveCart();
        renderCartItems();
    });

    // Renderiza inicialmente
    renderCartItems();
});

// Função para adicionar ao carrinho (usada em products.html)
window.addToCart = (productId) => {
    const products = [
        // Mesma lista de produtos do products.html
        {
            id: 1,
            name: "Bebê Emma",
            price: "R$ 699,90",
            image: "images/bebe-emma.jpg",
            category: "meninas"
        },
        // ... outros produtos
    ];

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productToAdd = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...productToAdd, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productToAdd.name} foi adicionado ao carrinho!`);
};