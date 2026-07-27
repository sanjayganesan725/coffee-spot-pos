/* ==========================================================================
   COFFEE SPOT POS — APPLICATION LOGIC
   ========================================================================== */

// Default Catalog Structure (Coffee Spot Counter Menu)
const DEFAULT_CATALOG = [
  { id: 'cat-1', cat: 'Beverages (₹15)', name: 'Tea', price: 15, icon: '☕', hotkey: '1', stock: 'instock' },
  { id: 'cat-2', cat: 'Beverages (₹15)', name: 'Coffee', price: 15, icon: '🥤', hotkey: '2', stock: 'instock' },
  { id: 'cat-3', cat: 'Beverages (₹15)', name: 'Black Tea', price: 15, icon: '🍵', hotkey: '3', stock: 'instock' },
  { id: 'cat-4', cat: 'Beverages (₹15)', name: 'Black Coffee', price: 15, icon: '☕', hotkey: '4', stock: 'instock' },
  { id: 'cat-5', cat: 'Health Drinks', name: 'Boost', price: 20, icon: '🥛', hotkey: '5', stock: 'instock' },
  { id: 'cat-6', cat: 'Health Drinks', name: 'Horlicks', price: 20, icon: '🥛', hotkey: '', stock: 'instock' },
  { id: 'cat-7', cat: 'Snacks & Eats', name: 'Vada', price: 10, icon: '🧆', hotkey: '6', stock: 'instock' },
  { id: 'cat-8', cat: 'Snacks & Eats', name: 'Cauliflower', price: 40, icon: '🥦', hotkey: '7', stock: 'instock' },
  { id: 'cat-9', cat: 'Biscuits', name: 'Biscuits ₹5', price: 5, icon: '🍪', hotkey: '', stock: 'instock' },
  { id: 'cat-10', cat: 'Biscuits', name: 'Biscuits ₹10', price: 10, icon: '🍪', hotkey: '8', stock: 'instock' },
  { id: 'cat-11', cat: 'Biscuits', name: 'Biscuits ₹20', price: 20, icon: '🍪', hotkey: '9', stock: 'instock' },
  { id: 'cat-12', cat: 'Biscuits', name: 'Biscuits ₹30', price: 30, icon: '🍪', hotkey: '', stock: 'instock' },
  { id: 'cat-13', cat: 'Juice', name: 'Juice ₹20', price: 20, icon: '🧃', hotkey: '0', stock: 'instock' },
  { id: 'cat-14', cat: 'Juice', name: 'Juice ₹25', price: 25, icon: '🧃', hotkey: '', stock: 'instock' },
  { id: 'cat-15', cat: 'Juice', name: 'Juice ₹30', price: 30, icon: '🧃', hotkey: '', stock: 'instock' }
];

// Helper functions
const $ = id => document.getElementById(id);
const money = n => "₹" + Number(n).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const getTodayString = () => new Date().toISOString().slice(0, 10);

// Application State
let catalog = loadCatalog();
let currentDate = getTodayString();
let cart = [];
let selectedCategory = 'ALL';
let paymentMethod = 'Cash';
let paymentStatus = 'Paid';
let billsFilterStatus = 'ALL';
let storeInfo = loadStoreInfo();
let globalBillNo = parseInt(localStorage.getItem('coffee_pos:bill_no')) || 101;
let globalTokenNo = parseInt(localStorage.getItem('coffee_pos:token_no')) || 1;

let selectedPeriodTab = 'daily';
let selectedMonthStr = getTodayString().slice(0, 7);
let selectedYearStr = getTodayString().slice(0, 4);

let hourlyChartInstance = null;
let categoryChartInstance = null;
let summaryChartInstance = null;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initStoreBranding();
  initDateNav();
  initCategoryTabs();
  renderCatalogGrid();
  renderCart();
  updateKPIs();
  bindEvents();
  initMobileNavigation();
  initPWA();
});

// ---------- STORAGE HELPERS ----------
function loadCatalog() {
  try {
    const raw = localStorage.getItem('coffee_pos:catalog_v1');
    return raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(DEFAULT_CATALOG));
  } catch (e) {
    return JSON.parse(JSON.stringify(DEFAULT_CATALOG));
  }
}

function saveCatalog() {
  localStorage.setItem('coffee_pos:catalog_v1', JSON.stringify(catalog));
}

function loadStoreInfo() {
  try {
    const raw = localStorage.getItem('coffee_pos:store_info');
    const defaultStore = {
      name: 'Coffee Spot',
      tagline: 'Gandhigram Rural Institute, Chinnalapatti, Dindigul',
      upi: 'coffeespot@upi',
      footer: 'Thank you for visiting Coffee Spot! Have a wonderful day ☕',
      audioEnabled: true
    };
    return raw ? Object.assign(defaultStore, JSON.parse(raw)) : defaultStore;
  } catch (e) {
    return {
      name: 'Coffee Spot',
      tagline: 'Gandhigram Rural Institute, Chinnalapatti, Dindigul',
      upi: '',
      footer: 'Thank you for visiting Coffee Spot! Have a wonderful day ☕',
      audioEnabled: true
    };
  }
}

function saveStoreInfo() {
  localStorage.setItem('coffee_pos:store_info', JSON.stringify(storeInfo));
}

// Audio Chime Synthesizer using Web Audio API
function playChime(type = 'add') {
  if (storeInfo.audioEnabled === false) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'add') {
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } else if (type === 'complete') {
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08);
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } else if (type === 'delete') {
      osc.frequency.setValueAtTime(400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    }
  } catch (e) {}
}

