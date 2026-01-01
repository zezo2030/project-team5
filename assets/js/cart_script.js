/**
 * Cart Page Script
 * Uses common.js for shared functionality
 */

document.addEventListener('DOMContentLoaded', function () {

    function renderCartItems() {
        var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        var cartContainer = document.querySelector('.cart-items-container');

        if (cartItems.length === 0) {
            cartContainer.innerHTML = `
                <div class="empty-cart">
                    <div class="empty-cart-icon">🛒</div>
                    <p>Your cart is empty</p>
                    <a href="index.html#products" class="btn-shop-now">Start Shopping</a>
                </div>
            `;
            localStorage.removeItem('couponDiscount');
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
                            <p class="product-description">Size: ${item.size} | Color: ${item.color}</p>
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
        updateCartBadge();
    }


    document.querySelector('.cart-items-container').addEventListener('click', function (e) {
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
            updateCartBadge();
        }

        if (e.target.classList.contains('remove-item') || e.target.closest('.remove-item')) {
            var cartItem = e.target.closest('.cart-item-card');
            var productName = cartItem.querySelector('.product-name').textContent;

            cartItem.style.animation = 'fadeOut 0.3s ease';
            setTimeout(function () {
                removeItemFromLocalStorage(cartItem);
                cartItem.remove();
                updateCartSummary();
                updateItemCount();
                updateCartBadge();
                Toast.info(productName + ' removed from cart');

                // Check if cart is empty
                var remainingItems = document.querySelectorAll('.cart-item-card');
                if (remainingItems.length === 0) {
                    renderCartItems();
                }
            }, 300);
        }

        if (e.target.classList.contains('save-later') || e.target.closest('.save-later')) {
            var productName = e.target.closest('.cart-item-card').querySelector('.product-name').textContent;
            Toast.success(productName + ' saved for later!');
        }
    });


    document.querySelector('.cart-items-container').addEventListener('change', function (e) {
        if (e.target.classList.contains('quantity-input')) {
            if (parseInt(e.target.value) < 1) {
                e.target.value = 1;
            }
            var cartItem = e.target.closest('.cart-item-card');
            updateItemTotal(cartItem);
            updateCartToLocalStorage(cartItem, parseInt(e.target.value));
            updateCartSummary();
            updateCartBadge();
        }
    });

    function updateCartToLocalStorage(cartItem, newQuantity) {
        var itemId = cartItem.getAttribute('data-item-id');
        var itemSize = cartItem.getAttribute('data-size');
        var itemColor = cartItem.getAttribute('data-color');
        var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];


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


        cartItems = cartItems.filter(function (item) {
            return !(item.id == itemId && item.size === itemSize && item.color === itemColor);
        });

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
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

        cartItems.forEach(function (item) {
            var totalPrice = item.querySelector('.total-price').textContent;
            subtotal += parseFloat(totalPrice.replace('$', ''));
        });


        if (subtotal === 0) {
            localStorage.removeItem('couponDiscount');
        }


        var couponDiscount = localStorage.getItem('couponDiscount') || '0';
        var discountAmount = parseFloat(couponDiscount);


        if (discountAmount > 0 && subtotal > 0) {
            discountAmount = subtotal * 0.20;
            localStorage.setItem('couponDiscount', discountAmount.toString());
        }

        var finalTotal = subtotal - discountAmount;

        var subtotalElements = document.querySelectorAll('.totals-row .value');
        if (subtotalElements.length >= 2) {
            subtotalElements[0].textContent = '$' + subtotal.toFixed(2);
            subtotalElements[1].textContent = '$' + finalTotal.toFixed(2);
        }

        updateDiscountDisplay(discountAmount);
    }

    function updateDiscountDisplay(discountAmount) {
        var existingDiscountRow = document.querySelector('.discount-row');

        if (discountAmount > 0) {
            if (!existingDiscountRow) {
                var totalRow = document.querySelector('.total-row');
                var discountRow = document.createElement('div');
                discountRow.className = 'totals-row discount-row';
                discountRow.innerHTML = `
                    <span class="label">Coupon Discount:</span>
                    <span class="value discount-value">-$${discountAmount.toFixed(2)}</span>
                `;
                totalRow.parentNode.insertBefore(discountRow, totalRow);
            } else {
                existingDiscountRow.querySelector('.discount-value').textContent = '-$' + discountAmount.toFixed(2);
            }
        } else {
            if (existingDiscountRow) {
                existingDiscountRow.remove();
            }
        }
    }

    function updateItemCount() {
        var cartItems = document.querySelectorAll('.cart-item-card');
        var itemCountElement = document.querySelector('.item-count');
        var count = cartItems.length;
        if (itemCountElement) {
            itemCountElement.textContent = count + (count === 1 ? ' item' : ' items');
        }
    }


    document.querySelector('.btn-checkout').addEventListener('click', function () {
        var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        if (cartItems.length === 0) {
            Toast.warning('Your cart is empty!');
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


        var couponDiscount = localStorage.getItem('couponDiscount') || '0';
        var discountAmount = parseFloat(couponDiscount);
        var finalTotal = totalAmount - discountAmount;

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
                        <span class="checkout-total-label">Subtotal:</span>
                        <span class="checkout-total-amount">$${totalAmount.toFixed(2)}</span>
                    </div>
                    ${discountAmount > 0 ? `
                    <div class="checkout-discount-row">
                        <span class="checkout-discount-label">Coupon Discount:</span>
                        <span class="checkout-discount-amount">-$${discountAmount.toFixed(2)}</span>
                    </div>` : ''}
                    <div class="checkout-total-row final-total">
                        <span class="checkout-total-label">Total Amount:</span>
                        <span class="checkout-total-amount">$${finalTotal.toFixed(2)}</span>
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

        checkoutPopup.querySelector('.close-btn').addEventListener('click', function () {
            checkoutPopup.remove();
            overlay.remove();
        });

        checkoutPopup.querySelector('.cancel-order-btn').addEventListener('click', function () {
            checkoutPopup.remove();
            overlay.remove();
        });

        overlay.addEventListener('click', function () {
            checkoutPopup.remove();
            overlay.remove();
        });


        checkoutPopup.querySelector('.confirm-order-btn').addEventListener('click', function () {

            // SAVE ORDER LOGIC
            const userEmail = localStorage.getItem('userEmail');
            if (userEmail) {
                const order = {
                    id: Date.now().toString().slice(-6), // Simple Short ID
                    date: new Date().toISOString(),
                    userEmail: userEmail,
                    items: cartItems,
                    total: finalTotal,
                    status: 'Processing'
                };

                const orders = JSON.parse(localStorage.getItem('orders')) || [];
                orders.push(order);
                localStorage.setItem('orders', JSON.stringify(orders));
            }

            localStorage.removeItem('cartItems');
            localStorage.removeItem('couponDiscount');
            checkoutPopup.remove();
            overlay.remove();


            var subtotalElements = document.querySelectorAll('.totals-row .value');
            if (subtotalElements.length >= 2) {
                subtotalElements[0].textContent = '$0.00';
                subtotalElements[1].textContent = '$0.00';
            }


            var existingDiscountRow = document.querySelector('.discount-row');
            if (existingDiscountRow) {
                existingDiscountRow.remove();
            }

            if (userEmail) {
                Toast.success('Order confirmed! View it in "My Orders". 🎉');
            } else {
                Toast.success('Order confirmed! Thank you for your purchase. 🎉');
            }

            renderCartItems();
            updateCartBadge();
        });

        checkoutPopup.style.display = 'block';
        overlay.style.display = 'block';
    });


    document.querySelector('.btn-apply-coupon').addEventListener('click', function () {
        var couponInput = document.querySelector('.coupon-input');
        var couponCode = couponInput.value.trim().toLowerCase();

        if (couponCode === 'omnia_iti') {

            var cartItems = document.querySelectorAll('.cart-item-card');
            var subtotal = 0;

            cartItems.forEach(function (item) {
                var totalPrice = item.querySelector('.total-price').textContent;
                subtotal += parseFloat(totalPrice.replace('$', ''));
            });

            if (subtotal === 0) {
                Toast.warning('Add items to your cart first!');
                return;
            }

            var discountAmount = subtotal * 0.20;
            localStorage.setItem('couponDiscount', discountAmount.toString());

            Toast.success('Coupon applied! You saved $' + discountAmount.toFixed(2) + ' 🎉');
            updateCartSummary();
            couponInput.value = '';
        } else if (couponCode === '') {
            localStorage.removeItem('couponDiscount');
            updateCartSummary();
            Toast.info('Coupon removed');
        } else {
            Toast.error('Invalid coupon code. Try "omnia_iti" for 20% off!');
        }
    });


    renderCartItems();
    updateCartBadge();
});


// Add fadeOut animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(-20px); }
    }
`;
document.head.appendChild(style);
