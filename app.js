/* ==========================================================================
   COFFEE SPOT POS — COMPLETE APPLICATION LOGIC
   ========================================================================== */

// Default Catalog Structure (Coffee Spot Counter Menu)
const DEFAULT_CATALOG = [
  { id: 'cat-1', cat: 'Beverages', name: 'Tea', price: 15, icon: '☕', img: 'assets/tea.png', hotkey: '1', stock: 'instock' },
  { id: 'cat-2', cat: 'Beverages', name: 'Coffee', price: 15, icon: '🥤', img: 'assets/coffee.png', hotkey: '2', stock: 'instock' },
  { id: 'cat-3', cat: 'Beverages', name: 'Black Tea', price: 15, icon: '🍵', img: 'assets/tea.png', hotkey: '3', stock: 'instock' },
  { id: 'cat-4', cat: 'Beverages', name: 'Black Coffee', price: 15, icon: '☕', img: 'assets/coffee.png', hotkey: '4', stock: 'instock' },
  { id: 'cat-16', cat: 'Beverages', name: 'Water Bottle', price: 10, icon: '💧', img: 'assets/water.png', hotkey: '', stock: 'instock', variants: [10, 20] },
  { id: 'cat-5', cat: 'Health Drinks', name: 'Boost', price: 20, icon: '🥛', hotkey: '5', stock: 'instock' },
  { id: 'cat-6', cat: 'Health Drinks', name: 'Horlicks', price: 20, icon: '🥛', hotkey: '', stock: 'instock' },
  // Fresh Juices & Smoothies Category
  { id: 'juice-1', cat: 'Fresh Juices', name: 'Fresh Orange Juice', price: 40, icon: '🍊', hotkey: '9', stock: 'instock', variants: [40, 60, 80] },
  { id: 'juice-2', cat: 'Fresh Juices', name: 'Watermelon Fresh Juice', price: 30, icon: '🍉', hotkey: '0', stock: 'instock', variants: [30, 45, 60] },
  { id: 'juice-3', cat: 'Fresh Juices', name: 'Fresh Mango Juice', price: 40, icon: '🥭', hotkey: '', stock: 'instock', variants: [40, 60, 80] },
  { id: 'juice-4', cat: 'Fresh Juices', name: 'Pineapple Fresh Juice', price: 35, icon: '🍍', hotkey: '', stock: 'instock', variants: [35, 50, 70] },
  { id: 'juice-5', cat: 'Fresh Juices', name: 'Apple Fresh Juice', price: 50, icon: '🍏', hotkey: '', stock: 'instock', variants: [50, 70, 90] },
  { id: 'juice-6', cat: 'Fresh Juices', name: 'Anar / Pomegranate Juice', price: 60, icon: '🍇', hotkey: '', stock: 'instock', variants: [60, 80, 100] },
  { id: 'juice-7', cat: 'Fresh Juices', name: 'Mosambi / Sweet Lime Juice', price: 40, icon: '🍋', hotkey: '', stock: 'instock', variants: [40, 60] },
  { id: 'juice-8', cat: 'Fresh Juices', name: 'ABC Juice (Apple Beetroot Carrot)', price: 50, icon: '🥤', hotkey: '', stock: 'instock', variants: [50, 70, 90] },
  { id: 'juice-9', cat: 'Fresh Juices', name: 'Green Detox Cleanse Juice', price: 50, icon: '🥬', hotkey: '', stock: 'instock', variants: [50, 70] },
  { id: 'juice-10', cat: 'Fresh Juices', name: 'Fresh Grape Juice', price: 40, icon: '🍇', hotkey: '', stock: 'instock', variants: [40, 60] },
  { id: 'juice-11', cat: 'Fresh Juices', name: 'Fresh Lime Soda / Mint Cooler', price: 30, icon: '🍹', hotkey: '', stock: 'instock', variants: [25, 30, 45] },
  { id: 'juice-12', cat: 'Fresh Juices', name: 'Strawberry Smoothie', price: 60, icon: '🍓', hotkey: '', stock: 'instock', variants: [60, 80, 100] },
  { id: 'juice-13', cat: 'Fresh Juices', name: 'Papaya Fresh Juice', price: 35, icon: '🍈', hotkey: '', stock: 'instock', variants: [35, 50] },
  { id: 'juice-14', cat: 'Fresh Juices', name: 'Sugarcane Juice (Karumbu)', price: 30, icon: '🎋', hotkey: '', stock: 'instock', variants: [30, 40, 50] },
  { id: 'juice-15', cat: 'Fresh Juices', name: 'Kirni / Muskmelon Juice', price: 35, icon: '🍈', hotkey: '', stock: 'instock', variants: [35, 50] },
  { id: 'juice-16', cat: 'Fresh Juices', name: 'Chikoo / Sapota Milkshake', price: 45, icon: '🥔', hotkey: '', stock: 'instock', variants: [45, 60] },
  { id: 'juice-17', cat: 'Fresh Juices', name: 'Kiwi Fresh Juice / Smoothie', price: 70, icon: '🥝', hotkey: '', stock: 'instock', variants: [70, 90] },
  { id: 'juice-18', cat: 'Fresh Juices', name: 'Dragon Fruit Smoothie', price: 80, icon: '🐉', hotkey: '', stock: 'instock', variants: [80, 100] },
  { id: 'juice-19', cat: 'Fresh Juices', name: 'Amla / Indian Gooseberry Juice', price: 30, icon: '🟢', hotkey: '', stock: 'instock', variants: [30, 45] },
  { id: 'juice-20', cat: 'Fresh Juices', name: 'Aloe Vera & Lemon Juice', price: 35, icon: '🌱', hotkey: '', stock: 'instock', variants: [35, 50] },
  { id: 'juice-21', cat: 'Fresh Juices', name: 'Tender Coconut Water (Elaneer)', price: 40, icon: '🥥', hotkey: '', stock: 'instock', variants: [40, 50] },
  { id: 'juice-22', cat: 'Fresh Juices', name: 'Blueberry Acai Smoothie', price: 85, icon: '🫐', hotkey: '', stock: 'instock', variants: [85, 110] },
  { id: 'juice-23', cat: 'Fresh Juices', name: 'Banana Milkshake', price: 40, icon: '🍌', hotkey: '', stock: 'instock', variants: [40, 55] },
  { id: 'juice-24', cat: 'Fresh Juices', name: 'Avocado Honey Shake', price: 90, icon: '🥑', hotkey: '', stock: 'instock', variants: [90, 120] },
  { id: 'juice-25', cat: 'Fresh Juices', name: 'Lemon Ginger Honey Shot', price: 30, icon: '🍯', hotkey: '', stock: 'instock', variants: [30, 45] },
  { id: 'juice-26', cat: 'Fresh Juices', name: 'Guava (Pink Guava) Juice', price: 45, icon: '🍐', hotkey: '', stock: 'instock', variants: [45, 60] },
  { id: 'juice-27', cat: 'Fresh Juices', name: 'Lychee Fresh Juice', price: 65, icon: '🍒', hotkey: '', stock: 'instock', variants: [65, 85] },
  { id: 'juice-28', cat: 'Fresh Juices', name: 'Peach & Nectarine Juice', price: 70, icon: '🍑', hotkey: '', stock: 'instock', variants: [70, 90] },
  // Rice & Food Items Category (₹40 & ₹50)
  { id: 'food-1', cat: 'Rice & Food Items', name: 'Lemon Rice', price: 40, icon: '🍋', hotkey: '', stock: 'instock', variants: [40, 50, 60] },
  { id: 'food-2', cat: 'Rice & Food Items', name: 'Curd Rice', price: 40, icon: '🍚', hotkey: '', stock: 'instock', variants: [40, 50, 60] },
  { id: 'food-3', cat: 'Rice & Food Items', name: 'Sambar Rice', price: 40, icon: '🍛', hotkey: '', stock: 'instock', variants: [40, 50, 60] },
  { id: 'food-4', cat: 'Rice & Food Items', name: 'Tomato Rice', price: 40, icon: '🍅', hotkey: '', stock: 'instock', variants: [40, 50, 60] },
  { id: 'food-5', cat: 'Rice & Food Items', name: 'Veg Fried Rice', price: 50, icon: '🍚', hotkey: '', stock: 'instock', variants: [50, 65, 80] },
  { id: 'food-6', cat: 'Rice & Food Items', name: 'Egg Fried Rice', price: 50, icon: '🍳', hotkey: '', stock: 'instock', variants: [50, 65, 80] },
  { id: 'food-7', cat: 'Rice & Food Items', name: 'Pudina Mint Rice', price: 40, icon: '🌿', hotkey: '', stock: 'instock', variants: [40, 50] },
  { id: 'food-8', cat: 'Rice & Food Items', name: 'Puliogare Tamarind Rice', price: 40, icon: '🍲', hotkey: '', stock: 'instock', variants: [40, 50] },
  { id: 'food-9', cat: 'Rice & Food Items', name: 'Coconut Rice', price: 40, icon: '🥥', hotkey: '', stock: 'instock', variants: [40, 50] },
  { id: 'food-10', cat: 'Rice & Food Items', name: 'Veg Biryani / Pulao', price: 50, icon: '🍲', hotkey: '', stock: 'instock', variants: [50, 70, 90] },
  { id: 'food-11', cat: 'Rice & Food Items', name: 'Egg Biryani', price: 50, icon: '🥚', hotkey: '', stock: 'instock', variants: [50, 70, 90] },
  { id: 'food-12', cat: 'Rice & Food Items', name: 'Paneer Fried Rice', price: 50, icon: '🧀', hotkey: '', stock: 'instock', variants: [50, 70] },
  { id: 'food-13', cat: 'Rice & Food Items', name: 'Mushroom Rice', price: 50, icon: '🍄', hotkey: '', stock: 'instock', variants: [50, 70] },
  { id: 'food-14', cat: 'Rice & Food Items', name: 'Chapathi Set (2 Pcs + Curry)', price: 40, icon: '🫓', hotkey: '', stock: 'instock', variants: [40, 50] },
  { id: 'food-15', cat: 'Rice & Food Items', name: 'Mini Meal Lunch Box', price: 50, icon: '🍱', hotkey: '', stock: 'instock', variants: [50, 70] },
  // Chaat Items Category
  { id: 'chaat-1', cat: 'Chaat Items', name: 'Pani Puri / Golgappa (6 Pcs)', price: 30, icon: '🧆', hotkey: '', stock: 'instock', variants: [30, 40, 50] },
  { id: 'chaat-2', cat: 'Chaat Items', name: 'Sev Puri', price: 40, icon: '🥙', hotkey: '', stock: 'instock', variants: [40, 50] },
  { id: 'chaat-3', cat: 'Chaat Items', name: 'Bhel Puri', price: 35, icon: '🥣', hotkey: '', stock: 'instock', variants: [35, 45] },
  { id: 'chaat-4', cat: 'Chaat Items', name: 'Dahi Puri (6 Pcs)', price: 50, icon: '🫓', hotkey: '', stock: 'instock', variants: [50, 60] },
  { id: 'chaat-5', cat: 'Chaat Items', name: 'Samosa Chaat', price: 40, icon: '📐', hotkey: '', stock: 'instock', variants: [40, 50] },
  { id: 'chaat-6', cat: 'Chaat Items', name: 'Kachori Chaat', price: 40, icon: '🧆', hotkey: '', stock: 'instock', variants: [40, 50] },
  { id: 'chaat-7', cat: 'Chaat Items', name: 'Masala Puri', price: 35, icon: '🍲', hotkey: '', stock: 'instock', variants: [35, 45, 55] },
  { id: 'chaat-8', cat: 'Chaat Items', name: 'Aloo Tikki Chaat', price: 45, icon: '🥔', hotkey: '', stock: 'instock', variants: [45, 60] },
  { id: 'chaat-9', cat: 'Chaat Items', name: 'Papdi Chaat', price: 45, icon: '🫓', hotkey: '', stock: 'instock', variants: [45, 55] },
  { id: 'chaat-10', cat: 'Chaat Items', name: 'Ragda Patties', price: 50, icon: '🍲', hotkey: '', stock: 'instock', variants: [50, 65] },
  { id: 'chaat-11', cat: 'Chaat Items', name: 'Dahi Vada (2 Pcs)', price: 40, icon: '🧆', hotkey: '', stock: 'instock', variants: [40, 50] },
  { id: 'chaat-12', cat: 'Chaat Items', name: 'Raj Kachori Special', price: 60, icon: '👑', hotkey: '', stock: 'instock', variants: [60, 75] },
  { id: 'chaat-13', cat: 'Chaat Items', name: 'Cheese Corn Chaat', price: 45, icon: '🌽', hotkey: '', stock: 'instock', variants: [45, 60] },
  { id: 'chaat-14', cat: 'Chaat Items', name: 'Peanut Masala Chaat', price: 30, icon: '🥜', hotkey: '', stock: 'instock', variants: [30, 40] },
  { id: 'chaat-15', cat: 'Chaat Items', name: 'Crispy Palak Patta Chaat', price: 50, icon: '🍃', hotkey: '', stock: 'instock', variants: [50, 65] },
  { id: 'chaat-16', cat: 'Chaat Items', name: 'Sukha Puri', price: 25, icon: '🧆', hotkey: '', stock: 'instock', variants: [25, 35] },
  { id: 'chaat-17', cat: 'Chaat Items', name: 'Cheese Sev Puri', price: 55, icon: '🧀', hotkey: '', stock: 'instock', variants: [55, 70] },
  { id: 'cat-7', cat: 'Snacks & Eats', name: 'Vada', price: 10, icon: '🧆', img: 'assets/vada.png', hotkey: '6', stock: 'instock' },
  { id: 'cat-8', cat: 'Snacks & Eats', name: 'Cauliflower', price: 40, icon: '🥦', hotkey: '7', stock: 'instock' },
  { id: 'cat-20', cat: 'Chocolates & Eats', name: 'Dairy Milk', price: 20, icon: '🍫', img: 'assets/chocolate.png', hotkey: '', stock: 'instock', variants: [20, 40, 100] },
  { id: 'cat-21', cat: 'Chocolates & Eats', name: 'KitKat', price: 10, icon: '🍫', img: 'assets/chocolate.png', hotkey: '', stock: 'instock', variants: [10, 20, 40] },
  { id: 'cat-22', cat: 'Chocolates & Eats', name: 'Kinder Joy', price: 100, icon: '🎁', img: 'assets/chocolate.png', hotkey: '', stock: 'instock', variants: [100] },
  { id: 'cat-18', cat: 'Snacks & Eats', name: 'Chocolate', price: 40, icon: '🍫', img: 'assets/chocolate.png', hotkey: '', stock: 'instock', variants: [20, 40, 100] },
  { id: 'cat-19', cat: 'Bakery & Eats', name: 'Bread Packet', price: 50, icon: '🍞', img: 'assets/bread.png', hotkey: '', stock: 'instock' },
  { id: 'cat-9', cat: 'Biscuits', name: 'Biscuits', price: 10, icon: '🍪', hotkey: '8', stock: 'instock', variants: [5, 10, 20, 30] }
];

