const fs = require('fs');

// ═══════════════════════════════════════════════
// 1. UPDATE CSS
// ═══════════════════════════════════════════════
const cssFile = 'd:/Мої сайти/D&Dflovers_n_cofee-site/assets/css/styles.css';
let css = fs.readFileSync(cssFile, 'utf8');

const oldAboutCSS = `/* ===== About ===== */\r\n.about-section { padding: 96px 0; }\r\n.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }\r\n.about-media { border-radius: var(--radius-lg); overflow: hidden; border: 1px solid var(--border); aspect-ratio: 4/3.5; }\r\n.about-media img { width: 100%; height: 100%; object-fit: cover; filter: brightness(0.95); transition: transform 600ms ease; }\r\n.about-media:hover img { transform: scale(1.03); }\r\n.about-content p { color: var(--text-secondary); font-family: var(--font-body); margin-bottom: 24px; font-size: 15.5px; line-height: 1.7; }\r\n.about-list { display: flex; flex-direction: column; gap: 16px; margin-bottom: 32px; }\r\n.about-list li { display: flex; align-items: center; gap: 12px; font-family: var(--font-body); font-size: 15.5px; font-weight: 500; }\r\n.about-list li::before { \r\n  content: '\u2713'; \r\n  display: flex; align-items: center; justify-content: center;\r\n  width: 24px; height: 24px; border-radius: 50%; \r\n  background: rgba(255,255,255,0.2); color: #fff; font-size: 13px; font-weight: bold;\r\n  flex-shrink: 0; \r\n}\r\n.about-actions { display: flex; gap: 16px; align-items: center; flex-wrap: wrap; }\r\n.about-actions .btn-ghost svg { transition: transform var(--transition); }\r\n.about-actions .btn-ghost:hover svg { transform: translate(2px, -2px); }`;

const newAboutCSS = `/* ===== About / Why Us ===== */
.about-section {
  padding: 96px 0;
  background: var(--bg);
}
/* Desktop: 2 columns 50/50 */
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: start;
}

/* ---- Photo Collage (left column) ---- */
.about-collage {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 12px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(212,85,107,0.12);
}
.about-collage-item {
  border-radius: 14px;
  overflow: hidden;
  background: linear-gradient(135deg, #fce8ed 0%, #f9d0d8 50%, #f4a7b8 100%);
  position: relative;
}
/* Big item: span 2 rows on the left */
.about-collage-item--big {
  grid-row: 1 / 3;
  aspect-ratio: 3 / 4;
}
/* Small items: normal */
.about-collage-item--sm {
  aspect-ratio: 1 / 1;
}
.about-collage-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  transition: transform 500ms cubic-bezier(0.16,1,0.3,1);
}
.about-collage-item:hover img {
  transform: scale(1.04);
}
/* Placeholder when no image */
.about-collage-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 120px;
}
.about-collage-placeholder svg {
  width: 36px;
  height: 36px;
  color: var(--accent);
  opacity: 0.35;
}

/* ---- Text Content (right column) ---- */
.about-content {
  display: flex;
  flex-direction: column;
  gap: 0;
  justify-content: center;
  padding-top: 8px;
}
.about-content .section-title {
  color: var(--text-primary);
  margin-bottom: 14px;
}
.about-content .about-intro {
  color: var(--text-secondary);
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.7;
  margin-bottom: 36px;
}

/* Advantage list */
.about-advantages {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 40px;
}
.about-advantage {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}
.about-advantage-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--surface);
  border: 1.5px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--accent);
  box-shadow: 0 4px 14px rgba(232,119,138,0.13);
  transition: background var(--transition), box-shadow var(--transition);
}
.about-advantage:hover .about-advantage-icon {
  background: var(--accent);
  color: #ffffff;
  box-shadow: 0 6px 20px rgba(212,85,107,0.28);
}
.about-advantage-icon svg {
  width: 22px;
  height: 22px;
}
.about-advantage-text {
  display: flex;
  flex-direction: column;
  gap: 3px;
  padding-top: 4px;
}
.about-advantage-title {
  font-family: var(--font-display);
  font-size: 15.5px;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.01em;
  line-height: 1.3;
}
.about-advantage-sub {
  font-family: var(--font-body);
  font-size: 13.5px;
  color: var(--text-secondary);
  line-height: 1.5;
}

/* CTA button row */
.about-cta {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}`;

