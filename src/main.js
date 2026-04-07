import './style.css';

// NUVIA V3 - MAIN JAVASCRIPT
// High-End Interactive Implementation

// 1. DATA: PRODUCTS V3
const PRODUCTS = [
  {
    id: 1,
    name: "Pull Oversize Laine",
    price: 145,
    category: "Pulls",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=1200",
    secondaryImage: "https://images.unsplash.com/photo-1556905055-8f358a7a4bb4?auto=format&fit=crop&q=80&w=1200",
    badge: "Premium"
  },
  {
    id: 2,
    name: "T-shirt Essential Noir",
    price: 45,
    category: "T-shirts",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1200",
    secondaryImage: "https://images.unsplash.com/photo-1521572008054-962ceee9d31e?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 3,
    name: "Pantalon Cargo Beige",
    price: 120,
    category: "Pantalons",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=1200",
    secondaryImage: "https://images.unsplash.com/photo-1584305116359-54140501f10a?auto=format&fit=crop&q=80&w=1200",
    badge: "New"
  },
  {
    id: 4,
    name: "Casquette Signature",
    price: 35,
    category: "Casquettes",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=1200",
    secondaryImage: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 5,
    name: "Manteau Long Premium",
    price: 350,
    category: "Premium",
    image: "https://images.unsplash.com/photo-1539533377285-a41fe58bc42a?auto=format&fit=crop&q=80&w=1200",
    secondaryImage: "https://images.unsplash.com/photo-1544022613-e87ce7526ed1?auto=format&fit=crop&q=80&w=1200",
    badge: "Exclusive"
  },
  {
    id: 6,
    name: "Hoodie Graphique",
    price: 85,
    category: "Nouveautés",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=1200",
    secondaryImage: "https://images.unsplash.com/photo-1509948914041-1378ad3e47e1?auto=format&fit=crop&q=80&w=1200",
    badge: "New Drop"
  },
  {
    id: 7,
    name: "Veste en Jean",
    price: 95,
    category: "Soldes",
    image: "https://images.unsplash.com/photo-1576872381149-7847515ce5d8?auto=format&fit=crop&q=80&w=1200",
    secondaryImage: "https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?auto=format&fit=crop&q=80&w=1200",
    badge: "-30%"
  },
  {
    id: 8,
    name: "Sac à Dos Minimaliste",
    price: 120,
    category: "Premium",
    image: "https://images.unsplash.com/photo-1553062407-98eeb94c6a62?auto=format&fit=crop&q=80&w=1200",
    secondaryImage: "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 9,
    name: "Pull Cachemire Gris",
    price: 210,
    category: "Pulls",
    image: "https://images.unsplash.com/photo-1611312449412-6cefac5639fd?auto=format&fit=crop&q=80&w=1200",
    secondaryImage: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=1200",
    badge: "Limited"
  },
  {
    id: 10,
    name: "T-shirt Oversize Blanc",
    price: 55,
    category: "T-shirts",
    image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&q=80&w=1200",
    secondaryImage: "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 11,
    name: "Pantalon Tailored Noir",
    price: 160,
    category: "Pantalons",
    image: "https://images.unsplash.com/photo-1624371414361-e6e0ed26296a?auto=format&fit=crop&q=80&w=1200",
    secondaryImage: "https://images.unsplash.com/photo-1582552938357-103ae9628001?auto=format&fit=crop&q=80&w=1200"
  },
  {
    id: 12,
    name: "Casquette Vintage Navy",
    price: 40,
    category: "Casquettes",
    image: "https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&q=80&w=1200",
    secondaryImage: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&q=80&w=1200"
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

const renderProducts = (category = 'Nouveautés') => {
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
  renderProducts('Nouveautés');
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
