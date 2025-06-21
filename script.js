// Dados dos produtos (simulando um banco de dados)
const products = [
  {
      id: 1,
      name: 'Newborn Baby Girl',
      description: '22" lifelike reborn doll with full body silicone',
      price: 249.99,
      image: 'images/doll1.jpg'
  },
  {
      id: 2,
      name: 'Sleeping Baby Boy',
      description: '18" sleeping reborn doll with magnetic pacifier',
      price: 199.99,
      image: 'images/doll2.jpg'
  },
  {
      id: 3,
      name: 'Twin Babies Set',
      description: 'Pair of 16" reborn twins with interchangeable outfits',
      price: 399.99,
      image: 'images/doll3.jpg'
  },
  {
      id: 4,
      name: 'Premature Baby',
      description: 'Ultra-realistic 14" preemie doll with hospital details',
      price: 179.99,
      image: 'images/doll4.jpg'
  }
];

// Carrinho de compras
let cart = [];

// Função para renderizar produtos
function renderProducts() {
  const productGrid = document.getElementById('product-grid');
  if (productGrid) {
      productGrid.innerHTML = products.map(product => `
          <div class="product-card">
              <img src="${product.image}" alt="${product.name}">
              <h3>${product.name}</h3>
              <p>${product.description}</p>
              <p class="price">$${product.price.toFixed(2)}</p>
              <button class="button" onclick="addToCart(${product.id})">Add to Cart</button>
          </div>
      `).join('');
  }

  // Renderizar produtos em destaque na home
  const featuredGrid = document.querySelector('.featured .product-grid');
  if (featuredGrid) {
      featuredGrid.innerHTML = products.slice(0, 2).map(product => `
          <div class="product-card">
              <img src="${product.image}" alt="${product.name}">
              <h3>${product.name}</h3>
              <p>${product.description}</p>
              <p class="price">$${product.price.toFixed(2)}</p>
              <button class="button" onclick="addToCart(${product.id})">Add to Cart</button>
          </div>
      `).join('');
  }
}

// Função para adicionar ao carrinho
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
      const existingItem = cart.find(item => item.id === productId);
      if (existingItem) {
          existingItem.quantity += 1;
      } else {
          cart.push({ ...product, quantity: 1 });
      }
      updateCart();
      alert(`${product.name} added to cart!`);
  }
}

// Função para atualizar o carrinho
function updateCart() {
  const cartItems = document.getElementById('cart-items');
  if (cartItems) {
      if (cart.length === 0) {
          cartItems.innerHTML = '<p>Your cart is empty</p>';
      } else {
          cartItems.innerHTML = cart.map(item => `
              <div class="cart-item">
                  <div>
                      <h3>${item.name}</h3>
                      <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                  </div>
                  <div>
                      <button onclick="removeFromCart(${item.id})">Remove</button>
                  </div>
              </div>
          `).join('');
      }
  }

  // Atualizar total
  const cartTotal = document.getElementById('cart-total');
  if (cartTotal) {
      const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      cartTotal.textContent = `$${total.toFixed(2)}`;
  }

  // Salvar no localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Função para remover do carrinho
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  updateCart();
}

// Carregar carrinho do localStorage ao iniciar
function loadCart() {
  const savedCart = localStorage.getItem('cart');
  if (savedCart) {
      cart = JSON.parse(savedCart);
      updateCart();
  }
}

// Evento de checkout
document.getElementById('checkout-btn')?.addEventListener('click', () => {
  if (cart.length > 0) {
      alert('Checkout functionality would be implemented here!');
      // Em uma aplicação real, redirecionaria para a página de pagamento
  } else {
      alert('Your cart is empty!');
  }
});

// Inicializar a página
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  loadCart();
});