
/* =========================================
   EIYA PRODUCTS PAGE
   Catalogue, search, sorting and demo cart
========================================= */

"use strict";

// Product information

const EIYA_PRODUCTS = [
  {
    id: "eiya-product-001",
    name: "Egg Noodles",
    category: "Noodles",
    description: "Add the verified Egg Noodles product description here.",
    price: 600,
    weight: "Pack size to be confirmed",
    image: "./images/egg noodles.jpeg",
    available: true
  },
  {
    id: "eiya-product-002",
    name: "Atta Noodles",
    category: "Noodles",
    description: "Add the verified Atta Noodles product description here.",
    price: 700,
    weight: "Pack size to be confirmed",
    image: "./images/atta noodle.jpeg",
    available: true
  },
  {
    id: "eiya-product-003",
    name: "Barnyard Millet",
    category: "Millets",
    description: "Add the verified Barnyard Millet product description here.",
    price: 100,
    weight: "Pack size to be confirmed",
    image: "./images/barnyard noodles.jpeg",
    available: true
  },
  {
    id: "eiya-product-004",
    name: "Instant Noodles",
    category: "Noodles",
    description: "Add the verified Instant Noodles product description here.",
    price: 200,
    weight: "Pack size to be confirmed",
    image: "./images/instant noodle.jpeg",
    available: true
  },
  {
    id: "eiya-product-005",
    name: "Ragi",
    category: "Millets",
    description: "Add the verified Ragi product description here.",
    price: 300,
    weight: "Pack size to be confirmed",
    image: "./images/ragi noodle.jpeg",
    available: true
  },
  {
    id: "eiya-product-006",
    name: "Jowar",
    category: "Millets",
    description: "Add the verified Jowar product description here.",
    price: 400,
    weight: "Pack size to be confirmed",
    image: "./images/jowar noodle.jpeg",
    available: true
  },
  {
    id: "eiya-product-007",
    name: "Multi Millet Noodles",
    category: "Noodles",
    description: "Add the verified Multi Millet Noodles product description here.",
    price: 500,
    weight: "Pack size to be confirmed",
    image: "./images/multi millet noodle.jpeg",
    available: true
  }
];


const CART_STORAGE_KEY = "eiya_demo_cart_v1";

const productGrid = document.getElementById("product-grid");
const productSearch = document.getElementById("product-search");
const productSort = document.getElementById("product-sort");
const categoryFilters = document.getElementById("category-filters");
const productTotal = document.getElementById("product-total");
const emptyProducts = document.getElementById("empty-products");

const cartToggle = document.getElementById("cart-toggle");
const cartClose = document.getElementById("cart-close");
const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartSubtotal = document.getElementById("cart-subtotal");
const checkoutButton = document.getElementById("checkout-button");
const cartMessage = document.getElementById("cart-message");

// Toast notification elements
const cartToast = document.getElementById("cart-toast");
const toastTitle = document.getElementById("toast-title");
const toastMessage = document.getElementById("toast-message");
const toastClose = document.getElementById("toast-close");

let activeCategory = "all";
let searchTerm = "";
let cart = loadCart();
let toastTimer;
let buttonTimer;

// Format prices in Indian Rupees
function formatPrice(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2
  }).format(amount);
}

// Escape HTML before inserting product details
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

// Demo-only browser storage
function loadCart() {
  try {
    const saved = JSON.parse(
      localStorage.getItem(CART_STORAGE_KEY) || "[]"
    );

    if (!Array.isArray(saved)) return [];

    return saved
      .filter(item =>
        item &&
        typeof item.id === "string" &&
        Number.isSafeInteger(item.quantity) &&
        item.quantity > 0
      )
      .map(item => {
        const product = EIYA_PRODUCTS.find(p => p.id === item.id);

        return product
          ? {
              id: product.id,
              quantity: Math.min(item.quantity, 99)
            }
          : null;
      })
      .filter(Boolean);
  } catch {
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(cart)
    );
  } catch {
    cartMessage.textContent =
      "Your browser could not save the cart. Check browser settings.";
  }
}

