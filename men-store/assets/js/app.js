// Data
const products = [
  { id: "shirt-oxford", title: "Oxford Shirt", category: "Shirts", price: 39, popularity: 9, img: "https://images.unsplash.com/photo-1521575107034-e0fa0b594529?q=80&w=800&auto=format&fit=crop", sizes: ["S","M","L","XL"], createdAt: 20240110 },
  { id: "jeans-slim", title: "Slim Jeans", category: "Jeans", price: 55, popularity: 8, img: "https://images.unsplash.com/photo-1516826957135-700dedea698c?q=80&w=800&auto=format&fit=crop", sizes: ["30","32","34","36"], createdAt: 20240201 },
  { id: "jacket-bomber", title: "Bomber Jacket", category: "Jackets", price: 79, popularity: 7, img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop", sizes: ["S","M","L"], createdAt: 20240302 },
  { id: "sneaker-white", title: "White Sneakers", category: "Shoes", price: 69, popularity: 10, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop", sizes: ["8","9","10","11"], createdAt: 20240120 },
  { id: "tee-heavy", title: "Heavyweight Tee", category: "Shirts", price: 24, popularity: 6, img: "https://images.unsplash.com/photo-1534964722673-c4b8f3a5d9f3?q=80&w=800&auto=format&fit=crop", sizes: ["S","M","L","XL"], createdAt: 20240411 },
  { id: "belt-leather", title: "Leather Belt", category: "Accessories", price: 29, popularity: 5, img: "https://images.unsplash.com/photo-1503342217505-b0a15cf70489?q=80&w=800&auto=format&fit=crop", sizes: ["M","L"], createdAt: 20240218 }
];

// State
let state = {
  query: "",
  categories: new Set(),
  priceMin: null,
  priceMax: null,
  sort: "popularity",
  cart: loadCart()
};

// Elements
const productsGrid = document.getElementById("productsGrid");
const resultsCountEl = document.getElementById("resultsCount");
const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearchBtn");
const priceMinInput = document.getElementById("priceMin");
const priceMaxInput = document.getElementById("priceMax");
const sortSelect = document.getElementById("sortSelect");
const applyFiltersBtn = document.getElementById("applyFiltersBtn");
const resetFiltersBtn = document.getElementById("resetFiltersBtn");
const cartBtn = document.getElementById("cartBtn");
const cartDrawer = document.getElementById("cartDrawer");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartItemsEl = document.getElementById("cartItems");
const cartSubtotalEl = document.getElementById("cartSubtotal");
const cartCountEl = document.getElementById("cartCount");
const checkoutBtn = document.getElementById("checkoutBtn");
const yearEl = document.getElementById("year");
const openFiltersBtn = document.getElementById("openFiltersBtn");
const closeFiltersBtn = document.getElementById("closeFiltersBtn");
const filtersPanel = document.getElementById("filtersPanel");

// Init
document.addEventListener("DOMContentLoaded", () => {
  yearEl.textContent = new Date().getFullYear();
  bindEvents();
  render();
});

function bindEvents() {
  searchInput.addEventListener("input", e => { state.query = e.target.value.trim(); render(); });
  clearSearchBtn.addEventListener("click", () => { state.query = ""; searchInput.value = ""; render(); });
  priceMinInput.addEventListener("change", () => { state.priceMin = parseNum(priceMinInput.value); });
  priceMaxInput.addEventListener("change", () => { state.priceMax = parseNum(priceMaxInput.value); });
  sortSelect.addEventListener("change", () => { state.sort = sortSelect.value; render(); });
  applyFiltersBtn.addEventListener("click", () => render());
  resetFiltersBtn.addEventListener("click", () => { resetFilters(); render(); });

  document.querySelectorAll('input[name="category"]').forEach(cb => {
    cb.addEventListener("change", e => {
      if (e.target.checked) state.categories.add(e.target.value);
      else state.categories.delete(e.target.value);
      render();
    });
  });

  cartBtn.addEventListener("click", toggleCart);
  closeCartBtn.addEventListener("click", toggleCart);
  checkoutBtn.addEventListener("click", () => {
    alert("Checkout is a demo. Implement payment here.");
  });

  // Mobile filters
  openFiltersBtn.addEventListener("click", () => {
    const open = filtersPanel.classList.toggle("open");
    openFiltersBtn.setAttribute("aria-expanded", String(open));
  });
  closeFiltersBtn.addEventListener("click", () => {
    filtersPanel.classList.remove("open");
    openFiltersBtn.setAttribute("aria-expanded", "false");
  });
}

function resetFilters() {
  state.query = "";
  searchInput.value = "";
  state.categories.clear();
  document.querySelectorAll('input[name="category"]').forEach(cb => cb.checked = false);
  state.priceMin = state.priceMax = null;
  priceMinInput.value = ""; priceMaxInput.value = "";
  state.sort = "popularity"; sortSelect.value = "popularity";
}

// Render
function render() {
  const filtered = applyFilters(products);
  const sorted = applySort(filtered);
  resultsCountEl.textContent = `${sorted.length} results`;
  productsGrid.innerHTML = sorted.map(productCardHTML).join("");
  bindProductActions(sorted);
  updateCartBadge();
  renderCart();
}

function applyFilters(list) {
  return list.filter(p => {
    if (state.query && !p.title.toLowerCase().includes(state.query.toLowerCase())) return false;
    if (state.categories.size && !state.categories.has(p.category)) return false;
    if (state.priceMin != null && p.price < state.priceMin) return false;
    if (state.priceMax != null && p.price > state.priceMax) return false;
    return true;
  });
}

function applySort(list) {
  const arr = [...list];
  switch (state.sort) {
    case "price-asc": return arr.sort((a,b) => a.price - b.price);
    case "price-desc": return arr.sort((a,b) => b.price - a.price);
    case "newest": return arr.sort((a,b) => b.createdAt - a.createdAt);
    default: return arr.sort((a,b) => b.popularity - a.popularity);
  }
}

function productCardHTML(p) {
  const sizeOptions = p.sizes.map(s => `<option value="${s}">${s}</option>`).join("");
  return `
    <article class="card" data-id="${p.id}">
      <img class="card-media" src="${p.img}" alt="${p.title}">
      <div class="card-body">
        <div class="title-row">
          <h3 class="card-title">${p.title}</h3>
          <span class="price">$${p.price.toFixed(2)}</span>
        </div>
        <div class="variant-row">
          <select class="size-select" aria-label="Select size">${sizeOptions}</select>
          <input class="qty-input" type="number" min="1" value="1" aria-label="Quantity">
        </div>
        <div class="actions">
          <button class="btn btn-primary add-btn">Add to cart</button>
          <button class="btn btn-ghost">Wishlist</button>
        </div>
      </div>
    </article>`;
}

function bindProductActions(list) {
  list.forEach(p => {
    const el = document.querySelector(`.card[data-id="${p.id}"]`);
    const addBtn = el.querySelector(".add-btn");
    const sizeSelect = el.querySelector(".size-select");
    const qtyInput = el.querySelector(".qty-input");
    addBtn.addEventListener("click", () => {
      const size = sizeSelect.value;
      const qty = clamp(parseInt(qtyInput.value, 10) || 1, 1, 10);
      addToCart({ id: p.id, title: p.title, price: p.price, img: p.img, size, qty });
      qtyInput.value = "1";
    });
  });
}

// Cart
function toggleCart() {
  const open = !cartDrawer.classList.contains("open");
  cartDrawer.classList.toggle("open");
  cartBtn.setAttribute("aria-expanded", String(open));
  cartDrawer.setAttribute("aria-hidden", String(!open));
}

function addToCart(item) {
  const key = `${item.id}:${item.size}`;
  const existing = state.cart[key];
  if (existing) existing.qty = clamp(existing.qty + item.qty, 1, 10);
  else state.cart[key] = { ...item };
  persistCart();
  renderCart();
  updateCartBadge();
  if (!cartDrawer.classList.contains("open")) toggleCart();
}

function renderCart() {
  const entries = Object.values(state.cart);
  if (!entries.length) {
    cartItemsEl.innerHTML = `<p class="muted">Your cart is empty.</p>`;
    cartSubtotalEl.textContent = formatCurrency(0);
    return;
  }
  cartItemsEl.innerHTML = entries.map(cartItemHTML).join("");
  cartItemsEl.querySelectorAll(".qty-dec").forEach(btn => btn.addEventListener("click", onQtyDec));
  cartItemsEl.querySelectorAll(".qty-inc").forEach(btn => btn.addEventListener("click", onQtyInc));
  cartItemsEl.querySelectorAll(".remove").forEach(btn => btn.addEventListener("click", onRemove));
  const subtotal = entries.reduce((sum, it) => sum + it.price * it.qty, 0);
  cartSubtotalEl.textContent = formatCurrency(subtotal);
}

function cartItemHTML(it) {
  const key = `${it.id}:${it.size}`;
  return `
    <div class="cart-item" data-key="${key}">
      <img src="${it.img}" alt="${it.title}">
      <div class="meta">
        <strong>${it.title}</strong>
        <span class="muted">Size ${it.size}</span>
        <span>${formatCurrency(it.price)}</span>
        <div class="qty">
          <button class="btn btn-ghost qty-dec">-</button>
          <span>${it.qty}</span>
          <button class="btn btn-ghost qty-inc">+</button>
        </div>
      </div>
      <button class="btn btn-ghost remove" aria-label="Remove">✕</button>
    </div>`;
}

function onQtyDec(e) {
  const key = e.target.closest(".cart-item").dataset.key;
  const it = state.cart[key];
  it.qty = clamp(it.qty - 1, 1, 10);
  persistCart();
  renderCart();
  updateCartBadge();
}
function onQtyInc(e) {
  const key = e.target.closest(".cart-item").dataset.key;
  const it = state.cart[key];
  it.qty = clamp(it.qty + 1, 1, 10);
  persistCart();
  renderCart();
  updateCartBadge();
}
function onRemove(e) {
  const key = e.target.closest(".cart-item").dataset.key;
  delete state.cart[key];
  persistCart();
  renderCart();
  updateCartBadge();
}

function updateCartBadge() {
  const count = Object.values(state.cart).reduce((sum, it) => sum + it.qty, 0);
  cartCountEl.textContent = String(count);
}

// Storage
function loadCart() {
  try { return JSON.parse(localStorage.getItem("menswear-cart") || "{}"); }
  catch { return {}; }
}
function persistCart() {
  localStorage.setItem("menswear-cart", JSON.stringify(state.cart));
}

// Utils
function parseNum(v) { const n = Number(v); return Number.isFinite(n) ? n : null; }
function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }
function formatCurrency(n) { return `$${n.toFixed(2)}`; }