function loadSales(date) {
  try {
    const raw = localStorage.getItem('coffee_pos:sales:' + date);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveSales(date, salesList) {
  localStorage.setItem('coffee_pos:sales:' + date, JSON.stringify(salesList));
}

function loadLabour(date) {
  try {
    const raw = localStorage.getItem('coffee_pos:labour:' + date);
    return raw ? JSON.parse(raw) : { teaMaster: 0, vadaMaster: 0 };
  } catch (e) {
    return { teaMaster: 0, vadaMaster: 0 };
  }
}

function saveLabour(date, labourObj) {
  localStorage.setItem('coffee_pos:labour:' + date, JSON.stringify(labourObj));
}

function loadExpenses(date) {
  try {
    const raw = localStorage.getItem('coffee_pos:expenses:' + date);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveExpenses(date, expenseList) {
  localStorage.setItem('coffee_pos:expenses:' + date, JSON.stringify(expenseList));
}

// ---------- THEME & STORE BRANDING ----------
function initTheme() {
  const savedTheme = localStorage.getItem('coffee_pos:theme') || 'parchment';
  document.documentElement.setAttribute('data-theme', savedTheme);
  $('themeSelect').value = savedTheme;

  $('themeSelect').addEventListener('change', (e) => {
    const theme = e.target.value;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('coffee_pos:theme', theme);
  });
}

function initStoreBranding() {
  $('shopNameDisplay').textContent = storeInfo.name;
  $('shopTagDisplay').textContent = storeInfo.tagline;
  $('storeNameInput').value = storeInfo.name;
  $('storeTagInput').value = storeInfo.tagline;
  $('storeUpiInput').value = storeInfo.upi || '';
  if ($('storeFooterInput')) $('storeFooterInput').value = storeInfo.footer || '';
  if ($('audioToggleInput')) $('audioToggleInput').checked = storeInfo.audioEnabled !== false;
}

// ---------- DATE NAVIGATION ----------
function initDateNav() {
  const dateInput = $('dateSelect');
  dateInput.value = currentDate;

  dateInput.addEventListener('change', (e) => {
    currentDate = e.target.value;
    updateDateLabel();
    updateKPIs();
  });

  $('prevDayBtn').onclick = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() - 1);
    currentDate = d.toISOString().slice(0, 10);
    dateInput.value = currentDate;
    updateDateLabel();
    updateKPIs();
  };

  $('nextDayBtn').onclick = () => {
    const d = new Date(currentDate);
    d.setDate(d.getDate() + 1);
    currentDate = d.toISOString().slice(0, 10);
    dateInput.value = currentDate;
    updateDateLabel();
    updateKPIs();
  };

  updateDateLabel();
}

function updateDateLabel() {
  const today = getTodayString();
  $('todayLabel').textContent = (currentDate === today) ? 'Today' : currentDate;
  $('dateSubLabel').textContent = (currentDate === today) ? 'Today\'s Sales' : currentDate;
}

// ---------- CATEGORY & QUICK POS TOUCH GRID ----------
function initCategoryTabs() {
  const categories = ['ALL', ...new Set(catalog.map(i => i.cat))];
  const container = $('categoryTabs');
  const datalist = $('categoryDatalist');

  container.innerHTML = '';
  datalist.innerHTML = '';

  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = `cat-tab ${cat === selectedCategory ? 'active' : ''}`;
    btn.textContent = cat === 'ALL' ? '☕ All Menu Items' : cat;
    btn.onclick = () => {
      selectedCategory = cat;
      document.querySelectorAll('.cat-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCatalogGrid();
    };
    container.appendChild(btn);

    if (cat !== 'ALL') {
      const opt = document.createElement('option');
      opt.value = cat;
      datalist.appendChild(opt);
    }
  });
}

function renderCatalogGrid() {
  const grid = $('quickPosGrid');
  const searchQuery = $('itemSearch') ? $('itemSearch').value.toLowerCase().trim() : '';

  grid.innerHTML = '';

  const filtered = catalog.filter(item => {
    const matchCat = (selectedCategory === 'ALL' || item.cat === selectedCategory);
    const matchSearch = item.name.toLowerCase().includes(searchQuery) || item.cat.toLowerCase().includes(searchQuery);
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 40px 10px; color: var(--text-muted);">No items found.</div>`;
    return;
  }

  filtered.forEach(item => {
    const isOut = item.stock === 'outstock';
    const isLow = item.stock === 'lowstock';
    const btn = document.createElement('button');
    btn.className = `pos-btn ${isOut ? 'out-of-stock' : ''}`;
    btn.onclick = () => {
      if (isOut) {
        showToast(`❌ ${item.name} is currently Out of Stock`);
        return;
      }
      addToCart(item);
    };

    const hkHtml = item.hotkey ? `<span class="hk-badge" title="Hotkey: ${item.hotkey}">${item.hotkey}</span>` : '';
    const stockBadgeHtml = isLow ? `<span class="badge-lowstock" style="font-size:0.65rem; margin-top:2px;">Low Stock</span>` : (isOut ? `<span class="badge-outstock" style="font-size:0.65rem; margin-top:2px;">Out of Stock</span>` : '');

    btn.innerHTML = `
      ${hkHtml}
      <span class="btn-emoji">${item.icon || '☕'}</span>
      <span class="btn-title">${item.name}</span>
      <span class="btn-price">${money(item.price)}</span>
      ${stockBadgeHtml}
    `;

    grid.appendChild(btn);
  });
}

// ---------- CART OPERATIONS ----------
function addToCart(item) {
  triggerHaptic();
  playChime('add');
  const existing = cart.find(c => c.id === item.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: item.id,
      name: item.name,
      price: item.price,
      qty: 1,
      icon: item.icon
    });
  }
  renderCart();
}

function updateCartQty(id, delta) {
  triggerHaptic();
  if (delta > 0) playChime('add');
  else playChime('delete');
  const idx = cart.findIndex(c => c.id === id);
  if (idx !== -1) {
    cart[idx].qty += delta;
    if (cart[idx].qty <= 0) {
      cart.splice(idx, 1);
    }
  }
  renderCart();
}

function removeFromCart(id) {
  playChime('delete');
  cart = cart.filter(c => c.id !== id);
  renderCart();
}