function getCartQuantity() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

function getCartSubtotal() {
  return cart.reduce((total, item) => {
    const product = EIYA_PRODUCTS.find(p => p.id === item.id);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);
}

// Show the Add to Cart success notification
function showCartToast(productName) {
  if (!cartToast || !toastTitle || !toastMessage) {
    cartMessage.textContent = `${productName} added to your cart.`;
    return;
  }

  toastTitle.textContent = "Added to Cart!";
  toastMessage.textContent = `${productName} added successfully.`;

  cartToast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    cartToast.classList.remove("show");
  }, 3000);
}

// Close notification when its close button is clicked
if (toastClose && cartToast) {
  toastClose.addEventListener("click", () => {
    cartToast.classList.remove("show");
    clearTimeout(toastTimer);
  });
}

// Create category buttons
function renderCategories() {

    const categories = ["all", "Millets", "Noodles"];

  categoryFilters.innerHTML = categories.map(category => `
    <button
      class="category-button ${category === activeCategory ? "active" : ""}"
      type="button"
      data-category="${escapeHTML(category)}"
      aria-pressed="${category === activeCategory}"
    >
      ${category === "all" ? "All products" : escapeHTML(category)}
    </button>
  `).join("");
}

// Search, filter and sort products
function getVisibleProducts() {
  const filtered = EIYA_PRODUCTS.filter(product => {
    const matchesCategory =
      activeCategory === "all" ||
      product.category === activeCategory;

    const searchContent = [
      product.name,
      product.category,
      product.description,
      product.weight
    ].join(" ").toLowerCase();

    return matchesCategory &&
      searchContent.includes(searchTerm);
  });

  switch (productSort.value) {
    case "price-low":
      filtered.sort((a, b) => a.price - b.price);
      break;

    case "price-high":
      filtered.sort((a, b) => b.price - a.price);
      break;

    case "name":
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  return filtered;
}

// Display product cards
function renderProducts() {
  const products = getVisibleProducts();

  productTotal.textContent =
    `${products.length} product${products.length === 1 ? "" : "s"}`;

  emptyProducts.hidden = products.length !== 0;
  productGrid.hidden = products.length === 0;

  productGrid.innerHTML = products.map(product => `
    <article class="product-card">
      <div class="product-image-wrap">
        <img
          class="product-image"
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
          loading="lazy"
          onerror="this.onerror=null; this.style.display='none';"
        >
        <span class="product-category-label">
          ${escapeHTML(product.category)}
        </span>
      </div>

      <div class="product-info">
        <h3>${escapeHTML(product.name)}</h3>

        <p class="product-description">
          ${escapeHTML(product.description)}
        </p>

        <div class="product-price-row">
          <span class="product-price">${formatPrice(product.price)}</span>
          <span class="product-weight">${escapeHTML(product.weight)}</span>
        </div>

        <button
          class="add-cart-button"
          type="button"
          data-add-to-cart="${escapeHTML(product.id)}"
          ${product.available ? "" : "disabled"}
        >
          ${product.available ? "Add to cart +" : "Currently unavailable"}
        </button>
      </div>
    </article>
  `).join("");
}

// Add product to cart
function addToCart(productId, button) {
  const product = EIYA_PRODUCTS.find(p => p.id === productId);

  if (!product || !product.available) return;

  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    if (existingItem.quantity >= 99) {
      cartMessage.textContent = "Maximum quantity reached.";
      return;
    }

    existingItem.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  saveCart();
  renderCart();

  cartMessage.textContent = `${product.name} added to your cart.`;

  // Display success toast
  showCartToast(product.name);

  // Briefly change the clicked button
  if (button) {
    clearTimeout(buttonTimer);

    button.textContent = "✓ Added!";
    button.classList.add("added");

    buttonTimer = setTimeout(() => {
      button.textContent = "Add to cart +";
      button.classList.remove("added");
    }, 1500);
  }
}

// Change item quantity
function changeQuantity(productId, change) {
  const item = cart.find(entry => entry.id === productId);

  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    cart = cart.filter(entry => entry.id !== productId);
  } else if (item.quantity > 99) {
    item.quantity = 99;
  }

  saveCart();
  renderCart();
}

