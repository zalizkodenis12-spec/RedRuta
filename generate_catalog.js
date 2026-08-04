const fs = require('fs');

const indexFile = 'd:/Мої сайти/D&Dflovers_n_cofee-site/index.html';
const indexHtml = fs.readFileSync(indexFile, 'utf8');

// 1. Extract Header
const headerStart = indexHtml.indexOf('<header class="site-header">');
const headerEnd = indexHtml.indexOf('</header>') + '</header>'.length;
const headerHTML = indexHtml.substring(headerStart, headerEnd);

// 2. Extract Mobile Nav (needed for header)
const mobileNavStart = indexHtml.indexOf('<!-- MOBILE NAV -->');
const mobileNavEnd = indexHtml.indexOf('</div>\r\n\r\n<main id="top">') + '</div>'.length;
const mobileNavHTML = indexHtml.substring(mobileNavStart, mobileNavEnd);

// 3. Extract Footer
const footerStart = indexHtml.indexOf('<footer class="site-footer">');
const footerEnd = indexHtml.indexOf('</footer>') + '</footer>'.length;
const footerHTML = indexHtml.substring(footerStart, footerEnd);

// 4. Mobile CTA
const mobileCTAStart = indexHtml.indexOf('<a href="tel:+380974382519" class="mobile-cta">');
const mobileCTAEnd = indexHtml.indexOf('</a>', mobileCTAStart) + '</a>'.length;
const mobileCTAHTML = indexHtml.substring(mobileCTAStart, mobileCTAEnd);