function renderCart() {
  const tbody = $('cartItemsList');
  tbody.innerHTML = '';

  if (cart.length === 0) {
    tbody.innerHTML = `
      <tr class="empty-cart-row">
        <td colspan="5" style="text-align:center; padding: 40px 10px; color: var(--text-muted);">
          🛒 Cart is empty<br><small>Click any menu item or use hotkeys [1-9, 0]</small>
        </td>
      </tr>
    `;
    updateCartTotals();
    return;
  }

  cart.forEach(item => {
    const itemTotal = item.price * item.qty;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${item.name}</strong></td>
      <td style="font-family:var(--font-mono);">${money(item.price)}</td>
      <td>
        <div class="qty-control">
          <button class="btn-qty" onclick="updateCartQty('${item.id}', -1)">-</button>
          <span class="qty-val">${item.qty}</span>
          <button class="btn-qty" onclick="updateCartQty('${item.id}', 1)">+</button>
        </div>
      </td>
      <td style="font-family:var(--font-mono); text-align:right;">${money(itemTotal)}</td>
      <td><button class="btn-remove-item" onclick="removeFromCart('${item.id}')">✕</button></td>
    `;
    tbody.appendChild(tr);
  });

  updateCartTotals();
}

function updateCartTotals() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const totalItemCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const discountPercent = parseFloat($('cartDiscount').value) || 0;
  const discountAmount = (subtotal * discountPercent) / 100;
  const grandTotal = Math.max(0, subtotal - discountAmount);

  $('cartSubtotal').textContent = money(subtotal);
  $('cartGrandTotal').textContent = money(grandTotal);

  // Update Change Calculator
  const cashGiven = parseFloat($('cashGiven').value) || 0;
  const changeDue = Math.max(0, cashGiven - grandTotal);
  $('changeDue').textContent = money(changeDue);

  $('nextTokenNo').textContent = globalTokenNo;

  // Mobile Floating Cart & Navigation Badge Updates
  if ($('mCartCount')) $('mCartCount').textContent = totalItemCount;
  if ($('mCartTotal')) $('mCartTotal').textContent = money(grandTotal);
  if ($('mnavCartBadge')) $('mnavCartBadge').textContent = totalItemCount;

  const floatBar = $('mobileFloatingCartBar');
  if (floatBar) {
    if (cart.length > 0 && window.innerWidth <= 768) {
      floatBar.style.display = 'flex';
    } else {
      floatBar.style.display = 'none';
    }
  }
}

function initMobileNavigation() {
  const posLeft = document.querySelector('.pos-left');
  const posRight = document.querySelector('.pos-right');

  const mnavPos = $('mnavPos');
  const mnavCart = $('mnavCart');
  const mnavLedger = $('mnavLedger');
  const mnavExpenses = $('mnavExpenses');
  const mnavReports = $('mnavReports');
  const mCheckoutBtn = $('mCheckoutBtn');

  function showMobileView(view) {
    document.querySelectorAll('.m-nav-item').forEach(b => b.classList.remove('active'));

    if (view === 'pos') {
      if (mnavPos) mnavPos.classList.add('active');
      if (posLeft) posLeft.classList.remove('mobile-hidden');
      if (posRight) posRight.classList.add('mobile-hidden');
    } else if (view === 'cart') {
      if (mnavCart) mnavCart.classList.add('active');
      if (posLeft) posLeft.classList.add('mobile-hidden');
      if (posRight) posRight.classList.remove('mobile-hidden');
    }
  }

  if (mnavPos) mnavPos.onclick = () => showMobileView('pos');
  if (mnavCart) mnavCart.onclick = () => showMobileView('cart');
  if (mCheckoutBtn) mCheckoutBtn.onclick = () => showMobileView('cart');

  if (mnavLedger) mnavLedger.onclick = () => openCustomerLedger();
  if (mnavExpenses) mnavExpenses.onclick = () => openExpensesManager();
  if (mnavReports) mnavReports.onclick = () => openReportsManager();

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      if (posLeft) posLeft.classList.remove('mobile-hidden');
      if (posRight) posRight.classList.remove('mobile-hidden');
      if ($('mobileFloatingCartBar')) $('mobileFloatingCartBar').style.display = 'none';
    } else {
      updateCartTotals();
    }
  });

  if (window.innerWidth <= 768) {
    showMobileView('pos');
  }
}

// ---------- CHECKOUT & BILL GENERATION ----------
function checkoutCart() {
  if (cart.length === 0) {
    showToast('⚠️ Cart is empty! Add items first.');
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const discountPercent = parseFloat($('cartDiscount').value) || 0;
  const discountAmount = (subtotal * discountPercent) / 100;
  const grandTotal = Math.max(0, subtotal - discountAmount);

  const billNo = globalBillNo++;
  const tokenNo = globalTokenNo++;
  localStorage.setItem('coffee_pos:bill_no', globalBillNo);
  localStorage.setItem('coffee_pos:token_no', globalTokenNo);

  const now = new Date();
  const dateStr = currentDate;
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const dateTimeFormatted = `${dateStr} ${timeStr}`;

  const custName = $('customerName').value.trim() || 'Walk-in Customer';
  const custDept = $('customerDept').value.trim() || 'General';
  const custPhone = $('customerPhone').value.trim() || '—';

  const saleRecord = {
    billNo: billNo,
    tokenNo: tokenNo,
    date: dateStr,
    time: timeStr,
    buyingDateTime: dateTimeFormatted,
    timestamp: now.getTime(),
    customerName: custName,
    customerDept: custDept,
    customerPhone: custPhone,
    orderType: $('orderType').value,
    paymentMethod: paymentMethod,
    paymentStatus: paymentStatus, // 'Paid' or 'Unpaid'
    items: JSON.parse(JSON.stringify(cart)),
    subtotal: subtotal,
    discountPercent: discountPercent,
    discountAmount: discountAmount,
    grandTotal: grandTotal,
    cashGiven: parseFloat($('cashGiven').value) || grandTotal
  };

  // Save to daily sales
  const sales = loadSales(currentDate);
  sales.push(saleRecord);
  saveSales(currentDate, sales);

  const statusLabel = paymentStatus === 'Unpaid' ? '⏳ UNPAID (DEBT)' : '✅ PAID';
  playChime('complete');
  showToast(`Bill #${billNo} Issued! (${statusLabel})`);

  // Render receipt & open modal
  renderReceiptModal(saleRecord);
  openModal('receiptModal');

  // Reset cart & inputs
  cart = [];
  $('customerName').value = '';
  $('customerDept').value = '';
  $('customerPhone').value = '';
  $('cashGiven').value = '';
  $('cartDiscount').value = '0';
  paymentStatus = 'Paid';
  document.querySelectorAll('.btn-ps').forEach(b => b.classList.remove('active'));
  document.querySelector('.btn-ps[data-status="Paid"]').classList.add('active');

  renderCart();
  updateKPIs();
}

function renderReceiptModal(sale) {
  $('rShopName').textContent = storeInfo.name;
  $('rShopTag').textContent = storeInfo.tagline;
  $('rBillNo').textContent = `#${sale.billNo}`;
  $('rTokenNo').textContent = `#${sale.tokenNo}`;
  $('rDate').textContent = sale.date;
  $('rTime').textContent = sale.time;
  $('rCustName').textContent = sale.customerName || 'Walk-in';
  $('rCustDept').textContent = sale.customerDept || '—';
  $('rCustPhone').textContent = sale.customerPhone || '—';
  
  const statusEl = $('rPayStatus');
  statusEl.textContent = sale.paymentStatus === 'Unpaid' ? 'UNPAID (DEBT)' : 'PAID';
  statusEl.style.color = sale.paymentStatus === 'Unpaid' ? 'var(--danger)' : 'var(--primary)';

  $('rOrderType').textContent = sale.orderType;
  $('rPayMethod').textContent = sale.paymentMethod;

  const tbody = $('rTableBody');
  tbody.innerHTML = '';

  sale.items.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="text-align:left;">${item.name}</td>
      <td style="text-align:center;">${item.qty}</td>
      <td style="text-align:right;">${item.price}</td>
      <td style="text-align:right;">${item.price * item.qty}</td>
    `;
    tbody.appendChild(tr);
  });

  $('rSubtotal').textContent = money(sale.subtotal);
  if (sale.discountAmount > 0) {
    $('rDiscountRow').style.display = 'flex';
    $('rDiscount').textContent = `-${money(sale.discountAmount)}`;
  } else {
    $('rDiscountRow').style.display = 'none';
  }
  $('rGrandTotal').textContent = money(sale.grandTotal);

  if ($('rFooterMessage')) {
    $('rFooterMessage').textContent = storeInfo.footer || 'Thank you for visiting Coffee Spot! ☕';
  }

  // Generate UPI QR Code
  generateReceiptQR(sale.grandTotal);
}

function generateReceiptQR(amount) {
  const qrContainer = $('receiptQrCode');
  qrContainer.innerHTML = '';
  const upiId = storeInfo.upi || 'coffeespot@upi';
  const qrText = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(storeInfo.name)}&am=${amount}&cu=INR`;

  try {
    const typeNumber = 0;
    const errorCorrectionLevel = 'L';
    const qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(qrText);
    qr.make();
    qrContainer.innerHTML = qr.createImgTag(4);
  } catch (e) {
    qrContainer.innerHTML = '<p style="font-size:0.7rem; color:#666;">QR unavailable</p>';
  }
}

// ---------- KPI SUMMARY CARDS ----------
function updateKPIs() {
  const sales = loadSales(currentDate);
  const totalRev = sales.reduce((sum, s) => sum + s.grandTotal, 0);
  const totalItems = sales.reduce((sum, s) => sum + s.items.reduce((iSum, i) => iSum + i.qty, 0), 0);
  const totalTx = sales.length;
  const aov = totalTx > 0 ? (totalRev / totalTx) : 0;

  // Category breakdown for Top Category KPI
  const catMap = {};
  sales.forEach(s => {
    s.items.forEach(item => {
      const catObj = catalog.find(c => c.name === item.name);
      const catName = catObj ? catObj.cat : 'General';
      catMap[catName] = (catMap[catName] || 0) + (item.price * item.qty);
    });
  });

  let topCat = '—';
  let topCatRevenue = 0;
  Object.keys(catMap).forEach(cat => {
    if (catMap[cat] > topCatRevenue) {
      topCatRevenue = catMap[cat];
      topCat = cat;
    }
  });

  const topCatShare = totalRev > 0 ? Math.round((topCatRevenue / totalRev) * 100) : 0;

  // Unpaid Debt Metrics
  const unpaidSales = sales.filter(s => s.paymentStatus === 'Unpaid');
  const totalDebt = unpaidSales.reduce((sum, s) => sum + s.grandTotal, 0);

  $('dayTotal').textContent = money(totalRev);
  $('dayItems').textContent = totalItems;
  $('dayTx').textContent = totalTx;
  $('dayAov').textContent = money(aov);
  if ($('dayDebt')) $('dayDebt').textContent = money(totalDebt);
  if ($('dayDebtCount')) $('dayDebtCount').textContent = `${unpaidSales.length} Unpaid Bill${unpaidSales.length === 1 ? '' : 's'}`;
  $('dayTopCat').textContent = topCat;
  $('dayTopCatShare').textContent = `${topCatShare}% of revenue`;
}

// ---------- CATALOG MANAGER ----------
function openCatalogManager() {
  renderCatalogTable();
  openModal('catalogModal');
}

function renderCatalogTable() {
  const tbody = $('catalogTableBody');
  tbody.innerHTML = '';
  $('catalogCount').textContent = catalog.length;

  catalog.forEach(item => {
    const stockClass = item.stock === 'lowstock' ? 'badge-lowstock' : (item.stock === 'outstock' ? 'badge-outstock' : 'badge-instock');
    const stockText = item.stock === 'lowstock' ? '⚠️ Low Stock' : (item.stock === 'outstock' ? '❌ Out of Stock' : '✅ In Stock');

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="font-size:1.3rem;">${item.icon || '☕'}</td>
      <td><strong>${item.name}</strong></td>
      <td>${item.cat}</td>
      <td style="font-family:var(--font-mono);">${money(item.price)}</td>
      <td>${item.hotkey ? `<span class="hk-badge">${item.hotkey}</span>` : '—'}</td>
      <td><span class="${stockClass}">${stockText}</span></td>
      <td>
        <button class="btn-secondary btn-sm" onclick="editCatalogItem('${item.id}')">✏️ Edit</button>
        <button class="btn-danger-outline btn-sm" onclick="deleteCatalogItem('${item.id}')">🗑️ Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function editCatalogItem(id) {
  const item = catalog.find(i => i.id === id);
  if (!item) return;

  $('editItemId').value = item.id;
  $('itemCatInput').value = item.cat;
  $('itemNameInput').value = item.name;
  $('itemPriceInput').value = item.price;
  $('itemIconInput').value = item.icon || '';
  $('itemHotkeyInput').value = item.hotkey || '';
  $('itemStockSelect').value = item.stock || 'instock';

  $('catalogFormTitle').textContent = 'Edit Item';
  $('saveCatalogItemBtn').textContent = '💾 Update Item';
}

function deleteCatalogItem(id) {
  if (confirm('Are you sure you want to delete this catalog item?')) {
    catalog = catalog.filter(i => i.id !== id);
    saveCatalog();
    initCategoryTabs();
    renderCatalogGrid();
    renderCatalogTable();
    showToast('Item deleted!');
  }
}

// ---------- RECENT BILLS HISTORY ----------
function openRecentBills() {
  renderRecentBillsTable();
  openModal('recentBillsModal');
}

function renderRecentBillsTable() {
  const sales = loadSales(currentDate);
  const searchQuery = $('billSearchInput').value.toLowerCase().trim();

  const filtered = sales.filter(s => {
    const matchBill = s.billNo.toString().includes(searchQuery);
    const matchCust = (s.customerName || '').toLowerCase().includes(searchQuery);
    const matchDept = (s.customerDept || '').toLowerCase().includes(searchQuery);
    const matchPhone = (s.customerPhone || '').toLowerCase().includes(searchQuery);

    const matchSearch = matchBill || matchCust || matchDept || matchPhone;
    const matchStatus = (billsFilterStatus === 'ALL' || (s.paymentStatus || 'Paid') === billsFilterStatus);

    return matchSearch && matchStatus;
  });

  const tbody = $('recentBillsTableBody');
  tbody.innerHTML = '';

  const totalRev = filtered.reduce((sum, s) => sum + s.grandTotal, 0);
  $('recentBillsTotal').textContent = money(totalRev);
  $('recentBillsCount').textContent = filtered.length;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 20px; color: var(--text-muted);">No matching bills found for ${currentDate}.</td></tr>`;
    return;
  }

  filtered.slice().reverse().forEach(sale => {
    const itemNames = sale.items.map(i => `${i.qty}x ${i.name}`).join(', ');
    const isUnpaid = sale.paymentStatus === 'Unpaid';
    const statusBadge = isUnpaid ? '<span class="badge-unpaid">⏳ Unpaid</span>' : '<span class="badge-paid">✅ Paid</span>';
    const dateFormatted = sale.buyingDateTime || `${sale.date} ${sale.time}`;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>#${sale.billNo}</strong> <small style="color:var(--text-muted);">(Tok #${sale.tokenNo})</small></td>
      <td style="font-size:0.8rem; color:var(--ink-secondary);">${dateFormatted}</td>
      <td>
        <strong>${sale.customerName || 'Walk-in'}</strong>
        <div style="font-size:0.75rem; color:var(--text-muted);">${sale.customerDept || '—'}</div>
      </td>
      <td style="font-family:var(--font-mono); font-size:0.8rem;">${sale.customerPhone || '—'}</td>
      <td style="max-width:160px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${itemNames}">${itemNames}</td>
      <td style="font-family:var(--font-mono); font-weight:bold;">${money(sale.grandTotal)}</td>
      <td>
        <div style="font-size:0.8rem; font-weight:600;">${sale.paymentMethod}</div>
        ${statusBadge}
      </td>
      <td>
        <div style="display:flex; gap:4px; flex-wrap:wrap;">
          ${isUnpaid ? `<button class="btn-primary btn-sm" onclick="markBillAsPaid(${sale.billNo})">✅ Mark Paid</button>` : ''}
          <button class="btn-secondary btn-sm" onclick="reprintBill(${sale.billNo})">🧾 Print</button>
          <button class="btn-danger-outline btn-sm" onclick="voidBill(${sale.billNo})">Void</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function markBillAsPaid(billNo) {
  let sales = loadSales(currentDate);
  const sale = sales.find(s => s.billNo === billNo);
  if (sale) {
    sale.paymentStatus = 'Paid';
    saveSales(currentDate, sales);
    renderRecentBillsTable();
    updateKPIs();
    playChime('complete');
    showToast(`✅ Bill #${billNo} Marked as PAID!`);
  }
}

// ---------- CUSTOMER DEBT & LATE PAYMENT LEDGER ----------
function getAllUnpaidSales() {
  const dates = listAllSalesDates();
  const unpaidSales = [];
  dates.forEach(d => {
    const sales = loadSales(d);
    sales.forEach(s => {
      if (s.paymentStatus === 'Unpaid') {
        unpaidSales.push(s);
      }
    });
  });
  return unpaidSales;
}

function openCustomerLedger() {
  renderCustomerLedgerTable();
  openModal('customerLedgerModal');
}

function renderCustomerLedgerTable() {
  const searchQuery = ($('ledgerSearchInput') ? $('ledgerSearchInput').value : '').toLowerCase().trim();
  const allUnpaid = getAllUnpaidSales();

  const customerMap = {};
  let totalDebt = 0;
  let totalUnpaidBills = allUnpaid.length;

  allUnpaid.forEach(sale => {
    const name = sale.customerName || 'Walk-in Customer';
    const dept = sale.customerDept || 'General';
    const phone = sale.customerPhone || '—';
    const key = `${name}___${phone}`;

    if (!customerMap[key]) {
      customerMap[key] = {
        name,
        dept,
        phone,
        bills: [],
        totalOwed: 0,
        oldestTimestamp: sale.timestamp || Date.now()
      };
    }

    customerMap[key].bills.push(sale);
    customerMap[key].totalOwed += sale.grandTotal;
    totalDebt += sale.grandTotal;
    if (sale.timestamp && sale.timestamp < customerMap[key].oldestTimestamp) {
      customerMap[key].oldestTimestamp = sale.timestamp;
    }
  });

  const customerList = Object.values(customerMap).filter(c => {
    const matchName = c.name.toLowerCase().includes(searchQuery);
    const matchDept = c.dept.toLowerCase().includes(searchQuery);
    const matchPhone = c.phone.toLowerCase().includes(searchQuery);
    return matchName || matchDept || matchPhone;
  }).sort((a, b) => b.totalOwed - a.totalOwed);

  if ($('ledgerTotalDebt')) $('ledgerTotalDebt').textContent = money(totalDebt);
  if ($('ledgerPendingCount')) $('ledgerPendingCount').textContent = `${Object.keys(customerMap).length} Unpaid Customers`;
  if ($('ledgerBillCount')) $('ledgerBillCount').textContent = totalUnpaidBills;

  if (customerList.length > 0) {
    if ($('ledgerTopDebtor')) $('ledgerTopDebtor').textContent = customerList[0].name;
    if ($('ledgerTopDebtorAmt')) $('ledgerTopDebtorAmt').textContent = money(customerList[0].totalOwed) + ' Owed';
  } else {
    if ($('ledgerTopDebtor')) $('ledgerTopDebtor').textContent = '—';
    if ($('ledgerTopDebtorAmt')) $('ledgerTopDebtorAmt').textContent = '₹0.00 Owed';
  }

  const tbody = $('customerLedgerTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  if (customerList.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:20px; color:var(--text-muted);">🎉 No unpaid customer debts found! All accounts are fully settled.</td></tr>`;
    return;
  }

  const nowMs = Date.now();

  customerList.forEach(c => {
    const billNumbers = c.bills.map(b => `#${b.billNo}`).join(', ');
    const daysOld = Math.floor((nowMs - c.oldestTimestamp) / (1000 * 60 * 60 * 24));
    const isOverdue = daysOld >= 7;
    const statusBadge = isOverdue 
      ? `<span class="badge-unpaid" style="background:#FEE2E2; color:#991B1B;">⚠️ Overdue (${daysOld}d)</span>`
      : `<span class="badge-unpaid">⏳ Pending (${daysOld === 0 ? 'Today' : daysOld + 'd'})</span>`;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${c.name}</strong></td>
      <td>${c.dept}</td>
      <td style="font-family:var(--font-mono); font-size:0.85rem;">${c.phone}</td>
      <td style="max-width:160px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${billNumbers}">${billNumbers} (${c.bills.length})</td>
      <td style="font-family:var(--font-mono); font-weight:bold; color:var(--danger);">${money(c.totalOwed)}</td>
      <td>${statusBadge}</td>
      <td>
        <button class="btn-primary btn-sm" onclick="settleCustomerDebt('${c.name.replace(/'/g, "\\'")}', '${c.phone.replace(/'/g, "\\'")}')">✅ Mark Paid</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function settleCustomerDebt(custName, custPhone) {
  if (confirm(`Mark all pending bills as Paid for ${custName}?`)) {
    const dates = listAllSalesDates();
    let settledCount = 0;

    dates.forEach(d => {
      let sales = loadSales(d);
      let updated = false;

      sales.forEach(s => {
        const nameMatch = (s.customerName || 'Walk-in Customer') === custName;
        const phoneMatch = (s.customerPhone || '—') === custPhone;
        if (nameMatch && phoneMatch && s.paymentStatus === 'Unpaid') {
          s.paymentStatus = 'Paid';
          s.paidTimestamp = Date.now();
          updated = true;
          settledCount++;
        }
      });

      if (updated) {
        saveSales(d, sales);
      }
    });

    renderCustomerLedgerTable();
    renderRecentBillsTable();
    updateKPIs();
    playChime('complete');
    showToast(`✅ Settled ${settledCount} bill(s) for ${custName}!`);
  }
}

function reprintBill(billNo) {
  const sales = loadSales(currentDate);
  const sale = sales.find(s => s.billNo === billNo);
  if (sale) {
    renderReceiptModal(sale);
    openModal('receiptModal');
  }
}

function voidBill(billNo) {
  if (confirm(`Are you sure you want to void Bill #${billNo}?`)) {
    let sales = loadSales(currentDate);
    sales = sales.filter(s => s.billNo !== billNo);
    saveSales(currentDate, sales);
    renderRecentBillsTable();
    updateKPIs();
    showToast(`Bill #${billNo} Voided!`);
  }
}

// ---------- ANALYTICS DASHBOARD ----------
function openAnalytics() {
  openModal('analyticsModal');
  setTimeout(renderCharts, 150);
}

function renderCharts() {
  const sales = loadSales(currentDate);

  // Hourly Chart Data
  const hours = Array.from({ length: 14 }, (_, i) => i + 8); // 8 AM to 9 PM
  const hourlyTotals = hours.map(h => {
    return sales.filter(s => {
      const sHour = new Date(s.timestamp || Date.now()).getHours();
      return sHour === h;
    }).reduce((sum, s) => sum + s.grandTotal, 0);
  });

  const hourLabels = hours.map(h => `${h > 12 ? h - 12 : h} ${h >= 12 ? 'PM' : 'AM'}`);

  const ctxHourly = $('hourlySalesChart').getContext('2d');
  if (hourlyChartInstance) hourlyChartInstance.destroy();

  hourlyChartInstance = new Chart(ctxHourly, {
    type: 'bar',
    data: {
      labels: hourLabels,
      datasets: [{
        label: 'Revenue (₹)',
        data: hourlyTotals,
        backgroundColor: '#1F5C4F',
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });

  // Category Chart Data
  const catMap = {};
  sales.forEach(s => {
    s.items.forEach(item => {
      const catObj = catalog.find(c => c.name === item.name);
      const catName = catObj ? catObj.cat : 'General';
      catMap[catName] = (catMap[catName] || 0) + (item.price * item.qty);
    });
  });

  const catLabels = Object.keys(catMap);
  const catData = Object.values(catMap);

  const ctxCat = $('categoryRevenueChart').getContext('2d');
  if (categoryChartInstance) categoryChartInstance.destroy();

  categoryChartInstance = new Chart(ctxCat, {
    type: 'doughnut',
    data: {
      labels: catLabels.length ? catLabels : ['No Sales'],
      datasets: [{
        data: catData.length ? catData : [1],
        backgroundColor: ['#1F5C4F', '#D97706', '#2EC4B6', '#E63946', '#F59E0B']
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });

  renderTopSellingTable();
}

function renderTopSellingTable() {
  const sales = loadSales(currentDate);
  const tbody = $('topSellingTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const itemStats = {};
  let totalDayRev = 0;

  sales.forEach(s => {
    s.items.forEach(item => {
      if (!itemStats[item.name]) {
        const catObj = catalog.find(c => c.name === item.name);
        itemStats[item.name] = {
          name: item.name,
          category: catObj ? catObj.cat : 'General',
          units: 0,
          revenue: 0
        };
      }
      itemStats[item.name].units += item.qty;
      const rev = item.price * item.qty;
      itemStats[item.name].revenue += rev;
      totalDayRev += rev;
    });
  });

  const sortedList = Object.values(itemStats).sort((a, b) => b.revenue - a.revenue);

  if (sortedList.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding:20px; color:var(--text-muted);">No product sales recorded for ${currentDate}.</td></tr>`;
    return;
  }

  sortedList.forEach(item => {
    const share = totalDayRev > 0 ? ((item.revenue / totalDayRev) * 100).toFixed(1) : '0';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${item.name}</strong></td>
      <td><span class="badge-instock">${item.category}</span></td>
      <td style="font-family:var(--font-mono); text-align:center; font-weight:bold;">${item.units}</td>
      <td style="font-family:var(--font-mono); font-weight:bold; color:var(--primary);">${money(item.revenue)}</td>
      <td style="font-family:var(--font-mono);">${share}%</td>
    `;
    tbody.appendChild(tr);
  });
}

// ---------- EXPENSES & LABOUR MANAGER ----------
function openExpensesManager() {
  const labour = loadLabour(currentDate);
  $('teaMasterWage').value = labour.teaMaster || '';
  $('vadaMasterWage').value = labour.vadaMaster || '';
  $('expDateLabel').textContent = currentDate;
  renderExpensesTable();
  openModal('expensesModal');
}

function renderExpensesTable() {
  const labour = loadLabour(currentDate);
  const expenses = loadExpenses(currentDate);

  const tbody = $('expensesTableBody');
  tbody.innerHTML = '';

  let totalCost = 0;

  // Add Labour Master Rows if present
  if (labour.teaMaster > 0) {
    totalCost += labour.teaMaster;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>👨‍🍳 Labour Wage</strong></td>
      <td>Tea Master Daily Wage</td>
      <td style="font-family:var(--font-mono); color:var(--amber); font-weight:bold;">${money(labour.teaMaster)}</td>
      <td><span style="font-size:0.75rem; color:var(--text-muted);">Daily Wage</span></td>
    `;
    tbody.appendChild(tr);
  }

  if (labour.vadaMaster > 0) {
    totalCost += labour.vadaMaster;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>🧆 Labour Wage</strong></td>
      <td>Vada Master Daily Wage</td>
      <td style="font-family:var(--font-mono); color:var(--amber); font-weight:bold;">${money(labour.vadaMaster)}</td>
      <td><span style="font-size:0.75rem; color:var(--text-muted);">Daily Wage</span></td>
    `;
    tbody.appendChild(tr);
  }

  expenses.forEach(exp => {
    totalCost += exp.amount;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${exp.category}</strong></td>
      <td>${exp.desc}</td>
      <td style="font-family:var(--font-mono); color:var(--danger); font-weight:bold;">${money(exp.amount)}</td>
      <td><button class="btn-danger-outline btn-sm" onclick="deleteExpense('${exp.id}')">🗑️ Delete</button></td>
    `;
    tbody.appendChild(tr);
  });

  if (labour.teaMaster === 0 && labour.vadaMaster === 0 && expenses.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding:20px; color:var(--text-muted);">No expenses or labour wages logged for ${currentDate}.</td></tr>`;
  }

  $('expTotalDisplay').textContent = money(totalCost);
}

function deleteExpense(id) {
  let list = loadExpenses(currentDate);
  list = list.filter(e => e.id !== id);
  saveExpenses(currentDate, list);
  renderExpensesTable();
  updateKPIs();
  showToast('Expense deleted!');
}

// ---------- FINANCIAL SUMMARY DASHBOARDS (DAILY, MONTHLY, YEARLY) ----------
function openReportsManager() {
  renderPeriodPickerControls();
  renderPeriodSummary();
  openModal('reportsModal');
}

function renderPeriodPickerControls() {
  const container = $('periodPickerContainer');
  container.innerHTML = '';

  if (selectedPeriodTab === 'daily') {
    container.innerHTML = `<span style="font-size:0.9rem; font-weight:600;">Selected Date: <strong>${currentDate}</strong></span>`;
  } else if (selectedPeriodTab === 'monthly') {
    container.innerHTML = `
      <label style="font-size:0.85rem; font-weight:600; margin-right:6px;">Select Month:</label>
      <input type="month" id="monthPickerInput" value="${selectedMonthStr}" style="padding:4px 8px; border-radius:var(--radius-sm); border:1px solid var(--border-color); font-weight:bold;">
    `;
    setTimeout(() => {
      const input = $('monthPickerInput');
      if (input) {
        input.onchange = (e) => {
          selectedMonthStr = e.target.value;
          renderPeriodSummary();
        };
      }
    }, 50);
  } else if (selectedPeriodTab === 'yearly') {
    const currentYear = new Date().getFullYear();
    const options = [currentYear - 1, currentYear, currentYear + 1].map(y => `<option value="${y}" ${selectedYearStr == y ? 'selected' : ''}>Year ${y}</option>`).join('');
    container.innerHTML = `
      <label style="font-size:0.85rem; font-weight:600; margin-right:6px;">Select Year:</label>
      <select id="yearPickerSelect" style="padding:4px 8px; border-radius:var(--radius-sm); border:1px solid var(--border-color); font-weight:bold;">${options}</select>
    `;
    setTimeout(() => {
      const sel = $('yearPickerSelect');
      if (sel) {
        sel.onchange = (e) => {
          selectedYearStr = e.target.value;
          renderPeriodSummary();
        };
      }
    }, 50);
  }
}

function listAllSalesDates() {
  const dates = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('coffee_pos:sales:')) {
      dates.push(key.replace('coffee_pos:sales:', ''));
    }
  }
  return dates.sort();
}

function renderPeriodSummary() {
  let grossRev = 0;
  let totalLabour = 0;
  let totalMiscExp = 0;
  let totalPendingDebt = 0;

  let chartLabels = [];
  let chartSalesData = [];
  let chartExpData = [];

  if (selectedPeriodTab === 'daily') {
    $('reportChartTitle').textContent = `Daily Breakdown (${currentDate})`;
    const sales = loadSales(currentDate);
    const labour = loadLabour(currentDate);
    const expenses = loadExpenses(currentDate);

    grossRev = sales.reduce((sum, s) => sum + s.grandTotal, 0);
    totalLabour = (labour.teaMaster || 0) + (labour.vadaMaster || 0);
    totalMiscExp = expenses.reduce((sum, e) => sum + e.amount, 0);
    totalPendingDebt = sales.filter(s => s.paymentStatus === 'Unpaid').reduce((sum, s) => sum + s.grandTotal, 0);

    const hours = Array.from({ length: 14 }, (_, i) => i + 8);
    chartLabels = hours.map(h => `${h > 12 ? h - 12 : h} ${h >= 12 ? 'PM' : 'AM'}`);
    chartSalesData = hours.map(h => {
      return sales.filter(s => new Date(s.timestamp || Date.now()).getHours() === h).reduce((sum, s) => sum + s.grandTotal, 0);
    });
    chartExpData = hours.map(() => 0);

  } else if (selectedPeriodTab === 'monthly') {
    $('reportChartTitle').textContent = `Monthly Breakdown (${selectedMonthStr})`;
    const daysInMonth = new Date(selectedMonthStr.split('-')[0], selectedMonthStr.split('-')[1], 0).getDate();
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => {
      const dNum = (i + 1) < 10 ? '0' + (i + 1) : (i + 1);
      return `${selectedMonthStr}-${dNum}`;
    });

    chartLabels = daysArray.map(d => d.slice(8));

    daysArray.forEach(d => {
      const dSales = loadSales(d);
      const dLabour = loadLabour(d);
      const dExpenses = loadExpenses(d);

      const dayRev = dSales.reduce((sum, s) => sum + s.grandTotal, 0);
      const dayLab = (dLabour.teaMaster || 0) + (dLabour.vadaMaster || 0);
      const dayExp = dExpenses.reduce((sum, e) => sum + e.amount, 0);
      const dayDebt = dSales.filter(s => s.paymentStatus === 'Unpaid').reduce((sum, s) => sum + s.grandTotal, 0);

      grossRev += dayRev;
      totalLabour += dayLab;
      totalMiscExp += dayExp;
      totalPendingDebt += dayDebt;

      chartSalesData.push(dayRev);
      chartExpData.push(dayLab + dayExp);
    });

  } else if (selectedPeriodTab === 'yearly') {
    $('reportChartTitle').textContent = `Yearly Month-by-Month Breakdown (${selectedYearStr})`;
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    chartLabels = monthNames;

    monthNames.forEach((m, idx) => {
      const mStr = `${selectedYearStr}-${(idx + 1) < 10 ? '0' + (idx + 1) : (idx + 1)}`;
      const monthDates = listAllSalesDates().filter(d => d.startsWith(mStr));

      let mRev = 0;
      let mLab = 0;
      let mExp = 0;
      let mDebt = 0;

      monthDates.forEach(d => {
        const dSales = loadSales(d);
        const dLabour = loadLabour(d);
        const dExpenses = loadExpenses(d);

        mRev += dSales.reduce((sum, s) => sum + s.grandTotal, 0);
        mLab += (dLabour.teaMaster || 0) + (dLabour.vadaMaster || 0);
        mExp += dExpenses.reduce((sum, e) => sum + e.amount, 0);
        mDebt += dSales.filter(s => s.paymentStatus === 'Unpaid').reduce((sum, s) => sum + s.grandTotal, 0);
      });

      grossRev += mRev;
      totalLabour += mLab;
      totalMiscExp += mExp;
      totalPendingDebt += mDebt;

      chartSalesData.push(mRev);
      chartExpData.push(mLab + mExp);
    });
  }

  const netProfit = grossRev - (totalLabour + totalMiscExp);

  $('pRevenue').textContent = money(grossRev);
  $('pLabour').textContent = money(totalLabour);
  $('pExpenses').textContent = money(totalMiscExp);
  $('pDebt').textContent = money(totalPendingDebt);

  const profitEl = $('pNetProfit');
  profitEl.textContent = money(netProfit);
  profitEl.style.color = netProfit >= 0 ? 'var(--primary)' : 'var(--danger)';
  $('pNetProfitShare').textContent = netProfit >= 0 ? 'Net Profit' : 'Net Loss';

  renderSummaryChart(chartLabels, chartSalesData, chartExpData);
}

function renderSummaryChart(labels, salesData, expData) {
  const ctx = $('summaryReportChart').getContext('2d');
  if (summaryChartInstance) summaryChartInstance.destroy();

  summaryChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Revenue (₹)',
          data: salesData,
          backgroundColor: '#1F5C4F',
          borderRadius: 4
        },
        {
          label: 'Costs & Labour (₹)',
          data: expData,
          backgroundColor: '#DC2626',
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

// ---------- EXPORT & BACKUP ----------
function exportCSV() {
  const sales = loadSales(currentDate);
  if (sales.length === 0) {
    showToast('⚠️ No sales records for selected date.');
    return;
  }

  let csv = 'Bill No,Token No,Buying Date & Time,Customer Name,Department,Phone Number,Order Type,Payment Method,Payment Status,Item Name,Price,Qty,Total,Grand Total\n';
  sales.forEach(s => {
    const dateTime = s.buyingDateTime || `${s.date} ${s.time}`;
    s.items.forEach(i => {
      csv += `${s.billNo},${s.tokenNo},"${dateTime}","${s.customerName || ''}","${s.customerDept || ''}","${s.customerPhone || ''}","${s.orderType}","${s.paymentMethod}","${s.paymentStatus || 'Paid'}","${i.name}",${i.price},${i.qty},${i.price * i.qty},${s.grandTotal}\n`;
    });
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `CoffeeSpot_Sales_${currentDate}.csv`;
  a.click();
  showToast('📥 CSV Exported!');
}

function loadDemoSales() {
  const demoItems = [
    { name: 'Tea', price: 15 },
    { name: 'Coffee', price: 15 },
    { name: 'Black Coffee', price: 15 },
    { name: 'Boost', price: 20 },
    { name: 'Vada', price: 10 },
    { name: 'Cauliflower', price: 40 },
    { name: 'Juice ₹20', price: 20 }
  ];

  const sales = [];
  const now = new Date();

  for (let i = 1; i <= 12; i++) {
    const randomItem = demoItems[Math.floor(Math.random() * demoItems.length)];
    const qty = Math.floor(Math.random() * 3) + 1;
    const grandTotal = randomItem.price * qty;

    sales.push({
      billNo: globalBillNo++,
      tokenNo: globalTokenNo++,
      date: currentDate,
      time: `${8 + i}:30 AM`,
      buyingDateTime: `${currentDate} ${8 + i}:30 AM`,
      timestamp: now.getTime() - (i * 3600000),
      customerName: `Customer #${i}`,
      customerDept: i % 2 === 0 ? 'Computer Science' : 'Administration',
      customerPhone: `98765432${i < 10 ? '0' + i : i}`,
      orderType: Math.random() > 0.3 ? 'Dine In' : 'Takeaway',
      paymentMethod: Math.random() > 0.4 ? 'Cash' : 'UPI',
      paymentStatus: i % 3 === 0 ? 'Unpaid' : 'Paid',
      items: [{ name: randomItem.name, price: randomItem.price, qty: qty }],
      subtotal: grandTotal,
      discountPercent: 0,
      discountAmount: 0,
      grandTotal: grandTotal,
      cashGiven: grandTotal
    });
  }

  localStorage.setItem('coffee_pos:bill_no', globalBillNo);
  localStorage.setItem('coffee_pos:token_no', globalTokenNo);
  saveSales(currentDate, sales);
  updateKPIs();
  showToast('✨ Demo Sales Loaded!');
}

// ---------- EVENT BINDINGS ----------
function bindEvents() {
  // Search filter
  $('itemSearch').addEventListener('input', renderCatalogGrid);

  // Payment Method selection
  document.querySelectorAll('.btn-pm').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.btn-pm').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      paymentMethod = btn.dataset.mode;
    };
  });

  // Payment Status selection (Paid vs Unpaid)
  document.querySelectorAll('.btn-ps').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.btn-ps').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      paymentStatus = btn.dataset.status;
    };
  });

  // Recent Bills Filter Tabs
  document.querySelectorAll('.bills-filter-tabs button').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.bills-filter-tabs button').forEach(b => b.style.fontWeight = 'normal');
      btn.style.fontWeight = 'bold';
      billsFilterStatus = btn.dataset.filter;
      renderRecentBillsTable();
    };
  });

  // Tender quick buttons
  document.querySelectorAll('.btn-tender-tag').forEach(btn => {
    btn.onclick = () => {
      const val = btn.dataset.val;
      const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
      const discountPercent = parseFloat($('cartDiscount').value) || 0;
      const grandTotal = Math.max(0, subtotal - (subtotal * discountPercent) / 100);

      if (val === 'exact') {
        $('cashGiven').value = grandTotal;
      } else {
        $('cashGiven').value = val;
      }
      updateCartTotals();
    };
  });

  $('cashGiven').addEventListener('input', updateCartTotals);
  $('cartDiscount').addEventListener('input', updateCartTotals);

  // Clear & Checkout
  $('clearCartBtn').onclick = () => {
    cart = [];
    renderCart();
    showToast('Cart cleared!');
  };

  $('checkoutBtn').onclick = checkoutCart;

  // Modals Open/Close
  $('editShopBtn').onclick = () => openModal('storeModal');
  $('shopNameDisplay').onclick = () => openModal('storeModal');

  $('saveStoreBtn').onclick = () => {
    storeInfo.name = $('storeNameInput').value.trim() || 'Coffee Spot';
    storeInfo.tagline = $('storeTagInput').value.trim() || 'Gandhigram';
    storeInfo.upi = $('storeUpiInput').value.trim() || '';
    if ($('storeFooterInput')) storeInfo.footer = $('storeFooterInput').value.trim();
    if ($('audioToggleInput')) storeInfo.audioEnabled = $('audioToggleInput').checked;
    saveStoreInfo();
    initStoreBranding();
    closeModal('storeModal');
    showToast('Store info saved!');
  };

  $('openCatalogBtn').onclick = openCatalogManager;
  $('openRecentBillsBtn').onclick = openRecentBills;
  if ($('openCustomerLedgerBtn')) $('openCustomerLedgerBtn').onclick = openCustomerLedger;
  if ($('ledgerSearchInput')) $('ledgerSearchInput').addEventListener('input', renderCustomerLedgerTable);
  $('openExpensesBtn').onclick = openExpensesManager;
  $('openReportsBtn').onclick = openReportsManager;
  $('openAnalyticsBtn').onclick = openAnalytics;
  $('exportCsvBtn').onclick = exportCSV;
  $('loadSampleBtn').onclick = loadDemoSales;
  $('backupDataBtn').onclick = () => openModal('backupModal');

  // Labour form submit
  $('labourForm').onsubmit = (e) => {
    e.preventDefault();
    const teaWage = parseFloat($('teaMasterWage').value) || 0;
    const vadaWage = parseFloat($('vadaMasterWage').value) || 0;
    saveLabour(currentDate, { teaMaster: teaWage, vadaMaster: vadaWage });
    renderExpensesTable();
    updateKPIs();
    showToast('👨‍🍳 Daily Labour Wages Saved!');
  };

  // Expense form submit
  $('expenseForm').onsubmit = (e) => {
    e.preventDefault();
    const category = $('expCategory').value;
    const desc = $('expDesc').value.trim();
    const amount = parseFloat($('expAmount').value) || 0;

    const list = loadExpenses(currentDate);
    list.push({
      id: 'exp-' + Date.now(),
      category: category,
      desc: desc,
      amount: amount,
      timestamp: Date.now()
    });

    saveExpenses(currentDate, list);
    renderExpensesTable();
    updateKPIs();
    $('expDesc').value = '';
    $('expAmount').value = '';
    showToast('➕ Miscellaneous Expense Added!');
  };

  // Period Tabs (Daily, Monthly, Yearly)
  document.querySelectorAll('.period-tabs button').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.period-tabs button').forEach(b => b.classList.remove('active-period-tab'));
      btn.classList.add('active-period-tab');
      selectedPeriodTab = btn.dataset.period;
      renderPeriodPickerControls();
      renderPeriodSummary();
    };
  });

  $('triggerPrintBtn').onclick = () => window.print();

  // Modal close triggers
  document.querySelectorAll('[data-close]').forEach(btn => {
    btn.onclick = () => closeModal(btn.dataset.close);
  });

  // Catalog Form Submit
  $('catalogItemForm').onsubmit = (e) => {
    e.preventDefault();
    const id = $('editItemId').value || 'cat-' + Date.now();
    const item = {
      id: id,
      cat: $('itemCatInput').value.trim(),
      name: $('itemNameInput').value.trim(),
      price: parseFloat($('itemPriceInput').value) || 0,
      icon: $('itemIconInput').value.trim() || '☕',
      hotkey: $('itemHotkeyInput').value.trim(),
      stock: $('itemStockSelect').value
    };

    const idx = catalog.findIndex(i => i.id === id);
    if (idx !== -1) {
      catalog[idx] = item;
    } else {
      catalog.push(item);
    }

    saveCatalog();
    initCategoryTabs();
    renderCatalogGrid();
    renderCatalogTable();

    // Reset Form
    $('catalogItemForm').reset();
    $('editItemId').value = '';
    $('catalogFormTitle').textContent = 'Add New Item';
    $('saveCatalogItemBtn').textContent = '➕ Save Item';
    showToast('Catalog updated!');
  };

  $('resetCatalogFormBtn').onclick = () => {
    $('catalogItemForm').reset();
    $('editItemId').value = '';
    $('catalogFormTitle').textContent = 'Add New Item';
    $('saveCatalogItemBtn').textContent = '➕ Save Item';
  };

  $('resetDefaultCatalogBtn').onclick = () => {
    if (confirm('Reset catalog to default menu?')) {
      catalog = JSON.parse(JSON.stringify(DEFAULT_CATALOG));
      saveCatalog();
      initCategoryTabs();
      renderCatalogGrid();
      renderCatalogTable();
      showToast('Catalog reset to defaults!');
    }
  };

  // Keyboard Shortcuts (Hotkeys 1-9, 0 & Space for checkout)
  document.addEventListener('keydown', (e) => {
    // Disable if user is typing inside an input field
    if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      return;
    }

    if (e.code === 'Space') {
      e.preventDefault();
      checkoutCart();
      return;
    }

    const key = e.key;
    const matchItem = catalog.find(i => i.hotkey === key);
    if (matchItem) {
      e.preventDefault();
      addToCart(matchItem);
    }
  });

  // Recent Bills Search
  $('billSearchInput').addEventListener('input', renderRecentBillsTable);

  // Backup & Restore
  $('downloadBackupBtn').onclick = () => {
    const backupData = {
      storeInfo: storeInfo,
      catalog: catalog,
      sales: localStorage
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CoffeeSpot_Backup_${getTodayString()}.json`;
    a.click();
    showToast('💾 Backup downloaded!');
  };
}

// ---------- MODAL CONTROL ----------
function openModal(id) {
  $(id).classList.add('active');
}

function closeModal(id) {
  $(id).classList.remove('active');
}

// ---------- TOAST SYSTEM ----------
function showToast(msg) {
  const container = $('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

function triggerHaptic() {
  if ('vibrate' in navigator) {
    try { navigator.vibrate(30); } catch (e) {}
  }
}

// ---------- PWA SETUP ----------
function initPWA() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(e => console.log(e));
  }
}
