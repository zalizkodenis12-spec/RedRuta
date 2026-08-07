/**
 * D&D Flowers — Глобальний Кошик та Модалка Товару
 * Цей скрипт підключається на всі сторінки і автоматично створює UI.
 */
document.addEventListener('DOMContentLoaded', () => {
  // --- STATE ---
  let cart = JSON.parse(localStorage.getItem('cart') || '[]');

  // --- 1. ВПОРСКУВАННЯ DOM (Іконка шапки, Модалка, Кошик) ---
  
  // Додаємо кнопку кошика в шапку (в .nav-right)
  const navRight = document.querySelector('.nav-right');
  if (navRight) {
    const cartBtn = document.createElement('button');
    cartBtn.className = 'header-cart-btn';
    cartBtn.id = 'headerCartBtn';
    cartBtn.setAttribute('aria-label', 'Кошик');
    cartBtn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
        <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
      </svg>
      <span class="cart-badge" id="cartBadge">0</span>
    `;
    // Вставляємо перед кнопкою "Замовити" або в кінець
    const orderBtn = navRight.querySelector('.btn-cta');
    if (orderBtn) {
      navRight.insertBefore(cartBtn, orderBtn);
    } else {
      navRight.appendChild(cartBtn);
    }
  }

  // Створюємо HTML для Модалки і Кошика і додаємо в body
  const globalUI = document.createElement('div');
  globalUI.id = 'globalUIContainer';
  globalUI.innerHTML = `
    <!-- Cart Drawer -->
    <div class="cart-drawer-overlay" id="cartDrawerOverlay">
      <div class="cart-drawer" id="cartDrawer">
        <div class="cart-drawer-header">
          <h2>Кошик</h2>
          <button class="modal-close" id="cartDrawerClose" aria-label="Закрити">&times;</button>
        </div>
        
        <div class="cart-drawer-body" id="cartDrawerBody">
          <!-- Items will be injected here -->
        </div>
        
        <div class="cart-drawer-footer">
          <div class="cart-total">
            <span>Разом:</span>
            <span id="cartTotalSum">0 ₴</span>
          </div>
          <button class="btn btn-cta" style="width: 100%;">Оформити замовлення</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(globalUI);

  // --- 2. ЕЛЕМЕНТИ DOM ---
  const badge = document.getElementById('cartBadge');
  const headerCartBtn = document.getElementById('headerCartBtn');

  // Cart Drawer elements
  const cartDrawerOverlay = document.getElementById('cartDrawerOverlay');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartDrawerClose = document.getElementById('cartDrawerClose');
  const cartDrawerBody = document.getElementById('cartDrawerBody');
  const cartTotalSum = document.getElementById('cartTotalSum');

  // --- 3. ФУНКЦІЇ КОШИКА ---
  function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
  }

  function updateCartUI() {
    // Update badge
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    if (badge) {
      badge.textContent = totalItems;
      badge.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    // Render Cart Items
    cartDrawerBody.innerHTML = '';
    let totalSum = 0;

    if (cart.length === 0) {
      cartDrawerBody.innerHTML = `
        <div class="cart-empty">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <p>Кошик порожній</p>
        </div>
      `;
    } else {
      cart.forEach((item, index) => {
        totalSum += item.price * item.qty;
        
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        
        const imgHtml = item.image 
          ? `<img src="${item.image}" alt="${item.name}">`
          : `<div class="cart-item-placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2a4 4 0 0 1 0 8 4 4 0 0 1 0-8z"/><path d="M12 14a4 4 0 0 1 0 8 4 4 0 0 1 0-8z"/><path d="M2 12a4 4 0 0 1 8 0 4 4 0 0 1-8 0z"/><path d="M14 12a4 4 0 0 1 8 0 4 4 0 0 1-8 0z"/><circle cx="12" cy="12" r="2.5" fill="var(--accent)" stroke="none"/></svg></div>`;

        itemEl.innerHTML = `
          ${imgHtml}
          <div class="cart-item-info">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-price">${item.price.toLocaleString('uk-UA')} ₴</div>
            <div class="cart-item-controls">
              <div class="qty-control qty-sm">
                <button class="qty-btn" onclick="window.updateCartQty(${index}, -1)">&minus;</button>
                <input type="number" class="qty-input" value="${item.qty}" readonly>
                <button class="qty-btn" onclick="window.updateCartQty(${index}, 1)">&plus;</button>
              </div>
              <button class="cart-item-remove" onclick="window.removeFromCart(${index})" aria-label="Видалити">&times;</button>
            </div>
          </div>
        `;
        cartDrawerBody.appendChild(itemEl);
      });
    }

    cartTotalSum.textContent = totalSum.toLocaleString('uk-UA') + ' ₴';
  }

  // Експортуємо глобальні функції для викликів з HTML
  window.updateCartQty = function(index, delta) {
    if (cart[index]) {
      cart[index].qty += delta;
      if (cart[index].qty < 1) {
        cart.splice(index, 1);
      }
      saveCart();
    }
  };

  window.removeFromCart = function(index) {
    cart.splice(index, 1);
    saveCart();
  };

  window.addToCart = function(productId, qty) {
    // Шукаємо товар вPRODUCTS (передбачається що products.js вже завантажено і PRODUCTS глобальний)
    if (typeof PRODUCTS === 'undefined') return;
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
      existingItem.qty += qty;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: qty
      });
    }
    saveCart();
    
    // Показуємо кошик після додавання
    openCartDrawer();
  };

  // --- 4. ФУНКЦІЇ ШТОРКИ КОШИКА ---
  function openCartDrawer() {
    cartDrawerOverlay.classList.add('open');
    cartDrawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCartDrawer() {
    cartDrawerOverlay.classList.remove('open');
    cartDrawer.classList.remove('open');
    document.body.style.overflow = '';
  }

  // --- 5. EVENT LISTENERS ---
  if (headerCartBtn) headerCartBtn.addEventListener('click', openCartDrawer);
  if (cartDrawerClose) cartDrawerClose.addEventListener('click', closeCartDrawer);
  if (cartDrawerOverlay) cartDrawerOverlay.addEventListener('click', (e) => {
    if (e.target === cartDrawerOverlay) closeCartDrawer();
  });

  // Init
  updateCartUI();
});
