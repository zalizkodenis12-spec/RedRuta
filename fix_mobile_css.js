const fs = require('fs');
const file = 'd:/Мої сайти/D&Dflovers_n_cofee-site/assets/css/styles.css';
let c = fs.readFileSync(file, 'utf8');

// Find mobile media query block and add missing rules after .burger line
const burgerLine = '  .burger { display: flex; grid-column: 3; }\r\n';
const burgerIdx = c.indexOf(burgerLine);

if (burgerIdx === -1) {
  console.log('burger line not found');
  process.exit(1);
}

// Check what comes right after burger line
const afterBurger = c.substring(burgerIdx + burgerLine.length, burgerIdx + burgerLine.length + 200);
console.log('After burger:', JSON.stringify(afterBurger.substring(0, 100)));

// Build the missing rules to insert
const missingRules = `  .mobile-cta { display: flex; }\r\n  .site-header { padding: 10px 0; }\r\n  .logo-avatar-circle { width: 44px; height: 44px; }\r\n  .hero { padding-top: 70px; min-height: 100svh; }\r\n  .hero-inner { max-width: 90% !important; padding-bottom: 40px; }\r\n  .hero-title { font-size: clamp(2.4rem, 10vw, 3.2rem); margin-bottom: 16px; }\r\n  .hero-title em { font-size: 1.05em; }\r\n  .hero-sub { font-size: 0.88rem; margin-bottom: 24px; }\r\n  .hero-actions { flex-direction: column; align-items: stretch; gap: 12px; margin-bottom: 20px; }\r\n  .hero-actions .btn { width: 100%; justify-content: center; padding: 16px; }\r\n  .hero-meta { flex-direction: row; flex-wrap: wrap; gap: 2px 8px; font-size: 11.5px; line-height: 1.5; }\r\n  .trust-bar { padding: 28px 0; }\r\n  .trust-grid { grid-template-columns: 1fr 1fr; gap: 18px; }\r\n  .trust-item { flex-direction: column; gap: 8px; text-align: center; align-items: center; }\r\n  .trust-item svg { width: 26px; height: 26px; }\r\n  .trust-item strong { font-size: 13.5px; }\r\n  .trust-item span { font-size: 12px; }\r\n  .products-grid { grid-template-columns: 1fr; gap: 14px; }\r\n  .bestsellers-section { padding: 56px 0; }\r\n  .section { padding: 56px 0; }\r\n  .section-head { margin-bottom: 32px; }\r\n  .section-title { font-size: clamp(1.65rem, 7vw, 2.1rem); }\r\n  .section-desc { font-size: 14.5px; }\r\n  .price-table-wrap { border-radius: 12px; display: flex; flex-direction: column; }\r\n  .pt-category { border-right: none; border-bottom: 1px solid var(--border); }\r\n  .pt-category:last-of-type { border-bottom: none; }\r\n  .pt-footer { grid-column: auto; }\r\n  .pt-cat-label { padding: 14px 18px 12px; font-size: 11px; letter-spacing: 0.1em; }\r\n  .pt-row { padding: 12px 18px; gap: 8px; }\r\n  .pt-name { font-size: 14px; white-space: normal; }\r\n`;

// Check if mobile-cta is already there right after burger
if (!afterBurger.includes('.mobile-cta')) {
  c = c.substring(0, burgerIdx + burgerLine.length) + missingRules + c.substring(burgerIdx + burgerLine.length);
  fs.writeFileSync(file, c, 'utf8');
  console.log('SUCCESS: mobile rules inserted. New length:', c.length);
} else {
  console.log('mobile-cta already present after burger, no change needed');
}