// Default Labour Staff Roster (5 Shop Labours)
const DEFAULT_LABOURERS = [
  { id: 'lab-1', name: 'Tea Master (Ramesh)', wage: 400 },
  { id: 'lab-2', name: 'Vada Master (Suresh)', wage: 350 },
  { id: 'lab-3', name: 'Counter / Cashier (Priya)', wage: 300 },
  { id: 'lab-4', name: 'Cleaning & Maintenance (Murugan)', wage: 250 },
  { id: 'lab-5', name: 'Helper / Delivery (Karthik)', wage: 250 }
];

// Helper Functions
const $ = id => document.getElementById(id);
const money = n => "₹" + Number(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const getTodayString = () => new Date().toISOString().slice(0, 10);

// Application State Variables
let catalog = loadCatalog();
let currentDate = getTodayString();
let cart = [];
let selectedCategory = 'ALL';
let billsFilterStatus = 'ALL';
let storeInfo = loadStoreInfo();

let globalBillNo = parseInt(localStorage.getItem('coffee_pos:bill_no')) || 101;
let globalTokenNo = parseInt(localStorage.getItem('coffee_pos:token_no')) || 1;

let selectedPeriodTab = 'daily';
let hourlyChartInstance = null;
let categoryChartInstance = null;
let summaryChartInstance = null;

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initStoreBranding();
  initDateNav();
  initCategoryTabs();
  renderCatalogGrid();
  renderCart();
  updateKPIs();
  bindEvents();
  initHotkeys();
  initPWA();
});

