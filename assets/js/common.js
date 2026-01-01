/**
 * Common Utility Functions
 * Shared across all pages to eliminate code duplication
 */

// ==================== TOAST NOTIFICATION SYSTEM ====================
const Toast = {
    container: null,

    init() {
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'toast-container';
            this.container.className = 'toast-container';
            document.body.appendChild(this.container);
        }
    },

    show(message, type = 'info', duration = 3000) {
        this.init();

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };

        toast.innerHTML = `
            <span class="toast-icon">${icons[type] || icons.info}</span>
            <span class="toast-message">${message}</span>
            <button class="toast-close">×</button>
        `;

        this.container.appendChild(toast);

        // Trigger animation
        setTimeout(() => toast.classList.add('toast-show'), 10);

        // Close button handler
        toast.querySelector('.toast-close').addEventListener('click', () => {
            this.dismiss(toast);
        });

        // Auto dismiss
        setTimeout(() => this.dismiss(toast), duration);

        return toast;
    },

    dismiss(toast) {
        toast.classList.remove('toast-show');
        toast.classList.add('toast-hide');
        setTimeout(() => toast.remove(), 300);
    },

    success(message, duration) {
        return this.show(message, 'success', duration);
    },

    error(message, duration) {
        return this.show(message, 'error', duration);
    },

    warning(message, duration) {
        return this.show(message, 'warning', duration);
    },

    info(message, duration) {
        return this.show(message, 'info', duration);
    }
};

// ==================== CART BADGE MANAGEMENT ====================
function updateCartBadge() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let totalItems = 0;

    for (let i = 0; i < cartItems.length; i++) {
        totalItems += cartItems[i].quantity;
    }

    const cartBadge = document.getElementById('cart-badge');
    if (cartBadge) {
        if (totalItems > 0) {
            cartBadge.textContent = totalItems;
            cartBadge.classList.remove('hidden');
        } else {
            cartBadge.classList.add('hidden');
        }
    }
}

// ==================== NAVBAR SCROLL HANDLER ====================
function initNavbarScroll() {
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        const body = document.body;

        if (window.scrollY >= 40) {
            navbar.classList.add('scrolled');
            body.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
            body.classList.remove('scrolled');
        }
    });
}

// ==================== DARK MODE TOGGLE ====================
function initDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Load saved preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    if (isDarkMode) {
        body.classList.add('dark-mode');
        updateDarkModeIcon(true);
    } else {
        body.classList.remove('dark-mode');
        updateDarkModeIcon(false);
    }

    // Toggle handler
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function (e) {
            e.preventDefault();
            body.classList.toggle('dark-mode');
            const isNowDarkMode = body.classList.contains('dark-mode');
            updateDarkModeIcon(isNowDarkMode);
            localStorage.setItem('darkMode', isNowDarkMode);
        });
    }
}

function updateDarkModeIcon(isDark) {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (darkModeToggle) {
        if (isDark) {
            darkModeToggle.textContent = 'light_mode';
            darkModeToggle.title = 'Switch to light mode';
        } else {
            darkModeToggle.textContent = 'dark_mode';
            darkModeToggle.title = 'Switch to dark mode';
        }
    }
}

// ==================== NAVIGATION ICON HANDLERS ====================
function initNavIcons() {
    const cartIcon = document.querySelector('#cart-icon');
    const searchIcon = document.querySelector('#search-icon');

    if (cartIcon) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'cart1.html';
        });
    }

    if (searchIcon) {
        searchIcon.addEventListener('click', (e) => {
            e.preventDefault();
            // If on index page, scroll to products
            const productsSection = document.querySelector('#products');
            const searchBox = document.querySelector('.search-box');

            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setTimeout(() => {
                    if (searchBox && searchBox.classList.contains('hidden')) {
                        searchBox.classList.remove('hidden');
                    }
                    const searchInput = document.getElementById('product-search');
                    if (searchInput) {
                        setTimeout(() => searchInput.focus(), 100);
                    }
                }, 500);
            } else {
                // On other pages, redirect to home with products anchor
                window.location.href = 'index.html#products';
            }
        });
    }
}

// ==================== BACK TO TOP BUTTON ====================
function initBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');

    if (backToTopBtn) {
        backToTopBtn.classList.add('hidden');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.remove('hidden');
            } else {
                backToTopBtn.classList.add('hidden');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ==================== MOBILE HAMBURGER MENU ====================
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const navOverlay = document.querySelector('.nav-overlay');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            if (navOverlay) navOverlay.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking overlay
        if (navOverlay) {
            navOverlay.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        }

        // Close menu when clicking a nav link
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                if (navOverlay) navOverlay.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }
}

