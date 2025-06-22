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

// Esta é apenas uma simulação - você substituirá pela lógica real do carrinho
document.addEventListener('DOMContentLoaded', function() {
    // Simular itens no carrinho (remova na implementação real)
    setTimeout(() => {
      document.querySelector('.cart-count').textContent = '1';
    }, 1500);
  });