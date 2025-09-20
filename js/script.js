/**
 * Fresh Harvest PH - Main JavaScript File
 * Handles all interactive functionality for the e-commerce website
 */

// ==========================================
// Global Variables and State Management
// ==========================================

const AppState = {
    cart: [],
    currentUser: null,
    testimonialIndex: 0,
    featuredProducts: [],
    isLoading: false
};

// Sample product data (would come from backend in real implementation)
const SAMPLE_PRODUCTS = [
    {
        id: 1,
        name: "Fresh Lettuce",
        price: 45,
        originalPrice: 55,
        category: "vegetables",
        image: "🥬",
        description: "Crispy and fresh lettuce perfect for salads",
        badge: "Fresh",
        inStock: true,
        featured: true
    },
    {
        id: 2,
        name: "Saba Banana",
        price: 80,
        originalPrice: 100,
        category: "vegetables",
        image: "🍌",
        description: "Sweet and nutritious saba bananas",
        badge: "Local",
        inStock: true,
        featured: true
    },
    {
        id: 3,
        name: "Bibingka",
        price: 120,
        originalPrice: 150,
        category: "snacks",
        image: "🍘",
        description: "Traditional Filipino rice cake",
        badge: "Popular",
        inStock: true,
        featured: true
    },
    {
        id: 4,
        name: "Philippine Mango",
        price: 200,
        originalPrice: 250,
        category: "vegetables",
        image: "🥭",
        description: "Sweet and juicy Philippine mangoes",
        badge: "Seasonal",
        inStock: true,
        featured: true
    },
    {
        id: 5,
        name: "Kakanin Mix",
        price: 150,
        originalPrice: null,
        category: "snacks",
        image: "🍡",
        description: "Assorted traditional Filipino kakanin",
        badge: "New",
        inStock: true,
        featured: false
    },
    {
        id: 6,
        name: "Fresh Spinach",
        price: 35,
        originalPrice: 45,
        category: "vegetables",
        image: "🥬",
        description: "Organic spinach leaves",
        badge: "Organic",
        inStock: true,
        featured: false
    }
];

// ==========================================
// Utility Functions
// ==========================================

/**
 * Format price to Philippine Peso
 */
function formatPrice(price) {
    return `₱${price.toFixed(2)}`;
}

/**
 * Debounce function for search
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Show notification
 */
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? '#10B981' : '#EF4444',
        color: 'white',
        padding: '1rem 2rem',
        borderRadius: '0.5rem',
        zIndex: '3000',
        fontSize: '0.9rem',
        fontWeight: '500',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

/**
 * Smooth scroll to element
 */
function smoothScrollTo(element) {
    element.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Generate unique ID
 */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// ==========================================
// DOM Content Loaded - Initialize App
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize all components
    initializeNavigation();
    initializeSearch();
    initializeAuth();
    initializeCart();
    initializeFeaturedProducts();
    initializeTestimonials();
    initializeNewsletter();
    initializeScrollEffects();
    
    // Load cart from localStorage
    loadCartFromStorage();
    
    console.log('🌱 Fresh Harvest PH initialized successfully!');
}

// ==========================================
// Navigation Functions
// ==========================================

function initializeNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    mobileMenuBtn?.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });
    
    // Smooth scroll for anchor links
    navLinks.forEach(link => {
        if (link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    smoothScrollTo(target);
                }
            });
        }
    });
    
    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}

// ==========================================
// Search Functionality
// ==========================================

function initializeSearch() {
    const searchBtn = document.getElementById('search-btn');
    const searchModal = document.getElementById('search-modal');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const overlay = document.getElementById('overlay');
    
    // Open search modal
    searchBtn?.addEventListener('click', () => {
        searchModal.classList.add('active');
        overlay.classList.add('active');
        setTimeout(() => searchInput?.focus(), 100);
    });
    
    // Close search modal
    const closeSearch = () => {
        searchModal.classList.remove('active');
        overlay.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
    };
    
    searchClose?.addEventListener('click', closeSearch);
    
    // Close on overlay click
    overlay?.addEventListener('click', closeSearch);
    
    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSearch();
        }
    });
    
    // Search functionality with debounce
    const performSearch = debounce((query) => {
        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }
        
        const results = SAMPLE_PRODUCTS.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );
        
        displaySearchResults(results);
    }, 300);
    
    searchInput?.addEventListener('input', (e) => {
        performSearch(e.target.value);
    });
}

