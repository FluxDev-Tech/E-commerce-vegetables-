/**
 * Dashboard JavaScript - Fresh Harvest PH
 * Super Responsive Dashboard with Advanced Mobile Features
 */

// ==========================================
// Enhanced Dashboard State Management
// ==========================================

const DashboardState = {
    currentSection: 'dashboard',
    isMobile: false,
    isTablet: false,
    viewport: { width: 0, height: 0 },
    touchDevice: false,
    sidebarOpen: false,
    user: {
        id: 1,
        name: 'John Lawrence V. Martinez',
        email: 'fluxdev@example.com',
        avatar: 'image/profile.png',
        role: 'user', // 'user' or 'admin'
        joinDate: '2023-06-15',
        totalOrders: 24,
        totalSpent: 12450,
        rewardPoints: 1250
    },
    orders: [],
    notifications: [],
    wishlist: [],
    recentOrders: [],
    preferences: {
        animations: true,
        darkMode: false,
        compactView: false
    }
};

// Sample data (enhanced with more realistic data)
const SAMPLE_ORDERS = [
    {
        id: 'FH2025001',
        date: '2025-01-18',
        status: 'delivered',
        trackingNumber: 'TRK001234567',
        items: [
            { id: 1, name: 'Fresh Lettuce', quantity: 2, price: 45, image: '🥬', category: 'vegetables' },
            { id: 3, name: 'Bibingka', quantity: 1, price: 120, image: '🍘', category: 'snacks' }
        ],
        total: 210,
        shipping: 50,
        deliveryAddress: 'Manila, Philippines',
        estimatedDelivery: '2025-01-20'
    },
    {
        id: 'FH2025002',
        date: '2025-01-19',
        status: 'processing',
        trackingNumber: 'TRK001234568',
        items: [
            { id: 2, name: 'Saba Banana', quantity: 3, price: 80, image: '🍌', category: 'vegetables' },
            { id: 4, name: 'Philippine Mango', quantity: 1, price: 200, image: '🥭', category: 'vegetables' }
        ],
        total: 440,
        shipping: 50,
        deliveryAddress: 'Quezon City, Philippines',
        estimatedDelivery: '2025-01-22'
    },
    {
        id: 'FH2025003',
        date: '2025-01-20',
        status: 'shipped',
        trackingNumber: 'TRK001234569',
        items: [
            { id: 5, name: 'Kakanin Mix', quantity: 2, price: 150, image: '🍡', category: 'snacks' }
        ],
        total: 300,
        shipping: 50,
        deliveryAddress: 'Makati, Philippines',
        estimatedDelivery: '2025-01-23'
    }
];

const SAMPLE_NOTIFICATIONS = [
    {
        id: 1,
        type: 'order',
        title: 'Order Delivered',
        message: 'Your order #FH2025001 has been delivered successfully!',
        time: '2 hours ago',
        read: false,
        priority: 'high',
        actionUrl: '#orders'
    },
    {
        id: 2,
        type: 'promo',
        title: 'Special Offer',
        message: '20% off on all Filipino snacks this weekend!',
        time: '1 day ago',
        read: false,
        priority: 'medium',
        actionUrl: 'products.html?category=snacks'
    },
    {
        id: 3,
        type: 'system',
        title: 'Profile Updated',
        message: 'Your delivery address has been updated successfully.',
        time: '3 days ago',
        read: true,
        priority: 'low',
        actionUrl: '#profile'
    }
];

// ==========================================
// Enhanced Dashboard Initialization
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

function initializeDashboard() {
    // Detect device and viewport
    detectDevice();
    
    // Load user data
    loadUserData();
    
    // Initialize responsive navigation
    initializeSuperResponsiveNavigation();
    
    // Initialize sections with progressive enhancement
    initializeDashboardSections();
    
    // Load dashboard data with lazy loading
    loadDashboardDataProgressive();
    
    // Initialize enhanced event listeners
    initializeAdvancedEventListeners();
    
    // Initialize intersection observers for performance
    initializeIntersectionObservers();
    
    // Initialize resize handlers
    initializeResponsiveHandlers();
    
    // Initialize touch gestures
    initializeTouchGestures();
    
    console.log('🌱 Super Responsive Dashboard initialized successfully!');
}

// ==========================================
// Device Detection and Responsive Setup
// ==========================================

function detectDevice() {
    const viewport = {
        width: window.innerWidth,
        height: window.innerHeight
    };
    
    DashboardState.viewport = viewport;
    DashboardState.isMobile = viewport.width <= 768;
    DashboardState.isTablet = viewport.width > 768 && viewport.width <= 1024;
    DashboardState.touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    // Add device classes to body
    document.body.classList.toggle('mobile', DashboardState.isMobile);
    document.body.classList.toggle('tablet', DashboardState.isTablet);
    document.body.classList.toggle('touch-device', DashboardState.touchDevice);
    document.body.classList.toggle('desktop', !DashboardState.isMobile && !DashboardState.isTablet);
    
    // Set CSS custom properties for viewport
    document.documentElement.style.setProperty('--viewport-width', `${viewport.width}px`);
    document.documentElement.style.setProperty('--viewport-height', `${viewport.height}px`);
}

function loadUserData() {
    // Enhanced user data loading with preferences
    DashboardState.orders = SAMPLE_ORDERS;
    DashboardState.notifications = SAMPLE_NOTIFICATIONS;
    DashboardState.recentOrders = SAMPLE_ORDERS.slice(0, 3);
    
    // Load user preferences from localStorage
    const savedPreferences = localStorage.getItem('dashboard_preferences');
    if (savedPreferences) {
        DashboardState.preferences = { ...DashboardState.preferences, ...JSON.parse(savedPreferences) };
    }
    
    // Apply preferences
    applyUserPreferences();
    
    // Update UI with user data
    updateUserDisplay();
}

function applyUserPreferences() {
    const { darkMode, compactView, animations } = DashboardState.preferences;
    
    document.body.classList.toggle('dark-mode', darkMode);
    document.body.classList.toggle('compact-view', compactView);
    document.body.classList.toggle('no-animations', !animations);
}

function updateUserDisplay() {
    const welcomeName = document.getElementById('welcome-name');
    const userName = document.getElementById('user-name');
    const avatarImg = document.getElementById('avatar-img');
    
    if (welcomeName) {
        const firstName = DashboardState.user.name.split(' ')[0];
        welcomeName.textContent = firstName;
    }
    
    if (userName) {
        // Show full name on desktop, first name on mobile
        const displayName = DashboardState.isMobile ? 
            DashboardState.user.name.split(' ')[0] : 
            DashboardState.user.name;
        userName.textContent = displayName;
    }
    
    if (avatarImg) {
        avatarImg.src = DashboardState.user.avatar;
        avatarImg.alt = `${DashboardState.user.name}'s avatar`;
    }
    
    // Show admin section if user is admin
    if (DashboardState.user.role === 'admin') {
        const adminSection = document.getElementById('admin-section');
        if (adminSection) adminSection.style.display = 'block';
    }
    
    // Update notification badge
    updateNotificationBadge();
}

function updateNotificationBadge() {
    const badge = document.querySelector('.notification-badge');
    const unreadCount = DashboardState.notifications.filter(n => !n.read).length;
    
    if (badge) {
        badge.textContent = unreadCount;
        badge.style.display = unreadCount > 0 ? 'flex' : 'none';
    }
}

// ==========================================
// Super Responsive Navigation Management
// ==========================================

