/**
 * D&D Flowers — Каталог товарів (16 позицій)
 * Поля: id, name, price, oldPrice, badge, image, images[],
 *       slug, color, type, categorySlug, sales, dateAdded,
 *       composition, description, careInfo, sizes[]
 */
const PRODUCTS = [
  {
    id: 1,
    name: "Борщ український",
    price: 180,
    oldPrice: null, badge: null, image: "", images: [],
    slug: "borshch-ukrainskyi", categorySlug: "soups",
    sales: 180, dateAdded: "2026-01-10",
    composition: "Бульйон, буряк, капуста, картопля, морква, м'ясо",
    description: "Класичний український борщ з пампушками, салом та часником. Наваристий і дуже смачний.",
    careInfo: "320 ккал · Білки 12г · Жири 15г · Вуглеводи 20г",
    sizes: null
  },
  {
    id: 2,
    name: "Деруни зі сметаною",
    price: 150,
    oldPrice: null, badge: null, image: "", images: [],
    slug: "deruny-zi-smetanoyu", categorySlug: "main-courses",
    sales: 85, dateAdded: "2026-07-15",
    composition: "Картопля, цибуля, яйце, борошно, сметана",
    description: "Золотисті хрусткі деруни, подаються з домашньою густою сметаною.",
    careInfo: "450 ккал · Білки 8г · Жири 22г · Вуглеводи 45г",
    sizes: null
  },
  {
    id: 3,
    name: "Вареники з картоплею",
    price: 130,
    oldPrice: null, badge: null, image: "", images: [],
    slug: "varenyky-z-kartopleyu", categorySlug: "main-courses",
    sales: 210, dateAdded: "2026-03-01",
    composition: "Тісто, картопля, шкварки, цибуля",
    description: "Домашні вареники з картоплею, щедро политі смаженою цибулькою зі шкварками.",
    careInfo: "380 ккал · Білки 10г · Жири 14г · Вуглеводи 52г",
    sizes: null
  },
  {
    id: 4,
    name: "Котлета по-київськи",
    price: 220,
    oldPrice: null, badge: null, image: "", images: [],
    slug: "kotleta-po-kyivsky", categorySlug: "main-courses",
    sales: 95, dateAdded: "2026-05-10",
    composition: "Куряче філе, вершкове масло, панірувальні сухарі, кріп",
    description: "Ніжне куряче філе з рідкою масляно-трав'яною начинкою всередині, обсмажене до золотої скоринки.",
    careInfo: "520 ккал · Білки 28г · Жири 35г · Вуглеводи 15г",
    sizes: null
  },
  {
    id: 5,
    name: "Банош з бринзою",
    price: 190,
    oldPrice: null, badge: null, image: "", images: [],
    slug: "banosh-z-brynzoyu", categorySlug: "main-courses",
    sales: 300, dateAdded: "2026-01-20",
    composition: "Кукурудзяна крупа, сметана, бринза, шкварки",
    description: "Традиційна гуцульська страва, зварена на сметані, подається з овечою бринзою та хрусткими шкварками.",
    careInfo: "480 ккал · Білки 15г · Жири 30г · Вуглеводи 40г",
    sizes: null
  },
  {
    id: 6,
    name: "Сало з часником",
    price: 90,
    oldPrice: null, badge: null, image: "", images: [],
    slug: "salo-z-chasnykom", categorySlug: "appetizers",
    sales: 60, dateAdded: "2026-08-03",
    composition: "Генеральське сало, часник, чорний хліб, гірчиця",
    description: "Тонко нарізане свіже генеральське сало, подається з грінками з чорного хліба, часником та гострою гірчицею.",
    careInfo: "600 ккал · Білки 4г · Жири 65г · Вуглеводи 5г",
    sizes: null
  },
  {
    id: 7,
    name: "Млинці з м'ясом",
    price: 160,
    oldPrice: null, badge: null, image: "", images: [],
    slug: "mlyntsi-z-myasom", categorySlug: "main-courses",
    sales: 45, dateAdded: "2026-06-22",
    composition: "Млинці, телятина, цибуля, вершкове масло",
    description: "Тонкі домашні млинці з соковитою начинкою з відвареної телятини та обсмаженої цибулі.",
    careInfo: "410 ккал · Білки 22г · Жири 18г · Вуглеводи 35г",
    sizes: null
  },
  {
    id: 8,
    name: "Голубці",
    price: 185,
    oldPrice: null, badge: null, image: "", images: [],
    slug: "holubtsi", categorySlug: "main-courses",
    sales: 110, dateAdded: "2026-05-25",
    composition: "Капуста, рис, свинина, томатний соус, морква",
    description: "Класичні голубці, тушковані у насиченому томатно-сметанному соусі.",
    careInfo: "320 ккал · Білки 14г · Жири 16г · Вуглеводи 28г",
    sizes: null
  },
  {
    id: 9,
    name: "Капусняк запорізький",
    price: 140,
    oldPrice: null, badge: null, image: "", images: [],
    slug: "kapusnyak", categorySlug: "soups",
    sales: 22, dateAdded: "2026-08-05",
    composition: "Квашена капуста, пшоно, свинина, картопля",
    description: "Густий, ситний суп на основі квашеної капусти та пшона з додаванням свинини.",
    careInfo: "290 ккал · Білки 11г · Жири 14г · Вуглеводи 24г",
    sizes: null
  },
  {
    id: 10,
    name: "Сирники з родзинками",
    price: 145,
    oldPrice: null, badge: null, image: "", images: [],
    slug: "syrnyky", categorySlug: "desserts",
    sales: 75, dateAdded: "2026-06-10",
    composition: "Домашній сир, яйце, борошно, родзинки, сметана",
    description: "Пухкі солодкі сирники з родзинками, подаються з домашнім варенням або сметаною.",
    careInfo: "340 ккал · Білки 18г · Жири 12г · Вуглеводи 38г",
    sizes: null
  },
  {
    id: 11,
    name: "Бограч",
    price: 210,
    oldPrice: null, badge: null, image: "", images: [],
    slug: "bograch", categorySlug: "soups",
    sales: 35, dateAdded: "2026-04-12",
    composition: "Яловичина, свинина, паприка, картопля, морква, перець",
    description: "Традиційний закарпатський густий суп з кількома видами м'яса та великою кількістю паприки.",
    careInfo: "450 ккал · Білки 25г · Жири 28г · Вуглеводи 22г",
    sizes: null
  },
  {
    id: 12,
    name: "Кров'янка",
    price: 170,
    oldPrice: null, badge: null, image: "", images: [],
    slug: "krovyanka", categorySlug: "appetizers",
    sales: 15, dateAdded: "2026-08-06",
    composition: "Свиняча кров, гречка, сало, часник, спеції",
    description: "Домашня кров'янка з гречаною крупою, запечена до хрусткої скоринки.",
    careInfo: "390 ккал · Білки 14г · Жири 25г · Вуглеводи 26г",
    sizes: null
  },
  {
    id: 13,
    name: "Запечений короп",
    price: 260,
    oldPrice: null, badge: null, image: "", images: [],
    slug: "zapechenyi-korop", categorySlug: "main-courses",
    sales: 140, dateAdded: "2026-02-05",
    composition: "Короп, лимон, розмарин, цибуля, вершкове масло",
    description: "Цілий короп, запечений з лимоном і травами. Ніжне м'ясо і хрустка скоринка.",
    careInfo: "310 ккал · Білки 28г · Жири 18г · Вуглеводи 2г",
    sizes: null
  },
  {
    id: 14,
    name: "Печеня в горщику",
    price: 230,
    oldPrice: null, badge: null, image: "", images: [],
    slug: "pechenya-v-horshchyku", categorySlug: "main-courses",
    sales: 88, dateAdded: "2026-03-15",
    composition: "Свинина, картопля, гриби, сир, вершки",
    description: "Ароматна печеня з м'ясом, картоплею та білими грибами, запечена під сирною скоринкою.",
    careInfo: "540 ккал · Білки 24г · Жири 36г · Вуглеводи 28г",
    sizes: null
  },
  {
    id: 15,
    name: "Узвар",
    price: 80,
    oldPrice: null, badge: null, image: "", images: [],
    slug: "uzvar", categorySlug: "drinks",
    sales: 60, dateAdded: "2026-07-01",
    composition: "Сушені яблука, груші, сливи, мед",
    description: "Освіжаючий напій із сухофруктів, зварений за старовинним рецептом, з додаванням натурального меду.",
    careInfo: "95 ккал · Білки 0г · Жири 0г · Вуглеводи 24г",
    sizes: null
  },
  {
    id: 16,
    name: "Медовик",
    price: 120,
    oldPrice: null, badge: null, image: "", images: [],
    slug: "medovyk", categorySlug: "desserts",
    sales: 30, dateAdded: "2026-08-04",
    composition: "Медові коржі, сметанний крем, горіхи",
    description: "Класичний медовий торт з ніжним сметанним кремом, що тане в роті.",
    careInfo: "460 ккал · Білки 6г · Жири 22г · Вуглеводи 58г",
    sizes: null
  }
];

