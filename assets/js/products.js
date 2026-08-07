/**
 * D&D Flowers — Каталог товарів (16 позицій)
 * Поля: id, name, price, oldPrice, badge, image, images[],
 *       slug, color, type, categorySlug, sales, dateAdded,
 *       composition, description, careInfo, sizes[]
 */
const PRODUCTS = [
  {
    id: 1,
    name: "15 Червоних Троянд",
    price: 1250,
    oldPrice: 1550,
    badge: 'sale',
    image: "assets/images/Massive_red_roses_bouquet_2K_202608042250.jpeg",
    images: [
      "assets/images/Massive_red_roses_bouquet_2K_202608042250.jpeg",
      "assets/images/Рози на білому фоні.jpeg"
    ],
    slug: "15-chervonykh-troiand",
    color: "Червоний", type: "Троянда", categorySlug: "valentines",
    sales: 180, dateAdded: "2026-01-10",
    composition: "15 червоних троянд, евкаліпт, гіпсофіла",
    description: "Класика романтики — 15 свіжих червоних троянд у пакуванні крафт-паперу зі стрічкою. Ідеальний вибір на День закоханих або для незабутнього вечора.",
    careInfo: "Підрізайте стебла під кутом 45° та міняйте воду кожні 1–2 дні. Тримайте далі від прямих сонячних променів.",
    sizes: [{ label: 'S', price: 850 }, { label: 'M', price: 1250 }, { label: 'L', price: 2100 }]
  },
  {
    id: 2,
    name: "Монобукет з Піоній",
    price: 1450,
    oldPrice: null, badge: null,
    image: "", images: [],
    slug: "monobucket-z-pioniy",
    color: "Рожевий", type: "Півонія", categorySlug: "birthday",
    sales: 85, dateAdded: "2026-07-15",
    composition: "7 рожевих піоній, берлінська зелень",
    description: "Пишний монобукет із ніжних піоній — щире привітання на день народження. Кожна квітка підібрана вручну, пакування в матовому папері з брендованою стрічкою.",
    careInfo: "Піонії люблять прохолоду. Тримайте у чистій воді та міняйте щодня.",
    sizes: [{ label: 'S', price: 980 }, { label: 'M', price: 1450 }, { label: 'L', price: 2200 }]
  },
  {
    id: 3,
    name: "Весняний мікс тюльпанів",
    price: 890,
    oldPrice: null, badge: 'hit',
    image: "", images: [],
    slug: "vesniany-mix-tyulpaniv",
    color: "Мікс", type: "Тюльпан", categorySlug: "womens-day",
    sales: 210, dateAdded: "2026-03-01",
    composition: "11 тюльпанів різних кольорів, мускарі",
    description: "Яскравий весняний мікс із різнокольорових тюльпанів — символ тепла й оновлення. Підійде на 8 Березня або просто щоб підняти настрій коханій людині.",
    careInfo: "Тюльпани продовжують рости у вазі. Підрізайте стебла та тримайте у прохолодній воді.",
    sizes: null
  },
  {
    id: 4,
    name: "Букет «Ніжність»",
    price: 1100,
    oldPrice: null, badge: null,
    image: "", images: [],
    slug: "buket-nizhnist",
    color: "Білий", type: "Еустома", categorySlug: "for-mom",
    sales: 95, dateAdded: "2026-05-10",
    composition: "7 еустом, зелень, крафт-пакування",
    description: "Витончені білі еустоми з фільтровою зеленню — лаконічна елегантність для улюбленої мами. Кожен букет — це тепле «Люблю тебе».",
    careInfo: "Еустоми чутливі до тепла. Тримайте у прохолодному місці та міняйте воду через день.",
    sizes: null
  },
  {
    id: 5,
    name: "Преміум 51 Троянда",
    price: 3800,
    oldPrice: null, badge: 'hit',
    image: "assets/images/Рози на білому фоні.jpeg",
    images: [
      "assets/images/Рози на білому фоні.jpeg",
      "assets/images/Massive_red_roses_bouquet_2K_202608042250.jpeg"
    ],
    slug: "premium-51-troyanda",
    color: "Червоний", type: "Троянда", categorySlug: "anniversary",
    sales: 300, dateAdded: "2026-01-20",
    composition: "51 преміум-троянда, стрічка, коробка",
    description: "Розкішний букет із 51 преміальної троянди — гідний подарунок для особливої річниці. Великі бутони, насичений колір, бездоганна якість. Оформлення включено.",
    careInfo: "Підрізайте стебла під кутом, видаляйте нижнє листя. Міняйте воду кожні 1–2 дні.",
    sizes: [{ label: '21', price: 1950 }, { label: '51', price: 3800 }, { label: '101', price: 7200 }]
  },
  {
    id: 6,
    name: "Соняшне поле",
    price: 750,
    oldPrice: null, badge: 'new',
    image: "", images: [],
    slug: "sonychne-pole",
    color: "Жовтий", type: "Хризантема", categorySlug: "no-reason",
    sales: 60, dateAdded: "2026-08-03",
    composition: "5 жовтих хризантем, зелень, рафія",
    description: "Сонячні жовті хризантеми — відмінний вибір «просто так». Піднімають настрій з першого погляду і залишаються свіжими до 3 тижнів.",
    careInfo: "Хризантеми невибагливі. Змінюйте воду кожні 2 дні, підрізайте стебла.",
    sizes: null
  },
  {
    id: 7,
    name: "Букет білих Лілій",
    price: 1350,
    oldPrice: null, badge: null,
    image: "", images: [],
    slug: "buket-liliy",
    color: "Білий", type: "Лілія", categorySlug: "jubilee",
    sales: 45, dateAdded: "2026-06-22",
    composition: "5 білих лілій, гілки евкаліпту",
    description: "Урочистий білий букет із запашних лілій — для значних ювілейних дат. Вишуканий, стриманий, з приємним природним ароматом.",
    careInfo: "Видаліть пилок з тичинок, щоб уникнути плям. Тримайте у чистій воді в прохолоді.",
    sizes: null
  },
  {
    id: 8,
    name: "Мікс Еустом та Піоній",
    price: 1800,
    oldPrice: null, badge: null,
    image: "", images: [],
    slug: "mix-eustom-pioniy",
    color: "Рожевий", type: "Півонія", categorySlug: "graduation",
    sales: 110, dateAdded: "2026-05-25",
    composition: "5 піоній, 5 еустом, зелень, стрічка",
    description: "Святковий мікс ніжних еустом і розкішних піоній — ідеальний букет для випускника чи дипломанта. Сучасне пакування, ефектний вигляд.",
    careInfo: "Поставте у чисту воду одразу після отримання. Міняйте воду через день.",
    sizes: null
  },
  {
    id: 9,
    name: "Польовий мікс",
    price: 620,
    oldPrice: null, badge: 'new',
    image: "", images: [],
    slug: "polovyi-mix",
    color: "Мікс", type: "Тюльпан", categorySlug: "no-reason",
    sales: 22, dateAdded: "2026-08-05",
    composition: "Ромашки, польові трави, волошки",
    description: "Легкий і невимушений польовий букет — ніби зібраний власноруч на луці. Ідеальний для тих, хто цінує природну красу та простоту.",
    careInfo: "Польові квіти чутливі до тепла. Тримайте у прохолодному місці у чистій воді.",
    sizes: null
  },
  {
    id: 10,
    name: "Рожевий сад",
    price: 980,
    oldPrice: 1200, badge: 'sale',
    image: "", images: [],
    slug: "rozhevyi-sad",
    color: "Рожевий", type: "Троянда", categorySlug: "birthday",
    sales: 75, dateAdded: "2026-06-10",
    composition: "11 рожевих троянд, рускус, стрічка",
    description: "Ніжний рожевий букет із довгих троянд — стильний подарунок на день народження. Пакування включено.",
    careInfo: "Підрізайте стебла під кутом 45°. Міняйте воду щодня.",
    sizes: [{ label: 'S', price: 750 }, { label: 'M', price: 980 }, { label: 'L', price: 1650 }]
  },
  {
    id: 11,
    name: "Весільний монобукет",
    price: 2200,
    oldPrice: null, badge: null,
    image: "assets/images/Рози на білому фоні.jpeg",
    images: ["assets/images/Рози на білому фоні.jpeg"],
    slug: "vesilnyi-monobucket",
    color: "Білий", type: "Еустома", categorySlug: "anniversary",
    sales: 35, dateAdded: "2026-04-12",
    composition: "Білі троянди, еустоми, кала, зелень",
    description: "Вишуканий весільний монобукет — елегантне поєднання білих троянд, кала та еустом. Стиль мінімалізм для особливого дня.",
    careInfo: "Зберігайте у прохолоді до дня урочистості. Освіжте зрізи перед вживанням.",
    sizes: null
  },
  {
    id: 12,
    name: "Сезонний мікс",
    price: 480,
    oldPrice: null, badge: 'new',
    image: "", images: [],
    slug: "sezonnyi-mix",
    color: "Мікс", type: "Хризантема", categorySlug: "no-reason",
    sales: 15, dateAdded: "2026-08-06",
    composition: "Сезонні квіти, зелень, рафія",
    description: "Бюджетний, але ефектний сезонний букет. Склад змінюється залежно від сезону — завжди найсвіжіше і найкраще з того, що є зараз.",
    careInfo: "Склад букета сезонний. Зберігайте у прохолодній чистій воді.",
    sizes: null
  },
  {
    id: 13,
    name: "Троянди з Гортензією",
    price: 1650,
    oldPrice: null, badge: 'hit',
    image: "assets/images/Massive_red_roses_bouquet_2K_202608042250.jpeg",
    images: ["assets/images/Massive_red_roses_bouquet_2K_202608042250.jpeg"],
    slug: "troyand-hortenzia",
    color: "Рожевий", type: "Троянда", categorySlug: "valentines",
    sales: 140, dateAdded: "2026-02-05",
    composition: "9 троянд, 3 гортензії, евкаліпт",
    description: "Ефектне поєднання ніжних троянд і пухких гортензій. Об'ємний і розкішний букет, який виглядає дорого і привертає увагу.",
    careInfo: "Гортензії потребують багато води. Регулярно доливайте та міняйте повністю раз на 2 дні.",
    sizes: [{ label: 'S', price: 1100 }, { label: 'M', price: 1650 }, { label: 'L', price: 2400 }]
  },
  {
    id: 14,
    name: "25 Білих Троянд",
    price: 2800,
    oldPrice: null, badge: null,
    image: "assets/images/Рози на білому фоні.jpeg",
    images: ["assets/images/Рози на білому фоні.jpeg"],
    slug: "25-bilykh-troiand",
    color: "Білий", type: "Троянда", categorySlug: "anniversary",
    sales: 88, dateAdded: "2026-03-15",
    composition: "25 білих троянд, преміум-пакування",
    description: "Розкіш чистоти — 25 довгих білих троянд у преміальному оформленні. Символ поваги, чистих почуттів і особливого ставлення.",
    careInfo: "Підрізайте стебла кожного разу перед зміною води. Тримайте в прохолоді.",
    sizes: [{ label: '15', price: 1850 }, { label: '25', price: 2800 }, { label: '51', price: 4900 }]
  },
  {
    id: 15,
    name: "Букет «Захід сонця»",
    price: 1100,
    oldPrice: 1350, badge: 'sale',
    image: "", images: [],
    slug: "buket-zakhid-sontsia",
    color: "Мікс", type: "Троянда", categorySlug: "for-mom",
    sales: 60, dateAdded: "2026-07-01",
    composition: "Помаранчеві й жовті троянди, зелень",
    description: "Теплі відтінки помаранчевого та жовтого — немов захід сонця в букеті. Дарує відчуття тепла, затишку і турботи. Чудовий вибір для мами.",
    careInfo: "Підрізайте стебла та міняйте воду кожні 2 дні.",
    sizes: null
  },
  {
    id: 16,
    name: "Мікс «Весна»",
    price: 740,
    oldPrice: null, badge: 'new',
    image: "", images: [],
    slug: "mix-vesna",
    color: "Мікс", type: "Тюльпан", categorySlug: "womens-day",
    sales: 30, dateAdded: "2026-08-04",
    composition: "Тюльпани, фрезії, нарциси, мускарі",
    description: "Свіжий весняний мікс у пастельних кольорах — легкий і ніжний, як перші дні весни. Хороший вибір для колеги чи подруги.",
    careInfo: "Тримайте у прохолодній чистій воді. Міняйте щодня.",
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
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="88" height="88" aria-hidden="true">
        <ellipse cx="60" cy="38" rx="14" ry="18" fill="rgba(255,255,255,0.55)"/>
        <ellipse cx="38" cy="52" rx="14" ry="18" fill="rgba(255,255,255,0.48)" transform="rotate(-55 38 52)"/>
        <ellipse cx="82" cy="52" rx="14" ry="18" fill="rgba(255,255,255,0.48)" transform="rotate(55 82 52)"/>
        <ellipse cx="40" cy="78" rx="14" ry="18" fill="rgba(255,255,255,0.4)" transform="rotate(-30 40 78)"/>
        <ellipse cx="80" cy="78" rx="14" ry="18" fill="rgba(255,255,255,0.4)" transform="rotate(30 80 78)"/>
        <circle cx="60" cy="60" r="16" fill="rgba(255,255,255,0.75)"/>
        <circle cx="60" cy="60" r="8" fill="rgba(232,119,138,0.6)"/>
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

  // ── Бейдж (зверху зліва) ──────────────────────────────────
  const BADGE_LABEL = { hit: 'Хіт', new: 'Новинка', sale: 'Знижка' };
  const badgeHtml = product.badge
    ? `<span class="pcard-badge pcard-badge--${product.badge}">${BADGE_LABEL[product.badge]}</span>`
    : '';

  // ── Ціна ──────────────────────────────────────────────────
  const discountPct = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0;
  const oldPriceHtml = product.oldPrice
    ? `<s class="pcard-old-price">${product.oldPrice.toLocaleString('uk-UA')} ₴</s>
       <span class="pcard-discount">−${discountPct}%</span>`
    : '';

  // ── Склад ─────────────────────────────────────────────────
  const compositionHtml = product.composition
    ? `<p class="pcard-composition">${product.composition}</p>`
    : '';

  // ── Збираємо картку ───────────────────────────────────────
  const card = document.createElement('article');
  card.className = 'product-card';
  card.setAttribute('data-id', product.id);
  card.setAttribute('aria-label', product.name);

  card.innerHTML = `
    <div class="product-media">
      ${mediaHtml}
      ${badgeHtml}
      <button class="product-wishlist" aria-label="Додати до обраного" data-id="${product.id}" type="button">
        ${heartSVG}
      </button>
    </div>
    <div class="product-body">
      <p class="product-name">${product.name}</p>
      ${compositionHtml}
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