function initializeSuperResponsiveNavigation() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('dashboard-sidebar');
    const navItems = document.querySelectorAll('.nav-item');
    const userAvatar = document.getElementById('user-avatar');
    const userDropdown = document.getElementById('user-dropdown');
    const notificationBtn = document.getElementById('notification-btn');
    const notificationPanel = document.getElementById('notification-panel');
    const closeNotifications = document.getElementById('close-notifications');
    const overlay = document.getElementById('dashboard-overlay');
    
    // Enhanced sidebar toggle with animation states
    sidebarToggle?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleSidebar();
    });
    
    // Enhanced navigation with progressive loading
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.dataset.section;
            if (section) {
                navigateToSectionEnhanced(section);
            }
        });
        
        // Add ripple effect for touch devices
        if (DashboardState.touchDevice) {
            addRippleEffect(item);
        }
    });
    
    // Enhanced user dropdown with better positioning
    userAvatar?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleUserDropdown();
    });
    
    // Enhanced click outside handling
    document.addEventListener('click', (e) => {
        if (!userAvatar?.contains(e.target) && !userDropdown?.contains(e.target)) {
            closeUserDropdown();
        }
    });
    
    // Enhanced notification panel
    notificationBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleNotificationPanel();
    });
    
    closeNotifications?.addEventListener('click', (e) => {
        e.preventDefault();
        closeNotificationPanel();
    });
    
    // Enhanced overlay handling
    overlay?.addEventListener('click', () => {
        closeAllPanels();
    });
    
    // Keyboard navigation enhancement
    document.addEventListener('keydown', handleKeyboardNavigation);
    
    // Initialize focus trap
    initializeFocusTrap();
}

function toggleSidebar() {
    const sidebar = document.getElementById('dashboard-sidebar');
    const overlay = document.getElementById('dashboard-overlay');
    const toggle = document.getElementById('sidebar-toggle');
    
    DashboardState.sidebarOpen = !DashboardState.sidebarOpen;
    
    sidebar?.classList.toggle('active', DashboardState.sidebarOpen);
    overlay?.classList.toggle('active', DashboardState.sidebarOpen);
    toggle?.classList.toggle('active', DashboardState.sidebarOpen);
    
    // Prevent body scroll on mobile
    if (DashboardState.isMobile) {
        document.body.style.overflow = DashboardState.sidebarOpen ? 'hidden' : '';
    }
    
    // Update ARIA attributes
    sidebar?.setAttribute('aria-hidden', !DashboardState.sidebarOpen);
    toggle?.setAttribute('aria-expanded', DashboardState.sidebarOpen);
}

function navigateToSectionEnhanced(sectionName) {
    // Show loading state for section transition
    showSectionLoadingState();
    
    // Update active nav item with smooth transition
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const activeNav = document.querySelector(`[data-section="${sectionName}"]`);
    activeNav?.classList.add('active');
    
    // Smooth section transition
    const currentSection = document.querySelector('.dashboard-section.active');
    const targetSection = document.getElementById(`${sectionName}-section`);
    
    if (currentSection && targetSection && currentSection !== targetSection) {
        // Fade out current section
        currentSection.style.opacity = '0';
        currentSection.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            currentSection.classList.remove('active');
            targetSection.classList.add('active');
            
            // Fade in target section
            targetSection.style.opacity = '0';
            targetSection.style.transform = 'translateX(20px)';
            
            requestAnimationFrame(() => {
                targetSection.style.opacity = '1';
                targetSection.style.transform = 'translateX(0)';
                hideSectionLoadingState();
            });
        }, 150);
    } else if (targetSection) {
        targetSection.classList.add('active');
        hideSectionLoadingState();
    }
    
    DashboardState.currentSection = sectionName;
    
    // Load section data with progressive enhancement
    loadSectionDataEnhanced(sectionName);
    
    // Close mobile panels
    if (DashboardState.isMobile || DashboardState.isTablet) {
        closeAllPanels();
    }
    
    // Update URL hash without page reload
    history.pushState({ section: sectionName }, '', `#${sectionName}`);
    
    // Track section view (for analytics)
    trackSectionView(sectionName);
}

function showSectionLoadingState() {
    const main = document.querySelector('.dashboard-main');
    main?.classList.add('loading');
}

function hideSectionLoadingState() {
    const main = document.querySelector('.dashboard-main');
    main?.classList.remove('loading');
}

// ==========================================
// Enhanced Section Data Loading
// ==========================================

function loadSectionDataEnhanced(sectionName) {
    // Use Intersection Observer for lazy loading
    const targetSection = document.getElementById(`${sectionName}-section`);
    
    if (targetSection) {
        observeSectionForLazyLoading(targetSection, sectionName);
    }
    
    switch (sectionName) {
        case 'dashboard':
            loadDashboardOverviewEnhanced();
            break;
        case 'orders':
            loadOrdersSectionEnhanced();
            break;
        case 'wishlist':
            loadWishlistSectionEnhanced();
            break;
        case 'profile':
            loadProfileSectionEnhanced();
            break;
        case 'addresses':
            loadAddressesSectionEnhanced();
            break;
        case 'payment-methods':
            loadPaymentMethodsSectionEnhanced();
            break;
        case 'notifications':
            loadNotificationsSectionEnhanced();
            break;
        case 'admin-dashboard':
            loadAdminDashboardEnhanced();
            break;
        default:
            console.log(`Loading ${sectionName} section with enhanced features...`);
    }
}

// ==========================================
// Progressive Data Loading
// ==========================================

function loadDashboardDataProgressive() {
    // Load critical data first
    loadDashboardOverviewEnhanced();
    
    // Load secondary data with delay
    setTimeout(() => {
        loadRecentOrdersEnhanced();
        loadRecommendedProductsEnhanced();
    }, 100);
    
    // Load tertiary data with further delay
    setTimeout(() => {
        preloadSectionData(['orders', 'wishlist']);
    }, 500);
}

function loadDashboardOverviewEnhanced() {
    // Enhanced stats with animations
    animateStatsCounters();
    loadRecentOrdersEnhanced();
    loadRecommendedProductsEnhanced();
}

function animateStatsCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const finalValue = parseInt(stat.textContent.replace(/[₱,]/g, ''));
        animateCounter(stat, 0, finalValue, 1000);
    });
}

