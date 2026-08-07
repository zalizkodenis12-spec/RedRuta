/**
 * D&D Flowers — Catalog Page Logic (новий)
 * Чіп-фільтри, пошук, сортування, "Показати ще",
 * мобільний bottom sheet, scroll-reveal, hover-фото.
 *
 * Залежності: categories.js (CATEGORIES), products.js (PRODUCTS, createProductCard)
 */

(function () {
  'use strict';

  // ─── Конфіг ───────────────────────────────────────────────
  const PAGE_SIZE = 8;       // скільки карток показуємо одразу
  const STAGGER_MS = 55;     // затримка між картками (cascade)

  // ─── Стан ─────────────────────────────────────────────────
  let activeCategory = 'all';
  let activeSortVal  = 'popular';
  let searchQuery    = '';
  let visibleCount   = PAGE_SIZE;
  let filteredCache  = [];   // кешований відфільтрований+відсортований масив

  // ─── DOM ──────────────────────────────────────────────────
  const grid            = document.getElementById('catalogGrid');
  const emptyState      = document.getElementById('catalogEmpty');
  const countBadge      = document.getElementById('catalogCount');
  const breadcrumb      = document.getElementById('breadcrumbCurrent');
  const chipsContainer  = document.getElementById('catalogChips');
  const sortSelect      = document.getElementById('catalogSort');
  const searchInput     = document.getElementById('catalogSearch');
  const loadMoreWrap    = document.getElementById('loadMoreWrap');
  const loadMoreBtn     = document.getElementById('loadMoreBtn');
  const resetBtn        = document.getElementById('resetFiltersBtn');

  // Bottom sheet
  const filterMobileBtn = document.getElementById('filterMobileBtn');
  const filterSheetOverlay = document.getElementById('filterSheetOverlay');
  const filterSheet        = document.getElementById('filterSheet');
  const filterSheetClose   = document.getElementById('filterSheetClose');
  const filterSheetChips   = document.getElementById('filterSheetChips');
  const filterSheetSortBtns = document.querySelectorAll('.filter-sort-option');
  const filterSheetReset   = document.getElementById('filterSheetReset');
  const filterSheetApply   = document.getElementById('filterSheetApply');

  // ─── Категорії ────────────────────────────────────────────
  // Беремо ті ж CATEGORIES з categories.js
  // "Всі" — додаємо вручну першим
  const ALL_CHIP = { id: 'all', name: 'Всі', slug: 'all', emoji: '🌸' };

  // Emoji map для категорій (синхронізований з index.html)
  const EMOJI_MAP = {
    'birthday':   '🎂',
    'womens-day': '🌷',
    'valentines': '💕',
    'no-reason':  '🌸',
    'for-mom':    '💗',
    'anniversary':'💍',
    'graduation': '🎓',
    'jubilee':    '🎉',
    'wedding':    '💒',
    'corporate':  '🏢',
    'condolences':'🕊️',
  };

  // Додаємо badge info до продуктів (hits/new) — якщо немає в даних, додаємо статично
  function getBadge(product) {
    if (product.badge) return product.badge;
    if (product.sales && product.sales >= 100) return 'hit';
    const d = new Date(product.dateAdded);
    const now = new Date();
    const diffDays = (now - d) / (1000 * 60 * 60 * 24);
    if (diffDays <= 30) return 'new';
    return null;
  }

  // ─── Рендер чіпів ─────────────────────────────────────────
  function renderChips(container, onClick) {
    if (!container) return;
    container.innerHTML = '';

    const allCategories = [ALL_CHIP, ...CATEGORIES];

    allCategories.forEach(cat => {
      const chip = document.createElement('button');
      chip.className = 'catalog-chip' + (cat.slug === activeCategory ? ' active' : '');
      chip.setAttribute('data-slug', cat.slug);
      chip.setAttribute('aria-pressed', cat.slug === activeCategory ? 'true' : 'false');
      chip.setAttribute('type', 'button');

      const emoji = cat.emoji || EMOJI_MAP[cat.slug] || '🌼';
      chip.innerHTML = `<span class="chip-emoji" aria-hidden="true">${emoji}</span>${cat.name}`;

      chip.addEventListener('click', () => {
        activeCategory = cat.slug;
        // Sync both chip sets
        syncChips();
        if (onClick) onClick();
      });

      container.appendChild(chip);
    });
  }

  function syncChips() {
    // Update main chips
    document.querySelectorAll('.catalog-chip').forEach(chip => {
      const slug = chip.getAttribute('data-slug');
      const isActive = slug === activeCategory;
      chip.classList.toggle('active', isActive);
      chip.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
  }

  // ─── Breadcrumb ───────────────────────────────────────────
  function updateBreadcrumb() {
    if (!breadcrumb) return;
    if (activeCategory === 'all') {
      breadcrumb.textContent = 'Каталог';
    } else {
      const cat = CATEGORIES.find(c => c.slug === activeCategory);
      breadcrumb.textContent = cat ? cat.name : 'Каталог';
    }
  }

  // ─── Фільтр + сортування ──────────────────────────────────
  function getFilteredSorted() {
    let result = PRODUCTS.slice();

    // Фільтр за категорією
    if (activeCategory !== 'all') {
      result = result.filter(p => p.categorySlug === activeCategory);
    }

    // Пошук по назві
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q));
    }

    // Сортування
    result.sort((a, b) => {
      if (activeSortVal === 'price_asc')  return a.price - b.price;
      if (activeSortVal === 'price_desc') return b.price - a.price;
      if (activeSortVal === 'new')        return new Date(b.dateAdded) - new Date(a.dateAdded);
      return (b.sales || 0) - (a.sales || 0); // popular
    });

    return result;
  }

  // ─── Скелетон ─────────────────────────────────────────────
  function showSkeletons(count = 8) {
    grid.innerHTML = '';
    for (let i = 0; i < count; i++) {
      grid.insertAdjacentHTML('beforeend', `
        <div class="skeleton-card" aria-hidden="true">
          <div class="skeleton-media"></div>
          <div class="skeleton-body">
            <div class="skeleton-line skeleton-title"></div>
            <div class="skeleton-line skeleton-price"></div>
            <div class="skeleton-line skeleton-btn"></div>
          </div>
        </div>
      `);
    }
  }

  // ─── Картка товару (розширена) ─────────────────────────────
  function buildCatalogCard(product) {
    const heartSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
    const cartSVG  = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`;
    const flowerSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" style="width:52px;height:52px;opacity:0.35"><path d="M12 2a4 4 0 0 1 0 8 4 4 0 0 1 0-8z"/><path d="M12 14a4 4 0 0 1 0 8 4 4 0 0 1 0-8z"/><path d="M2 12a4 4 0 0 1 8 0 4 4 0 0 1-8 0z"/><path d="M14 12a4 4 0 0 1 8 0 4 4 0 0 1-8 0z"/><circle cx="12" cy="12" r="2.5" fill="var(--accent)" stroke="none"/></svg>`;

    // Визначаємо медіа (фото/плейсхолдер)
    const images = product.images || (product.image ? [product.image] : []);
    const primaryImg = images[0] || product.image || '';
    const hoverImg   = images[1] || '';

    let mediaHtml;
    if (primaryImg) {
      mediaHtml = `
        <img class="product-img-primary" src="${primaryImg}" alt="${product.name}" loading="lazy">
        ${hoverImg ? `<img class="product-img-hover" src="${hoverImg}" alt="${product.name}" loading="lazy" aria-hidden="true">` : ''}
      `;
    } else {
      mediaHtml = `<div class="product-media-placeholder">${flowerSVG}<span>Фото скоро</span></div>`;
    }

    // Бейдж
    const badge = getBadge(product);
    const badgeHtml = badge === 'hit'
      ? `<span class="product-badge badge-hit">Хіт</span>`
      : badge === 'new'
        ? `<span class="product-badge badge-new">Новинка</span>`
        : '';

    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-id', product.id);

    card.innerHTML = `
      <div class="product-media">
        ${mediaHtml}
        ${badgeHtml}
        <button class="product-wishlist" aria-label="Додати до обраного" data-id="${product.id}">
          ${heartSVG}
        </button>
      </div>
      <div class="product-body">
        <div class="product-name">${product.name}</div>
        <div class="product-price">${product.price.toLocaleString('uk-UA')} ₴</div>
        <div class="product-card-footer">
          <button class="btn-cart" data-id="${product.id}">
            ${cartSVG} В кошик
          </button>
        </div>
      </div>
    `;

    // Click on card → modal
    card.addEventListener('click', function (e) {
      if (e.target.closest('.product-wishlist') || e.target.closest('.btn-cart')) return;
      if (typeof window.openProductModal === 'function') {
        window.openProductModal(product.id);
      }
    });

    // Wishlist
    const wishBtn = card.querySelector('.product-wishlist');
    wishBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      this.classList.toggle('active');
      const isActive = this.classList.contains('active');
      this.setAttribute('aria-label', isActive ? 'Видалити з обраного' : 'Додати до обраного');
    });

    // Add to cart
    const cartBtn = card.querySelector('.btn-cart');
    cartBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      if (typeof window.addToCart === 'function') {
        window.addToCart(product.id, 1);
        this.innerHTML = '✓ Додано';
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

  // ─── Stagger-анімація при появі карток ────────────────────
  function animateCards(cards, startIndex = 0) {
    cards.forEach((card, i) => {
      const delay = (startIndex + i) * STAGGER_MS;
      setTimeout(() => {
        card.classList.add('card-visible');
      }, delay);
    });
  }

  // ─── IntersectionObserver для scroll-reveal ───────────────
  let observer;

  function setupScrollReveal() {
    if (observer) observer.disconnect();

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('card-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.catalog-grid .product-card:not(.card-visible)').forEach(card => {
      observer.observe(card);
    });
  }

  // ─── Рендер сітки товарів ─────────────────────────────────
  function renderGrid(isAppend = false) {
    const toShow = filteredCache.slice(0, visibleCount);

    if (!isAppend) {
      // Анімація виходу старих карток
      const oldCards = grid.querySelectorAll('.product-card');
      if (oldCards.length > 0) {
        oldCards.forEach(card => {
          card.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
          card.style.opacity = '0';
          card.style.transform = 'translateY(-8px) scale(0.97)';
        });
        setTimeout(() => doRender(toShow, false), 220);
        return;
      }
    }

    doRender(toShow, isAppend);
  }

  function doRender(toShow, isAppend) {
    if (!isAppend) {
      grid.innerHTML = '';
    }

    const existingCount = isAppend ? grid.querySelectorAll('.product-card').length : 0;
    const newCards = [];

    toShow.slice(existingCount).forEach(product => {
      const card = buildCatalogCard(product);
      grid.appendChild(card);
      newCards.push(card);
    });

    // Animate new cards with stagger
    if (isAppend) {
      // Для "Показати ще" — маленька затримка
      setTimeout(() => animateCards(newCards, 0), 30);
    } else {
      // First render — stagger from top
      const allCards = grid.querySelectorAll('.product-card');
      // Картки у верхньому viewport анімуємо каскадом зразу
      // Решта — через IntersectionObserver
      const rect = grid.getBoundingClientRect();
      let eagerCount = 0;

      allCards.forEach((card, i) => {
        const cardRect = card.getBoundingClientRect();
        if (cardRect.top < window.innerHeight) {
          eagerCount++;
          setTimeout(() => card.classList.add('card-visible'), i * STAGGER_MS + 50);
        }
      });

      // Для решти — scroll-reveal
      setTimeout(() => setupScrollReveal(), eagerCount * STAGGER_MS + 200);
    }

    // Show/hide load more
    const hasMore = filteredCache.length > visibleCount;
    loadMoreWrap.style.display = hasMore ? 'block' : 'none';
  }

  // ─── Головна функція оновлення ────────────────────────────
  function applyFilters() {
    filteredCache = getFilteredSorted();
    visibleCount = PAGE_SIZE;

    updateBreadcrumb();
    syncChips();

    // Оновлюємо лічильник
    const count = filteredCache.length;
    if (countBadge) {
      countBadge.textContent = `${count} ${pluralBouquet(count)}`;
    }

    if (count === 0) {
      emptyState.style.display = 'flex';
      grid.style.display = 'none';
      loadMoreWrap.style.display = 'none';
    } else {
      emptyState.style.display = 'none';
      grid.style.display = 'grid';
      renderGrid(false);
    }
  }

  // ─── Pluralization ────────────────────────────────────────
  function pluralBouquet(n) {
    if (n % 10 === 1 && n % 100 !== 11) return 'букет';
    if ([2,3,4].includes(n % 10) && ![12,13,14].includes(n % 100)) return 'букети';
    return 'букетів';
  }

  // ─── Ініціалізація ────────────────────────────────────────
  function init() {
    // Перевіряємо залежності
    if (typeof PRODUCTS === 'undefined' || typeof CATEGORIES === 'undefined') {
      console.error('[catalog-new.js] PRODUCTS або CATEGORIES не завантажені');
      return;
    }

    // Читаємо URL-параметр ?category=...
    const urlParams = new URLSearchParams(window.location.search);
    const urlCat = urlParams.get('category');
    if (urlCat) {
      const found = CATEGORIES.find(c => c.slug === urlCat);
      if (found) activeCategory = found.slug;
    }

    // Рендер чіпів у хедер-барі
    renderChips(chipsContainer, () => {
      applyFilters();
    });

    // Рендер чіпів у bottom sheet
    renderChips(filterSheetChips, null); // only sync, apply on "Застосувати"

    // Показуємо скелетони до першого рендеру
    showSkeletons(PAGE_SIZE);

    // Невелика затримка для ефекту "завантаження"
    setTimeout(() => {
      applyFilters();
    }, 400);

    // Сортування (десктоп)
    if (sortSelect) {
      sortSelect.value = activeSortVal;
      sortSelect.addEventListener('change', () => {
        activeSortVal = sortSelect.value;
        syncBottomSheetSort();
        applyFilters();
      });
    }

    // Пошук
    if (searchInput) {
      let debounceTimer;
      searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          searchQuery = searchInput.value;
          applyFilters();
        }, 280);
      });
    }

    // Load more
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        const prevCount = visibleCount;
        visibleCount += PAGE_SIZE;

        const toShow = filteredCache.slice(0, visibleCount);

        // Append new cards
        const newItems = toShow.slice(prevCount);
        const newCards = [];
        newItems.forEach(product => {
          const card = buildCatalogCard(product);
          grid.appendChild(card);
          newCards.push(card);
        });

        // Animate new cards
        setTimeout(() => animateCards(newCards, 0), 30);

        // Hide button if no more
        if (filteredCache.length <= visibleCount) {
          loadMoreWrap.style.display = 'none';
        }

        // Scroll reveal for new ones that are off screen
        setTimeout(() => setupScrollReveal(), 200);
      });
    }

    // Reset filters
    if (resetBtn) {
      resetBtn.addEventListener('click', resetFilters);
    }

    // ── Mobile bottom sheet ──
    if (filterMobileBtn) {
      filterMobileBtn.addEventListener('click', openSheet);
    }
    if (filterSheetClose) {
      filterSheetClose.addEventListener('click', closeSheet);
    }
    if (filterSheetOverlay) {
      filterSheetOverlay.addEventListener('click', closeSheet);
    }

    // Bottom sheet sort buttons
    filterSheetSortBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterSheetSortBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeSortVal = btn.getAttribute('data-sort');
        if (sortSelect) sortSelect.value = activeSortVal;
      });
    });

    if (filterSheetReset) {
      filterSheetReset.addEventListener('click', () => {
        resetFilters();
        // Also sync sheet chips
        renderChips(filterSheetChips, null);
        filterSheetSortBtns.forEach(b => {
          b.classList.toggle('active', b.getAttribute('data-sort') === 'popular');
        });
        closeSheet();
      });
    }

    if (filterSheetApply) {
      filterSheetApply.addEventListener('click', () => {
        // Sync activeCategory from sheet chips
        const activeSheetChip = filterSheetChips && filterSheetChips.querySelector('.catalog-chip.active');
        if (activeSheetChip) {
          activeCategory = activeSheetChip.getAttribute('data-slug');
        }
        applyFilters();
        closeSheet();
      });
    }

    // Swipe down to close sheet
    let startY = 0;
    if (filterSheet) {
      filterSheet.addEventListener('touchstart', (e) => {
        startY = e.touches[0].clientY;
      }, { passive: true });
      filterSheet.addEventListener('touchend', (e) => {
        const delta = e.changedTouches[0].clientY - startY;
        if (delta > 70) closeSheet();
      }, { passive: true });
    }

    // Burger menu — handled by main.js globally
  }

  // ─── Допоміжні ────────────────────────────────────────────
  function resetFilters() {
    activeCategory = 'all';
    activeSortVal = 'popular';
    searchQuery = '';
    if (searchInput) searchInput.value = '';
    if (sortSelect) sortSelect.value = 'popular';
    syncBottomSheetSort();
    applyFilters();
  }

  function syncBottomSheetSort() {
    filterSheetSortBtns.forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-sort') === activeSortVal);
    });
  }

  function openSheet() {
    // Sync chips in sheet before open
    renderChips(filterSheetChips, null);
    syncBottomSheetSort();
    filterSheet.classList.add('open');
    filterSheetOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeSheet() {
    filterSheet.classList.remove('open');
    filterSheetOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ─── Запуск ───────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