/* ================================================================
   createProductCard — єдиний переюзабельний компонент картки
   Використовується: головна, каталог, «Схожі букети» в модалці
   ================================================================ */
function createProductCard(product) {
  // ── SVG іконки ────────────────────────────────────────────
  const heartSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
  const cartSVG  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`;

  // Квіткова ілюстрація-плейсхолдер
  const flowerPlaceholder = `
    <div class="pcard-placeholder">
      <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="1.5" width="64" height="64" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        <path d="M12 6c-3.31 0-6 2.69-6 6h12c0-3.31-2.69-6-6-6z"/>
      </svg>
    </div>`;

  // ── Медіа ─────────────────────────────────────────────────
  const imgs = product.images && product.images.length ? product.images : (product.image ? [product.image] : []);
  const primaryImg = imgs[0] || '';
  const hoverImg   = imgs[1] || '';

  let mediaHtml;
  if (primaryImg) {
    mediaHtml = `
      <img class="pcard-img pcard-img--main" src="${primaryImg}" alt="${product.name}" loading="lazy">
      ${hoverImg ? `<img class="pcard-img pcard-img--hover" src="${hoverImg}" alt="${product.name}" loading="lazy" aria-hidden="true">` : ''}`;
  } else {
    mediaHtml = flowerPlaceholder;
  }


  // ── Ціна ──────────────────────────────────────────────────
  const discountPct = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;
  const oldPriceHtml = product.oldPrice
    ? `<s class="pcard-old-price">${product.oldPrice.toLocaleString('uk-UA')} ₴</s>
       <span class="pcard-discount">−${discountPct}%</span>`
    : '';

  // ── Збираємо картку ───────────────────────────────────────
  const card = document.createElement('article');
  card.className = 'product-card';
  card.setAttribute('data-id', product.id);
  card.setAttribute('aria-label', product.name);

  card.innerHTML = `
    <div class="product-media">
      ${mediaHtml}
      <button class="product-wishlist" aria-label="Додати до обраного" data-id="${product.id}" type="button">
        ${heartSVG}
      </button>
    </div>
    <div class="product-body">
      <p class="product-name">${product.name}</p>
      <div class="pcard-price-row">
        <span class="product-price">${product.price.toLocaleString('uk-UA')} ₴</span>
        ${oldPriceHtml}
      </div>
      <button class="pcard-cart-btn" data-id="${product.id}" type="button">
        ${cartSVG} Додати в кошик
      </button>
    </div>`;

  // ── Кліки ─────────────────────────────────────────────────
  // Вся картка → модалка (окрім кнопок)
  card.addEventListener('click', function (e) {
    if (e.target.closest('.product-wishlist') || e.target.closest('.pcard-cart-btn')) return;
    if (typeof window.openProductModal === 'function') window.openProductModal(product.id);
  });

  // Серце з пульс-анімацією
  const heartBtn = card.querySelector('.product-wishlist');
  heartBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    const wasActive = this.classList.contains('active');
    this.classList.toggle('active');
    if (!wasActive) {
      this.classList.add('heart-pulse');
      this.addEventListener('animationend', () => this.classList.remove('heart-pulse'), { once: true });
    }
    this.setAttribute('aria-label', !wasActive ? 'Видалити з обраного' : 'Додати до обраного');
  });

  // Кнопка "Додати в кошик" + flying animation
  const cartBtn = card.querySelector('.pcard-cart-btn');
  cartBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    if (typeof window.addToCart === 'function') window.addToCart(product.id, 1);
    if (typeof window.flyToCart === 'function') window.flyToCart(this, primaryImg);
    // Feedback
    const orig = this.innerHTML;
    this.innerHTML = '✓&nbsp;Додано';
    this.classList.add('pcard-cart-btn--added');
    setTimeout(() => {
      this.innerHTML = orig;
      this.classList.remove('pcard-cart-btn--added');
    }, 1800);
  });

  return card;
}