function displaySearchResults(results) {
    const searchResults = document.getElementById('search-results');
    
    if (results.length === 0) {
        searchResults.innerHTML = '<p style="padding: 1rem; text-align: center; color: var(--text-light);">No products found</p>';
        return;
    }
    
    const resultsHTML = results.map(product => `
        <div class="search-result-item" style="display: flex; align-items: center; gap: 1rem; padding: 1rem; border-bottom: 1px solid var(--border-light); cursor: pointer;" onclick="viewProduct(${product.id})">
            <div style="font-size: 2rem;">${product.image}</div>
            <div style="flex: 1;">
                <h4 style="margin-bottom: 0.25rem;">${product.name}</h4>
                <p style="color: var(--text-light); font-size: 0.9rem;">${product.description}</p>
                <p style="color: var(--primary-green); font-weight: 600;">${formatPrice(product.price)}</p>
            </div>
        </div>
    `).join('');
    
    searchResults.innerHTML = resultsHTML;
}

// ==========================================
// Authentication Functions
// ==========================================

function initializeAuth() {
    const authBtn = document.getElementById('auth-btn');
    const authModal = document.getElementById('auth-modal');
    const modalClose = document.getElementById('modal-close');
    const authTabs = document.querySelectorAll('.auth-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const overlay = document.getElementById('overlay');
    
    // Open auth modal
    authBtn?.addEventListener('click', () => {
        authModal.classList.add('active');
        overlay.classList.add('active');
    });
    
    // Close auth modal
    const closeAuth = () => {
        authModal.classList.remove('active');
        overlay.classList.remove('active');
    };
    
    modalClose?.addEventListener('click', closeAuth);
    
    // Tab switching
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabType = tab.dataset.tab;
            
            // Update active tab
            authTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Show corresponding form
            if (tabType === 'login') {
                loginForm.style.display = 'block';
                registerForm.style.display = 'none';
            } else {
                loginForm.style.display = 'none';
                registerForm.style.display = 'block';
            }
        });
    });
    
    // Form submissions (mock functionality)
    const loginFormElement = loginForm?.querySelector('form');
    const registerFormElement = registerForm?.querySelector('form');
    
    loginFormElement?.addEventListener('submit', (e) => {
        e.preventDefault();
        handleLogin();
    });
    
    registerFormElement?.addEventListener('submit', (e) => {
        e.preventDefault();
        handleRegister();
    });
}

function handleLogin() {
    // Mock login process
    showNotification('Login successful! Welcome back!');
    
    // Update UI
    const authBtn = document.getElementById('auth-btn');
    if (authBtn) {
        authBtn.textContent = 'My Account';
        authBtn.onclick = () => window.location.href = 'dashboard.html';
    }
    
    // Close modal
    document.getElementById('auth-modal')?.classList.remove('active');
    document.getElementById('overlay')?.classList.remove('active');
    
    // Set user data
    const userData = { 
        name: 'Juan Dela Cruz', 
        email: 'juan.delacruz@example.com',
        role: 'user',
        loginTime: new Date().toISOString()
    };
    
    try {
        localStorage.setItem('freshharvestph_user', JSON.stringify(userData));
    } catch (e) {
        console.warn('Could not save user data to localStorage');
    }
    
    AppState.currentUser = userData;
    
    // Redirect to dashboard after a short delay
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1500);
}

function handleRegister() {
    // Mock registration process
    showNotification('Registration successful! Welcome to Fresh Harvest PH!');
    
    // Update UI
    const authBtn = document.getElementById('auth-btn');
    if (authBtn) {
        authBtn.textContent = 'My Account';
        authBtn.onclick = () => window.location.href = 'dashboard.html';
    }
    
    // Close modal
    document.getElementById('auth-modal')?.classList.remove('active');
    document.getElementById('overlay')?.classList.remove('active');
    
    // Set user data
    const userData = { 
        name: 'New User', 
        email: 'newuser@example.com',
        role: 'user',
        loginTime: new Date().toISOString()
    };
    
    try {
        localStorage.setItem('freshharvestph_user', JSON.stringify(userData));
    } catch (e) {
        console.warn('Could not save user data to localStorage');
    }
    
    AppState.currentUser = userData;
    
    // Redirect to dashboard after a short delay
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1500);
}

// ==========================================
// Cart Functions
// ==========================================