if (css.includes(oldAboutCSS)) {
  css = css.replace(oldAboutCSS, newAboutCSS);
  console.log('CSS: old about section found and replaced');
} else {
  // try to find just the comment
  const commentIdx = css.indexOf('/* ===== About ===== */');
  if (commentIdx !== -1) {
    // Find the next section comment
    const nextSection = css.indexOf('/* ===== Reviews', commentIdx);
    css = css.substring(0, commentIdx) + newAboutCSS + '\r\n\r\n' + css.substring(nextSection);
    console.log('CSS: replaced by marker search');
  } else {
    console.log('CSS: about section NOT found');
    process.exit(1);
  }
}

// Update responsive about-grid (tablet)
css = css.replace(
  '  .about-grid { gap: 40px; }',
  '  .about-grid { gap: 36px; }\r\n  .about-collage { box-shadow: 0 12px 36px rgba(212,85,107,0.10); }'
);

// Update responsive about-grid (mobile 768px)
css = css.replace(
  '  .about-grid { grid-template-columns: 1fr; gap: 28px; }',
  '  .about-grid { grid-template-columns: 1fr; gap: 32px; }\r\n  .about-collage-item--big { grid-row: auto; aspect-ratio: 1/1; }\r\n  .about-collage-item--sm { aspect-ratio: 1/1; }\r\n  .about-advantages { gap: 18px; }\r\n  .about-content .about-intro { margin-bottom: 24px; font-size: 14.5px; }'
);

fs.writeFileSync(cssFile, css, 'utf8');
console.log('CSS updated. Length:', css.length);

// ═══════════════════════════════════════════════
// 2. UPDATE HTML
// ═══════════════════════════════════════════════
const htmlFile = 'd:/Мої сайти/D&Dflovers_n_cofee-site/index.html';
let html = fs.readFileSync(htmlFile, 'utf8');

// Find the old about section
const oldAboutStart = '  <!-- ABOUT -->\r\n  <section class="section about-section section-blue" id="about">';
const oldAboutEnd = '  </section>\r\n\r\n  <!-- SERVICES CAROUSEL';

const startIdx = html.indexOf(oldAboutStart);
const endIdx = html.indexOf(oldAboutEnd);

if (startIdx === -1 || endIdx === -1) {
  console.log('HTML: about section markers not found');
  console.log('startIdx:', startIdx, 'endIdx:', endIdx);
  process.exit(1);
}

