
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar')
    const body = document.body

    if (window.scrollY >= 40) {
        navbar.classList.add('scrolled');
        body.classList.add('scrolled');
    }
    else {
        navbar.classList.remove('scrolled');
        body.classList.remove('scrolled');
    }
})

// Cart functionality
document.addEventListener('DOMContentLoaded', function () {
    
    // Dynamic cart rendering from localStorage
    function renderCartItems() {
        var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        var cartContainer = document.querySelector('.cart-items-container');
        
        if (cartItems.length === 0) {
            cartContainer.innerHTML = '<div class="empty-cart"><p>Your cart is empty</p></div>';
            updateItemCount();
            updateCartSummary();
            return;
        }

        cartContainer.innerHTML = '';

        for (var i = 0; i < cartItems.length; i++) {
            var item = cartItems[i];
            var cartItemHTML = `
                <div class="cart-item-card" data-item-id="${item.id}" data-size="${item.size}" data-color="${item.color}">
                    <div class="cart-item-content">
                        <div class="product-image-container">
                            <img src="${item.image}" alt="${item.product}" class="product-image">
                        </div>
                        <div class="product-details">
                            <h3 class="product-name">${item.product}</h3>
                            <p class="product-description">${item.description} - Size: ${item.size}, Color: ${item.color}</p>
                            <div class="product-actions">
                                <button class="remove-item">
                                    <i class="zmdi zmdi-delete"></i> Remove
                                </button>
                                <button class="save-later">
                                    <i class="zmdi zmdi-favorite-outline"></i> Save for later
                                </button>
                            </div>
                        </div>
                        <div class="price-section">
                            <span class="price-label">Price</span>
                            <span class="price">$${item.price}</span>
                        </div>
                        <div class="quantity-section">
                            <span class="quantity-label">Quantity</span>
                            <div class="quantity-controls">
                                <button class="quantity-btn minus">-</button>
                                <input type="number" value="${item.quantity}" min="1" class="quantity-input">
                                <button class="quantity-btn plus">+</button>
                            </div>
                        </div>
                        <div class="total-section">
                            <span class="total-label">Total</span>
                            <span class="total-price">$${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            `;
            cartContainer.innerHTML += cartItemHTML;
        }

        updateItemCount();
        updateCartSummary();
    }

    // Event delegation for dynamically created elements
    document.querySelector('.cart-items-container').addEventListener('click', function(e) {
        if (e.target.classList.contains('quantity-btn') || e.target.closest('.quantity-btn')) {
            var button = e.target.classList.contains('quantity-btn') ? e.target : e.target.closest('.quantity-btn');
            var isPlus = button.classList.contains('plus');
            var isMinus = button.classList.contains('minus');
            var input = button.parentElement.querySelector('.quantity-input');
            var cartItem = button.closest('.cart-item-card');

            var currentValue = parseInt(input.value);

            if (isPlus) {
                currentValue++;
            } else if (isMinus && currentValue > 1) {
                currentValue--;
            }

            input.value = currentValue;
            updateItemTotal(cartItem);
            updateCartToLocalStorage(cartItem, currentValue);
            updateCartSummary();
        }

        if (e.target.classList.contains('remove-item') || e.target.closest('.remove-item')) {
            var cartItem = e.target.closest('.cart-item-card');
            cartItem.style.animation = 'fadeOut 0.3s ease';
            setTimeout(function() {
                removeItemFromLocalStorage(cartItem);
                cartItem.remove();
                updateCartSummary();
                updateItemCount();
            }, 300);
        }

        if (e.target.classList.contains('save-later') || e.target.closest('.save-later')) {
            var productName = e.target.closest('.cart-item-card').querySelector('.product-name').textContent;
            alert(productName + ' has been saved for later!');
        }
    });

    // Handle quantity input changes
    document.querySelector('.cart-items-container').addEventListener('change', function(e) {
        if (e.target.classList.contains('quantity-input')) {
            if (parseInt(e.target.value) < 1) {
                e.target.value = 1;
            }
            var cartItem = e.target.closest('.cart-item-card');
            updateItemTotal(cartItem);
            updateCartToLocalStorage(cartItem, parseInt(e.target.value));
            updateCartSummary();
        }
    });

    function updateCartToLocalStorage(cartItem, newQuantity) {
        var itemId = cartItem.getAttribute('data-item-id');
        var itemSize = cartItem.getAttribute('data-size');
        var itemColor = cartItem.getAttribute('data-color');
        var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Ensure proper type comparison - use loose equality for ID
        for (var i = 0; i < cartItems.length; i++) {
            if (cartItems[i].id == itemId && cartItems[i].size === itemSize && cartItems[i].color === itemColor) {
                cartItems[i].quantity = newQuantity;
                break;
            }
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    function removeItemFromLocalStorage(cartItem) {
        var itemId = cartItem.getAttribute('data-item-id');
        var itemSize = cartItem.getAttribute('data-size');
        var itemColor = cartItem.getAttribute('data-color');
        var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Ensure proper type comparison - convert itemId to match stored format
        cartItems = cartItems.filter(function(item) {
            return !(item.id == itemId && item.size === itemSize && item.color === itemColor);
        });

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        console.log('Item removed from localStorage. Remaining items:', cartItems.length);
    }

    function updateItemTotal(cartItem) {
        var priceElement = cartItem.querySelector('.price');
        var quantityInput = cartItem.querySelector('.quantity-input');
        var totalElement = cartItem.querySelector('.total-price');

        var price = parseFloat(priceElement.textContent.replace('$', ''));
        var quantity = parseInt(quantityInput.value);
        var total = price * quantity;

        totalElement.textContent = '$' + total.toFixed(2);
    }

    function updateCartSummary() {
        var cartItems = document.querySelectorAll('.cart-item-card');
        var subtotal = 0;

        cartItems.forEach(function(item) {
            var totalPrice = item.querySelector('.total-price').textContent;
            subtotal += parseFloat(totalPrice.replace('$', ''));
        });

        var subtotalElements = document.querySelectorAll('.totals-row .value');
        if (subtotalElements.length >= 2) {
            subtotalElements[0].textContent = '$' + subtotal.toFixed(2);
            subtotalElements[1].textContent = '$' + subtotal.toFixed(2);
        }
    }

    function updateItemCount() {
        var cartItems = document.querySelectorAll('.cart-item-card');
        var itemCountElement = document.querySelector('.item-count');
        var count = cartItems.length;
        itemCountElement.textContent = count + (count === 1 ? ' item' : ' items');
    }

    // Checkout functionality - show popup and clear cart
    document.querySelector('.btn-checkout').addEventListener('click', function() {
        var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        if (cartItems.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        var checkoutPopup = document.createElement('div');
        checkoutPopup.className = 'popup checkout-popup';
        
        var itemsHTML = '';
        var totalAmount = 0;
        
        for (var i = 0; i < cartItems.length; i++) {
            var item = cartItems[i];
            var itemTotal = item.price * item.quantity;
            totalAmount += itemTotal;
            
            itemsHTML += `
                <div class="checkout-item-card">
                    <div class="checkout-item-content">
                        <div class="checkout-product-image-container">
                            <img src="${item.image}" alt="${item.product}" class="checkout-product-image">
                        </div>
                        <div class="checkout-product-details">
                            <h4 class="checkout-product-name">${item.product}</h4>
                            <p class="checkout-product-specs">Size: ${item.size} | Color: ${item.color}</p>
                            <p class="checkout-product-calculation">Quantity: ${item.quantity} × $${item.price} = $${itemTotal.toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            `;
        }
        
        checkoutPopup.innerHTML = `
            <button class="close-btn">×</button>
            <div class="popup-content checkout-content">
                <div class="checkout-header">
                    <h2>Order Confirmation</h2>
                    <p class="checkout-subtitle">Please review your order details</p>
                </div>
                <div class="checkout-items-container">
                    ${itemsHTML}
                </div>
                <div class="checkout-summary">
                    <div class="checkout-total-row">
                        <span class="checkout-total-label">Total Amount:</span>
                        <span class="checkout-total-amount">$${totalAmount.toFixed(2)}</span>
                    </div>
                </div>
                <div class="checkout-actions">
                    <button class="confirm-order-btn">Confirm Order</button>
                    <button class="cancel-order-btn">Cancel</button>
                </div>
            </div>
        `;

        var overlay = document.createElement('div');
        overlay.className = 'overlay';

        document.body.appendChild(overlay);
        document.body.appendChild(checkoutPopup);

        // Close popup handlers
        checkoutPopup.querySelector('.close-btn').addEventListener('click', function() {
            checkoutPopup.remove();
            overlay.remove();
        });

        checkoutPopup.querySelector('.cancel-order-btn').addEventListener('click', function() {
            checkoutPopup.remove();
            overlay.remove();
        });

        overlay.addEventListener('click', function() {
            checkoutPopup.remove();
            overlay.remove();
        });

        // Confirm order handler - clear cart and show success
        checkoutPopup.querySelector('.confirm-order-btn').addEventListener('click', function() {
            localStorage.removeItem('cartItems');
            checkoutPopup.remove();
            overlay.remove();
            
            // Show success message and refresh cart
            alert('Order confirmed! Thank you for your purchase.');
            renderCartItems();
        });

        checkoutPopup.style.display = 'block';
        overlay.style.display = 'block';
    });

    // Initialize cart on page load
    renderCartItems();
});




// Dark Mode Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Check if dark mode preference is saved in localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';

    // Set initial state based on saved preference or current state
    if (isDarkMode) {
        body.classList.add('dark-mode');
        updateDarkModeIcon(true);
    } else {
        body.classList.remove('dark-mode');
        updateDarkModeIcon(false);
    }

    // Add click event listener to the dark mode toggle
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function(e) {
            e.preventDefault();

            // Toggle dark mode class on body
            body.classList.toggle('dark-mode');

            // Check if dark mode is now active
            const isNowDarkMode = body.classList.contains('dark-mode');

            // Update icon
            updateDarkModeIcon(isNowDarkMode);

            // Save preference to localStorage
            localStorage.setItem('darkMode', isNowDarkMode);
        });
    }

    // Function to update the dark mode icon
    function updateDarkModeIcon(isDark) {
        if (darkModeToggle) {
            if (isDark) {
                // Change to light mode icon for switching to light mode
                darkModeToggle.textContent = 'light_mode';
                darkModeToggle.title = 'Switch to light mode';
            } else {
                // Change to dark mode icon for switching to dark mode
                darkModeToggle.textContent = 'dark_mode';
                darkModeToggle.title = 'Switch to dark mode';
            }
        }
    }
});