function initializeCart() {
    const cartBtn = document.getElementById('cart-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartClose = document.getElementById('cart-close');
    const overlay = document.getElementById('overlay');
    
    // Open cart sidebar
    cartBtn?.addEventListener('click', () => {
        cartSidebar.classList.add('active');
        overlay.classList.add('active');
        renderCart();
    });
    
    // Close cart sidebar
    const closeCart = () => {
        cartSidebar.classList.remove('active');
        overlay.classList.remove('active');
    };
    
    cartClose?.addEventListener('click', closeCart);
    
    // Update cart count on load
    updateCartCount();
}

function addToCart(productId, quantity = 1) {
    const product = SAMPLE_PRODUCTS.find(p => p.id === productId);
    if (!product) {
        showNotification('Product not found!', 'error');
        return;
    }
    
    const existingItem = AppState.cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        AppState.cart.push({
            ...product,
            quantity: quantity,
            cartId: generateId()
        });
    }
    
    updateCartCount();
    saveCartToStorage();
    showNotification(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    const productIndex = AppState.cart.findIndex(item => item.id === productId);
    if (productIndex > -1) {
        const product = AppState.cart[productIndex];
        AppState.cart.splice(productIndex, 1);
        updateCartCount();
        saveCartToStorage();
        renderCart();
        showNotification(`${product.name} removed from cart!`);
    }
}

function updateCartQuantity(productId, newQuantity) {
    const item = AppState.cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            updateCartCount();
            saveCartToStorage();
            renderCart();
        }
    }
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const totalItems = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function calculateCartTotal() {
    return AppState.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartFooter = document.getElementById('cart-footer');
    const cartTotal = document.getElementById('cart-total');
    
    if (AppState.cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartFooter.style.display = 'none';
        return;
    }
    
    const cartHTML = AppState.cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-image">${item.image}</div>
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" min="1" onchange="updateCartQuantity(${item.id}, parseInt(this.value))">
                    <button class="quantity-btn" onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        </div>
    `).join('');
    
    cartItems.innerHTML = cartHTML;
    cartFooter.style.display = 'block';
    cartTotal.textContent = calculateCartTotal().toFixed(2);
}

function saveCartToStorage() {
    try {
        localStorage.setItem('freshharvestph_cart', JSON.stringify(AppState.cart));
    } catch (e) {
        console.warn('Could not save cart to localStorage');
    }
}

function loadCartFromStorage() {
    try {
        const savedCart = localStorage.getItem('freshharvestph_cart');
        if (savedCart) {
            AppState.cart = JSON.parse(savedCart);
            updateCartCount();
        }
    } catch (e) {
        console.warn('Could not load cart from localStorage');
        AppState.cart = [];
    }
}

// ==========================================
// Featured Products Functions
// ==========================================

function initializeFeaturedProducts() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const loadMoreBtn = document.getElementById('load-more');
    
    // Filter button functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active filter
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            filterProducts(filter);
        });
    });
    
    // Load more functionality
    loadMoreBtn?.addEventListener('click', () => {
        window.location.href = 'products.html';
    });
    
    // Initial load
    loadFeaturedProducts();
}

function loadFeaturedProducts() {
    const featuredProducts = SAMPLE_PRODUCTS.filter(product => product.featured);
    renderProducts(featuredProducts);
}

function filterProducts(filter) {
    let filteredProducts;
    
    if (filter === 'all') {
        filteredProducts = SAMPLE_PRODUCTS.filter(product => product.featured);
    } else if (filter === 'seasonal') {
        filteredProducts = SAMPLE_PRODUCTS.filter(product => 
            product.featured && product.badge === 'Seasonal'
        );
    } else {
        filteredProducts = SAMPLE_PRODUCTS.filter(product => 
            product.featured && product.category === filter
        );
    }
    
    renderProducts(filteredProducts);
}

function renderProducts(products) {
    const productGrid = document.getElementById('featured-products');
    
    if (!productGrid) return;
    
    const productsHTML = products.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                ${product.image}
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">
                    <span class="current-price">${formatPrice(product.price)}</span>
                    ${product.originalPrice ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
                </div>
                <div class="product-actions">
                    <button class="btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
                    <button class="btn-secondary" onclick="viewProduct(${product.id})">View Details</button>
                </div>
            </div>
        </div>
    `).join('');
    
    productGrid.innerHTML = productsHTML;
    
    // Add animation
    const cards = productGrid.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

function viewProduct(productId) {
    // Close any open modals
    document.getElementById('search-modal')?.classList.remove('active');
    document.getElementById('overlay')?.classList.remove('active');
    
    // In a real app, this would navigate to product page
    const product = SAMPLE_PRODUCTS.find(p => p.id === productId);
    if (product) {
        showNotification(`Viewing ${product.name} - Feature coming soon!`);
    }
}

// ==========================================
// Testimonials Functions
// ==========================================

