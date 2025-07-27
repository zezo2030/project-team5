
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
    // Quantity controls
    const quantityButtons = document.querySelectorAll('.quantity-btn');
    const quantityInputs = document.querySelectorAll('.quantity-input');

    quantityButtons.forEach(button => {
        button.addEventListener('click', function () {
            const isPlus = button.classList.contains('plus');
            const isMinus = button.classList.contains('minus');
            const input = button.parentElement.querySelector('.quantity-input');
            const cartItem = button.closest('.cart-item-card');

            let currentValue = parseInt(input.value);

            if (isPlus) {
                currentValue++;
            } else if (isMinus && currentValue > 1) {
                currentValue--;
            }

            input.value = currentValue;
            updateItemTotal(cartItem);
            updateCartSummary();
        });
    });

    // Update quantity on input change
    quantityInputs.forEach(input => {
        input.addEventListener('change', function () {
            if (parseInt(this.value) < 1) {
                this.value = 1;
            }
            const cartItem = this.closest('.cart-item-card');
            updateItemTotal(cartItem);
            updateCartSummary();
        });
    });

    // Remove item functionality
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const cartItem = button.closest('.cart-item-card');
            cartItem.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                cartItem.remove();
                updateCartSummary();
                updateItemCount();
            }, 300);
        });
    });

    // Save for later functionality
    const saveButtons = document.querySelectorAll('.save-later');
    saveButtons.forEach(button => {
        button.addEventListener('click', function () {
            const productName = this.closest('.cart-item-card').querySelector('.product-name').textContent;
            alert(`${productName} has been saved for later!`);
        });
    });

    function updateItemTotal(cartItem) {
        const priceElement = cartItem.querySelector('.price');
        const quantityInput = cartItem.querySelector('.quantity-input');
        const totalElement = cartItem.querySelector('.total-price');

        const price = parseFloat(priceElement.textContent.replace('$', ''));
        const quantity = parseInt(quantityInput.value);
        const total = price * quantity;

        totalElement.textContent = '$' + total.toFixed(2);
    }

    function updateCartSummary() {
        const cartItems = document.querySelectorAll('.cart-item-card');
        let subtotal = 0;

        cartItems.forEach(item => {
            const totalPrice = item.querySelector('.total-price').textContent;
            subtotal += parseFloat(totalPrice.replace('$', ''));
        });

        // Update subtotal and total in cart totals section
        const subtotalElements = document.querySelectorAll('.totals-row .value');
        if (subtotalElements.length >= 2) {
            subtotalElements[0].textContent = '$' + subtotal.toFixed(2);
            subtotalElements[1].textContent = '$' + subtotal.toFixed(2);
        }
    }

    function updateItemCount() {
        const cartItems = document.querySelectorAll('.cart-item-card');
        const itemCountElement = document.querySelector('.item-count');
        const count = cartItems.length;
        itemCountElement.textContent = count + (count === 1 ? ' item' : ' items');
    }

    // Initialize totals
    updateCartSummary();
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