// Remove an item
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);

  saveCart();
  renderCart();
}

// Render cart contents and count
function renderCart() {
  cartCount.textContent = String(getCartQuantity());
  cartSubtotal.textContent = formatPrice(getCartSubtotal());

  checkoutButton.disabled = cart.length === 0;

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <p class="cart-empty">
        Your cart is empty. Explore the EIYA collection to get started.
      </p>
    `;
    return;
  }

  cartItems.innerHTML = cart.map(item => {
    const product = EIYA_PRODUCTS.find(p => p.id === item.id);

    if (!product) return "";

    return `
      <article class="cart-item">
        <img
          src="${escapeHTML(product.image)}"
          alt="${escapeHTML(product.name)}"
          onerror="this.onerror=null; this.style.display='none';"
        >

        <div>
          <h3>${escapeHTML(product.name)}</h3>
          <span class="cart-item-price">
            ${formatPrice(product.price * item.quantity)}
          </span>

          <div class="cart-quantity">
            <button
              type="button"
              data-quantity-id="${escapeHTML(product.id)}"
              data-change="-1"
              aria-label="Decrease ${escapeHTML(product.name)} quantity"
            >−</button>

            <span>${item.quantity}</span>

            <button
              type="button"
              data-quantity-id="${escapeHTML(product.id)}"
              data-change="1"
              aria-label="Increase ${escapeHTML(product.name)} quantity"
              ${item.quantity >= 99 ? "disabled" : ""}
            >+</button>
          </div>
        </div>

        <button
          class="cart-remove"
          type="button"
          data-remove-id="${escapeHTML(product.id)}"
          aria-label="Remove ${escapeHTML(product.name)}"
        >Remove</button>
      </article>
    `;
  }).join("");
}

// Open and close cart drawer
function openCart() {
  cartDrawer.hidden = false;
  cartOverlay.hidden = false;
  document.body.style.overflow = "hidden";
  cartClose.focus();
}

function closeCart() {
  cartDrawer.hidden = true;
  cartOverlay.hidden = true;
  document.body.style.overflow = "";
  cartToggle.focus();
}

// Search and sorting
productSearch.addEventListener("input", event => {
  searchTerm = event.target.value.trim().toLowerCase();
  renderProducts();
});

productSort.addEventListener("change", renderProducts);

// Category filters
categoryFilters.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;

  activeCategory = button.dataset.category;
  renderCategories();
  renderProducts();
});

// Add-to-cart buttons
productGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-add-to-cart]");
  if (!button) return;

  addToCart(button.dataset.addToCart, button);
});

// Cart quantity and remove buttons
cartItems.addEventListener("click", event => {
  const quantityButton = event.target.closest("[data-quantity-id]");
  const removeButton = event.target.closest("[data-remove-id]");

  if (quantityButton) {
    changeQuantity(
      quantityButton.dataset.quantityId,
      Number(quantityButton.dataset.change)
    );
  }

  if (removeButton) {
    removeFromCart(removeButton.dataset.removeId);
  }
});

// Cart controls
cartToggle.addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !cartDrawer.hidden) {
    closeCart();
  }

  if (event.key === "Escape" && cartToast) {
    cartToast.classList.remove("show");
    clearTimeout(toastTimer);
  }
});

// Demo-only checkout
checkoutButton.addEventListener("click", () => {
  cartMessage.textContent =
    "Demo cart only: checkout will be enabled after the secure backend is connected.";
});

// Footer year
document.getElementById("current-year").textContent =
  new Date().getFullYear();

// Initial page render
renderCategories();
renderProducts();
renderCart();