// ---------- STORAGE HELPERS ----------
function loadCatalog() {
  try {
    let loaded = JSON.parse(JSON.stringify(DEFAULT_CATALOG));
    localStorage.setItem('coffee_pos:catalog_v3', JSON.stringify(loaded));
    return loaded;
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
      upi: 'coffeespot@upi',
      footer: 'Thank you for visiting Coffee Spot! Have a wonderful day ☕',
      audioEnabled: true
    };
  }
}

function saveStoreInfo() {
  localStorage.setItem('coffee_pos:store_info', JSON.stringify(storeInfo));
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

function loadAllSalesKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith('coffee_pos:sales:')) {
      keys.push(key.replace('coffee_pos:sales:', ''));
    }
  }
  return keys.sort();
}

function loadLabour(date) {
  try {
    const raw = localStorage.getItem('coffee_pos:labour:' + date);
    if (!raw) return JSON.parse(JSON.stringify(DEFAULT_LABOURERS));
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    // Migrate old format { teaMaster, vadaMaster }
    return [
      { id: 'lab-1', name: 'Tea Master (Ramesh)', wage: parsed.teaMaster || 400 },
      { id: 'lab-2', name: 'Vada Master (Suresh)', wage: parsed.vadaMaster || 350 },
      { id: 'lab-3', name: 'Counter / Cashier (Priya)', wage: 300 },
      { id: 'lab-4', name: 'Cleaning & Maintenance (Murugan)', wage: 250 },
      { id: 'lab-5', name: 'Helper / Delivery (Karthik)', wage: 250 }
    ];
  } catch (e) {
    return JSON.parse(JSON.stringify(DEFAULT_LABOURERS));
  }
}

function getLabourTotal(date) {
  const labourers = loadLabour(date);
  return labourers.reduce((sum, l) => sum + (parseFloat(l.wage) || 0), 0);
}

function saveLabour(date, labourList) {
  localStorage.setItem('coffee_pos:labour:' + date, JSON.stringify(labourList));
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

// Web Audio API Sound Chime Synthesizer
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

function triggerHaptic() {
  if (navigator.vibrate) navigator.vibrate(25);
}

// Toast Notifications
function showToast(msg) {
  const toast = $('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}

// Modal Helpers
function openModal(id) {
  const m = $(id);
  if (m) m.classList.add('active');
}

function closeModal(id) {
  const m = $(id);
  if (m) m.classList.remove('active');
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
  $('storeFooterInput').value = storeInfo.footer || '';
  $('audioToggleInput').checked = storeInfo.audioEnabled !== false;
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

// ---------- CATEGORY & POS TOUCH GRID ----------
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
    grid.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding: 40px 10px; color: var(--text-muted);">No items found matching filter.</div>`;
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
      if (item.variants && item.variants.length > 1) {
        openVariantModal(item);
      } else {
        addToCart(item);
      }
    };

    const hkHtml = item.hotkey ? `<span class="hk-badge" title="Hotkey: ${item.hotkey}">${item.hotkey}</span>` : '';
    const stockBadgeHtml = isLow ? `<span class="badge-lowstock" style="font-size:0.65rem;">Low Stock</span>` : (isOut ? `<span class="badge-outstock" style="font-size:0.65rem;">Out of Stock</span>` : '');

    const visualContent = item.img ? 
      `<div class="btn-3d-wrapper"><img src="${item.img}" class="btn-3d-img" alt="${item.name}"></div>` :
      `<div class="btn-3d-wrapper"><span class="btn-emoji">${item.icon || '☕'}</span></div>`;

    const priceLabel = item.variants && item.variants.length > 1 ? 
      `₹${Math.min(...item.variants)}-₹${Math.max(...item.variants)}` : 
      money(item.price);

    btn.innerHTML = `
      ${hkHtml}
      ${visualContent}
      <span class="btn-title">${item.name}</span>
      <span class="btn-price">${priceLabel}</span>
      ${stockBadgeHtml}
    `;

    grid.appendChild(btn);
  });
}

