const fs = require('fs');

const file = 'd:/Мої сайти/D&Dflovers_n_cofee-site/assets/js/products.js';
let js = fs.readFileSync(file, 'utf8');

// Replace card click event
const oldCardClick = `  // Click on card → navigate to product page (excluding wishlist and cart buttons)
  card.addEventListener('click', function(e) {
    if (e.target.closest('.product-wishlist') || e.target.closest('.btn-cart')) return;
    window.location.href = '/product/' + product.slug;
  });`;

const newCardClick = `  // Click on card → open product modal
  card.addEventListener('click', function(e) {
    if (e.target.closest('.product-wishlist') || e.target.closest('.btn-cart')) return;
    if (typeof window.openProductModal === 'function') {
      window.openProductModal(product.id);
    }
  });`;

js = js.replace(oldCardClick, newCardClick);

// Replace Add to cart event
const oldCartClick = `  // Add to cart
  const cartBtn = card.querySelector('.btn-cart');
  cartBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    // TODO: підключити логіку кошика
    this.textContent = '✓ Додано';
    this.style.background = 'var(--accent)';
    this.style.color = '#ffffff';
    setTimeout(() => {
      this.innerHTML = cartSVG + ' В кошик';
      this.style.background = '';
      this.style.color = '';
    }, 1800);
  });`;

const newCartClick = `  // Add to cart
  const cartBtn = card.querySelector('.btn-cart');
  cartBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    if (typeof window.addToCart === 'function') {
      window.addToCart(product.id, 1);
      this.textContent = '✓ Додано';
      this.style.background = 'var(--accent)';
      this.style.color = '#ffffff';
      setTimeout(() => {
        this.innerHTML = cartSVG + ' В кошик';
        this.style.background = '';
        this.style.color = '';
      }, 1800);
    }
  });`;

js = js.replace(oldCartClick, newCartClick);

fs.writeFileSync(file, js, 'utf8');
console.log('Updated products.js');

// Now update HTML files to include cart.js
const htmlFiles = ['d:/Мої сайти/D&Dflovers_n_cofee-site/index.html', 'd:/Мої сайти/D&Dflovers_n_cofee-site/catalog.html'];
htmlFiles.forEach(hf => {
    let html = fs.readFileSync(hf, 'utf8');
    if (!html.includes('<script src="assets/js/cart.js"></script>')) {
        html = html.replace('<script src="assets/js/products.js"></script>', '<script src="assets/js/cart.js"></script>\r\n<script src="assets/js/products.js"></script>');
        fs.writeFileSync(hf, html, 'utf8');
        console.log('Updated ' + hf);
    }
});
