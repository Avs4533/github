const products = [
  { id: 1, name: "Classic T-Shirt", price: 25, image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=600&q=60" },
  { id: 2, name: "Slim Fit Jeans", price: 45, image: "https://images.unsplash.com/photo-1562158070-3c0f2eeb9d4a?auto=format&fit=crop&w=600&q=60" },
  { id: 3, name: "Leather Jacket", price: 120, image: "https://images.unsplash.com/photo-1520974573314-8da5640a9f0e?auto=format&fit=crop&w=600&q=60" },
  { id: 4, name: "Sneakers", price: 60, image: "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?auto=format&fit=crop&w=600&q=60" }
];

const cart = [];

const productGrid = document.getElementById("product-grid");
const cartBtn = document.getElementById("cart-btn");
const cartModal = document.getElementById("cart-modal");
const closeCartBtn = document.getElementById("close-cart");
const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const cartCountEl = document.getElementById("cart-count");
const checkoutBtn = document.getElementById("checkout-btn");
const yearEl = document.getElementById("year");

// Render products
function renderProducts() {
  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button data-id="${product.id}">Add to Cart</button>
    `;
    productGrid.appendChild(card);
  });
}

// Update cart count
function updateCartCount() {
  cartCountEl.textContent = cart.reduce((acc, item) => acc + item.qty, 0);
}

// Render cart items
function renderCart() {
  cartItemsEl.innerHTML = "";
  let total = 0;
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.name} x ${item.qty}</span>
      <span>$${item.price * item.qty}</span>
    `;
    cartItemsEl.appendChild(li);
    total += item.price * item.qty;
  });
  cartTotalEl.textContent = total.toFixed(2);
  updateCartCount();
}

// Add to cart handler
productGrid.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const id = parseInt(e.target.getAttribute("data-id"));
    const product = products.find((p) => p.id === id);
    const existingItem = cart.find((item) => item.id === id);
    if (existingItem) {
      existingItem.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    renderCart();
  }
});

// Open & Close cart modal
cartBtn.addEventListener("click", () => cartModal.classList.remove("hidden"));
closeCartBtn.addEventListener("click", () => cartModal.classList.add("hidden"));

// Checkout
checkoutBtn.addEventListener("click", () => {
  alert("Thank you for your purchase!");
  cart.length = 0; // clear cart
  renderCart();
  cartModal.classList.add("hidden");
});

// Set current year
yearEl.textContent = new Date().getFullYear();

// Initialize
renderProducts();
renderCart();