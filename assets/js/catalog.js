document.addEventListener('DOMContentLoaded', () => {
  if (typeof PRODUCTS === 'undefined' || typeof CATEGORIES === 'undefined' || typeof createProductCard !== 'function') {
    console.error('Dependencies not loaded');
    return;
  }

  const grid = document.getElementById('catalogGrid');
  const emptyState = document.getElementById('catalogEmpty');
  const catalogTitle = document.getElementById('catalogTitle');
  const catalogCount = document.getElementById('catalogCount');
  const breadcrumbCategory = document.getElementById('breadcrumbCategory');
  
  // URL Params
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategorySlug = urlParams.get('category');

  // Populate category checkboxes dynamically based on CATEGORIES
  const categoryCheckboxesContainer = document.getElementById('categoryCheckboxes');
  if (categoryCheckboxesContainer) {
    CATEGORIES.forEach(cat => {
      const label = document.createElement('label');
      label.className = 'filter-checkbox';
      // Pre-check if matches URL
      const isChecked = cat.slug === initialCategorySlug ? 'checked' : '';
      label.innerHTML = `<input type="checkbox" name="category" value="\${cat.slug}" \${isChecked}> \${cat.name}`;
      categoryCheckboxesContainer.appendChild(label);
    });
  }

  // Set initial title/breadcrumbs based on URL category
  let currentTitle = 'Всі товари';
  if (initialCategorySlug) {
    const cat = CATEGORIES.find(c => c.slug === initialCategorySlug);
    if (cat) {
      currentTitle = cat.name;
    }
  }
  catalogTitle.textContent = currentTitle;
  breadcrumbCategory.textContent = currentTitle;

  // Render function
  function renderProducts() {
    grid.innerHTML = '';
    
    // 1. Gather active filters
    const minPrice = parseInt(document.getElementById('priceMin').value) || 0;
    const maxPrice = parseInt(document.getElementById('priceMax').value) || Infinity;
    
    const activeColors = Array.from(document.querySelectorAll('input[name="color"]:checked')).map(cb => cb.value);
    const activeTypes = Array.from(document.querySelectorAll('input[name="type"]:checked')).map(cb => cb.value);
    const activeCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(cb => cb.value);

    // 2. Filter PRODUCTS
    let filtered = PRODUCTS.filter(p => {
      let pass = true;
      if (p.price < minPrice || p.price > maxPrice) pass = false;
      if (activeColors.length > 0 && !activeColors.includes(p.color)) pass = false;
      if (activeTypes.length > 0 && !activeTypes.includes(p.type)) pass = false;
      if (activeCategories.length > 0 && !activeCategories.includes(p.categorySlug)) pass = false;
      return pass;
    });

    // Update Category Title based on selected checkboxes if only one category is selected (otherwise "Всі товари")
    if (activeCategories.length === 1) {
       const cat = CATEGORIES.find(c => c.slug === activeCategories[0]);
       if (cat) {
         catalogTitle.textContent = cat.name;
         breadcrumbCategory.textContent = cat.name;
       }
    } else {
       catalogTitle.textContent = 'Каталог';
       breadcrumbCategory.textContent = 'Всі товари';
    }

    // 3. Sort
    const sortVal = document.getElementById('sortSelect').value;
    filtered.sort((a, b) => {
      if (sortVal === 'price_asc') return a.price - b.price;
      if (sortVal === 'price_desc') return b.price - a.price;
      if (sortVal === 'new') return new Date(b.dateAdded) - new Date(a.dateAdded);
      // popular
      return (b.sales || 0) - (a.sales || 0);
    });

    // 4. Render
    if (filtered.length === 0) {
      grid.style.display = 'none';
      emptyState.style.display = 'block';
    } else {
      grid.style.display = '';
      emptyState.style.display = 'none';
      filtered.forEach(p => {
        grid.appendChild(createProductCard(p));
      });
    }

    // Update count
    catalogCount.textContent = \`\${filtered.length} товарів\`;
  }

  // Initial render
  renderProducts();

  // Listeners for filters
  const filterInputs = document.querySelectorAll('.catalog-sidebar input');
  filterInputs.forEach(input => {
    input.addEventListener('change', renderProducts);
    input.addEventListener('input', renderProducts); // for range slider or typing in min/max
  });
  
  // Link range slider to max price input
  const priceRange = document.getElementById('priceRange');
  const priceMax = document.getElementById('priceMax');
  if(priceRange && priceMax) {
      priceRange.addEventListener('input', (e) => {
          priceMax.value = e.target.value;
          renderProducts();
      });
      priceMax.addEventListener('input', (e) => {
          priceRange.value = e.target.value;
      });
  }

  // Sort listener
  document.getElementById('sortSelect').addEventListener('change', renderProducts);

  // Reset filters
  const resetBtns = [document.getElementById('resetFiltersBtn'), document.getElementById('resetFiltersEmptyBtn')];
  resetBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', () => {
        document.getElementById('priceMin').value = '';
        document.getElementById('priceMax').value = '';
        if(priceRange) priceRange.value = priceRange.max;
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
        // If URL had category, should we keep it? User probably means full reset.
        renderProducts();
      });
    }
  });

  // Accordion toggles
  document.querySelectorAll('.filter-group-title').forEach(btn => {
    btn.addEventListener('click', () => {
      const isActive = btn.classList.toggle('active');
      btn.setAttribute('aria-expanded', isActive);
      const content = btn.nextElementSibling;
      if (isActive) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = '0';
      }
    });
  });

  // Grid/List View Toggle
  const viewBtns = document.querySelectorAll('.view-btn');
  viewBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      viewBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const view = btn.getAttribute('data-view');
      if (view === 'list') {
        grid.classList.add('list-view');
      } else {
        grid.classList.remove('list-view');
      }
    });
  });

  // Mobile Sidebar Toggle
  const sidebar = document.querySelector('.catalog-sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const openBtn = document.getElementById('filterOpenBtn');
  const closeBtn = document.getElementById('filterCloseBtn');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (openBtn) openBtn.addEventListener('click', openSidebar);
  if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
  if (overlay) overlay.addEventListener('click', closeSidebar);

});
