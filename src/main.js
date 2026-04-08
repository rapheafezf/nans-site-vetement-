import './style.css';

// NUVIA V3 - MAIN JAVASCRIPT
// High-End Interactive Implementation

// 1. DATA: PRODUCTS V3
const PRODUCTS = [
  {
    id: 1,
    name: "Pull Collector Snake",
    price: 185,
    category: "Collector",
    image: "/snake_pull.png",
    secondaryImage: "/snake_pull.png",
    badge: "Limited Edition"
  },
  {
    id: 2,
    name: "T-shirt Collector Snake",
    price: 75,
    category: "Collector",
    image: "/snake_tshirt.png",
    secondaryImage: "/snake_tshirt.png",
    badge: "Popular"
  },
  {
    id: 3,
    name: "Pull Oversize Snake",
    price: 145,
    category: "Pulls",
    image: "/snake_pull.png",
    secondaryImage: "/snake_pull.png",
    badge: "New Era"
  },
  {
    id: 4,
    name: "T-shirt Essential Snake",
    price: 45,
    category: "T-shirts",
    image: "/snake_tshirt.png",
    secondaryImage: "/snake_tshirt.png"
  },
  {
    id: 5,
    name: "Pantalon Cargo Snake",
    price: 120,
    category: "Pantalons",
    image: "/snake_pants.png",
    secondaryImage: "/snake_pants.png",
    badge: "New"
  },
  {
    id: 6,
    name: "Casquette Signature Snake",
    price: 35,
    category: "Casquettes",
    image: "/snake_cap.png",
    secondaryImage: "/snake_cap.png"
  },
  {
    id: 7,
    name: "Pull Cachemire Snake",
    price: 210,
    category: "Pulls",
    image: "/snake_pull.png",
    secondaryImage: "/snake_pull.png",
    badge: "Exclusive"
  },
  {
    id: 8,
    name: "Hoodie Graphique Snake",
    price: 85,
    category: "Nouveautés",
    image: "/snake_pull.png",
    secondaryImage: "/snake_pull.png",
    badge: "Top Seller"
  },
  {
    id: 9,
    name: "Veste Signature Snake",
    price: 165,
    category: "Nouveautés",
    image: "/snake_tshirt.png",
    secondaryImage: "/snake_tshirt.png"
  },
  {
    id: 10,
    name: "T-shirt Oversize Snake",
    price: 55,
    category: "T-shirts",
    image: "/snake_tshirt.png",
    secondaryImage: "/snake_tshirt.png"
  },
  {
    id: 11,
    name: "Pantalon Tailored Snake",
    price: 160,
    category: "Pantalons",
    image: "/snake_pants.png",
    secondaryImage: "/snake_pants.png"
  },
  {
    id: 12,
    name: "Casquette Vintage Snake",
    price: 40,
    category: "Casquettes",
    image: "/snake_cap.png",
    secondaryImage: "/snake_cap.png"
  }
];

// 2. STATE
let cart = JSON.parse(localStorage.getItem('nuvia_cart_v3')) || [];

// 3. INITIALIZE LENIS (Smooth Scroll)
const lenis = new Lenis({
  lerp: 0.1,
  wheelMultiplier: 1.2,
  infinite: false,
});

function update(time) {
  lenis.raf(time);
  requestAnimationFrame(update);
}
requestAnimationFrame(update);

// 4. GSAP REGISTER
gsap.registerPlugin(ScrollTrigger);


// Magnetic effect
const initMagnetic = () => {
  const magnetics = document.querySelectorAll('.magnetic');
  magnetics.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const bound = el.getBoundingClientRect();
      const x = e.clientX - bound.left - bound.width / 2;
      const y = e.clientY - bound.top - bound.height / 2;
      gsap.to(el, {
        x: x * 0.35, y: y * 0.35,
        duration: 0.5, ease: "power2.out"
      });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
    });
  });
};

// 6. RENDER PRODUCTS
const productGrid = document.getElementById('product-grid');

