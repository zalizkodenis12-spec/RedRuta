/**
 * D&D Flowers — Каталог товарів (заглушки)
 * Замінити image та інші поля на реальні дані при наповненні.
 */
const PRODUCTS = [
  {
    id: 1,
    name: "Букет 15 Червоних Троянд",
    price: 1250,
    image: "", // замінити на реальний шлях до фото
    slug: "buket-15-chervonykh-troiand",
    color: "Червоний",
    type: "Троянда",
    categorySlug: "valentines",
    sales: 120, // для сортування за популярністю
    dateAdded: "2026-08-01" // для сортування за новизною
  },
  {
    id: 2,
    name: "Монобукет з Піоній",
    price: 1450,
    image: "",
    slug: "monobucket-z-pioniy",
    color: "Рожевий",
    type: "Півонія",
    categorySlug: "birthday",
    sales: 85,
    dateAdded: "2026-07-15"
  },
  {
    id: 3,
    name: "Весняний мікс",
    price: 890,
    image: "",
    slug: "vesniany-mix",
    color: "Мікс",
    type: "Тюльпан",
    categorySlug: "womens-day",
    sales: 210,
    dateAdded: "2026-03-01"
  },
  {
    id: 4,
    name: "Букет «Ніжність»",
    price: 1100,
    image: "",
    slug: "buket-nizhnist",
    color: "Білий",
    type: "Еустома",
    categorySlug: "for-mom",
    sales: 95,
    dateAdded: "2026-05-10"
  },
  {
    id: 5,
    name: "Преміум Троянди 25 шт",
    price: 2200,
    image: "",
    slug: "premium-troyand-25",
    color: "Червоний",
    type: "Троянда",
    categorySlug: "anniversary",
    sales: 300,
    dateAdded: "2026-01-20"
  },
  {
    id: 6,
    name: "Букет з Хризантем",
    price: 750,
    image: "",
    slug: "buket-z-khryzan",
    color: "Жовтий",
    type: "Хризантема",
    categorySlug: "no-reason",
    sales: 60,
    dateAdded: "2026-08-03"
  },
  {
    id: 7,
    name: "Букет Лілій",
    price: 1350,
    image: "",
    slug: "buket-liliy",
    color: "Білий",
    type: "Лілія",
    categorySlug: "jubilee",
    sales: 45,
    dateAdded: "2026-06-22"
  },
  {
    id: 8,
    name: "Мікс Еустом та Піоній",
    price: 1800,
    image: "",
    slug: "mix-eustom-pioniy",
    color: "Рожевий",
    type: "Півонія",
    categorySlug: "graduation",
    sales: 110,
    dateAdded: "2026-05-25"
  }
];

/**
 * Глобальна функція для створення DOM-елементу картки товару
 * Використовується на головній (Бестселери) та в Каталозі.
 */
function createProductCard(product) {
  // Heart SVG outline
  const heartSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;

  // Cart SVG
  const cartSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`;

  // Placeholder flower SVG
  const flowerSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 2a4 4 0 0 1 0 8 4 4 0 0 1 0-8z"/><path d="M12 14a4 4 0 0 1 0 8 4 4 0 0 1 0-8z"/><path d="M2 12a4 4 0 0 1 8 0 4 4 0 0 1-8 0z"/><path d="M14 12a4 4 0 0 1 8 0 4 4 0 0 1-8 0z"/><circle cx="12" cy="12" r="2.5" fill="var(--accent)" stroke="none"/></svg>`;

  const card = document.createElement('div');
  card.className = 'product-card reveal';
  card.setAttribute('data-id', product.id);

  const mediaContent = product.image
    ? `<img src="${product.image}" alt="${product.name}" loading="lazy">`
    : `<div class="product-media-placeholder">${flowerSVG}<span>Фото скоро</span></div>`;

  card.innerHTML = \`
    <div class="product-media">
      \${mediaContent}
      <button class="product-wishlist" aria-label="Додати до обраного" data-id="\${product.id}">
        \${heartSVG}
      </button>
    </div>
    <div class="product-body">
      <div class="product-name">\${product.name}</div>
      <div class="product-price">\${product.price.toLocaleString('uk-UA')} ₴</div>
      <div class="product-card-footer">
        <button class="btn-cart" data-id="\${product.id}">
          \${cartSVG} В кошик
        </button>
      </div>
    </div>
  \`;

  // Click on card → open product modal
  card.addEventListener('click', function(e) {
    if (e.target.closest('.product-wishlist') || e.target.closest('.btn-cart')) return;
    if (typeof window.openProductModal === 'function') {
      window.openProductModal(product.id);
    }
  });

  // Wishlist toggle
  const wishBtn = card.querySelector('.product-wishlist');
  wishBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    this.classList.toggle('active');
    const isActive = this.classList.contains('active');
    this.setAttribute('aria-label', isActive ? 'Видалити з обраного' : 'Додати до обраного');
  });

  // Add to cart
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
  });

  return card;
}