function openVariantModal(item) {
  let modalOverlay = document.getElementById('dynamicVariantModal');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'dynamicVariantModal';
    modalOverlay.style.cssText = `
      position: fixed; inset: 0; background: rgba(0,0,0,0.75); backdrop-filter: blur(5px);
      display: flex; align-items: center; justify-content: center; z-index: 9999; padding: 20px;
    `;
    document.body.appendChild(modalOverlay);
  }

  modalOverlay.innerHTML = `
    <div style="background: var(--bg-card, #1e293b); color: var(--text-main, #fff); border-radius: 16px; padding: 24px; max-width: 380px; width: 100%; border: 1px solid rgba(255,255,255,0.2); box-shadow: 0 20px 40px rgba(0,0,0,0.6); text-align: center; font-family: inherit;">
      <h3 style="margin-bottom: 6px; font-size: 1.2rem; font-weight: 700;">${item.icon || '🥤'} ${item.name}</h3>
      <p style="margin-bottom: 18px; font-size: 0.85rem; opacity: 0.8;">Select Portion / Price Variant:</p>
      <div style="display: flex; flex-direction: column; gap: 10px;" id="variantButtonsContainer"></div>
      <button onclick="document.getElementById('dynamicVariantModal').style.display='none'" style="margin-top: 16px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 10px; border-radius: 8px; cursor: pointer; width: 100%; font-weight: 600;">Cancel</button>
    </div>
  `;

  modalOverlay.style.display = 'flex';
  const container = document.getElementById('variantButtonsContainer');

  item.variants.forEach(rate => {
    const vBtn = document.createElement('button');
    vBtn.style.cssText = `
      background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
      color: #ffffff; border: none; padding: 12px; border-radius: 10px;
      font-weight: 700; font-size: 1.05rem; cursor: pointer; transition: transform 0.1s;
      display: flex; align-items: center; justify-content: space-between; padding: 12px 18px;
    `;
    vBtn.innerHTML = `<span>Portion Variant</span> <span>₹${rate}</span>`;
    vBtn.onclick = () => {
      addToCart({
        id: item.id + '-' + rate,
        name: `${item.name} (₹${rate})`,
        price: rate,
        icon: item.icon
      });
      modalOverlay.style.display = 'none';
      showToast(`🛒 Added ${item.name} (₹${rate}) to order!`);
    };
    container.appendChild(vBtn);
  });
}

function addToCart(item) {
  triggerHaptic();
  playChime('add');

  const isDirect1Tap = $('direct1TapToggle') && $('direct1TapToggle').checked;

  if (isDirect1Tap) {
    cart = [{
      id: item.id,
      name: item.name,
      price: item.price,
      qty: 1,
      icon: item.icon
    }];
    renderCart();
    checkoutCart(true); // Print immediately
    return;
  }

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
  showToast(`🛒 Added ${item.name} to order!`);
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
          🛒 Cart is empty<br><small>Tap any item or use hotkeys [1-9, 0]</small>
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

  // Cash Calculator
  const cashGiven = parseFloat($('cashGiven').value) || 0;
  const changeDue = Math.max(0, cashGiven - grandTotal);
  $('changeDue').textContent = money(changeDue);

  $('nextTokenNo').textContent = globalTokenNo;

  // Mobile Floating Cart Updates
  if ($('mCartCount')) $('mCartCount').textContent = totalItemCount;
  if ($('mCartTotal')) $('mCartTotal').textContent = money(grandTotal);
  if ($('mobileCartBar')) {
    $('mobileCartBar').style.display = totalItemCount > 0 ? 'flex' : 'none';
  }
}

function clearCart() {
  cart = [];
  $('customerName').value = '';
  $('customerDept').value = '';
  $('customerPhone').value = '';
  $('cartDiscount').value = '0';
  $('cashGiven').value = '';
  renderCart();
}

// ---------- CHECKOUT & RECEIPT GENERATION ----------
function checkoutCart(shouldPrint = true) {
  if (cart.length === 0) {
    showToast('⚠️ Cart is empty! Add items first.');
    return;
  }

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const discountPercent = parseFloat($('cartDiscount').value) || 0;
  const discountAmount = (subtotal * discountPercent) / 100;
  const grandTotal = Math.max(0, subtotal - discountAmount);

  const paymentMethod = $('paymentMethodSelect').value;
  const paymentStatus = (paymentMethod === 'Credit') ? 'Pending' : $('paymentStatusSelect').value;

  const billRecord = {
    billNo: globalBillNo,
    tokenNo: globalTokenNo,
    date: currentDate,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    orderType: $('orderType').value,
    customerName: $('customerName').value.trim() || 'Walk-in Customer',
    customerDept: $('customerDept').value.trim(),
    customerPhone: $('customerPhone').value.trim(),
    items: JSON.parse(JSON.stringify(cart)),
    subtotal: subtotal,
    discountPercent: discountPercent,
    discountAmount: discountAmount,
    grandTotal: grandTotal,
    paymentMethod: paymentMethod,
    paymentStatus: paymentStatus
  };

  // Save Sale Record
  const sales = loadSales(currentDate);
  sales.push(billRecord);
  saveSales(currentDate, sales);

  // Increment Global Counters
  globalBillNo += 1;
  globalTokenNo += 1;
  localStorage.setItem('coffee_pos:bill_no', globalBillNo);
  localStorage.setItem('coffee_pos:token_no', globalTokenNo);

  playChime('complete');
  showToast(`✅ Bill #${billRecord.billNo} Saved!`);

  // Render Receipt Modal
  renderReceiptModal(billRecord);

  // Reset Cart
  clearCart();
  updateKPIs();

  if (shouldPrint) {
    openModal('receiptModal');
  }
}