function initializeTestimonials() {
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    const track = document.getElementById('testimonial-track');
    
    if (!track) return;
    
    const cards = track.querySelectorAll('.testimonial-card');
    const cardWidth = 370; // card width + gap
    const maxIndex = Math.max(0, cards.length - 3); // Show 3 cards at once on desktop
    
    // Navigation buttons
    prevBtn?.addEventListener('click', () => {
        if (AppState.testimonialIndex > 0) {
            AppState.testimonialIndex--;
            updateTestimonialPosition();
        }
    });
    
    nextBtn?.addEventListener('click', () => {
        if (AppState.testimonialIndex < maxIndex) {
            AppState.testimonialIndex++;
            updateTestimonialPosition();
        }
    });
    
    // Auto-slide functionality
    let autoSlideInterval = setInterval(() => {
        if (AppState.testimonialIndex < maxIndex) {
            AppState.testimonialIndex++;
        } else {
            AppState.testimonialIndex = 0;
        }
        updateTestimonialPosition();
    }, 5000);
    
    // Pause auto-slide on hover
    const testimonialsSection = document.querySelector('.testimonials-slider');
    testimonialsSection?.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    testimonialsSection?.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            if (AppState.testimonialIndex < maxIndex) {
                AppState.testimonialIndex++;
            } else {
                AppState.testimonialIndex = 0;
            }
            updateTestimonialPosition();
        }, 5000);
    });
    
    // Touch/swipe support for mobile
    let startX = 0;
    let endX = 0;
    
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    track.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    });
    
    track.addEventListener('touchend', () => {
        const deltaX = startX - endX;
        
        if (Math.abs(deltaX) > 50) { // Minimum swipe distance
            if (deltaX > 0 && AppState.testimonialIndex < maxIndex) {
                // Swipe left - next
                AppState.testimonialIndex++;
                updateTestimonialPosition();
            } else if (deltaX < 0 && AppState.testimonialIndex > 0) {
                // Swipe right - previous
                AppState.testimonialIndex--;
                updateTestimonialPosition();
            }
        }
    });
}

function updateTestimonialPosition() {
    const track = document.getElementById('testimonial-track');
    if (!track) return;
    
    const cardWidth = 370; // card width + gap
    const offset = AppState.testimonialIndex * cardWidth;
    track.style.transform = `translateX(-${offset}px)`;
    
    // Update button states
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    const maxIndex = Math.max(0, track.children.length - 3);
    
    if (prevBtn) prevBtn.disabled = AppState.testimonialIndex === 0;
    if (nextBtn) nextBtn.disabled = AppState.testimonialIndex >= maxIndex;
}

// ==========================================
// Newsletter Functions
// ==========================================

function initializeNewsletter() {
    const newsletterForm = document.getElementById('newsletter-form');
    
    newsletterForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = e.target.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (email) {
            // Mock newsletter signup
            showNotification('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        }
    });
}

// ==========================================
// Scroll Effects and Animations
// ==========================================

function initializeScrollEffects() {
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.category-card, .product-card, .testimonial-card, .section-title');
    animateElements.forEach(el => observer.observe(el));
    
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.backgroundPositionY = `${rate}px`;
        }
    });
}

// ==========================================
// Category Navigation
// ==========================================

function initializeCategoryNavigation() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            navigateToCategory(category);
        });
    });
}

function navigateToCategory(category) {
    // In a real app, this would navigate to products page with category filter
    showNotification(`Navigating to ${category} - Feature coming soon!`);
}

// ==========================================
// Global Event Listeners
// ==========================================

// Handle escape key for modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals
        document.querySelectorAll('.modal, .search-modal, .cart-sidebar').forEach(modal => {
            modal.classList.remove('active');
        });
        document.getElementById('overlay')?.classList.remove('active');
    }
});

// Handle form submissions
document.addEventListener('submit', (e) => {
    if (e.target.matches('form:not(#newsletter-form)')) {
        e.preventDefault();
        showNotification('Form submission - Feature coming soon!');
    }
});

// Handle clicks on overlay
document.getElementById('overlay')?.addEventListener('click', () => {
    document.querySelectorAll('.modal, .search-modal, .cart-sidebar').forEach(modal => {
        modal.classList.remove('active');
    });
    document.getElementById('overlay').classList.remove('active');
});

// ==========================================
// Initialize Category Navigation on Load
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initializeCategoryNavigation, 100);
});

// ==========================================
// Export functions for global access
// ==========================================

// Make functions available globally
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartQuantity = updateCartQuantity;
window.viewProduct = viewProduct;
window.navigateToCategory = navigateToCategory;