function animateCounter(element, start, end, duration) {
    let startTime = null;
    const isPrice = element.textContent.includes('₱');
    
    function animate(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        const currentValue = Math.floor(progress * (end - start) + start);
        
        if (isPrice) {
            element.textContent = `₱${currentValue.toLocaleString()}`;
        } else {
            element.textContent = currentValue.toLocaleString();
        }
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

function loadRecentOrdersEnhanced() {
    const recentOrdersList = document.getElementById('recent-orders-list');
    if (!recentOrdersList) return;
    
    const recentOrdersHTML = DashboardState.recentOrders.map((order, index) => `
        <div class="recent-order-item" style="animation-delay: ${index * 0.1}s;">
            <div class="order-image">${order.items[0].image}</div>
            <div class="order-details">
                <div class="order-title">Order #${order.id}</div>
                <div class="order-meta">${formatDateEnhanced(order.date)} • ${order.items.length} items • ₱${order.total.toLocaleString()}</div>
            </div>
            <span class="order-status ${order.status}" title="${getStatusDescription(order.status)}">${order.status}</span>
        </div>
    `).join('');
    
    recentOrdersList.innerHTML = recentOrdersHTML;
    
    // Trigger animation
    setTimeout(() => {
        recentOrdersList.classList.add('loaded');
    }, 50);
}

function loadRecommendedProductsEnhanced() {
    const recommendedList = document.getElementById('recommended-products-list');
    if (!recommendedList) return;
    
    // Use sample products from main script with fallback
    const recommendedProducts = (typeof SAMPLE_PRODUCTS !== 'undefined' ? SAMPLE_PRODUCTS : []).slice(0, 5);
    
    if (recommendedProducts.length === 0) {
        recommendedList.innerHTML = '<p class="no-products">No recommendations available</p>';
        return;
    }
    
    const recommendedHTML = recommendedProducts.map((product, index) => `
        <div class="recommended-product" data-id="${product.id}" style="animation-delay: ${index * 0.1}s;">
            <div class="recommended-product-image">${product.image}</div>
            <h4>${product.name}</h4>
            <div class="price">₱${product.price.toLocaleString()}</div>
            <button class="add-to-cart-btn" onclick="addToCartEnhanced(${product.id})" type="button">
                <span class="btn-text">Add to Cart</span>
                <span class="btn-loading">Adding...</span>
            </button>
        </div>
    `).join('');
    
    recommendedList.innerHTML = recommendedHTML;
    
    // Trigger animation
    setTimeout(() => {
        recommendedList.classList.add('loaded');
    }, 50);
}

// ==========================================
// Enhanced Orders Section
// ==========================================

function loadOrdersSectionEnhanced() {
    const ordersList = document.getElementById('orders-list');
    if (!ordersList) return;
    
    // Show skeleton loading
    showOrdersSkeletonLoader();
    
    // Simulate API delay for realistic loading
    setTimeout(() => {
        const ordersHTML = DashboardState.orders.map((order, index) => `
            <div class="order-card" data-status="${order.status}" style="animation-delay: ${index * 0.1}s;">
                <div class="order-header">
                    <div class="order-info">
                        <h4>Order #${order.id}</h4>
                        <div class="order-date">Placed on ${formatDateEnhanced(order.date)}</div>
                        ${order.trackingNumber ? `<div class="tracking-number">Tracking: ${order.trackingNumber}</div>` : ''}
                    </div>
                    <div class="order-actions">
                        <span class="order-status ${order.status}" title="${getStatusDescription(order.status)}">${order.status}</span>
                        <button class="btn-outline" onclick="viewOrderDetailsEnhanced('${order.id}')" type="button">View Details</button>
                        ${order.status === 'delivered' ? `<button class="btn-outline" onclick="reorderItems('${order.id}')" type="button">Reorder</button>` : ''}
                        ${order.status === 'processing' ? `<button class="btn-outline cancel-btn" onclick="cancelOrderEnhanced('${order.id}')" type="button">Cancel</button>` : ''}
                    </div>
                </div>
                <div class="order-items">
                    ${order.items.map(item => `
                        <div class="order-item">
                            <div class="order-item-image">${item.image}</div>
                            <div class="order-item-details">
                                <div class="order-item-name">${item.name}</div>
                                <div class="order-item-quantity">Quantity: ${item.quantity}</div>
                                <div class="order-item-category">${item.category}</div>
                            </div>
                            <div class="order-item-price">₱${(item.price * item.quantity).toLocaleString()}</div>
                        </div>
                    `).join('')}
                </div>
                <div class="order-summary">
                    <div class="order-details-grid">
                        <div class="order-total">Total: ₱${(order.total + order.shipping).toLocaleString()}</div>
                        <div class="delivery-info">
                            <div class="delivery-address">📍 ${order.deliveryAddress}</div>
                            ${order.estimatedDelivery ? `<div class="estimated-delivery">📅 Est. ${formatDateEnhanced(order.estimatedDelivery)}</div>` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
        
        ordersList.innerHTML = ordersHTML;
        hideOrdersSkeletonLoader();
        
        // Initialize enhanced order filters
        initializeOrderFiltersEnhanced();
        
        // Trigger animation
        setTimeout(() => {
            ordersList.classList.add('loaded');
        }, 50);
    }, 300);
}

function showOrdersSkeletonLoader() {
    const ordersList = document.getElementById('orders-list');
    if (!ordersList) return;
    
    const skeletonHTML = Array(3).fill().map(() => `
        <div class="skeleton-order-card">
            <div class="skeleton-header">
                <div class="skeleton-text skeleton-title"></div>
                <div class="skeleton-text skeleton-status"></div>
            </div>
            <div class="skeleton-items">
                <div class="skeleton-item">
                    <div class="skeleton-image"></div>
                    <div class="skeleton-details">
                        <div class="skeleton-text"></div>
                        <div class="skeleton-text skeleton-small"></div>
                    </div>
                    <div class="skeleton-text skeleton-price"></div>
                </div>
            </div>
        </div>
    `).join('');
    
    ordersList.innerHTML = skeletonHTML;
}

function hideOrdersSkeletonLoader() {
    // Skeleton will be replaced by actual content
}

// ==========================================
// Enhanced Event Listeners and Interactions
// ==========================================

function initializeAdvancedEventListeners() {
    // Enhanced search functionality
    const searchInput = document.getElementById('dashboard-search');
    if (searchInput) {
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performEnhancedSearch(e.target.value);
            }, 300);
        });
    }
    
    // Enhanced keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'k':
                    e.preventDefault();
                    focusSearch();
                    break;
                case '1':
                    e.preventDefault();
                    navigateToSectionEnhanced('dashboard');
                    break;
                case '2':
                    e.preventDefault();
                    navigateToSectionEnhanced('orders');
                    break;
                case '3':
                    e.preventDefault();
                    navigateToSectionEnhanced('wishlist');
                    break;
            }
        }
    });
    
    // Enhanced form validation
    initializeFormValidation();
    
    // Enhanced accessibility
    initializeA11yEnhancements();
}

function performEnhancedSearch(query) {
    if (!query.trim()) return;
    
    // Search across all sections
    const results = {
        orders: DashboardState.orders.filter(order => 
            order.id.toLowerCase().includes(query.toLowerCase()) ||
            order.items.some(item => item.name.toLowerCase().includes(query.toLowerCase()))
        ),
        notifications: DashboardState.notifications.filter(notification =>
            notification.title.toLowerCase().includes(query.toLowerCase()) ||
            notification.message.toLowerCase().includes(query.toLowerCase())
        )
    };
    
    displaySearchResults(results);
}

// ==========================================
// Touch Gesture Support
// ==========================================

function initializeTouchGestures() {
    if (!DashboardState.touchDevice) return;
    
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        handleTouchGestures();
    }, { passive: true });
    
    function handleTouchGestures() {
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        const minSwipeDistance = 100;
        
        // Horizontal swipes
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (Math.abs(deltaX) > minSwipeDistance) {
                if (deltaX > 0) {
                    // Swipe right
                    handleSwipeRight();
                } else {
                    // Swipe left
                    handleSwipeLeft();
                }
            }
        }
        // Vertical swipes
        else if (Math.abs(deltaY) > minSwipeDistance) {
            if (deltaY > 0) {
                // Swipe down
                handleSwipeDown();
            } else {
                // Swipe up
                handleSwipeUp();
            }
        }
    }
    
    function handleSwipeRight() {
        if (touchStartX < 50 && !DashboardState.sidebarOpen) {
            toggleSidebar();
        }
    }
    
    function handleSwipeLeft() {
        if (DashboardState.sidebarOpen) {
            toggleSidebar();
        }
    }
    
    function handleSwipeDown() {
        // Pull to refresh functionality
        if (window.scrollY === 0) {
            refreshCurrentSection();
        }
    }
    
    function handleSwipeUp() {
        // Quick scroll to top
        if (window.scrollY > window.innerHeight) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }
}

// ==========================================
// Intersection Observer for Performance
// ==========================================

function initializeIntersectionObservers() {
    // Lazy load images and content
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    // Observe all lazy images
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
    
    // Animate elements on scroll
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    // Observe animation targets
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        animationObserver.observe(el);
    });
}

// ==========================================
// Responsive Handlers
// ==========================================

function initializeResponsiveHandlers() {
    let resizeTimeout;
    
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(handleResponsiveChanges, 150);
    });
    
    // Handle orientation change
    window.addEventListener('orientationchange', () => {
        setTimeout(handleResponsiveChanges, 500);
    });
}

function handleResponsiveChanges() {
    detectDevice();
    
    // Close panels if switched to desktop
    if (!DashboardState.isMobile && !DashboardState.isTablet) {
        closeAllPanels();
    }
    
    // Adjust layouts based on new viewport
    adjustLayoutsForViewport();
}

function adjustLayoutsForViewport() {
    // Recalculate grid layouts
    const productGrids = document.querySelectorAll('.product-grid, .wishlist-grid, .recommended-grid');
    productGrids.forEach(grid => {
        updateGridLayout(grid);
    });
    
    // Adjust modal sizes
    adjustModalSizes();
}

// ==========================================
// Enhance// ==========================================
// Enhanced Mobile Navigation Management
// ==========================================

function initializeDashboardNavigation() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('dashboard-sidebar');
    const navItems = document.querySelectorAll('.nav-item');
    const userAvatar = document.getElementById('user-avatar');
    const userDropdown = document.getElementById('user-dropdown');
    const notificationBtn = document.getElementById('notification-btn');
    const notificationPanel = document.getElementById('notification-panel');
    const closeNotifications = document.getElementById('close-notifications');
    const overlay = document.getElementById('dashboard-overlay');
    
    // Sidebar toggle with better mobile handling
    sidebarToggle?.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleSidebar();
    });
    
    // Navigation items with mobile optimization
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.dataset.section;
            if (section) {
                navigateToSection(section);
                
                // Auto-close sidebar on mobile after navigation
                if (window.innerWidth <= 1024) {
                    closeSidebar();
                }
            }
        });
    });
    
    // User dropdown with mobile positioning
    userAvatar?.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleUserDropdown();
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!userAvatar?.contains(e.target) && !userDropdown?.contains(e.target)) {
            closeUserDropdown();
        }
    });
    
    // Notification panel with touch support
    notificationBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleNotificationPanel();
    });
    
    closeNotifications?.addEventListener('click', () => {
        closeNotificationPanel();
    });
    
    // Overlay handling for mobile
    overlay?.addEventListener('click', () => {
        closeAllPanels();
    });
    
    // Touch/swipe support for sidebar
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipeGesture();
    });
    
    function handleSwipeGesture() {
        const swipeDistance = touchEndX - touchStartX;
        const minSwipeDistance = 100;
        
        // Swipe right to open sidebar (from left edge)
        if (swipeDistance > minSwipeDistance && touchStartX < 50) {
            openSidebar();
        }
        
        // Swipe left to close sidebar
        if (swipeDistance < -minSwipeDistance && sidebar?.classList.contains('active')) {
            closeSidebar();
        }
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        // Escape to close all panels
        if (e.key === 'Escape') {
            closeAllPanels();
        }
        
        // Tab navigation enhancement
        if (e.key === 'Tab') {
            const activePanel = document.querySelector('.dashboard-sidebar.active, .notification-panel.active, .user-dropdown.active');
            if (activePanel) {
                trapFocus(e, activePanel);
            }
        }
    });
    
    // Window resize handling
    window.addEventListener('resize', handleWindowResize);
}

// Enhanced sidebar controls
function toggleSidebar() {
    const sidebar = document.getElementById('dashboard-sidebar');
    const overlay = document.getElementById('dashboard-overlay');
    
    if (sidebar?.classList.contains('active')) {
        closeSidebar();
    } else {
        openSidebar();
    }
}

function openSidebar() {
    const sidebar = document.getElementById('dashboard-sidebar');
    const overlay = document.getElementById('dashboard-overlay');
    
    sidebar?.classList.add('active');
    overlay?.classList.add('active');
    
    // Prevent body scrolling on mobile
    if (window.innerWidth <= 1024) {
        document.body.style.overflow = 'hidden';
    }
}

function closeSidebar() {
    const sidebar = document.getElementById('dashboard-sidebar');
    const overlay = document.getElementById('dashboard-overlay');
    
    sidebar?.classList.remove('active');
    overlay?.classList.remove('active');
    
    // Restore body scrolling
    document.body.style.overflow = '';
}

function toggleUserDropdown() {
    const dropdown = document.getElementById('user-dropdown');
    
    if (dropdown?.classList.contains('active')) {
        closeUserDropdown();
    } else {
        openUserDropdown();
    }
}

function openUserDropdown() {
    const dropdown = document.getElementById('user-dropdown');
    closeNotificationPanel(); // Close other panels
    dropdown?.classList.add('active');
}

function closeUserDropdown() {
    const dropdown = document.getElementById('user-dropdown');
    dropdown?.classList.remove('active');
}

function toggleNotificationPanel() {
    const panel = document.getElementById('notification-panel');
    const overlay = document.getElementById('dashboard-overlay');
    
    if (panel?.classList.contains('active')) {
        closeNotificationPanel();
    } else {
        openNotificationPanel();
    }
}

function openNotificationPanel() {
    const panel = document.getElementById('notification-panel');
    const overlay = document.getElementById('dashboard-overlay');
    
    closeUserDropdown(); // Close other panels
    panel?.classList.add('active');
    overlay?.classList.add('active');
    
    // Prevent body scrolling on mobile
    if (window.innerWidth <= 768) {
        document.body.style.overflow = 'hidden';
    }
    
    loadNotifications();
}

function closeNotificationPanel() {
    const panel = document.getElementById('notification-panel');
    const overlay = document.getElementById('dashboard-overlay');
    
    panel?.classList.remove('active');
    
    // Only remove overlay if sidebar is also closed
    const sidebar = document.getElementById('dashboard-sidebar');
    if (!sidebar?.classList.contains('active')) {
        overlay?.classList.remove('active');
    }
    
    // Restore body scrolling
    document.body.style.overflow = '';
}

function closeAllPanels() {
    closeSidebar();
    closeUserDropdown();
    closeNotificationPanel();
    document.body.style.overflow = '';
}

function handleWindowResize() {
    const sidebar = document.getElementById('dashboard-sidebar');
    const overlay = document.getElementById('dashboard-overlay');
    
    // Auto-close sidebar on desktop
    if (window.innerWidth > 1024) {
        sidebar?.classList.remove('active');
        overlay?.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Adjust notification panel width
    const notificationPanel = document.getElementById('notification-panel');
    if (window.innerWidth <= 768 && notificationPanel?.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    }
}

// Focus trap for accessibility
function trapFocus(e, container) {
    const focusableElements = container.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            e.preventDefault();
        }
    } else {
        if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
            e.preventDefault();
        }
    }
}

// ==========================================
// Enhanced Mobile Order Management
// ==========================================

function loadOrdersSection() {
    const ordersList = document.getElementById('orders-list');
    if (!ordersList) return;
    
    const ordersHTML = DashboardState.orders.map(order => `
        <div class="order-card" data-status="${order.status}">
            <div class="order-header">
                <div class="order-info">
                    <h4>Order #${order.id}</h4>
                    <div class="order-date">Placed on ${formatDate(order.date)}</div>
                </div>
                <div class="order-actions">
                    <span class="order-status ${order.status}">${order.status}</span>
                    <button class="btn-outline" onclick="viewOrderDetails('${order.id}')" type="button">View Details</button>
                    ${order.status === 'delivered' ? '<button class="btn-outline" onclick="reorderItems(\'' + order.id + '\')" type="button">Reorder</button>' : ''}
                    ${order.status === 'processing' ? '<button class="btn-outline cancel-btn" onclick="cancelOrder(\'' + order.id + '\')" type="button">Cancel</button>' : ''}
                </div>
            </div>
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item">
                        <div class="order-item-image">${item.image}</div>
                        <div class="order-item-details">
                            <div class="order-item-name">${item.name}</div>
                            <div class="order-item-quantity">Quantity: ${item.quantity}</div>
                        </div>
                        <div class="order-item-price">₱${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                `).join('')}
            </div>
            <div class="order-summary">
                <div class="order-total">Total: ₱${(order.total + order.shipping).toFixed(2)}</div>
                <div class="order-status-text">${getStatusText(order.status)}</div>
            </div>
        </div>
    `).join('');
    
    ordersList.innerHTML = ordersHTML;
    
    // Initialize order filters with mobile support
    initializeOrderFilters();
}

// Enhanced order filtering for mobile
function initializeOrderFilters() {
    const filterBtns = document.querySelectorAll('.order-filters .filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active filter
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            filterOrders(filter);
        });
        
        // Touch feedback for mobile
        btn.addEventListener('touchstart', () => {
            btn.style.transform = 'scale(0.95)';
        });
        
        btn.addEventListener('touchend', () => {
            btn.style.transform = '';
        });
    });
}

// ==========================================
// Enhanced Mobile Wishlist
// ==========================================

function loadWishlistSection() {
    const wishlistGrid = document.getElementById('wishlist-grid');
    if (!wishlistGrid) return;
    
    // Sample wishlist items with mobile-optimized layout
    const wishlistItems = SAMPLE_PRODUCTS.slice(0, 6);
    
    const wishlistHTML = wishlistItems.map(item => `
        <div class="product-card" data-id="${item.id}">
            <div class="product-image">
                ${item.image}
                ${item.badge ? `<span class="product-badge">${item.badge}</span>` : ''}
                <button class="remove-wishlist-btn" onclick="removeFromWishlist(${item.id})" title="Remove from wishlist" type="button">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div class="product-info">
                <h3 class="product-title">${item.name}</h3>
                <p class="product-description">${item.description}</p>
                <div class="product-price">
                    <span class="current-price">₱${item.price.toFixed(2)}</span>
                    ${item.originalPrice ? `<span class="original-price">₱${item.originalPrice.toFixed(2)}</span>` : ''}
                </div>
                <div class="product-actions">
                    <button class="btn-primary" onclick="addToCart(${item.id})" type="button">Add to Cart</button>
                    <button class="btn-secondary" onclick="viewProduct(${item.id})" type="button">View Details</button>
                </div>
            </div>
        </div>
    `).join('');
    
    wishlistGrid.innerHTML = wishlistHTML || '<div class="empty-wishlist"><p>Your wishlist is empty</p><a href="products.html" class="btn-primary">Browse Products</a></div>';
}

// ==========================================
// Enhanced Mobile Profile Management
// ==========================================

function loadProfileSection() {
    const profileContainer = document.querySelector('.profile-form-container');
    if (!profileContainer) return;
    
    const profileHTML = `
        <div class="profile-form-card">
            <div class="profile-header">
                <div class="profile-avatar-section">
                    <img src="${DashboardState.user.avatar}" alt="Profile Avatar" class="profile-avatar-large" id="profile-avatar-display">
                    <input type="file" id="avatar-upload" accept="image/*" style="display: none;">
                    <button class="change-avatar-btn" onclick="document.getElementById('avatar-upload').click()" type="button">Change Photo</button>
                </div>
                <div class="profile-info">
                    <h2>${DashboardState.user.name}</h2>
                    <p>${DashboardState.user.email}</p>
                    <p class="member-since">Member since ${formatDate(DashboardState.user.joinDate)}</p>
                </div>
            </div>
            
            <form class="profile-form" id="profile-form">
                <div class="form-section">
                    <h3>Personal Information</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="first-name">First Name *</label>
                            <input type="text" id="first-name" name="firstName" value="Juan" required>
                        </div>
                        <div class="form-group">
                            <label for="last-name">Last Name *</label>
                            <input type="text" id="last-name" name="lastName" value="Dela Cruz" required>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="profile-email">Email Address *</label>
                            <input type="email" id="profile-email" name="email" value="${DashboardState.user.email}" required>
                        </div>
                        <div class="form-group">
                            <label for="profile-phone">Phone Number</label>
                            <input type="tel" id="profile-phone" name="phone" value="+63 912 345 6789">
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="birthday">Birthday</label>
                            <input type="date" id="birthday" name="birthday" value="1990-01-15">
                        </div>
                        <div class="form-group">
                            <label for="gender">Gender</label>
                            <select id="gender" name="gender">
                                <option value="">Select Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                                <option value="prefer-not-to-say">Prefer not to say</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class="form-section">
                    <h3>Contact Preferences</h3>
                    <div class="form-group checkbox-group">
                        <label class="checkbox-label">
                            <input type="checkbox" name="newsletter" checked>
                            <span class="checkmark"></span>
                            Subscribe to newsletter and promotional emails
                        </label>
                    </div>
                    
                    <div class="form-group checkbox-group">
                        <label class="checkbox-label">
                            <input type="checkbox" name="sms" checked>
                            <span class="checkmark"></span>
                            Receive SMS notifications for order updates
                        </label>
                    </div>
                    
                    <div class="form-group checkbox-group">
                        <label class="checkbox-label">
                            <input type="checkbox" name="recommendations">
                            <span class="checkmark"></span>
                            Get personalized product recommendations
                        </label>
                    </div>
                    
                    <div class="form-group checkbox-group">
                        <label class="checkbox-label">
                            <input type="checkbox" name="marketing">
                            <span class="checkmark"></span>
                            Receive marketing communications
                        </label>
                    </div>
                </div>
                
                <div class="form-section">
                    <h3>Security</h3>
                    <div class="form-group">
                        <label for="current-password">Current Password</label>
                        <input type="password" id="current-password" name="currentPassword" placeholder="Enter current password">
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="new-password">New Password</label>
                            <input type="password" id="new-password" name="newPassword" placeholder="Enter new password">
                        </div>
                        <div class="form-group">
                            <label for="confirm-password">Confirm Password</label>
                            <input type="password" id="confirm-password" name="confirmPassword" placeholder="Confirm new password">
                        </div>
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn-secondary" onclick="resetProfileForm()">Cancel</button>
                    <button type="submit" class="btn-primary">Save Changes</button>
                </div>
            </form>
        </div>
    `;
    
    profileContainer.innerHTML = profileHTML;
    
    // Initialize profile form with mobile enhancements
    initializeProfileForm();
}

function initializeProfileForm() {
    const profileForm = document.getElementById('profile-form');
    const avatarUpload = document.getElementById('avatar-upload');
    const avatarDisplay = document.getElementById('profile-avatar-display');
    
    // Handle avatar upload
    avatarUpload?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (avatarDisplay) {
                    avatarDisplay.src = e.target.result;
                }
                showNotification('Profile photo updated!');
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Handle form submission
    profileForm?.addEventListener('submit', handleProfileUpdate);
    
    // Password validation
    const newPassword = document.getElementById('new-password');
    const confirmPassword = document.getElementById('confirm-password');
    
    confirmPassword?.addEventListener('input', validatePasswordMatch);
    newPassword?.addEventListener('input', validatePasswordMatch);
}

function validatePasswordMatch() {
    const newPassword = document.getElementById('new-password');
    const confirmPassword = document.getElementById('confirm-password');
    
    if (newPassword.value && confirmPassword.value) {
        if (newPassword.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity('Passwords do not match');
        } else {
            confirmPassword.setCustomValidity('');
        }
    }
}

function resetProfileForm() {
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.reset();
        showNotification('Changes cancelled');
    }
}

// ==========================================
// Enhanced Mobile Event Handlers
// ==========================================

function handleProfileUpdate(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Saving...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Profile updated successfully!');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1000);
}

function viewOrderDetails(orderId) {
    const order = DashboardState.orders.find(o => o.id === orderId);
    if (!order) return;
    
    // For mobile, we could show a modal instead of navigating
    if (window.innerWidth <= 768) {
        showOrderModal(order);
    } else {
        showNotification(`Viewing details for order ${orderId}`);
    }
}

function showOrderModal(order) {
    // Create mobile-friendly order details modal
    const modalHTML = `
        <div class="order-modal" id="order-modal">
            <div class="order-modal-content">
                <div class="order-modal-header">
                    <h3>Order #${order.id}</h3>
                    <button class="close-modal" onclick="closeOrderModal()">&times;</button>
                </div>
                <div class="order-modal-body">
                    <div class="order-status-section">
                        <span class="order-status ${order.status}">${order.status}</span>
                        <p>Placed on ${formatDate(order.date)}</p>
                    </div>
                    <div class="order-items-section">
                        <h4>Items (${order.items.length})</h4>
                        ${order.items.map(item => `
                            <div class="modal-order-item">
                                <span class="item-emoji">${item.image}</span>
                                <div class="item-details">
                                    <div class="item-name">${item.name}</div>
                                    <div class="item-quantity">Qty: ${item.quantity}</div>
                                </div>
                                <div class="item-price">₱${(item.price * item.quantity).toFixed(2)}</div>
                            </div>
                        `).join('')}
                    </div>
                    <div class="order-total-section">
                        <div class="total-row">
                            <span>Subtotal:</span>
                            <span>₱${order.total.toFixed(2)}</span>
                        </div>
                        <div class="total-row">
                            <span>Shipping:</span>
                            <span>₱${order.shipping.toFixed(2)}</span>
                        </div>
                        <div class="total-row final">
                            <span>Total:</span>
                            <span>₱${(order.total + order.shipping).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                <div class="order-modal-actions">
                    ${order.status === 'delivered' ? '<button class="btn-primary" onclick="reorderItems(\'' + order.id + '\')">Reorder</button>' : ''}
                    <button class="btn-secondary" onclick="closeOrderModal()">Close</button>
                </div>
            </div>
        </div>
    `;
    
    // Append to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
}

function closeOrderModal() {
    const modal = document.getElementById('order-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

function reorderItems(orderId) {
    const order = DashboardState.orders.find(o => o.id === orderId);
    if (!order) return;
    
    // Add all items from this order to cart
    order.items.forEach(item => {
        addToCart(item.id, item.quantity);
    });
    
    showNotification(`${order.items.length} items added to cart from order #${orderId}`);
    closeOrderModal();
}

function cancelOrder(orderId) {
    if (confirm('Are you sure you want to cancel this order?')) {
        // Update order status
        const order = DashboardState.orders.find(o => o.id === orderId);
        if (order) {
            order.status = 'cancelled';
            loadOrdersSection(); // Refresh the orders display
            showNotification(`Order #${orderId} has been cancelled`);
        }
    }
}

// Make functions globally available
window.reorderItems = reorderItems;
window.cancelOrder = cancelOrder;
window.closeOrderModal = closeOrderModal;
window.resetProfileForm = resetProfileForm;/**
 * Dashboard JavaScript - Fresh Harvest PH
 * Handles all dashboard functionality including navigation, data display, and interactions
 */

// ==========================================
// Dashboard State Management
// ==========================================

const DashboardState = {
    currentSection: 'dashboard',
    user: {
        id: 1,
        name: 'Juan Dela Cruz',
        email: 'juan.delacruz@example.com',
        avatar: 'https://via.placeholder.com/40x40/2D5A3D/ffffff?text=JD',
        role: 'user', // 'user' or 'admin'
        joinDate: '2023-06-15',
        totalOrders: 24,
        totalSpent: 12450,
        rewardPoints: 1250
    },
    orders: [],
    notifications: [],
    wishlist: [],
    recentOrders: []
};

// Sample data
const SAMPLE_ORDERS = [
    {
        id: 'FH2025001',
        date: '2025-01-18',
        status: 'delivered',
        items: [
            { id: 1, name: 'Fresh Lettuce', quantity: 2, price: 45, image: '🥬' },
            { id: 3, name: 'Bibingka', quantity: 1, price: 120, image: '🍘' }
        ],
        total: 210,
        shipping: 50
    },
    {
        id: 'FH2025002',
        date: '2025-01-19',
        status: 'processing',
        items: [
            { id: 2, name: 'Saba Banana', quantity: 3, price: 80, image: '🍌' },
            { id: 4, name: 'Philippine Mango', quantity: 1, price: 200, image: '🥭' }
        ],
        total: 440,
        shipping: 50
    },
    {
        id: 'FH2025003',
        date: '2025-01-20',
        status: 'shipped',
        items: [
            { id: 5, name: 'Kakanin Mix', quantity: 2, price: 150, image: '🍡' }
        ],
        total: 300,
        shipping: 50
    }
];

const SAMPLE_NOTIFICATIONS = [
    {
        id: 1,
        type: 'order',
        title: 'Order Delivered',
        message: 'Your order #FH2025001 has been delivered successfully!',
        time: '2 hours ago',
        read: false
    },
    {
        id: 2,
        type: 'promo',
        title: 'Special Offer',
        message: '20% off on all Filipino snacks this weekend!',
        time: '1 day ago',
        read: false
    },
    {
        id: 3,
        type: 'system',
        title: 'Profile Updated',
        message: 'Your delivery address has been updated successfully.',
        time: '3 days ago',
        read: true
    }
];

// ==========================================
// Dashboard Initialization
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
});

function initializeDashboard() {
    // Load user data
    loadUserData();
    
    // Initialize navigation
    initializeDashboardNavigation();
    
    // Initialize sections
    initializeDashboardSections();
    
    // Load dashboard data
    loadDashboardData();
    
    // Initialize event listeners
    initializeDashboardEvents();
    
    console.log('🌱 Dashboard initialized successfully!');
}

function loadUserData() {
    // In a real app, this would fetch from API
    DashboardState.orders = SAMPLE_ORDERS;
    DashboardState.notifications = SAMPLE_NOTIFICATIONS;
    DashboardState.recentOrders = SAMPLE_ORDERS.slice(0, 3);
    
    // Update UI with user data
    updateUserDisplay();
}

function updateUserDisplay() {
    const welcomeName = document.getElementById('welcome-name');
    const userName = document.getElementById('user-name');
    const avatarImg = document.getElementById('avatar-img');
    
    if (welcomeName) welcomeName.textContent = DashboardState.user.name.split(' ')[0];
    if (userName) userName.textContent = DashboardState.user.name;
    if (avatarImg) avatarImg.src = DashboardState.user.avatar;
    
    // Show admin section if user is admin
    if (DashboardState.user.role === 'admin') {
        const adminSection = document.getElementById('admin-section');
        if (adminSection) adminSection.style.display = 'block';
    }
}

// ==========================================
// Navigation Management
// ==========================================

function initializeDashboardNavigation() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('dashboard-sidebar');
    const navItems = document.querySelectorAll('.nav-item');
    const userAvatar = document.getElementById('user-avatar');
    const userDropdown = document.getElementById('user-dropdown');
    const notificationBtn = document.getElementById('notification-btn');
    const notificationPanel = document.getElementById('notification-panel');
    const closeNotifications = document.getElementById('close-notifications');
    const overlay = document.getElementById('dashboard-overlay');
    
    // Sidebar toggle
    sidebarToggle?.addEventListener('click', () => {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
    });
    
    // Navigation items
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.dataset.section;
            if (section) {
                navigateToSection(section);
            }
        });
    });
    
    // User dropdown
    userAvatar?.addEventListener('click', (e) => {
        e.stopPropagation();
        userDropdown.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!userAvatar?.contains(e.target)) {
            userDropdown?.classList.remove('active');
        }
    });
    
    // Notification panel
    notificationBtn?.addEventListener('click', () => {
        notificationPanel.classList.toggle('active');
        overlay.classList.toggle('active');
        loadNotifications();
    });
    
    closeNotifications?.addEventListener('click', () => {
        notificationPanel.classList.remove('active');
        overlay.classList.remove('active');
    });
    
    // Overlay close
    overlay?.addEventListener('click', () => {
        sidebar?.classList.remove('active');
        notificationPanel?.classList.remove('active');
        overlay.classList.remove('active');
    });
}

