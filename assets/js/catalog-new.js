/**
 * D&D Flowers — Catalog Page Logic (Sidebar + Filters)
 * Залежності: categories.js (CATEGORIES), products.js (PRODUCTS, createProductCard)
 */

(function () {
  'use strict';

  // ─── Конфіг та Стан ───────────────────────────────────────
  const PAGE_SIZE = 9; // 3 columns, so 9 is a good batch size
  const STAGGER_MS = 55;

  let activeCategory = 'all';
  let searchQuery    = '';
  let activeSortVal  = 'popular';
  let visibleCount   = PAGE_SIZE;
  let filteredCache  = [];

  // Filter State
  let priceMinVal = 0, priceMaxVal = 2000;
  let countMinVal = 1, countMaxVal = 3000;
  let activeColors = new Set();
  let activeFlowers = new Set();
  let activeOccasions = new Set();

  // ─── DOM Елементи ────────────────────────────────────────
  const grid = document.getElementById('catalogGrid');
  const emptyState = document.getElementById('catalogEmpty');
  
  const searchInput = document.getElementById('catalogSearch');
  const sortSelect = document.getElementById('catalogSort');
  
  const loadMoreWrap = document.getElementById('loadMoreWrap');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const resetBtn = document.getElementById('resetFiltersBtn');

  // Mobile Sidebar
  const filterMobileBtn = document.getElementById('filterMobileBtn');
  const sidebar = document.getElementById('catalogSidebar');
  const sidebarOverlay = document.getElementById('filterSheetOverlay');
  const sidebarCloseBtn = document.getElementById('sidebarCloseBtn');
  const sidebarApplyBtn = document.getElementById('sidebarApplyBtn');

  // ─── Допоміжні функції ───────────────────────────────────
  function debounce(func, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }



  // ─── Accordions ──────────────────────────────────────────
  function setupAccordions() {
    const headers = document.querySelectorAll('.filter-group-header');
    headers.forEach(header => {
      header.addEventListener('click', () => {
        const group = header.closest('.filter-group');
        group.classList.toggle('open');
      });
    });
  }

  // ─── Dual Sliders ────────────────────────────────────────
  function setupDualSlider(containerId, minElId, maxElId, trackId, rangeMinId, rangeMaxId, updateStateFn) {
    const minInput = document.getElementById(minElId);
    const maxInput = document.getElementById(maxElId);
    const rangeMin = document.getElementById(rangeMinId);
    const rangeMax = document.getElementById(rangeMaxId);
    const track = document.getElementById(trackId);
    if (!minInput || !maxInput || !rangeMin || !rangeMax || !track) return;

    const minLimit = parseInt(rangeMin.min);
    const maxLimit = parseInt(rangeMax.max);
    const gap = 0;

    function updateTrack() {
      const minV = parseInt(rangeMin.value);
      const maxV = parseInt(rangeMax.value);
      const percent1 = ((minV - minLimit) / (maxLimit - minLimit)) * 100;
      const percent2 = ((maxV - minLimit) / (maxLimit - minLimit)) * 100;
      track.style.left = percent1 + "%";
      track.style.width = (percent2 - percent1) + "%";
    }

    function onRangeMinInput() {
      if (parseInt(rangeMax.value) - parseInt(rangeMin.value) <= gap) {
        rangeMin.value = parseInt(rangeMax.value) - gap;
      }
      minInput.value = rangeMin.value;
      updateTrack();
      updateStateFn(parseInt(rangeMin.value), parseInt(rangeMax.value));
    }

    function onRangeMaxInput() {
      if (parseInt(rangeMax.value) - parseInt(rangeMin.value) <= gap) {
        rangeMax.value = parseInt(rangeMin.value) + gap;
      }
      maxInput.value = rangeMax.value;
      updateTrack();
      updateStateFn(parseInt(rangeMin.value), parseInt(rangeMax.value));
    }

    function onNumberMinInput() {
      let val = parseInt(minInput.value) || minLimit;
      if (val < minLimit) val = minLimit;
      if (val > parseInt(rangeMax.value) - gap) val = parseInt(rangeMax.value) - gap;
      rangeMin.value = val;
      minInput.value = val;
      updateTrack();
      updateStateFn(val, parseInt(rangeMax.value));
    }

    function onNumberMaxInput() {
      let val = parseInt(maxInput.value) || maxLimit;
      if (val > maxLimit) val = maxLimit;
      if (val < parseInt(rangeMin.value) + gap) val = parseInt(rangeMin.value) + gap;
      rangeMax.value = val;
      maxInput.value = val;
      updateTrack();
      updateStateFn(parseInt(rangeMin.value), val);
    }

    const debouncedApply = debounce(applyFilters, 300);

    rangeMin.addEventListener('input', () => { onRangeMinInput(); debouncedApply(); });
    rangeMax.addEventListener('input', () => { onRangeMaxInput(); debouncedApply(); });
    minInput.addEventListener('change', () => { onNumberMinInput(); applyFilters(); });
    maxInput.addEventListener('change', () => { onNumberMaxInput(); applyFilters(); });

    // Init
    minInput.value = rangeMin.value;
    maxInput.value = rangeMax.value;
    updateTrack();
  }

  // ─── Checkbox Lists ──────────────────────────────────────
  function setupCheckboxFilters() {
    if (typeof PRODUCTS === 'undefined') return;

    // Збираємо унікальні значення
    const colors = {};
    const flowers = {};
    const occasions = {}; // mapped from categorySlug

    PRODUCTS.forEach(p => {
      // Colors
      if (p.color) {
        colors[p.color] = (colors[p.color] || 0) + 1;
      }
      // Flowers
      if (p.type) {
        flowers[p.type] = (flowers[p.type] || 0) + 1;
      }
    });

    const COLOR_HEX = {
      'Червоний': '#E32636', 'Білий': '#F8F9FA', 'Рожевий': '#FFC0CB',
      'Жовтий': '#FFD700', 'Мікс': 'linear-gradient(45deg, #FFC0CB, #FFD700, #E32636)',
      'Бежевий': '#F5F5DC', 'Блакитний': '#87CEEB'
    };

    function renderList(containerId, dataMap, stateSet, isColor = false) {
      const container = document.getElementById(containerId);
      if (!container) return;
      container.innerHTML = '';
      
      const keys = Array.isArray(dataMap) ? dataMap : Object.keys(dataMap).sort();
      keys.forEach(key => {
        const count = Array.isArray(dataMap) ? '' : dataMap[key];
        const label = document.createElement('label');
        label.className = isColor ? 'filter-color-item' : 'filter-checkbox-item';
        
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.value = key;
        
        input.addEventListener('change', () => {
          if (input.checked) stateSet.add(key);
          else stateSet.delete(key);
          applyFilters();
        });

        if (isColor) {
          const bg = COLOR_HEX[key] || '#ddd';
          label.innerHTML = `
            <div class="filter-color-label">
              <input type="checkbox" value="${key}">
              <div class="filter-color-circle" style="background: ${bg}"></div>
              ${key}
            </div>
            <div class="filter-color-count">(${count})</div>
          `;
          // Re-attach listener due to innerHTML override
          const newInp = label.querySelector('input');
          newInp.addEventListener('change', () => {
            if (newInp.checked) stateSet.add(key);
            else stateSet.delete(key);
            applyFilters();
          });
        } else {
          label.appendChild(input);
          const textNodeStr = count !== '' ? `${key} (${count})` : key;
          label.appendChild(document.createTextNode(textNodeStr));
        }
        container.appendChild(label);
      });
    }

    
    const foodCategories = ["Перші страви", "Другі страви", "Салати", "Десерти", "Напої"];
    renderList('filterFlowerList', foodCategories, activeFlowers, false);
    
    const dietFeatures = ["Вегетаріанське", "Без глютену", "Гостре", "Дитяче меню"];
    const occContainer = document.getElementById('filterOccasionList');
    if (occContainer) {
      dietFeatures.forEach(cat => {
        const label = document.createElement('label');
        label.className = 'filter-checkbox-item';
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.value = cat;
        if (activeOccasions.has(cat)) input.checked = true;
        input.addEventListener('change', () => {
          if (input.checked) activeOccasions.add(cat);
          else activeOccasions.delete(cat);
          applyFilters();
        });
        label.appendChild(input);
        label.appendChild(document.createTextNode(cat));
        occContainer.appendChild(label);
      });
    }

  }

  // ─── Фільтрація ──────────────────────────────────────────
  function getFilteredSorted() {
    let result = PRODUCTS.slice();

    // 1. Highlight Category
    if (activeCategory !== 'all') {
      result = result.filter(p => p.categorySlug === activeCategory);
    }

    // 2. Search
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q));
    }

    // 3. Price
    result = result.filter(p => p.price >= priceMinVal && p.price <= priceMaxVal);

    // 4. Calories Count
    result = result.filter(p => {
      const count = p.calories || 200; // default if missing
      return count >= countMinVal && count <= countMaxVal;
    });

    // 5. Checkboxes (OR within group, AND between groups)
    
    if (activeFlowers.size > 0) {
      result = result.filter(p => activeFlowers.has(p.categorySlug));
    }
    if (activeOccasions.size > 0) {
      result = result.filter(p => {
        if (!p.dietFeatures) return false;
        // Check if product has ANY of the active dietary features
        return Array.from(activeOccasions).some(feat => p.dietFeatures.includes(feat));
      });
    }

    // Сортування
    result.sort((a, b) => {
      if (activeSortVal === 'price_asc')  return a.price - b.price;
      if (activeSortVal === 'price_desc') return b.price - a.price;
      if (activeSortVal === 'cal_asc')    return (a.calories || 0) - (b.calories || 0);
      if (activeSortVal === 'cal_desc')   return (b.calories || 0) - (a.calories || 0);
      if (activeSortVal === 'new')        return new Date(b.dateAdded) - new Date(a.dateAdded);
      return (b.sales || 0) - (a.sales || 0); // popular
    });

    return result;
  }

  // ─── Рендер ──────────────────────────────────────────────
  function showSkeletons(count = 9) {
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

  function applyFilters() {
    filteredCache = getFilteredSorted();
    visibleCount = PAGE_SIZE;

    // Оновлюємо лічильник для мобільної кнопки (опціонально)
    if (sidebarApplyBtn) {
      sidebarApplyBtn.textContent = `Показати букети (${filteredCache.length})`;
    }

    if (filteredCache.length === 0) {
      emptyState.style.display = 'flex';
      grid.style.display = 'none';
      loadMoreWrap.style.display = 'none';
    } else {
      emptyState.style.display = 'none';
      grid.style.display = 'grid';
      renderGrid(false);
    }
  }

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
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.catalog-grid .product-card:not(.card-visible)').forEach(card => observer.observe(card));
  }

  function renderGrid(isAppend = false) {
    const toShow = filteredCache.slice(0, visibleCount);

    if (!isAppend) {
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
    if (!isAppend) grid.innerHTML = '';

    const existingCount = isAppend ? grid.querySelectorAll('.product-card').length : 0;
    const newCards = [];

    toShow.slice(existingCount).forEach(product => {
      const card = createProductCard(product);
      grid.appendChild(card);
      newCards.push(card);
    });

    if (isAppend) {
      setTimeout(() => {
        newCards.forEach((c, i) => setTimeout(() => c.classList.add('card-visible'), i * STAGGER_MS));
      }, 30);
    } else {
      const allCards = grid.querySelectorAll('.product-card');
      let eagerCount = 0;
      allCards.forEach((card, i) => {
        if (i < 6) { // animate top few immediately
          eagerCount++;
          setTimeout(() => card.classList.add('card-visible'), i * STAGGER_MS + 50);
        }
      });
      setTimeout(() => setupScrollReveal(), eagerCount * STAGGER_MS + 200);
    }

    loadMoreWrap.style.display = (filteredCache.length > visibleCount) ? 'block' : 'none';
  }

  function loadMore() {
    visibleCount += PAGE_SIZE;
    renderGrid(true);
    setTimeout(() => setupScrollReveal(), 200);
  }

  // ─── Mobile Sidebar ──────────────────────────────────────
  function openSidebar() {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ─── Init ────────────────────────────────────────────────
  function init() {
    if (typeof PRODUCTS === 'undefined') return;

    // Check URL params
    const urlParams = new URLSearchParams(window.location.search);
    const urlCat = urlParams.get('category');
    if (urlCat) {
      activeCategory = urlCat;
    }

    setupAccordions();
    
    setupDualSlider('priceSlider', 'priceMin', 'priceMax', 'priceRangeTrack', 'priceRangeMin', 'priceRangeMax', (min, max) => {
      priceMinVal = min; priceMaxVal = max;
    });
    
    setupDualSlider('countSlider', 'countMin', 'countMax', 'countRangeTrack', 'countRangeMin', 'countRangeMax', (min, max) => {
      countMinVal = min; countMaxVal = max;
    });

    setupCheckboxFilters();

    // Controls listeners
    if (sortSelect) {
      sortSelect.value = activeSortVal;
      sortSelect.addEventListener('change', () => { activeSortVal = sortSelect.value; applyFilters(); });
    }
    if (searchInput) {
      searchInput.addEventListener('input', debounce(() => { searchQuery = searchInput.value; applyFilters(); }, 300));
    }
    if (loadMoreBtn) loadMoreBtn.addEventListener('click', loadMore);
    
    if (resetBtn) resetBtn.addEventListener('click', () => {
      // Refresh page to reset all easily
      window.location.href = 'catalog.html';
    });

    // Mobile interactions
    if (filterMobileBtn) filterMobileBtn.addEventListener('click', openSidebar);
    if (sidebarCloseBtn) sidebarCloseBtn.addEventListener('click', closeSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);
    if (sidebarApplyBtn) sidebarApplyBtn.addEventListener('click', closeSidebar);

    // Swipe down to close sidebar on mobile
    let startY = 0;
    if (sidebar) {
      sidebar.addEventListener('touchstart', e => startY = e.touches[0].clientY, { passive: true });
      sidebar.addEventListener('touchend', e => {
        if (e.changedTouches[0].clientY - startY > 70) closeSidebar();
      }, { passive: true });
    }

    showSkeletons(PAGE_SIZE);
    setTimeout(applyFilters, 300);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