function renderReceiptModal(bill) {
  $('recStoreName').textContent = storeInfo.name;
  $('recStoreTag').textContent = storeInfo.tagline;
  $('recBillNo').textContent = bill.billNo;
  $('recTokenNo').textContent = bill.tokenNo;
  $('recDateTime').textContent = `${bill.date} ${bill.time}`;
  $('recOrderType').textContent = bill.orderType;
  $('recFooterText').textContent = storeInfo.footer || 'Thank you for visiting!';

  if (bill.customerName && bill.customerName !== 'Walk-in Customer') {
    $('recCustomerRow').style.display = 'block';
    $('recCustomerName').textContent = bill.customerName + (bill.customerDept ? ` (${bill.customerDept})` : '');
  } else {
    $('recCustomerRow').style.display = 'none';
  }

  const tbody = $('recItemsList');
  tbody.innerHTML = '';
  bill.items.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="text-align:left;">${item.name}</td>
      <td style="text-align:center;">${item.qty}</td>
      <td style="text-align:right;">${money(item.price)}</td>
      <td style="text-align:right;">${money(item.price * item.qty)}</td>
    `;
    tbody.appendChild(tr);
  });

  $('recSubtotal').textContent = money(bill.subtotal);
  if (bill.discountAmount > 0) {
    $('recDiscountRow').style.display = 'flex';
    $('recDiscount').textContent = money(bill.discountAmount);
  } else {
    $('recDiscountRow').style.display = 'none';
  }
  $('recGrandTotal').textContent = money(bill.grandTotal);
  $('recPayMethod').textContent = `${bill.paymentMethod} (${bill.paymentStatus})`;

  // Render UPI QR Code if UPI ID configured
  const qrWrap = $('receiptQrWrap');
  const qrCanvas = $('receiptQrCanvas');
  qrCanvas.innerHTML = '';

  if (storeInfo.upi) {
    qrWrap.style.display = 'flex';
    try {
      const upiUrl = `upi://pay?pa=${encodeURIComponent(storeInfo.upi)}&pn=${encodeURIComponent(storeInfo.name)}&am=${bill.grandTotal}&cu=INR`;
      const qr = qrcode(0, 'M');
      qr.addData(upiUrl);
      qr.make();
      qrCanvas.innerHTML = qr.createImgTag(4);
    } catch (e) {
      qrWrap.style.display = 'none';
    }
  } else {
    qrWrap.style.display = 'none';
  }
}

// ---------- KPI METRICS UPDATER ----------
function updateKPIs() {
  const sales = loadSales(currentDate);
  const totalSales = sales.reduce((sum, b) => sum + (b.paymentStatus === 'Paid' ? b.grandTotal : 0), 0);
  const billsCount = sales.length;

  const expenses = loadExpenses(currentDate);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  const totalLabour = getLabourTotal(currentDate);

  const totalCost = totalExpenses + totalLabour;
  const netProfit = totalSales - totalCost;

  if ($('kpiTotalSales')) $('kpiTotalSales').textContent = money(totalSales);
  if ($('kpiBillsCount')) $('kpiBillsCount').textContent = billsCount;
  if ($('kpiExpenses')) $('kpiExpenses').textContent = money(totalCost);
  if ($('kpiNetProfit')) $('kpiNetProfit').textContent = money(netProfit);
}

// ---------- CATALOG MANAGEMENT MODAL ----------
function renderCatalogTable() {
  const tbody = $('catalogTableBody');
  tbody.innerHTML = '';

  catalog.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.icon || '☕'}</td>
      <td><strong>${item.name}</strong></td>
      <td><span class="badge-chip">${item.cat}</span></td>
      <td>${money(item.price)}</td>
      <td><code>${item.hotkey || '-'}</code></td>
      <td>
        <select onchange="updateItemStock('${item.id}', this.value)">
          <option value="instock" ${item.stock === 'instock' ? 'selected' : ''}>In Stock</option>
          <option value="lowstock" ${item.stock === 'lowstock' ? 'selected' : ''}>Low Stock</option>
          <option value="outstock" ${item.stock === 'outstock' ? 'selected' : ''}>Out of Stock</option>
        </select>
      </td>
      <td>
        <button class="btn-secondary" style="padding:2px 6px;" onclick="editCatalogItem('${item.id}')">✏️</button>
        <button class="btn-secondary" style="padding:2px 6px; color:var(--danger);" onclick="deleteCatalogItem('${item.id}')">🗑️</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function updateItemStock(id, status) {
  const item = catalog.find(i => i.id === id);
  if (item) {
    item.stock = status;
    saveCatalog();
    renderCatalogGrid();
  }
}

function editCatalogItem(id) {
  const item = catalog.find(i => i.id === id);
  if (!item) return;
  $('editItemId').value = item.id;
  $('itemNameInput').value = item.name;
  $('itemCatInput').value = item.cat;
  $('itemPriceInput').value = item.price;
  $('itemIconInput').value = item.icon || '☕';
  $('itemHotkeyInput').value = item.hotkey || '';
  $('itemStockInput').value = item.stock || 'instock';
}

function deleteCatalogItem(id) {
  if (confirm('Are you sure you want to delete this menu item?')) {
    catalog = catalog.filter(i => i.id !== id);
    saveCatalog();
    initCategoryTabs();
    renderCatalogGrid();
    renderCatalogTable();
    showToast('🗑️ Item Deleted');
  }
}

function saveCatalogItem() {
  const id = $('editItemId').value;
  const name = $('itemNameInput').value.trim();
  const cat = $('itemCatInput').value.trim() || 'General';
  const price = parseFloat($('itemPriceInput').value) || 0;
  const icon = $('itemIconInput').value.trim() || '☕';
  const hotkey = $('itemHotkeyInput').value.trim();
  const stock = $('itemStockInput').value;

  if (!name || price <= 0) {
    alert('Please provide a valid item name and price.');
    return;
  }

  if (id) {
    const item = catalog.find(i => i.id === id);
    if (item) {
      item.name = name;
      item.cat = cat;
      item.price = price;
      item.icon = icon;
      item.hotkey = hotkey;
      item.stock = stock;
    }
  } else {
    catalog.push({
      id: 'cat-' + Date.now(),
      name: name,
      cat: cat,
      price: price,
      icon: icon,
      hotkey: hotkey,
      stock: stock
    });
  }

  saveCatalog();
  initCategoryTabs();
  renderCatalogGrid();
  renderCatalogTable();
  
  // Clear inputs
  $('editItemId').value = '';
  $('itemNameInput').value = '';
  $('itemCatInput').value = '';
  $('itemPriceInput').value = '';
  $('itemIconInput').value = '';
  $('itemHotkeyInput').value = '';
  showToast('✅ Menu Catalog Saved');
}