function navigateToSection(sectionName) {
    // Update active nav item
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    document.querySelector(`[data-section="${sectionName}"]`)?.classList.add('active');
    
    // Show selected section
    document.querySelectorAll('.dashboard-section').forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(`${sectionName}-section`);
    if (targetSection) {
        targetSection.classList.add('active');
        DashboardState.currentSection = sectionName;
        
        // Load section-specific data
        loadSectionData(sectionName);
    }
    
    // Close mobile sidebar
    const sidebar = document.getElementById('dashboard-sidebar');
    const overlay = document.getElementById('dashboard-overlay');
    sidebar?.classList.remove('active');
    overlay?.classList.remove('active');
}

// Make navigateToSection available globally
window.goToSection = navigateToSection;

// ==========================================
// Section Data Loading
// ==========================================

function initializeDashboardSections() {
    // Load initial dashboard section
    loadSectionData('dashboard');
}

function loadSectionData(sectionName) {
    switch (sectionName) {
        case 'dashboard':
            loadDashboardOverview();
            break;
        case 'orders':
            loadOrdersSection();
            break;
        case 'wishlist':
            loadWishlistSection();
            break;
        case 'profile':
            loadProfileSection();
            break;
        case 'addresses':
            loadAddressesSection();
            break;
        case 'payment-methods':
            loadPaymentMethodsSection();
            break;
        case 'notifications':
            loadNotificationsSection();
            break;
        case 'admin-dashboard':
            loadAdminDashboard();
            break;
        default:
            console.log(`Loading ${sectionName} section...`);
    }
}