const renderProducts = (category = 'Collector') => {
  productGrid.innerHTML = '';
  const filtered = PRODUCTS.filter(p => p.category === category);

  filtered.forEach((product, index) => {
    const card = document.createElement('div');
    card.className = 'product-card reveal-opacity';
    card.innerHTML = `
      <div class="product-image-container">
        ${product.badge ? `<span class="product-badge label">${product.badge}</span>` : ''}
        <img src="${product.image}" alt="${product.name}" class="product-img">
        <img src="${product.secondaryImage}" alt="${product.name}" class="product-img secondary-img">
        <div class="add-to-cart-overlay">
          <button class="btn btn-primary magnetic" onclick="addToCart(${product.id})">Ajouter +</button>
        </div>
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">${product.price}€</p>
      </div>
    `;
    productGrid.appendChild(card);
  });

  // Re-init magnetic for new buttons
  initMagnetic();
  
  // Animation on scroll
  gsap.from(".product-card", {
    opacity: 0,
    y: 40,
    duration: 1,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: productGrid,
      start: "top 80%"
    }
  });
};

// 7. CART LOGIC
const cartToggle = document.getElementById('cart-toggle');
const cartClose = document.getElementById('cart-close');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountElements = document.querySelectorAll('.cart-count, #cart-drawer-count');
const cartTotalPrice = document.getElementById('cart-total-price');

const toggleCart = () => {
  const isOpen = cartDrawer.classList.contains('open');
  if (!isOpen) {
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('active');
    lenis.stop();
  } else {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('active');
    lenis.start();
  }
};

cartToggle.addEventListener('click', toggleCart);
cartClose.addEventListener('click', toggleCart);
cartOverlay.addEventListener('click', toggleCart);

const updateCartUI = () => {
  cartItemsContainer.innerHTML = '';
  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    count += item.quantity;

    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price label">${item.price}€</div>
        <div class="cart-item-controls">
          <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
        </div>
      </div>
      <button class="icon-btn" onclick="removeFromCart(${item.id})">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    `;
    cartItemsContainer.appendChild(itemEl);
  });

  cartCountElements.forEach(el => el.textContent = count);
  cartTotalPrice.textContent = `${total}€`;
  localStorage.setItem('nuvia_cart_v3', JSON.stringify(cart));
};

window.addToCart = (id) => {
  const product = PRODUCTS.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartUI();
  if (!cartDrawer.classList.contains('open')) toggleCart();
};

window.removeFromCart = (id) => {
  cart = cart.filter(item => item.id !== id);
  updateCartUI();
};

window.updateQty = (id, change) => {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(id);
    } else {
      updateCartUI();
    }
  }
};

// 8. THEME & INIT
const themeToggle = document.getElementById('theme-toggle');
const htmlTag = document.documentElement;

const initTheme = () => {
  const savedTheme = localStorage.getItem('nuvia_theme') || 'dark';
  htmlTag.setAttribute('data-theme', savedTheme);
};

themeToggle.addEventListener('click', () => {
  const currentTheme = htmlTag.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  htmlTag.setAttribute('data-theme', newTheme);
  localStorage.setItem('nuvia_theme', newTheme);
});

  // INITIALIZE ALL
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderProducts('Collector');
  updateCartUI();
  initMagnetic();

  // Filter Logic
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProducts(btn.dataset.category);
    });
  });

  // Hero Animations
  gsap.from(".hero-title", {
    y: 100, opacity: 0, duration: 1.5, ease: "power4.out"
  });
  gsap.from(".hero-subtitle, .hero-cta", {
    opacity: 0, y: 20, duration: 1, delay: 0.8, ease: "power3.out"
  });

  // Header Hide/Show on Scroll
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const header = document.getElementById('header');
    
    if (currentScroll <= 0) {
      header.style.transform = "translateY(0)";
      return;
    }
    
    if (currentScroll > lastScroll) {
      header.style.transform = "translateY(-100%)";
    } else {
      header.style.transform = "translateY(0)";
    }
    lastScroll = currentScroll;
  });
});
