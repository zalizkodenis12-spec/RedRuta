const fs = require('fs');

const file = 'd:/Мої сайти/D&Dflovers_n_cofee-site/index.html';
let html = fs.readFileSync(file, 'utf8');

// Helper to remove block between HTML comments
function removeBlock(startStr, endStr) {
  const startIdx = html.indexOf(startStr);
  if (startIdx === -1) return;
  const endIdx = html.indexOf(endStr, startIdx);
  if (endIdx === -1) return;
  html = html.substring(0, startIdx) + html.substring(endIdx + endStr.length);
}

// 1. Remove SERVICES CAROUSEL
removeBlock('  <!-- SERVICES CAROUSEL -->', '</section>\r\n');
removeBlock('  <!-- SERVICES CAROUSEL -->', '</section>\n');

// 2. Remove ADVANTAGES (Безпека, Час)
removeBlock('  <!-- ADVANTAGES -->', '</section>\r\n');
removeBlock('  <!-- ADVANTAGES -->', '</section>\n');

// 3. Remove FAQ
removeBlock('  <!-- FAQ -->', '</section>\r\n');
removeBlock('  <!-- FAQ -->', '</section>\n');

// 4. Remove Old REVIEWS (the one with "Що кажуть пацієнти")
// My new reviews section has comment "  <!-- REVIEWS -->" but it's higher up.
// Let's find the second instance or specific text.
const oldReviewsStart = html.indexOf('<!-- REVIEWS -->', html.indexOf('<!-- REVIEWS -->') + 10);
if (oldReviewsStart !== -1) {
    const oldReviewsEnd = html.indexOf('</section>', oldReviewsStart);
    if (oldReviewsEnd !== -1) {
        html = html.substring(0, oldReviewsStart) + html.substring(oldReviewsEnd + '</section>'.length);
    }
}

// Clean up any extra empty lines left behind
html = html.replace(/\r\n\s*\r\n\s*\r\n/g, '\r\n\r\n');

fs.writeFileSync(file, html, 'utf8');
console.log('Sections removed from index.html');