// ==================== LOADING SKELETON ====================
function showLoadingSkeleton(container, count = 8) {
    let skeletons = '';
    for (let i = 0; i < count; i++) {
        skeletons += `
            <div class="product-card skeleton-card">
                <div class="skeleton skeleton-image"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text-small"></div>
            </div>
        `;
    }
    container.innerHTML = skeletons;
}

function hideLoadingSkeleton(container) {
    const skeletons = container.querySelectorAll('.skeleton-card');
    skeletons.forEach(s => s.remove());
}

// ==================== NEWSLETTER SUBSCRIPTION ====================
function initNewsletter() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');

    newsletterForms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const emailInput = form.querySelector('.email-input, input[type="email"]');
            if (!emailInput) return;

            const email = emailInput.value.trim();

            if (!email) {
                Toast.error('Please enter your email address');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                Toast.error('Please enter a valid email address');
                return;
            }

            // Simulate subscription
            Toast.success('Thanks for subscribing! 🎉 Check your inbox for updates.');
            emailInput.value = '';
        });
    });
}

// ==================== INITIALIZATION ====================
function initCommon() {
    initNavbarScroll();
    initDarkMode();
    initNavIcons();
    initBackToTop();
    initMobileMenu();
    initUserMenu();
    initNewsletter();
    updateCartBadge();
}

// ==================== USER MENU HANDLER ====================
function initUserMenu() {
    const authBtns = document.querySelectorAll('.nav-auth-btn');

    authBtns.forEach(btn => {
        // Create container if not exists (for existing HTML structure compatibility)
        let container = btn.parentElement;
        if (!container.classList.contains('user-menu-container')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'user-menu-container';
            btn.parentNode.insertBefore(wrapper, btn);
            wrapper.appendChild(btn);
            container = wrapper;
        }

        // Create dropdown if not exists
        let dropdown = container.querySelector('.user-dropdown');
        if (!dropdown) {
            dropdown = document.createElement('div');
            dropdown.className = 'user-dropdown';
            container.appendChild(dropdown);
        }

        // Check auth state
        const userEmail = localStorage.getItem('userEmail'); // Simple check based on login_script.js
        const isLoggedIn = !!userEmail;

        // Populate dropdown
        if (isLoggedIn) {
            // Get username from email or separate storage if available
            const username = userEmail.split('@')[0];
            dropdown.innerHTML = `
                <div class="user-dropdown-header">Hello, ${username}</div>
                <ul>
                    <li><a href="profile.html"><span class="material-icons menu-icon">person</span>My Profile</a></li>
                    <li><a href="orders.html"><span class="material-icons menu-icon">shopping_bag</span>My Orders</a></li>
                    <li><a href="#" id="logout-btn"><span class="material-icons menu-icon">logout</span>Sign Out</a></li>
                </ul>
            `;

            // Handle Logout
            setTimeout(() => {
                const logoutBtn = dropdown.querySelector('#logout-btn');
                if (logoutBtn) {
                    logoutBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        localStorage.removeItem('userEmail');
                        localStorage.removeItem('userPassword'); // Clear everything
                        Toast.info('Signed out successfully');
                        setTimeout(() => window.location.reload(), 1000);
                    });
                }
            }, 0);

        } else {
            dropdown.innerHTML = `
                <div class="user-dropdown-header">Welcome</div>
                <ul>
                    <li><a href="login.html"><span class="material-icons menu-icon">login</span>Sign In</a></li>
                    <li><a href="sign-up.html"><span class="material-icons menu-icon">person_add</span>Register</a></li>
                </ul>
            `;
        }

        // Toggle behavior
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            // Close other open dropdowns
            document.querySelectorAll('.user-dropdown.show').forEach(d => {
                if (d !== dropdown) d.classList.remove('show');
            });

            dropdown.classList.toggle('show');
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.user-menu-container')) {
            document.querySelectorAll('.user-dropdown.show').forEach(d => {
                d.classList.remove('show');
            });
        }
    });
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initCommon);

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Toast,
        updateCartBadge,
        initNavbarScroll,
        initDarkMode,
        initNavIcons,
        initBackToTop,
        initMobileMenu,
        showLoadingSkeleton,
        hideLoadingSkeleton,
        initCommon
    };
}
