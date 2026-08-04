const fs = require('fs');

const cssFile = 'd:/Мої сайти/D&Dflovers_n_cofee-site/assets/css/styles.css';
let css = fs.readFileSync(cssFile, 'utf8');

const reviewsCSS = `
/* ===== Reviews ===== */
.reviews-section {
  padding: 96px 0;
  background: var(--bg);
}
.reviews-section .section-head {
  text-align: center;
  margin-bottom: 52px;
}
.reviews-section .section-title {
  text-align: center;
  max-width: none;
  color: var(--text-primary);
}
.reviews-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}
.review-card {
  background: #ffffff;
  border-radius: var(--radius-lg);
  padding: 32px;
  box-shadow: 0 4px 24px rgba(232,119,138,0.06);
  border: 1px solid var(--border);
  transition: transform var(--transition), box-shadow var(--transition);
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.review-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(212,85,107,0.12);
}
.review-stars {
  display: flex;
  gap: 4px;
  color: #ffc107; /* gold/accent for stars */
}
.review-stars svg {
  width: 20px;
  height: 20px;
  fill: currentColor;
}
.review-text {
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.6;
  color: var(--text-secondary);
  flex-grow: 1;
}
.review-author {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  color: var(--text-primary);
  margin-top: 8px;
}
`;

// Insert the new CSS before the Tablet media query
const tabletMedia = '/* ===================================================\r\n   RESPONSIVE — Tablet';
if (css.includes(tabletMedia)) {
    css = css.replace(tabletMedia, reviewsCSS + '\r\n\r\n' + tabletMedia);
} else {
    css += reviewsCSS;
}

// Add responsive reviews-grid to existing media queries
css = css.replace(
  '.categories-grid { grid-template-columns: repeat(3, 1fr); gap: 20px; }',
  '.categories-grid { grid-template-columns: repeat(3, 1fr); gap: 20px; }\r\n  .reviews-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }'
);

css = css.replace(
  '.categories-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }',
  '.categories-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }\r\n  .reviews-grid { grid-template-columns: 1fr; gap: 20px; }\r\n  .reviews-section { padding: 56px 0; }'
);

fs.writeFileSync(cssFile, css, 'utf8');
console.log('CSS updated with reviews.');

const htmlFile = 'd:/Мої сайти/D&Dflovers_n_cofee-site/index.html';
let html = fs.readFileSync(htmlFile, 'utf8');

const reviewsHTML = `
  <!-- REVIEWS -->
  <section class="reviews-section" id="reviews">
    <div class="container">
      <div class="section-head reveal">
        <h2 class="section-title">Що кажуть наші клієнти</h2>
      </div>
      <div class="reviews-grid" id="reviewsGrid">
        <!-- Відгуки генеруються через JS -->
      </div>
    </div>
  </section>

  <!-- SERVICES CAROUSEL`;

html = html.replace('  <!-- SERVICES CAROUSEL', reviewsHTML);

const reviewsJS = `
<script src="assets/js/reviews.js"></script>
<script>
  // ===== Render Reviews from REVIEWS array =====
  (function() {
    const grid = document.getElementById('reviewsGrid');
    if (!grid || typeof REVIEWS === 'undefined') return;

    const starSVG = \`<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>\`;

    REVIEWS.forEach(function(review) {
      const card = document.createElement('div');
      card.className = 'review-card reveal';

      let starsHtml = '';
      for(let i=0; i<review.rating; i++) {
        starsHtml += starSVG;
      }

      card.innerHTML = \`
        <div class="review-stars">
          \${starsHtml}
        </div>
        <p class="review-text">"\${review.text}"</p>
        <div class="review-author">\${review.name}</div>
      \`;

      grid.appendChild(card);
    });
  })();
</script>
</body>`;

html = html.replace('</body>', reviewsJS);

fs.writeFileSync(htmlFile, html, 'utf8');
console.log('HTML updated with reviews.');