// ---------- RECENT BILLS MODAL ----------
function renderRecentBillsTable() {
  const sales = loadSales(currentDate);
  const tbody = $('recentBillsTableBody');
  const searchQuery = $('billSearchInput') ? $('billSearchInput').value.toLowerCase().trim() : '';

  tbody.innerHTML = '';

  const filtered = sales.filter(b => {
    const matchStatus = (billsFilterStatus === 'ALL') ? true :
      (billsFilterStatus === 'Pending' ? b.paymentStatus === 'Pending' : b.paymentMethod === billsFilterStatus);

    const matchSearch = b.billNo.toString().includes(searchQuery) ||
      b.customerName.toLowerCase().includes(searchQuery) ||
      b.customerDept.toLowerCase().includes(searchQuery);

    return matchStatus && matchSearch;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:20px;">No recent bills found.</td></tr>`;
    return;
  }

  filtered.forEach((b, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>#${b.billNo}</strong></td>
      <td>${b.tokenNo}</td>
      <td>${b.time}</td>
      <td>${b.customerName} ${b.customerDept ? `<br><small>${b.customerDept}</small>` : ''}</td>
      <td>${b.orderType}</td>
      <td style="font-family:var(--font-mono); font-weight:bold;">${money(b.grandTotal)}</td>
      <td>${b.paymentMethod}</td>
      <td>
        <span class="badge-chip" style="background:${b.paymentStatus === 'Paid' ? 'var(--primary-light)' : 'var(--danger-light)'}; color:${b.paymentStatus === 'Paid' ? 'var(--primary)' : 'var(--danger)'}">
          ${b.paymentStatus}
        </span>
      </td>
      <td>
        <button class="btn-secondary" style="padding:2px 6px;" onclick="viewBillReceipt(${b.billNo})">🖨️</button>
        <button class="btn-secondary" style="padding:2px 6px;" onclick="toggleBillStatus(${b.billNo})">🔄 Status</button>
        <button class="btn-secondary" style="padding:2px 6px; color:var(--danger);" onclick="deleteBill(${b.billNo})">🗑️</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function viewBillReceipt(billNo) {
  const sales = loadSales(currentDate);
  const bill = sales.find(b => b.billNo === billNo);
  if (bill) {
    renderReceiptModal(bill);
    openModal('receiptModal');
  }
}

function toggleBillStatus(billNo) {
  const sales = loadSales(currentDate);
  const bill = sales.find(b => b.billNo === billNo);
  if (bill) {
    bill.paymentStatus = bill.paymentStatus === 'Paid' ? 'Pending' : 'Paid';
    saveSales(currentDate, sales);
    renderRecentBillsTable();
    updateKPIs();
    showToast(`Bill #${billNo} status updated to ${bill.paymentStatus}`);
  }
}

function deleteBill(billNo) {
  if (confirm(`Delete Bill #${billNo}?`)) {
    let sales = loadSales(currentDate);
    sales = sales.filter(b => b.billNo !== billNo);
    saveSales(currentDate, sales);
    renderRecentBillsTable();
    updateKPIs();
    showToast(`🗑️ Bill #${billNo} deleted`);
  }
}

// ---------- CUSTOMER LEDGER (KHATA / DEBT TRACKER) ----------
function renderCustomerLedger() {
  const keys = loadAllSalesKeys();
  const customerMap = {};

  keys.forEach(date => {
    const sales = loadSales(date);
    sales.forEach(b => {
      if (b.paymentStatus === 'Pending' || b.paymentMethod === 'Credit') {
        const nameKey = (b.customerName || 'Unknown Customer').trim();
        if (!customerMap[nameKey]) {
          customerMap[nameKey] = {
            name: nameKey,
            dept: b.customerDept || '',
            phone: b.customerPhone || '',
            pendingBills: [],
            totalDebt: 0
          };
        }
        customerMap[nameKey].pendingBills.push(b);
        if (b.paymentStatus === 'Pending') {
          customerMap[nameKey].totalDebt += b.grandTotal;
        }
      }
    });
  });

  const customerList = Object.values(customerMap);
  const totalDebt = customerList.reduce((sum, c) => sum + c.totalDebt, 0);
  const pendingCustomers = customerList.filter(c => c.totalDebt > 0).length;

  $('ledgerTotalDebt').textContent = money(totalDebt);
  $('ledgerPendingCustomersCount').textContent = pendingCustomers;

  const tbody = $('ledgerTableBody');
  const searchQuery = $('ledgerSearchInput') ? $('ledgerSearchInput').value.toLowerCase().trim() : '';
  tbody.innerHTML = '';

  const filtered = customerList.filter(c => c.name.toLowerCase().includes(searchQuery) || c.phone.includes(searchQuery));

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:20px;">No pending customer ledger records.</td></tr>`;
    return;
  }

  filtered.forEach(c => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${c.name}</strong></td>
      <td>${c.dept || '-'}</td>
      <td>${c.phone || '-'}</td>
      <td>${c.pendingBills.length} Bills</td>
      <td style="font-family:var(--font-mono); font-weight:bold; color:var(--danger);">${money(c.totalDebt)}</td>
      <td>
        <button class="btn-primary" style="padding:4px 8px; font-size:0.8rem;" onclick="clearCustomerDebt('${c.name}')">✅ Clear Debt</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function clearCustomerDebt(customerName) {
  if (confirm(`Mark all pending credit bills as PAID for ${customerName}?`)) {
    const keys = loadAllSalesKeys();
    keys.forEach(date => {
      let sales = loadSales(date);
      let updated = false;
      sales.forEach(b => {
        if (b.customerName.trim() === customerName && b.paymentStatus === 'Pending') {
          b.paymentStatus = 'Paid';
          updated = true;
        }
      });
      if (updated) saveSales(date, sales);
    });

    renderCustomerLedger();
    updateKPIs();
    showToast(`✅ Debt cleared for ${customerName}`);
  }
}

// ---------- EXPENSES & LABOUR WAGES ----------
let currentLabourers = [];

function initExpensesView() {
  $('expenseDateTitle').textContent = currentDate;
  currentLabourers = loadLabour(currentDate);
  renderLabourList();
  renderExpensesTable();
}

function renderLabourList() {
  const container = $('labourListContainer');
  if (!container) return;
  container.innerHTML = '';

  let totalSum = 0;

  currentLabourers.forEach((item, index) => {
    totalSum += (parseFloat(item.wage) || 0);

    const row = document.createElement('div');
    row.className = 'labour-item-row';
    row.innerHTML = `
      <input type="text" value="${item.name.replace(/"/g, '&quot;')}" placeholder="Staff Name / Designation" oninput="updateLabourItem(${index}, 'name', this.value)">
      <input type="number" value="${item.wage}" placeholder="Wage ₹" step="10" min="0" oninput="updateLabourItem(${index}, 'wage', this.value)">
      <button class="btn-secondary" style="padding:4px 8px; color:var(--danger);" onclick="deleteLabourItem(${index})" title="Remove staff">🗑️</button>
    `;
    container.appendChild(row);
  });

  if ($('labourTotalBadge')) {
    $('labourTotalBadge').textContent = `Total: ${money(totalSum)} / day`;
  }
}

function updateLabourItem(index, key, val) {
  if (currentLabourers[index]) {
    if (key === 'wage') {
      currentLabourers[index].wage = parseFloat(val) || 0;
    } else {
      currentLabourers[index].name = val;
    }
    const totalSum = currentLabourers.reduce((sum, l) => sum + (parseFloat(l.wage) || 0), 0);
    if ($('labourTotalBadge')) {
      $('labourTotalBadge').textContent = `Total: ${money(totalSum)} / day`;
    }
  }
}

function deleteLabourItem(index) {
  currentLabourers.splice(index, 1);
  renderLabourList();
}

function addNewLabourItem() {
  currentLabourers.push({
    id: 'lab-' + Date.now(),
    name: 'New Joiner Staff ' + (currentLabourers.length + 1),
    wage: 250
  });
  renderLabourList();
  showToast('➕ New Labour Joiner Added');
}

function renderExpensesTable() {
  const expenses = loadExpenses(currentDate);
  const tbody = $('expensesTableBody');
  tbody.innerHTML = '';

  if (expenses.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding:20px;">No expenses recorded for ${currentDate}.</td></tr>`;
    return;
  }

  expenses.forEach((e, idx) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${e.title}</strong></td>
      <td><span class="badge-chip">${e.category}</span></td>
      <td style="font-family:var(--font-mono);">${money(e.amount)}</td>
      <td><button class="btn-secondary" style="padding:2px 6px; color:var(--danger);" onclick="deleteExpense(${idx})">🗑️</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function deleteExpense(idx) {
  const expenses = loadExpenses(currentDate);
  expenses.splice(idx, 1);
  saveExpenses(currentDate, expenses);
  renderExpensesTable();
  updateKPIs();
}

// ---------- FINANCIAL REPORTS & SUMMARIES ----------
function renderFinancialReports() {
  const period = selectedPeriodTab;
  const keys = loadAllSalesKeys();

  let grossSales = 0;
  let totalDiscounts = 0;
  let totalExpenses = 0;
  let totalLabour = 0;

  const labels = [];
  const salesData = [];

  if (period === 'daily') {
    const sales = loadSales(currentDate);
    sales.forEach(b => {
      if (b.paymentStatus === 'Paid') {
        grossSales += b.grandTotal;
        totalDiscounts += b.discountAmount;
      }
    });

    const exps = loadExpenses(currentDate);
    totalExpenses = exps.reduce((sum, e) => sum + e.amount, 0);

    totalLabour = getLabourTotal(currentDate);

    labels.push(currentDate);
    salesData.push(grossSales);
  } else {
    keys.forEach(date => {
      const sales = loadSales(date);
      const daySales = sales.reduce((sum, b) => sum + (b.paymentStatus === 'Paid' ? b.grandTotal : 0), 0);
      const dayDiscounts = sales.reduce((sum, b) => sum + (b.paymentStatus === 'Paid' ? b.discountAmount : 0), 0);

      grossSales += daySales;
      totalDiscounts += dayDiscounts;

      const exps = loadExpenses(date);
      totalExpenses += exps.reduce((sum, e) => sum + e.amount, 0);

      totalLabour += getLabourTotal(date);

      labels.push(date);
      salesData.push(daySales);
    });
  }

  const grandExpenses = totalExpenses + totalLabour;
  const netProfit = grossSales - grandExpenses;

  $('repGrossSales').textContent = money(grossSales);
  $('repDiscounts').textContent = money(totalDiscounts);
  $('repExpenses').textContent = money(grandExpenses);
  $('repNetProfit').textContent = money(netProfit);

  // Render Summary Chart
  const ctx = $('summaryReportChart').getContext('2d');
  if (summaryChartInstance) summaryChartInstance.destroy();

  summaryChartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Revenue (₹)',
        data: salesData,
        backgroundColor: '#1F5C4F',
        borderRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

// ---------- VISUAL ANALYTICS ----------
function renderAnalytics() {
  const sales = loadSales(currentDate);

  // Hourly Distribution
  const hourlyMap = Array(24).fill(0);
  const catMap = {};

  sales.forEach(b => {
    if (b.paymentStatus === 'Paid') {
      const hour = parseInt(b.time.split(':')[0]) || 12;
      hourlyMap[hour] += b.grandTotal;

      b.items.forEach(i => {
        catMap[i.name] = (catMap[i.name] || 0) + (i.price * i.qty);
      });
    }
  });

  // Hourly Chart
  const ctx1 = $('hourlyChart').getContext('2d');
  if (hourlyChartInstance) hourlyChartInstance.destroy();

  hourlyChartInstance = new Chart(ctx1, {
    type: 'line',
    data: {
      labels: Array.from({ length: 24 }, (_, i) => `${i}:00`),
      datasets: [{
        label: 'Sales (₹)',
        data: hourlyMap,
        borderColor: '#1F5C4F',
        backgroundColor: 'rgba(31, 92, 79, 0.15)',
        fill: true,
        tension: 0.3
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });

  // Category Doughnut Chart
  const ctx2 = $('categoryChart').getContext('2d');
  if (categoryChartInstance) categoryChartInstance.destroy();

  categoryChartInstance = new Chart(ctx2, {
    type: 'doughnut',
    data: {
      labels: Object.keys(catMap),
      datasets: [{
        data: Object.values(catMap),
        backgroundColor: ['#1F5C4F', '#C86D51', '#E29578', '#2A9D8F', '#E65100', '#F57F17', '#9D4EDD']
      }]
    },
    options: { responsive: true, maintainAspectRatio: false }
  });
}

// ---------- DEMO DATA GENERATOR ----------
function loadDemoData() {
  if (confirm('Load sample sales, menu, and expenses into today\'s session?')) {
    const today = currentDate;
    const demoSales = [
      { billNo: 101, tokenNo: 1, date: today, time: '08:30', orderType: 'Dine In', customerName: 'Prof. Sharma', customerDept: 'Physics', customerPhone: '9876543210', items: [{ id: 'cat-1', name: 'Tea', price: 15, qty: 2 }, { id: 'cat-7', name: 'Vada', price: 10, qty: 2 }], subtotal: 50, discountPercent: 0, discountAmount: 0, grandTotal: 50, paymentMethod: 'UPI', paymentStatus: 'Paid' },
      { billNo: 102, tokenNo: 2, date: today, time: '09:15', orderType: 'Takeaway', customerName: 'Anand Kumar', customerDept: 'CS Dept', customerPhone: '9443322110', items: [{ id: 'cat-2', name: 'Coffee', price: 15, qty: 4 }, { id: 'cat-8', name: 'Cauliflower', price: 40, qty: 1 }], subtotal: 100, discountPercent: 10, discountAmount: 10, grandTotal: 90, paymentMethod: 'Cash', paymentStatus: 'Paid' },
      { billNo: 103, tokenNo: 3, date: today, time: '11:00', orderType: 'Dine In', customerName: 'Student Guild', customerDept: 'Admin', customerPhone: '9112233445', items: [{ id: 'cat-5', name: 'Boost', price: 20, qty: 3 }, { id: 'cat-10', name: 'Biscuits ₹10', price: 10, qty: 3 }], subtotal: 90, discountPercent: 0, discountAmount: 0, grandTotal: 90, paymentMethod: 'Credit', paymentStatus: 'Pending' }
    ];

    const demoExpenses = [
      { title: 'Fresh Cow Milk 10L', category: 'Raw Materials', amount: 500 },
      { title: 'Tea Powder & Sugar', category: 'Raw Materials', amount: 250 },
      { title: 'Paper Cups Pack', category: 'Misc', amount: 120 }
    ];

    saveSales(today, demoSales);
    saveExpenses(today, demoExpenses);
    saveLabour(today, { teaMaster: 400, vadaMaster: 300 });

    updateKPIs();
    showToast('✨ Sample Demo Data Loaded!');
  }
}

// ---------- EXPORT CSV & BACKUP / RESTORE ----------
function exportSalesCsv() {
  const sales = loadSales(currentDate);
  if (sales.length === 0) {
    showToast('⚠️ No sales data to export for today');
    return;
  }

  let csv = 'BillNo,TokenNo,Date,Time,Customer,Dept,Phone,OrderType,Items,GrandTotal,PaymentMethod,Status\n';
  sales.forEach(b => {
    const itemStr = b.items.map(i => `${i.name} (x${i.qty})`).join('; ');
    csv += `"${b.billNo}","${b.tokenNo}","${b.date}","${b.time}","${b.customerName}","${b.customerDept}","${b.customerPhone}","${b.orderType}","${itemStr}","${b.grandTotal}","${b.paymentMethod}","${b.paymentStatus}"\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `CoffeeSpot_Sales_${currentDate}.csv`;
  a.click();
  showToast('📥 CSV Exported');
}

function downloadBackup() {
  const backup = {};
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith('coffee_pos:')) {
      backup[k] = localStorage.getItem(k);
    }
  }

  const jsonStr = JSON.stringify(backup, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `CoffeeSpot_Backup_${getTodayString()}.json`;
  a.click();
  showToast('💾 Backup Downloaded');
}

function restoreBackup(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const backup = JSON.parse(e.target.result);
      Object.keys(backup).forEach(k => {
        localStorage.setItem(k, backup[k]);
      });
      alert('Backup restored successfully! Reloading...');
      window.location.reload();
    } catch (err) {
      alert('Invalid backup JSON file.');
    }
  };
  reader.readAsText(file);
}

// ---------- KEYBOARD HOTKEYS ----------
function initHotkeys() {
  document.addEventListener('keydown', (e) => {
    if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    // Hotkeys 1-9, 0
    if (/^[0-9]$/.test(e.key)) {
      const item = catalog.find(i => i.hotkey === e.key);
      if (item) {
        e.preventDefault();
        addToCart(item);
      }
    } else if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
    }
  });
}

// ---------- EVENT BINDINGS ----------
function bindEvents() {
  $('editShopBtn').onclick = () => openModal('storeModal');
  $('saveStoreBtn').onclick = () => {
    storeInfo.name = $('storeNameInput').value.trim() || 'Coffee Spot';
    storeInfo.tagline = $('storeTagInput').value.trim();
    storeInfo.upi = $('storeUpiInput').value.trim();
    storeInfo.footer = $('storeFooterInput').value.trim();
    storeInfo.audioEnabled = $('audioToggleInput').checked;
    saveStoreInfo();
    initStoreBranding();
    closeModal('storeModal');
    showToast('Settings Saved');
  };

  $('openCatalogBtn').onclick = () => {
    renderCatalogTable();
    openModal('catalogModal');
  };
  $('saveItemBtn').onclick = saveCatalogItem;
  $('resetCatalogBtn').onclick = () => {
    if (confirm('Reset menu to default items?')) {
      catalog = JSON.parse(JSON.stringify(DEFAULT_CATALOG));
      saveCatalog();
      initCategoryTabs();
      renderCatalogGrid();
      renderCatalogTable();
      showToast('Menu Reset to Default');
    }
  };

  $('openRecentBillsBtn').onclick = () => {
    renderRecentBillsTable();
    openModal('recentBillsModal');
  };

  $('billsFilterButtons').onclick = (e) => {
    if (e.target.classList.contains('btn-chip')) {
      document.querySelectorAll('#billsFilterButtons .btn-chip').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      billsFilterStatus = e.target.getAttribute('data-filter');
      renderRecentBillsTable();
    }
  };

  $('billSearchInput').oninput = renderRecentBillsTable;

  $('openCustomerLedgerBtn').onclick = () => {
    renderCustomerLedger();
    openModal('ledgerModal');
  };
  $('ledgerSearchInput').oninput = renderCustomerLedger;

  $('openExpensesBtn').onclick = () => {
    initExpensesView();
    openModal('expensesModal');
  };

  $('addNewLabourBtn').onclick = addNewLabourItem;
  $('saveLabourBtn').onclick = () => {
    saveLabour(currentDate, currentLabourers);
    updateKPIs();
    showToast('💾 Staff Roster & Daily Wages Saved');
  };

  $('addExpenseBtn').onclick = () => {
    const title = $('expenseTitleInput').value.trim();
    const amount = parseFloat($('expenseAmountInput').value) || 0;
    const cat = $('expenseCatInput').value;

    if (!title || amount <= 0) {
      alert('Please specify a title and amount.');
      return;
    }

    const exps = loadExpenses(currentDate);
    exps.push({ title: title, amount: amount, category: cat });
    saveExpenses(currentDate, exps);

    $('expenseTitleInput').value = '';
    $('expenseAmountInput').value = '';
    renderExpensesTable();
    updateKPIs();
    showToast('Expense Recorded');
  };

  $('openReportsBtn').onclick = () => {
    renderFinancialReports();
    openModal('reportsModal');
  };

  document.querySelectorAll('.report-tab').forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll('.report-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedPeriodTab = btn.getAttribute('data-period');
      renderFinancialReports();
    };
  });

  $('openAnalyticsBtn').onclick = () => {
    renderAnalytics();
    openModal('analyticsModal');
  };

  $('backupDataBtn').onclick = () => openModal('backupModal');
  $('downloadBackupBtn').onclick = downloadBackup;
  $('triggerRestoreBtn').onclick = () => $('restoreFileInput').click();
  $('restoreFileInput').onchange = (e) => {
    if (e.target.files.length > 0) restoreBackup(e.target.files[0]);
  };

  $('exportCsvBtn').onclick = exportSalesCsv;
  $('loadSampleBtn').onclick = loadDemoData;

  $('clearCartBtn').onclick = clearCart;
  $('checkoutPrintBtn').onclick = () => checkoutCart(true);
  $('checkoutSaveBtn').onclick = () => checkoutCart(false);

  $('cartDiscount').oninput = updateCartTotals;
  $('cashGiven').oninput = updateCartTotals;

  $('itemSearch').oninput = renderCatalogGrid;

  // Mobile navigation
  if ($('mCheckoutBtn')) {
    $('mCheckoutBtn').onclick = () => checkoutCart(true);
  }
}

// ---------- PWA SETUP ----------
function initPWA() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
}
