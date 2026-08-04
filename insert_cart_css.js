const fs = require('fs');
const cssFile = 'd:/Мої сайти/D&Dflovers_n_cofee-site/assets/css/styles.css';
let css = fs.readFileSync(cssFile, 'utf8');

const cartCSS = `
/* ===== Global Header Cart Button ===== */
.header-cart-btn {
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  padding: 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  transition: color var(--transition);
}
.header-cart-btn:hover {
  color: var(--accent);
}
.cart-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: var(--accent);
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(25%, -25%);
}

/* ===== Product Modal ===== */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(30,10,20,0.6);
  backdrop-filter: blur(4px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  padding: 20px;
}
.modal-overlay.open {
  opacity: 1;
  visibility: visible;
}
.product-modal {
  background: #fff;
  border-radius: 24px;
  width: 100%;
  max-width: 900px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 24px 48px rgba(0,0,0,0.2);
  transform: translateY(20px);
  transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
}
.modal-overlay.open .product-modal {
  transform: translateY(0);
}
.modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255,255,255,0.8);
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  color: var(--text-secondary);
  transition: background var(--transition), color var(--transition);
}
.modal-close:hover {
  background: #f0f0f5;
  color: var(--text-primary);
}
.product-modal-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.pm-image {
  background: linear-gradient(135deg, #fce8ed 0%, #f9d0d8 50%, #f4a7b8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}
.pm-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.pm-info {
  padding: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.pm-title {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 12px;
}
.pm-price {
  font-family: var(--font-display);
  font-size: 24px;
  font-weight: 700;
  color: var(--accent);
  margin-bottom: 24px;
}
.pm-desc {
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 32px;
}
.pm-controls {
  display: flex;
  gap: 16px;
  align-items: center;
}
.qty-control {
  display: flex;
  align-items: center;
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  height: 48px;
}
.qty-control.qty-sm {
  height: 36px;
  border-radius: 8px;
}
.qty-btn {
  background: none;
  border: none;
  width: 40px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  color: var(--text-secondary);
  transition: background var(--transition);
}
.qty-control.qty-sm .qty-btn { width: 30px; }
.qty-btn:hover { background: #f0f0f5; color: var(--text-primary); }
.qty-input {
  width: 40px;
  text-align: center;
  border: none;
  font-family: var(--font-body);
  font-weight: 600;
  color: var(--text-primary);
  outline: none;
  -moz-appearance: textfield;
}
.qty-control.qty-sm .qty-input { width: 30px; font-size: 14px; }
.qty-input::-webkit-outer-spin-button,
.qty-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* ===== Cart Drawer ===== */
.cart-drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(30,10,20,0.6);
  backdrop-filter: blur(4px);
  z-index: 10000;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}
.cart-drawer-overlay.open {
  opacity: 1;
  visibility: visible;
}
.cart-drawer {
  position: absolute;
  top: 0; right: 0; bottom: 0;
  width: 400px;
  max-width: 100vw;
  background: #fff;
  box-shadow: -10px 0 30px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
}
.cart-drawer.open {
  transform: translateX(0);
}
.cart-drawer-header {
  padding: 24px;
  border-bottom: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cart-drawer-header h2 {
  font-family: var(--font-display);
  font-size: 24px;
  margin: 0;
}
.cart-drawer-header .modal-close {
  position: relative;
  top: auto; right: auto;
}
.cart-drawer-body {
  flex-grow: 1;
  overflow-y: auto;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.cart-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-secondary);
  font-family: var(--font-body);
}
.cart-empty svg {
  width: 64px; height: 64px;
  margin-bottom: 16px;
  color: #dcdce2;
}
.cart-item {
  display: flex;
  gap: 16px;
}
.cart-item img, .cart-item-placeholder {
  width: 80px; height: 80px;
  border-radius: 12px;
  object-fit: cover;
}
.cart-item-placeholder {
  background: linear-gradient(135deg, #fce8ed 0%, #f9d0d8 50%, #f4a7b8 100%);
  display: flex; align-items: center; justify-content: center;
}
.cart-item-info {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.cart-item-name {
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}
.cart-item-price {
  font-size: 14px;
  color: var(--accent);
  font-weight: 600;
  margin-bottom: auto;
}
.cart-item-controls {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}
.cart-item-remove {
  background: none; border: none;
  color: #999;
  font-size: 20px;
  cursor: pointer;
  line-height: 1;
}
.cart-item-remove:hover { color: #ff4d4f; }
.cart-drawer-footer {
  padding: 24px;
  border-top: 1px solid var(--border);
  background: #fafafc;
}
.cart-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: var(--font-display);
  font-size: 20px;
  font-weight: 800;
  color: var(--text-primary);
  margin-bottom: 20px;
}

/* Responsive Overrides */
@media (max-width: 768px) {
  .product-modal-grid { grid-template-columns: 1fr; }
  .pm-image { min-height: 300px; }
  .pm-info { padding: 32px 24px; }
  .pm-title { font-size: 24px; }
  
  .cart-drawer { width: 100%; }
}
`;

if (!css.includes('.modal-overlay')) {
  css += '\r\n' + cartCSS;
  fs.writeFileSync(cssFile, css, 'utf8');
  console.log('CSS updated with cart styles.');
}
