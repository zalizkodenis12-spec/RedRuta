const fs = require('fs');
const file = 'd:/Мої сайти/D&Dflovers_n_cofee-site/index.html';
let c = fs.readFileSync(file, 'utf8');

// Enable hero real flower photo
if (c.includes('hero-bg-gradient')) {
  // Replace gradient div with real flower photo
  c = c.replace(
    /(<div class="hero-bg">[\r\n\s]+)<!-- TODO[^>]+>\s*<div class="hero-bg-gradient"><\/div>\s*<!-- [^>]+-->/,
    '$1<!-- TODO: замінити на власне фото квітів -->\n      <img src="assets/images/\u0434\u043b\u044f \u043f\u0435\u0440\u0448\u043e\u0433\u043e \u0435\u043a\u0440\u0430\u043d\u0430.png" alt="D&amp;D Flowers \u2014 \u0441\u0432\u0456\u0436\u0456 \u043a\u0432\u0456\u0442\u0438 \u0412\u0456\u043d\u043d\u0438\u0446\u044f" loading="eager">'
  );
  fs.writeFileSync(file, c, 'utf8');
  console.log('Hero photo enabled! Length:', c.length);
} else {
  console.log('hero-bg-gradient not found');
}
