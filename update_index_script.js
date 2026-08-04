const fs = require('fs');

const file = 'd:/Мої сайти/D&Dflovers_n_cofee-site/index.html';
let html = fs.readFileSync(file, 'utf8');

const searchStr = `    // Heart SVG outline
    const heartSVG = \`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>\`;`;

const endStr = `      grid.appendChild(card);
    });`;

const startIdx = html.indexOf(searchStr);
const endIdx = html.indexOf(endStr, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  const replacement = `    PRODUCTS.forEach(function(product) {
      if (typeof createProductCard === 'function') {
        const card = createProductCard(product);
        grid.appendChild(card);
      }
    });`;
  
  html = html.substring(0, startIdx) + replacement + html.substring(endIdx + endStr.length);
  fs.writeFileSync(file, html, 'utf8');
  console.log('Successfully updated index.html to use createProductCard.');
} else {
  console.log('Failed to find block to replace.');
}