const newAbout = `  <!-- ABOUT / WHY US -->
  <section class="about-section" id="about">
    <div class="container about-grid">

      <!-- LEFT: Photo collage 2x2 (big + 3 small) -->
      <div class="about-collage reveal">

        <!-- Big photo: spans 2 rows -->
        <div class="about-collage-item about-collage-item--big">
          <div class="about-collage-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
              <path d="M12 2C8 2 4 5 4 10c0 4 3 7 8 12 5-5 8-8 8-12 0-5-4-8-8-8z"/>
              <circle cx="12" cy="10" r="2.5"/>
            </svg>
          </div>
        </div>

        <!-- Small top-right -->
        <div class="about-collage-item about-collage-item--sm">
          <div class="about-collage-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
              <path d="M12 2C8 2 4 5 4 10c0 4 3 7 8 12 5-5 8-8 8-12 0-5-4-8-8-8z"/>
              <circle cx="12" cy="10" r="2.5"/>
            </svg>
          </div>
        </div>

        <!-- Small bottom-right -->
        <div class="about-collage-item about-collage-item--sm">
          <div class="about-collage-placeholder">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
              <path d="M12 2C8 2 4 5 4 10c0 4 3 7 8 12 5-5 8-8 8-12 0-5-4-8-8-8z"/>
              <circle cx="12" cy="10" r="2.5"/>
            </svg>
          </div>
        </div>

      </div>

      <!-- RIGHT: Text content -->
      <div class="about-content reveal">

        <h2 class="section-title">\u0427\u043e\u043c\u0443 \u043e\u0431\u0438\u0440\u0430\u044e\u0442\u044c \u043d\u0430\u0441</h2>
        <p class="about-intro">\u041c\u0438 \u0437\u043d\u0430\u0454\u043c\u043e, \u044f\u043a \u0437\u0440\u043e\u0431\u0438\u0442\u0438 \u0442\u0430\u043a, \u0449\u043e\u0431 \u043a\u0432\u0456\u0442\u0438 \u0434\u0430\u0440\u0443\u0432\u0430\u043b\u0438 \u0435\u043c\u043e\u0446\u0456\u0457, \u0430 \u043d\u0435 \u043f\u0440\u043e\u0431\u043b\u0435\u043c\u0438 &mdash; \u0441\u0432\u0456\u0436\u0456\u0441\u0442\u044c \u0433\u0430\u0440\u0430\u043d\u0442\u043e\u0432\u0430\u043d\u043e, \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0430 \u0432\u0447\u0430\u0441\u043d\u043e, \u043e\u0444\u043e\u0440\u043c\u043b\u0435\u043d\u043d\u044f \u0437 \u0434\u0443\u0448\u0435\u044e.</p>

        <ul class="about-advantages">

          <li class="about-advantage">
            <div class="about-advantage-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
            </div>
            <div class="about-advantage-text">
              <span class="about-advantage-title">\u0428\u0432\u0438\u0434\u043a\u0430 \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0430</span>
              <span class="about-advantage-sub">\u0414\u043e\u0441\u0442\u0430\u0432\u0438\u043c\u043e \u0431\u0443\u043a\u0435\u0442 \u0437\u0430 60 \u0445\u0432\u0438\u043b\u0438\u043d \u043f\u043e \u043c\u0456\u0441\u0442\u0443</span>
            </div>
          </li>

          <li class="about-advantage">
            <div class="about-advantage-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2C8 2 4 5 4 10c0 4 3 7 8 12 5-5 8-8 8-12 0-5-4-8-8-8z"/></svg>
            </div>
            <div class="about-advantage-text">
              <span class="about-advantage-title">\u0421\u0432\u0456\u0436\u0456 \u043a\u0432\u0456\u0442\u0438 \u0449\u043e\u0434\u043d\u044f</span>
              <span class="about-advantage-sub">\u0417\u0430\u043a\u0443\u043f\u043e\u0432\u0443\u0454\u043c\u043e \u043a\u0432\u0456\u0442\u0438 \u0449\u043e\u0440\u0430\u043d\u043a\u0443 \u043d\u0430 \u0431\u0430\u0437\u0456</span>
            </div>
          </li>

          <li class="about-advantage">
            <div class="about-advantage-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
            <div class="about-advantage-text">
              <span class="about-advantage-title">\u0424\u043b\u043e\u0440\u0438\u0441\u0442 \u043d\u0430 \u0437\u0432'\u044f\u0437\u043a\u0443</span>
              <span class="about-advantage-sub">\u041f\u0456\u0434\u043a\u0430\u0436\u0435\u043c\u043e \u0456 \u0437\u0431\u0435\u0440\u0435\u043c\u043e \u0431\u0443\u043a\u0435\u0442 \u043f\u0456\u0434 \u0432\u0430\u0448 \u0437\u0430\u043f\u0438\u0442</span>
            </div>
          </li>

          <li class="about-advantage">
            <div class="about-advantage-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
            </div>
            <div class="about-advantage-text">
              <span class="about-advantage-title">\u041e\u043f\u043b\u0430\u0442\u0430 \u044f\u043a \u0437\u0440\u0443\u0447\u043d\u043e</span>
              <span class="about-advantage-sub">\u041a\u0430\u0440\u0442\u043a\u043e\u044e \u043e\u043d\u043b\u0430\u0439\u043d \u0430\u0431\u043e \u0433\u043e\u0442\u0456\u0432\u043a\u043e\u044e \u043a\u0443\u0440'\u0454\u0440\u0443</span>
            </div>
          </li>

        </ul>

        <div class="about-cta">
          <a href="https://instagram.com/d.n.d_flowers" target="_blank" rel="noopener" class="btn btn-cta">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            \u0414\u0438\u0432\u0438\u0442\u0438\u0441\u044c \u0432 Instagram
          </a>
          <a href="tel:+380974382519" class="btn btn-outline">\u0417\u0430\u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0443\u0432\u0430\u0442\u0438</a>
        </div>

      </div>

    </div>
  </section>

  <!-- SERVICES CAROUSEL`;

html = html.substring(0, startIdx) + newAbout + html.substring(endIdx + oldAboutEnd.length);

// Wait — oldAboutEnd includes the services carousel opener, so add it back
// Actually: endIdx points to start of oldAboutEnd string, and oldAboutEnd ends with '<!-- SERVICES CAROUSEL'
// The newAbout already ends with '<!-- SERVICES CAROUSEL', so html.substring(endIdx + oldAboutEnd.length)
// should start at what comes AFTER '  <!-- SERVICES CAROUSEL'
// Let's check: endIdx + oldAboutEnd.length = right after the text

fs.writeFileSync(htmlFile, html, 'utf8');
console.log('HTML updated. File length:', html.length);
console.log('Done!');