// 5. Generate catalog.html
const catalogHTML = `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Каталог — D&D Flowers</title>
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,600;0,700;1,600;1,700&display=swap" rel="stylesheet">
  
  <link rel="stylesheet" href="assets/css/styles.css">
  <link rel="stylesheet" href="assets/css/catalog.css">
</head>
<body>

\${headerHTML}

\${mobileNavHTML}

<main id="top" class="catalog-page">
  <div class="container">
    <!-- Breadcrumbs -->
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="/">Головна</a>
      <span aria-hidden="true">&rsaquo;</span>
      <a href="/catalog">Каталог</a>
      <span aria-hidden="true">&rsaquo;</span>
      <span aria-current="page" id="breadcrumbCategory">...</span>
    </nav>

    <!-- Page Header -->
    <div class="catalog-header">
      <h1 class="catalog-title" id="catalogTitle">Каталог</h1>
      <span class="catalog-count" id="catalogCount">0 товарів</span>
    </div>

    <!-- Layout 2 cols -->
    <div class="catalog-layout">
      <!-- Sidebar Filters -->
      <aside class="catalog-sidebar">
        <button class="catalog-filter-close" id="filterCloseBtn" aria-label="Закрити фільтри">&times;</button>
        <div class="filter-header-mobile">Фільтри</div>
        
        <div class="filter-group">
          <button class="filter-group-title active" aria-expanded="true">Ціна</button>
          <div class="filter-group-content" style="max-height: 200px;">
            <div class="price-inputs">
              <input type="number" id="priceMin" placeholder="Від" min="0">
              <span>-</span>
              <input type="number" id="priceMax" placeholder="До" min="0">
            </div>
            <!-- Спрощений range slider (заглушка) -->
            <input type="range" class="price-range" id="priceRange" min="0" max="5000" step="50">
          </div>
        </div>

        <div class="filter-group">
          <button class="filter-group-title active" aria-expanded="true">Колір</button>
          <div class="filter-group-content" style="max-height: 300px;">
            <label class="filter-checkbox"><input type="checkbox" name="color" value="Білий"> <span class="color-dot" style="background:#fff;border:1px solid #ddd;"></span> Білий</label>
            <label class="filter-checkbox"><input type="checkbox" name="color" value="Рожевий"> <span class="color-dot" style="background:#ffb6c1;"></span> Рожевий</label>
            <label class="filter-checkbox"><input type="checkbox" name="color" value="Червоний"> <span class="color-dot" style="background:#ff0000;"></span> Червоний</label>
            <label class="filter-checkbox"><input type="checkbox" name="color" value="Жовтий"> <span class="color-dot" style="background:#ffd700;"></span> Жовтий</label>
            <label class="filter-checkbox"><input type="checkbox" name="color" value="Мікс"> <span class="color-dot" style="background:linear-gradient(45deg, red, yellow, pink);"></span> Мікс</label>
          </div>
        </div>

        <div class="filter-group">
          <button class="filter-group-title active" aria-expanded="true">Тип квітки</button>
          <div class="filter-group-content" style="max-height: 300px;">
            <label class="filter-checkbox"><input type="checkbox" name="type" value="Троянда"> Троянда</label>
            <label class="filter-checkbox"><input type="checkbox" name="type" value="Півонія"> Півонія</label>
            <label class="filter-checkbox"><input type="checkbox" name="type" value="Хризантема"> Хризантема</label>
            <label class="filter-checkbox"><input type="checkbox" name="type" value="Еустома"> Еустома</label>
            <label class="filter-checkbox"><input type="checkbox" name="type" value="Тюльпан"> Тюльпан</label>
            <label class="filter-checkbox"><input type="checkbox" name="type" value="Лілія"> Лілія</label>
          </div>
        </div>
        
        <div class="filter-group" id="categoryFiltersGroup">
          <button class="filter-group-title active" aria-expanded="true">Подія</button>
          <div class="filter-group-content" style="max-height: 300px;" id="categoryCheckboxes">
            <!-- Згенерується через JS -->
          </div>
        </div>

        <button class="btn btn-outline" id="resetFiltersBtn" style="width: 100%; margin-top: 16px;">Скинути фільтри</button>
      </aside>

      <!-- Main Content -->
      <div class="catalog-main">
        <!-- Topbar -->
        <div class="catalog-topbar">
          <button class="btn btn-outline filter-toggle-btn" id="filterOpenBtn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            Фільтри
          </button>

          <div class="sort-wrap">
            <label for="sortSelect">Сортувати:</label>
            <select id="sortSelect">
              <option value="popular">За популярністю</option>
              <option value="price_asc">Дешевші спочатку</option>
              <option value="price_desc">Дорожчі спочатку</option>
              <option value="new">Новинки</option>
            </select>
          </div>
          
          <div class="view-toggles">
            <button class="view-btn active" data-view="grid" aria-label="Grid view">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            </button>
            <button class="view-btn" data-view="list" aria-label="List view">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            </button>
          </div>
        </div>

        <!-- Products Grid -->
        <div class="products-grid catalog-grid" id="catalogGrid">
          <!-- Карточки товарів -->
        </div>

        <!-- Empty State -->
        <div class="catalog-empty" id="catalogEmpty" style="display:none;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <h3>Товарів не знайдено</h3>
          <p>Спробуйте змінити критерії фільтрації або скинути всі фільтри.</p>
          <button class="btn btn-cta" id="resetFiltersEmptyBtn">Скинути фільтри</button>
        </div>
      </div>
    </div>
  </div>
</main>

\${footerHTML}

\${mobileCTAHTML}

<div class="sidebar-overlay" id="sidebarOverlay"></div>

<script src="assets/js/categories.js"></script>
<script src="assets/js/products.js"></script>
<script src="assets/js/catalog.js"></script>
</body>
</html>`;

fs.writeFileSync('d:/Мої сайти/D&Dflovers_n_cofee-site/catalog.html', catalogHTML, 'utf8');
console.log('Successfully generated catalog.html');

// Now let's fix the index.html rendering loop problem by just rewriting it via script properly.
const searchStr2 = '    PRODUCTS.forEach(function(product) {';
const endStr2 = '      grid.appendChild(card);\r\n    });';

const startIdx2 = indexHtml.indexOf(searchStr2);
const endIdx2 = indexHtml.indexOf(endStr2, startIdx2);

if (startIdx2 !== -1 && endIdx2 !== -1) {
  const replacement2 = `    PRODUCTS.forEach(function(product) {\r\n      if (typeof createProductCard === 'function') {\r\n        grid.appendChild(createProductCard(product));\r\n      }\r\n    });`;
  const fixedHtml = indexHtml.substring(0, startIdx2) + replacement2 + indexHtml.substring(endIdx2 + endStr2.length);
  fs.writeFileSync(indexFile, fixedHtml, 'utf8');
  console.log('Successfully patched index.html products loop');
} else {
  console.log('Failed to patch index.html loop');
}

