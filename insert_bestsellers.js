const fs = require('fs');
const file = 'd:/Мої сайти/D&Dflovers_n_cofee-site/index.html';
let c = fs.readFileSync(file, 'utf8');

// Find the exact insertion point: after trust-bar </section> before <!-- ABOUT -->
const insertAfter = '  </section>\r\n\r\n  <!-- ABOUT -->';
const insertIdx = c.indexOf(insertAfter);

if (insertIdx === -1) {
  console.log('Insertion point not found');
  process.exit(1);
}

const bestsellersSection = `  </section>\r\n\r\n  <!-- BESTSELLERS -->\r\n  <section class="bestsellers-section" id="catalog">\r\n    <div class="container">\r\n\r\n      <div class="section-head reveal">\r\n        <h2 class="section-title">\u041f\u043e\u043f\u0443\u043b\u044f\u0440\u043d\u0456 \u0431\u0443\u043a\u0435\u0442\u0438</h2>\r\n        <p class="section-desc">\u0421\u0432\u0456\u0436\u0456 \u043a\u0432\u0456\u0442\u0438, \u044f\u043a\u0456 \u043e\u0431\u0438\u0440\u0430\u044e\u0442\u044c \u043d\u0430\u0439\u0447\u0430\u0441\u0442\u0456\u0448\u0435 &mdash; \u0434\u043b\u044f \u043f\u043e\u0434\u0430\u0440\u0443\u043d\u043a\u0430, \u0441\u0432\u044f\u0442\u043a\u0443\u0432\u0430\u043d\u043d\u044f \u0447\u0438 \u043f\u0440\u043e\u0441\u0442\u043e \u0442\u0430\u043a</p>\r\n      </div>\r\n\r\n      <div class="products-grid" id="productsGrid">\r\n        <!-- \u041a\u0430\u0440\u0442\u043a\u0438 \u0433\u0435\u043d\u0435\u0440\u0443\u044e\u0442\u044c\u0441\u044f \u0447\u0435\u0440\u0435\u0437 JS \u0437 \u043c\u0430\u0441\u0438\u0432\u0443 PRODUCTS -->\r\n      </div>\r\n\r\n      <div class="bestsellers-cta reveal">\r\n        <a href="#catalog" class="btn btn-cta" style="padding: 16px 40px; font-size: 15px;">\r\n          \u0414\u0438\u0432\u0438\u0442\u0438\u0441\u044c \u0443\u0441\u0456 \u0431\u0443\u043a\u0435\u0442\u0438\r\n          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18" style="margin-left:8px;"><path d="M5 12h14M12 5l7 7-7 7"/></svg>\r\n        </a>\r\n      </div>\r\n\r\n    </div>\r\n  </section>\r\n\r\n  <!-- ABOUT -->`;

c = c.replace(insertAfter, bestsellersSection);
fs.writeFileSync(file, c, 'utf8');
console.log('Bestsellers section inserted! File length:', c.length);