function loadDashboardData() {
    loadDashboardOverview();
    loadRecentOrders();
    loadRecommendedProducts();
}

// ==========================================
// Dashboard Overview
// ==========================================

function loadDashboardOverview() {
    // Update statistics cards - data is already in DashboardState.user
    // The HTML already shows the static values, in a real app these would be dynamic
    
    loadRecentOrders();
    loadRecommendedProducts();
}

function loadRecentOrders() {
    const recentOrdersList = document.getElementById('recent-orders-list');
    if (!recentOrdersList) return;
    
    const recentOrdersHTML = DashboardState.recentOrders.map(order => `
        <div class="recent-order-item">
            <div class="order-image">${order.items[0].image}</div>
            <div class="order-details">
                <div class="order-title">Order #${order.id}</div>
                <div class="order-meta">${formatDate(order.date)} • ${order.items.length} items • ₱${order.total}</div>
            </div>
            <span class="order-status ${order.status}">${order.status}</span>
        </div>
    `).join('');
    
    recentOrdersList.innerHTML = recentOrdersHTML;
}

function loadRecommendedProducts() {
    const recommendedList = document.getElementById('recommended-products-list');
    if (!recommendedList) return;
    
    // Use sample products from main script
    const recommendedProducts = SAMPLE_PRODUCTS.slice(0, 5);
    
    const recommendedHTML = recommendedProducts.map(product => `
        <div class="recommended-product" data-id="${product.id}">
            <div class="recommended-product-image">${product.image}</div>
            <h4>${product.name}</h4>
            <div class="price">₱${product.price}</div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join('');
    
    recommendedList.innerHTML = recommendedHTML;
}

// ==========================================
// Orders Section
// ==========================================

function loadOrdersSection() {
    const ordersList = document.getElementById('orders-list');
    if (!ordersList) return;
    
    const ordersHTML = DashboardState.orders.map(order => `
        <div class="order-card" data-status="${order.status}">
            <div class="order-header">
                <div class="order-info">
                    <h4>Order #${order.id}</h4>
                    <div class="order-date">Placed on ${formatDate(order.date)}</div>
                </div>
                <div class="order-actions">
                    <span class="order-status ${order.status}">${order.status}</span>
                    <a href="#" class="btn-outline" onclick="viewOrderDetails('${order.id}')">View Details</a>
                    ${order.status === 'delivered' ? '<a href="#" class="btn-outline">Reorder</a>' : ''}
                    ${order.status === 'processing' ? '<a href="#" class="btn-outline">Cancel</a>' : ''}
                </div>
            </div>
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item">
                        <div class="order-item-image">${item.image}</div>
                        <div class="order-item-details">
                            <div class="order-item-name">${item.name}</div>
                            <div class="order-item-quantity">Quantity: ${item.quantity}</div>
                        </div>
                        <div class="order-item-price">₱${item.price * item.quantity}</div>
                    </div>
                `).join('')}
            </div>
            <div class="order-summary">
                <div class="order-total">Total: ₱${order.total + order.shipping}</div>
                <div class="order-status ${order.status}">${getStatusText(order.status)}</div>
            </div>
        </div>
    `).join('');
    
    ordersList.innerHTML = ordersHTML;
    
    // Initialize order filters
    initializeOrderFilters();
}

