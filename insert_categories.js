const fs = require('fs');

const cssFile = 'd:/Мої сайти/D&Dflovers_n_cofee-site/assets/css/styles.css';
let css = fs.readFileSync(cssFile, 'utf8');

const categoriesCSS = `

/* ===== Categories ===== */
.categories-section {
  padding: 96px 0;
  background: var(--bg);
}
.categories-section .section-head {
  text-align: center;
  margin-bottom: 52px;
}
.categories-section .section-title {
  text-align: center;
  max-width: none;
  color: var(--text-primary);
}
.categories-section .section-desc {
  text-align: center;
  max-width: none;
  margin: 0 auto;
}
.categories-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-decoration: none;
  cursor: pointer;
}
.category-media {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 18px;
  overflow: hidden;
  background: linear-gradient(135deg, #fce8ed 0%, #f9d0d8 50%, #f4a7b8 100%);
  box-shadow: 0 4px 16px rgba(232,119,138,0.08);
  transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s cubic-bezier(0.16,1,0.3,1);
}
.category-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
}
.category-card:hover .category-media {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(212,85,107,0.22);
}
.category-card:hover .category-media img {
  transform: scale(1.05);
}
.category-title {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  text-align: center;
  transition: color var(--transition);
}
.category-card:hover .category-title {
  color: var(--accent);
}
.category-placeholder {
  width: 100%; height: 100%;
  display: flex; align-items: center; justify-content: center;
}
.category-placeholder svg {
  width: 48px; height: 48px;
  color: var(--accent);
  opacity: 0.4;
}
`;

// Insert the new CSS before the Tablet media query to ensure responsiveness is clean
const tabletMedia = '/* ===================================================\r\n   RESPONSIVE — Tablet';
if(css.includes(tabletMedia)) {
    css = css.replace(tabletMedia, categoriesCSS + '\r\n\r\n' + tabletMedia);
} else {
    css += categoriesCSS;
}

// Add responsive categories-grid to the existing media queries
css = css.replace(
  '.products-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }',
  '.products-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }\r\n  .categories-grid { grid-template-columns: repeat(3, 1fr); gap: 20px; }'
);

css = css.replace(
  '.products-grid { grid-template-columns: 1fr; gap: 14px; }',
  '.products-grid { grid-template-columns: 1fr; gap: 14px; }\r\n  .categories-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }\r\n  .categories-section { padding: 56px 0; }'
);

fs.writeFileSync(cssFile, css, 'utf8');
console.log('CSS updated with categories.');

const htmlFile = 'd:/Мої сайти/D&Dflovers_n_cofee-site/index.html';
let html = fs.readFileSync(htmlFile, 'utf8');

const categoriesHTML = `
  <!-- CATEGORIES -->
  <section class="categories-section" id="categories">
    <div class="container">
      <div class="section-head reveal">
        <h2 class="section-title">\u041e\u0431\u0435\u0440\u0456\u0442\u044c \u0431\u0443\u043a\u0435\u0442 \u0437\u0430 \u043f\u0440\u0438\u0432\u043e\u0434\u043e\u043c</h2>
        <p class="section-desc">\u0417\u043d\u0430\u0439\u0434\u0456\u0442\u044c \u0456\u0434\u0435\u0430\u043b\u044c\u043d\u0438\u0439 \u0431\u0443\u043a\u0435\u0442 \u0434\u043b\u044f \u0431\u0443\u0434\u044c-\u044f\u043a\u043e\u0457 \u043f\u043e\u0434\u0456\u0457</p>
      </div>
      <div class="categories-grid" id="categoriesGrid">
        <!-- \u041a\u0430\u0440\u0442\u043a\u0438 \u0433\u0435\u043d\u0435\u0440\u0443\u044e\u0442\u044c\u0441\u044f \u0447\u0435\u0440\u0435\u0437 JS -->
      </div>
    </div>
  </section>

  <!-- SERVICES CAROUSEL`;

html = html.replace('  <!-- SERVICES CAROUSEL', categoriesHTML);

const categoriesJS = `
<script src="assets/js/categories.js"></script>
<script>
  // ===== Render Categories from CATEGORIES array =====
  (function() {
    const grid = document.getElementById('categoriesGrid');
    if (!grid || typeof CATEGORIES === 'undefined') return;

    const flowerSVG = \`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><path d="M12 2a4 4 0 0 1 0 8 4 4 0 0 1 0-8z"/><path d="M12 14a4 4 0 0 1 0 8 4 4 0 0 1 0-8z"/><path d="M2 12a4 4 0 0 1 8 0 4 4 0 0 1-8 0z"/><path d="M14 12a4 4 0 0 1 8 0 4 4 0 0 1-8 0z"/><circle cx="12" cy="12" r="2.5" fill="var(--accent)" stroke="none"/></svg>\`;

    CATEGORIES.forEach(function(category) {
      const card = document.createElement('a');
      card.href = '/catalog/' + category.slug;
      card.className = 'category-card reveal';

      const mediaContent = category.image
        ? \`<img src="\${category.image}" alt="\${category.name}" loading="lazy">\`
        : \`<div class="category-placeholder">\${flowerSVG}</div>\`;

      card.innerHTML = \`
        <div class="category-media">
          \${mediaContent}
        </div>
        <div class="category-title">\${category.name}</div>
      \`;

      grid.appendChild(card);
    });
  })();
</script>
</body>`;

html = html.replace('</body>', categoriesJS);

fs.writeFileSync(htmlFile, html, 'utf8');
console.log('HTML updated with categories.');
