const fs = require('fs');
const file = 'd:/Мої сайти/D&Dflovers_n_cofee-site/index.html';
let c = fs.readFileSync(file, 'utf8');

// Update footer logo (old MaksiDent logo → D&D avatar)
c = c.replace(
  `<a href="#top" class="logo">\r\n      <img src="assets/images/лого.png" alt="MaksiDent" style="height: 48px; width: auto; max-width: 100%;">\r\n    </a>`,
  `<a href="#top" class="logo" style="display:flex;align-items:center;gap:10px;">\r\n      <div style="width:40px;height:40px;border-radius:50%;overflow:hidden;border:2px solid var(--accent);flex-shrink:0;">\r\n        <img src="assets/images/Ава квітковий.png" alt="D&D Flowers" style="width:100%;height:100%;object-fit:cover;">\r\n      </div>\r\n      <span style="font-family:var(--font-display);font-weight:700;font-size:16px;color:var(--text-primary);">D&amp;D Flowers</span>\r\n    </a>`
);

// Update footer nav — replace dental items with flower shop items
c = c.replace(
  `<a href="#services">Послуги</a>\r\n      <a href="#works">Роботи</a>\r\n      <a href="#about">Про нас</a>`,
  `<a href="#catalog">Каталог</a>\r\n      <a href="#delivery">Доставка</a>\r\n      <a href="#about">Про нас</a>`
);

// Update Instagram link
c = c.replace(
  `href="https://instagram.com" target="_blank" rel="noopener" aria-label="Instagram"`,
  `href="https://instagram.com/d.n.d_flowers" target="_blank" rel="noopener" aria-label="Instagram D&D Flowers"`
);

// Update footer copyright and address
c = c.replace(
  `\u00a9 2026 MaksiDent. \u0423\u0441\u0456 \u043f\u0440\u0430\u0432\u0430 \u0437\u0430\u0445\u0438\u0449\u0435\u043d\u043e.</span>\r\n    <span>\u043c. \u0425\u043c\u0435\u043b\u044c\u043d\u0438\u0446\u044c\u043a\u0438\u0439, \u0432\u0443\u043b. \u041a\u0430\u043c'\u044f\u043d\u0435\u0446\u044c\u043a\u0430, 105`,
  `&copy; 2026 D&amp;D Flowers. \u0423\u0441\u0456 \u043f\u0440\u0430\u0432\u0430 \u0437\u0430\u0445\u0438\u0449\u0435\u043d\u043e.</span>\r\n    <span>\u043c. \u0412\u0456\u043d\u043d\u0438\u0446\u044f, \u0432\u0443\u043b. \u0422\u0440\u0430\u043c\u0432\u0430\u0439\u043d\u0430, 3`
);

fs.writeFileSync(file, c, 'utf8');
console.log('Footer updated successfully! File length:', c.length);