function initializeOrderFilters() {
    const filterBtns = document.querySelectorAll('.order-filters .filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active filter
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            filterOrders(filter);
        });
    });
}

function filterOrders(filter) {
    const orderCards = document.querySelectorAll('.order-card');
    
    orderCards.forEach(card => {
        const status = card.dataset.status;
        
        if (filter === 'all' || status === filter) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// ==========================================
// Wishlist Section
// ==========================================

function loadWishlistSection() {
    const wishlistGrid = document.getElementById('wishlist-grid');
    if (!wishlistGrid) return;
    
    // Sample wishlist items
    const wishlistItems = SAMPLE_PRODUCTS.slice(0, 6);
    
    const wishlistHTML = wishlistItems.map(item => `
        <div class="product-card">
            <div class="product-image">
                ${item.image}
                <button class="remove-wishlist-btn" onclick="removeFromWishlist(${item.id})" title="Remove from wishlist">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div class="product-info">
                <h3 class="product-title">${item.name}</h3>
                <p class="product-description">${item.description}</p>
                <div class="product-price">
                    <span class="current-price">₱${item.price}</span>
                    ${item.originalPrice ? `<span class="original-price">₱${item.originalPrice}</span>` : ''}
                </div>
                <div class="product-actions">
                    <button class="btn-primary" onclick="addToCart(${item.id})">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
    
    wishlistGrid.innerHTML = wishlistHTML;
}

// ==========================================
// Profile Section
// ==========================================

function loadProfileSection() {
    const profileContainer = document.querySelector('.profile-form-container');
    if (!profileContainer) return;
    
    const profileHTML = `
        <div class="profile-form-card">
            <div class="profile-header">
                <div class="profile-avatar-section">
                    <img src="${DashboardState.user.avatar}" alt="Profile Avatar" class="profile-avatar-large">
                    <button class="change-avatar-btn">Change Photo</button>
                </div>
                <div class="profile-info">
                    <h2>${DashboardState.user.name}</h2>
                    <p>${DashboardState.user.email}</p>
                    <p class="member-since">Member since ${formatDate(DashboardState.user.joinDate)}</p>
                </div>
            </div>
            
            <form class="profile-form" id="profile-form">
                <div class="form-section">
                    <h3>Personal Information</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="first-name">First Name</label>
                            <input type="text" id="first-name" name="firstName" value="Juan" required>
                        </div>
                        <div class="form-group">
                            <label for="last-name">Last Name</label>
                            <input type="text" id="last-name" name="lastName" value="Dela Cruz" required>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="email">Email Address</label>
                            <input type="email" id="email" name="email" value="${DashboardState.user.email}" required>
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone Number</label>
                            <input type="tel" id="phone" name="phone" value="+63 912 345 6789">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="birthday">Birthday</label>
                        <input type="date" id="birthday" name="birthday" value="1990-01-15">
                    </div>
                </div>
                
                <div class="form-section">
                    <h3>Preferences</h3>
                    <div class="form-group checkbox-group">
                        <label class="checkbox-label">
                            <input type="checkbox" name="newsletter" checked>
                            <span class="checkmark"></span>
                            Subscribe to newsletter and promotional emails
                        </label>
                    </div>
                    
                    <div class="form-group checkbox-group">
                        <label class="checkbox-label">
                            <input type="checkbox" name="sms" checked>
                            <span class="checkmark"></span>
                            Receive SMS notifications for order updates
                        </label>
                    </div>
                    
                    <div class="form-group checkbox-group">
                        <label class="checkbox-label">
                            <input type="checkbox" name="recommendations">
                            <span class="checkmark"></span>
                            Get personalized product recommendations
                        </label>
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="button" class="btn-secondary">Cancel</button>
                    <button type="submit" class="btn-primary">Save Changes</button>
                </div>
            </form>
        </div>
    `;
    
    profileContainer.innerHTML = profileHTML;
    
    // Initialize profile form
    const profileForm = document.getElementById('profile-form');
    profileForm?.addEventListener('submit', handleProfileUpdate);
}

// ==========================================
// Notifications
// ==========================================

function loadNotifications() {
    const notificationList = document.getElementById('notification-list');
    if (!notificationList) return;
    
    const notificationsHTML = DashboardState.notifications.map(notification => `
        <div class="notification-item ${notification.read ? 'read' : 'unread'}">
            <div class="notification-icon ${notification.type}">
                ${getNotificationIcon(notification.type)}
            </div>
            <div class="notification-content">
                <div class="notification-title">${notification.title}</div>
                <div class="notification-text">${notification.message}</div>
                <div class="notification-time">${notification.time}</div>
            </div>
        </div>
    `).join('');
    
    notificationList.innerHTML = notificationsHTML;
}

function getNotificationIcon(type) {
    const icons = {
        order: '📦',
        promo: '🎉',
        system: '⚙️',
        delivery: '🚚',
        payment: '💳'
    };
    return icons[type] || '📢';
}

// ==========================================
// Event Handlers
// ==========================================

function initializeDashboardEvents() {
    // View all links
    document.querySelectorAll('.view-all-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            if (section) {
                navigateToSection(section);
            }
        });
    });
    
    // Quick action buttons are handled inline with onclick
}

function handleProfileUpdate(e) {
    e.preventDefault();
    
    // In a real app, this would send data to API
    showNotification('Profile updated successfully!');
}

function viewOrderDetails(orderId) {
    // In a real app, this would show detailed order modal or navigate to order page
    showNotification(`Viewing details for order ${orderId}`);
}

function removeFromWishlist(productId) {
    // In a real app, this would update the wishlist in backend
    showNotification('Item removed from wishlist');
    
    // Remove from UI
    const productCard = document.querySelector(`[data-id="${productId}"]`)?.closest('.product-card');
    if (productCard) {
        productCard.remove();
    }
}

// ==========================================
// Admin Functions (if user is admin)
// ==========================================

function loadAdminDashboard() {
    // Admin-specific functionality would go here
    console.log('Loading admin dashboard...');
}

// ==========================================
// Utility Functions
// ==========================================

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
}

function getStatusText(status) {
    const statusTexts = {
        pending: 'Order Pending',
        processing: 'Being Prepared',
        shipped: 'Out for Delivery',
        delivered: 'Delivered',
        cancelled: 'Cancelled'
    };
    return statusTexts[status] || status;
}

// ==========================================
// Logout Function
// ==========================================

function logout() {
    // Clear user data
    localStorage.removeItem('freshharvestph_cart');
    localStorage.removeItem('freshharvestph_user');
    
    // Show logout message
    showNotification('Logged out successfully!');
    
    // Redirect to homepage
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// Make functions available globally
window.logout = logout;
window.viewOrderDetails = viewOrderDetails;
window.removeFromWishlist = removeFromWishlist;

// ==========================================
// Initialize Dashboard on Load
// ==========================================

// Check if user is logged in (in a real app, this would check authentication)
function checkAuthentication() {
    // For demo purposes, we'll assume user is logged in
    // In a real app, this would check JWT token or session
    return true;
}

// Redirect to login if not authenticated
if (!checkAuthentication()) {
    window.location.href = 'index.html';
}

// ==========================================
// Update main script to handle login redirect
// ==========================================

// Override the login function in main script to redirect to dashboard
function handleDashboardLogin() {
    // Mock login process
    showNotification('Login successful! Redirecting to dashboard...');
    
    // Set user data
    localStorage.setItem('freshharvestph_user', JSON.stringify(DashboardState.user));
    
    // Redirect to dashboard
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1000);
}

// Replace the original login handler if we're on the main site
if (typeof handleLogin !== 'undefined') {
    handleLogin = handleDashboardLogin;
}

// ==========================================
// Additional Dashboard Features
// ==========================================

// Search functionality in dashboard
document.getElementById('dashboard-search')?.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    if (query.length > 0) {
        // In a real app, this would search orders, products, etc.
        console.log('Searching for:', query);
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Alt + D for Dashboard
    if (e.altKey && e.key === 'd') {
        e.preventDefault();
        navigateToSection('dashboard');
    }
    
    // Alt + O for Orders
    if (e.altKey && e.key === 'o') {
        e.preventDefault();
        navigateToSection('orders');
    }
    
    // Alt + P for Profile
    if (e.altKey && e.key === 'p') {
        e.preventDefault();
        navigateToSection('profile');
    }
    
    // Escape to close modals
    if (e.key === 'Escape') {
        document.getElementById('dashboard-sidebar')?.classList.remove('active');
        document.getElementById('notification-panel')?.classList.remove('active');
        document.getElementById('dashboard-overlay')?.classList.remove('active');
    }
});

console.log('🌱 Dashboard script loaded successfully!');