/**
 * D&D Flowers — Modal.js
 * Повна система модалки товару:
 * - Галерея з мініатюрами і свайпом
 * - Акордеон (Склад, Догляд)
 * - Піли розміру + лічильник кількості
 * - Кнопка кошика
 * - Схожі букети (горизонтальний скрол)
 * - Flying-to-cart анімація
 *
 * Визначає: window.openProductModal, window.flyToCart
 * Залежності: PRODUCTS (products.js), window.addToCart (cart.js)
 */

(function () {
  'use strict';

  // ─── SVG іконки ──────────────────────────────────────────────
  const SVG_CART  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="17" height="17" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`;
  const SVG_TRUCK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="18" height="18" aria-hidden="true"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 4v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>`;
  const SVG_CLOCK = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2" stroke-linecap="round"/></svg>`;
  const SVG_FLOWER_PH = `<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="72" height="72" aria-hidden="true"><ellipse cx="60" cy="38" rx="14" ry="18" fill="rgba(255,255,255,0.55)"/><ellipse cx="38" cy="52" rx="14" ry="18" fill="rgba(255,255,255,0.48)" transform="rotate(-55 38 52)"/><ellipse cx="82" cy="52" rx="14" ry="18" fill="rgba(255,255,255,0.48)" transform="rotate(55 82 52)"/><ellipse cx="40" cy="78" rx="14" ry="18" fill="rgba(255,255,255,0.4)" transform="rotate(-30 40 78)"/><ellipse cx="80" cy="78" rx="14" ry="18" fill="rgba(255,255,255,0.4)" transform="rotate(30 80 78)"/><circle cx="60" cy="60" r="16" fill="rgba(255,255,255,0.75)"/><circle cx="60" cy="60" r="8" fill="rgba(232,119,138,0.6)"/></svg>`;

  // ─── Стан ────────────────────────────────────────────────────
  let currentProduct = null;
  let currentQty     = 1;
  let currentPhotoIdx = 0;
  let allPhotos = [];

  // ─── Inject modal HTML ───────────────────────────────────────
  const modalEl = document.createElement('div');
  modalEl.innerHTML = `
<div class="pm-overlay" id="pmOverlay" role="dialog" aria-modal="true" aria-labelledby="pmTitle">
  <div class="pm-box" id="pmBox">

    <button class="pm-close" id="pmClose" aria-label="Закрити">&times;</button>

    <div class="pm-body">
      <!-- Ліворуч: галерея -->
      <div class="pm-gallery" id="pmGallery">
        <div class="pm-gallery-main" id="pmGalleryMain">
          <img class="pm-gallery-img" id="pmGalleryImg" src="" alt="" loading="lazy">
          <div class="pm-gallery-placeholder" id="pmGalleryPh">${SVG_FLOWER_PH}</div>
          <button class="pm-gallery-arrow pm-gallery-arrow--prev" id="pmPrev" aria-label="Попереднє фото">&#8249;</button>
          <button class="pm-gallery-arrow pm-gallery-arrow--next" id="pmNext" aria-label="Наступне фото">&#8250;</button>
        </div>
        <div class="pm-thumbs" id="pmThumbs"></div>
      </div>

      <!-- Праворуч: інформація -->
      <div class="pm-info" id="pmInfo">
        <!-- Назва + бейдж -->
        <div class="pm-top">
          <span class="pm-badge" id="pmBadge" style="display:none"></span>
          <h2 class="pm-title" id="pmTitle">Назва букету</h2>
        </div>

        <!-- Ціна -->
        <div class="pm-price-row" id="pmPriceRow">
          <span class="pm-price" id="pmPrice">0 ₴</span>
          <s class="pm-old-price" id="pmOldPrice" style="display:none"></s>
          <span class="pm-discount-badge" id="pmDiscBadge" style="display:none"></span>
        </div>

        <!-- Опис -->
        <p class="pm-desc-text" id="pmDesc"></p>

        <!-- Акордеон -->
        <div class="pm-accordions" id="pmAccordions"></div>

        <!-- Розміри (якщо є) -->
        <div class="pm-sizes-section" id="pmSizesSection" style="display:none">
          <div class="pm-sizes-label">Розмір:</div>
          <div class="pm-sizes" id="pmSizes"></div>
        </div>

        <!-- Кількість + кошик -->
        <div class="pm-actions">
          <div class="pm-qty-wrap">
            <button class="pm-qty-btn" id="pmQtyMinus" aria-label="Менше">&#8722;</button>
            <span class="pm-qty-val" id="pmQtyVal">1</span>
            <button class="pm-qty-btn" id="pmQtyPlus" aria-label="Більше">&#43;</button>
          </div>
          <button class="pm-cart-btn" id="pmCartBtn" type="button">
            ${SVG_CART} Додати в кошик
          </button>
        </div>

        <!-- Доставка -->
        <div class="pm-delivery">
          <div class="pm-delivery-item">
            ${SVG_TRUCK}
            <div>
              <strong>Доставка по Вінниці</strong>
              <span>За 60 хвилин · Безкоштовно від 1000 ₴</span>
            </div>
          </div>
          <div class="pm-delivery-item">
            ${SVG_CLOCK}
            <div>
              <strong>Графік роботи</strong>
              <span>Пн–Нд: 10:00–19:00</span>
            </div>
          </div>
        </div>
      </div>
    </div><!-- /.pm-body -->

    <!-- Схожі букети -->
    <div class="pm-similar" id="pmSimilar" style="display:none">
      <h3 class="pm-similar-title">Схожі букети</h3>
      <div class="pm-similar-scroll" id="pmSimilarScroll"></div>
    </div>

  </div><!-- /.pm-box -->
</div><!-- /.pm-overlay -->`;

  document.body.appendChild(modalEl.firstElementChild);

  // ─── DOM refs ────────────────────────────────────────────────
  const overlay      = document.getElementById('pmOverlay');
  const box          = document.getElementById('pmBox');
  const closeBtn     = document.getElementById('pmClose');
  const galleryImg   = document.getElementById('pmGalleryImg');
  const galleryPh    = document.getElementById('pmGalleryPh');
  const thumbsEl     = document.getElementById('pmThumbs');
  const prevArrow    = document.getElementById('pmPrev');
  const nextArrow    = document.getElementById('pmNext');
  const badgeEl      = document.getElementById('pmBadge');
  const titleEl      = document.getElementById('pmTitle');
  const priceEl      = document.getElementById('pmPrice');
  const oldPriceEl   = document.getElementById('pmOldPrice');
  const discBadgeEl  = document.getElementById('pmDiscBadge');
  const descEl       = document.getElementById('pmDesc');
  const accordEl     = document.getElementById('pmAccordions');
  const sizesSec     = document.getElementById('pmSizesSection');
  const sizesEl      = document.getElementById('pmSizes');
  const qtyMinus     = document.getElementById('pmQtyMinus');
  const qtyPlus      = document.getElementById('pmQtyPlus');
  const qtyVal       = document.getElementById('pmQtyVal');
  const cartBtn      = document.getElementById('pmCartBtn');
  const similarSec   = document.getElementById('pmSimilar');
  const similarScroll = document.getElementById('pmSimilarScroll');

  // ─── Відкрити/закрити ─────────────────────────────────────────
  function openModal() {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    currentProduct = null;
  }

  // ─── Галерея ─────────────────────────────────────────────────
  function setPhoto(idx) {
    if (!allPhotos.length) return;
    currentPhotoIdx = Math.max(0, Math.min(idx, allPhotos.length - 1));
    galleryImg.src = allPhotos[currentPhotoIdx];
    galleryImg.alt = currentProduct ? currentProduct.name : '';
    galleryImg.style.display = 'block';
    galleryPh.style.display = 'none';
    // Sync thumbs
    thumbsEl.querySelectorAll('.pm-thumb').forEach((t, i) => {
      t.classList.toggle('active', i === currentPhotoIdx);
    });
    // Arrows visibility
    prevArrow.style.display = allPhotos.length > 1 ? 'flex' : 'none';
    nextArrow.style.display = allPhotos.length > 1 ? 'flex' : 'none';
  }

  function buildThumbs() {
    thumbsEl.innerHTML = '';
    if (allPhotos.length <= 1) {
      thumbsEl.style.display = 'none';
      return;
    }
    thumbsEl.style.display = 'flex';
    allPhotos.forEach((src, i) => {
      const t = document.createElement('div');
      t.className = 'pm-thumb' + (i === 0 ? ' active' : '');
      t.setAttribute('role', 'button');
      t.setAttribute('tabindex', '0');
      t.setAttribute('aria-label', `Фото ${i + 1}`);
      if (src) {
        const img = document.createElement('img');
        img.src = src;
        img.alt = '';
        img.loading = 'lazy';
        t.appendChild(img);
      } else {
        t.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;opacity:0.4">${SVG_FLOWER_PH}</div>`;
      }
      t.addEventListener('click', () => setPhoto(i));
      t.addEventListener('keydown', e => { if (e.key === 'Enter') setPhoto(i); });
      thumbsEl.appendChild(t);
    });
  }

  // ─── Акордеон ────────────────────────────────────────────────
  function buildAccordion(items) {
    accordEl.innerHTML = '';
    items.forEach(({ title, content }) => {
      if (!content) return;
      const item = document.createElement('div');
      item.className = 'pm-acc-item';
      item.innerHTML = `
        <button class="pm-acc-trigger" type="button" aria-expanded="false">
          ${title}
          <span class="pm-acc-icon" aria-hidden="true">+</span>
        </button>
        <div class="pm-acc-body" role="region">
          <div class="pm-acc-body-inner">${content}</div>
        </div>`;
      const trigger = item.querySelector('.pm-acc-trigger');
      const body    = item.querySelector('.pm-acc-body');
      trigger.addEventListener('click', () => {
        const isOpen = trigger.classList.contains('open');
        // Close all
        accordEl.querySelectorAll('.pm-acc-trigger').forEach(t => {
          t.classList.remove('open');
          t.setAttribute('aria-expanded', 'false');
          t.nextElementSibling.style.maxHeight = '0';
        });
        // Toggle current
        if (!isOpen) {
          trigger.classList.add('open');
          trigger.setAttribute('aria-expanded', 'true');
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      });
      accordEl.appendChild(item);
    });
  }

  // ─── Розміри ─────────────────────────────────────────────────
  function buildSizes(sizes) {
    sizesEl.innerHTML = '';
    if (!sizes || !sizes.length) {
      sizesSec.style.display = 'none';
      return;
    }
    sizesSec.style.display = 'flex';
    sizes.forEach((sz, i) => {
      const pill = document.createElement('button');
      pill.className = 'pm-size-pill' + (i === 0 ? ' active' : '');
      pill.type = 'button';
      pill.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
      pill.textContent = sz.label;
      if (sz.price) {
        pill.title = sz.price.toLocaleString('uk-UA') + ' ₴';
      }
      pill.addEventListener('click', () => {
        sizesEl.querySelectorAll('.pm-size-pill').forEach(p => {
          p.classList.remove('active');
          p.setAttribute('aria-pressed', 'false');
        });
        pill.classList.add('active');
        pill.setAttribute('aria-pressed', 'true');
        // Update displayed price
        if (sz.price) {
          priceEl.textContent = sz.price.toLocaleString('uk-UA') + ' ₴';
        }
      });
      sizesEl.appendChild(pill);
    });
    // Activate first
    if (sizes[0] && sizes[0].price) {
      priceEl.textContent = sizes[0].price.toLocaleString('uk-UA') + ' ₴';
    }
  }

  // ─── Схожі букети ────────────────────────────────────────────
  function buildSimilar(product) {
    similarScroll.innerHTML = '';
    if (typeof PRODUCTS === 'undefined') { similarSec.style.display = 'none'; return; }

    const similar = PRODUCTS
      .filter(p => p.categorySlug === product.categorySlug && p.id !== product.id)
      .slice(0, 8);

    if (!similar.length) { similarSec.style.display = 'none'; return; }
    similarSec.style.display = 'block';

    similar.forEach(p => {
      if (typeof createProductCard !== 'function') return;
      const card = createProductCard(p);
      // Клік на схожу картку — оновлює контент модалки без закриття
      card.addEventListener('click', function (e) {
        if (e.target.closest('.product-wishlist') || e.target.closest('.pcard-cart-btn')) return;
        e.stopPropagation();
        updateContent(p);
        box.scrollTo({ top: 0, behavior: 'smooth' });
      });
      similarScroll.appendChild(card);
    });
  }

  // ─── Оновити весь контент модалки ────────────────────────────
  function updateContent(product) {
    currentProduct  = product;
    currentQty      = 1;
    currentPhotoIdx = 0;

    // Фото
    allPhotos = product.images && product.images.length
      ? product.images
      : (product.image ? [product.image] : []);

    if (allPhotos.length) {
      galleryImg.src = allPhotos[0];
      galleryImg.alt = product.name;
      galleryImg.style.display = 'block';
      galleryPh.style.display  = 'none';
    } else {
      galleryImg.style.display = 'none';
      galleryPh.style.display  = 'flex';
    }
    buildThumbs();

    // Бейдж
    const BADGE_LABEL = { hit: 'Хіт', new: 'Новинка', sale: 'Знижка' };
    if (product.badge) {
      badgeEl.textContent = BADGE_LABEL[product.badge] || '';
      badgeEl.className = `pm-badge pm-badge--${product.badge}`;
      badgeEl.style.display = 'inline-block';
    } else {
      badgeEl.style.display = 'none';
    }

    // Назва
    titleEl.textContent = product.name;

    // Ціна
    priceEl.textContent = product.price.toLocaleString('uk-UA') + ' ₴';
    if (product.oldPrice) {
      const pct = Math.round((1 - product.price / product.oldPrice) * 100);
      oldPriceEl.textContent = product.oldPrice.toLocaleString('uk-UA') + ' ₴';
      oldPriceEl.style.display = 'inline';
      discBadgeEl.textContent  = '−' + pct + '%';
      discBadgeEl.style.display = 'inline-block';
    } else {
      oldPriceEl.style.display  = 'none';
      discBadgeEl.style.display = 'none';
    }

    // Опис
    descEl.textContent = product.description || '';

    // Акордеон
    buildAccordion([
      { title: '🌸 Склад букета',     content: product.composition || '' },
      { title: '🌿 Догляд за квітами', content: product.careInfo    || '' },
    ]);

    // Розміри
    buildSizes(product.sizes);

    // Qty
    qtyVal.textContent = '1';

    // Схожі букети
    buildSimilar(product);
  }

  // ─── Кількість ───────────────────────────────────────────────
  qtyMinus.addEventListener('click', () => {
    if (currentQty > 1) qtyVal.textContent = --currentQty;
  });
  qtyPlus.addEventListener('click', () => {
    qtyVal.textContent = ++currentQty;
  });

  // ─── Додати в кошик (з модалки) ──────────────────────────────
  cartBtn.addEventListener('click', function () {
    if (!currentProduct) return;
    if (typeof window.addToCart === 'function') window.addToCart(currentProduct.id, currentQty);
    if (typeof window.flyToCart === 'function') window.flyToCart(this, allPhotos[0] || '');
    const orig = this.innerHTML;
    this.innerHTML = '✓&nbsp;Додано в кошик';
    this.classList.add('pm-cart-btn--added');
    setTimeout(() => {
      this.innerHTML = orig;
      this.classList.remove('pm-cart-btn--added');
    }, 1800);
  });

  // ─── Стрілки галереї ─────────────────────────────────────────
  prevArrow.addEventListener('click', () => setPhoto(currentPhotoIdx - 1));
  nextArrow.addEventListener('click', () => setPhoto(currentPhotoIdx + 1));

  // ─── Touch swipe у галереї ───────────────────────────────────
  let swipeStartX = 0;
  const galleryMain = document.getElementById('pmGalleryMain');
  galleryMain.addEventListener('touchstart', e => {
    swipeStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  galleryMain.addEventListener('touchend', e => {
    const delta = swipeStartX - e.changedTouches[0].screenX;
    if (Math.abs(delta) > 48) {
      if (delta > 0) setPhoto(currentPhotoIdx + 1);
      else           setPhoto(currentPhotoIdx - 1);
    }
  }, { passive: true });

  // ─── Close listeners ─────────────────────────────────────────
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) closeModal();
  });

  // ─── Public API ──────────────────────────────────────────────
  window.openProductModal = function (productId) {
    if (typeof PRODUCTS === 'undefined') return;
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    updateContent(product);
    openModal();
  };

  // ─── Flying-to-cart animation ────────────────────────────────
  window.flyToCart = function (sourceBtn, imgSrc) {
    const cartIcon = document.getElementById('headerCartBtn');
    if (!cartIcon || !sourceBtn) return;

    const srcRect = sourceBtn.getBoundingClientRect();
    const dstRect = cartIcon.getBoundingClientRect();

    const el = document.createElement('div');
    el.className = 'fly-to-cart-el';

    if (imgSrc) {
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = '';
      el.appendChild(img);
    } else {
      el.innerHTML = SVG_CART;
    }

    // Start position (center of button)
    const startX = srcRect.left + srcRect.width / 2 - 26;
    const startY = srcRect.top  + srcRect.height / 2 - 26;

    el.style.left = startX + 'px';
    el.style.top  = startY + 'px';

    document.body.appendChild(el);

    // Trigger animation to cart icon position on next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const endX = dstRect.left + dstRect.width  / 2 - 16;
        const endY = dstRect.top  + dstRect.height / 2 - 16;
        el.style.left   = endX + 'px';
        el.style.top    = endY + 'px';
        el.style.width  = '32px';
        el.style.height = '32px';
        el.style.opacity = '0';
        el.style.borderRadius = '50%';
      });
    });

    // Cart icon bounce
    setTimeout(() => {
      cartIcon.style.transform = 'scale(1.3)';
      setTimeout(() => { cartIcon.style.transform = ''; }, 200);
    }, 580);

    setTimeout(() => el.remove(), 680);
  };

})();
