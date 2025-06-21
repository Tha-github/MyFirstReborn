// Dados dos produtos
const products = [
    { id: 1, name: "Bebê Emma", price: "R$ 699,90", image: "images/bebe-emma.jpg", category: "meninas" },
    { id: 2, name: "Bebê Noah", price: "R$ 749,90", image: "images/bebe-noah.jpg", category: "meninos" },
    { id: 3, name: "Bebê Olivia", price: "R$ 659,90", image: "images/bebe-olivia.jpg", category: "meninas" }
];

// Sistema de Navegação SPA
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Ativa botão clicado
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Mostra seção correspondente
        const sectionId = btn.dataset.section;
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active-section'));
        document.getElementById(sectionId).classList.add('active-section');
        
        // Atualiza dinamicamente se necessário
        if (sectionId === 'products') renderProducts(products);
        if (sectionId === 'cart') renderCartItems();
    });
});

// Renderização de Produtos (igual ao anterior)
function renderProducts(productsToRender) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = '';
    productsToRender.forEach(product => {
        grid.innerHTML += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">${product.price}</p>
                <button onclick="addToCart(${product.id})">Adicionar</button>
            </div>
        `;
    });
}

// Sistema de Carrinho (com localStorage)
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCartItems() {
    const container = document.getElementById('cart-items');
    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-cart">Seu carrinho está vazio.</p>';
        document.getElementById('cart-total').textContent = 'R$ 0,00';
        return;
    }

    container.innerHTML = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        const price = parseFloat(item.price.replace('R$ ', '').replace(',', '.'));
        total += price * item.quantity;
        
        container.innerHTML += `
            <div class="cart-item">
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
                <button onclick="removeItem(${index})">Remover</button>
            </div>
        `;
    });

    document.getElementById('cart-total').textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

// Funções globais para o carrinho
window.addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
    alert(`${product.name} adicionado ao carrinho!`);
};

window.updateQuantity = (index, change) => {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
};

window.removeItem = (index) => {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartItems();
};

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    document.getElementById('checkout-btn').addEventListener('click', () => {
        alert('Compra finalizada! Obrigado.');
        cart = [];
        localStorage.removeItem('cart');
        renderCartItems();
    });
});