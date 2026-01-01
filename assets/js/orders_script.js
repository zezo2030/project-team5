/**
 * Orders Page Script
 * Logic for orders.html
 */

document.addEventListener('DOMContentLoaded', function () {
    // Check auth
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
        window.location.href = 'login.html';
        return;
    }

    const ordersList = document.getElementById('ordersList');

    // Get all orders from storage
    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];

    // Filter orders for current user
    const userOrders = allOrders.filter(order => order.userEmail === userEmail).sort((a, b) => new Date(b.date) - new Date(a.date));

    if (userOrders.length === 0) {
        ordersList.innerHTML = `
            <div class="empty-orders">
                <i class="zmdi zmdi-shopping-basket"></i>
                <h3>No orders yet</h3>
                <p>Looks like you haven't placed any orders yet.</p>
                <a href="index.html#products" class="btn-save" style="display:inline-block; margin-top:20px; text-decoration:none;">Start Shopping</a>
            </div>
        `;
        return;
    }

    // Render Orders
    userOrders.forEach(order => {
        const orderDate = new Date(order.date).toLocaleDateString();
        const itemCount = order.items.reduce((acc, item) => acc + item.quantity, 0);

        // Generate Items Preview HTML (max 3 items)
        let itemsHtml = '';
        order.items.slice(0, 3).forEach(item => {
            itemsHtml += `
                <div class="order-item">
                    <img src="${item.image}" alt="${item.product}">
                    <div class="order-item-details">
                        <h4>${item.product}</h4>
                        <p>Size: ${item.size} | Qty: ${item.quantity}</p>
                    </div>
                </div>
            `;
        });

        if (order.items.length > 3) {
            itemsHtml += `<p style="margin-left:75px; color:var(--text-muted); font-size:13px;">+${order.items.length - 3} more items...</p>`;
        }

        const orderCard = `
            <div class="order-card">
                <div class="order-header">
                    <div class="order-id">Order #${order.id}</div>
                    <div class="order-meta">
                        <span>${orderDate}</span>
                        <span style="margin:0 10px;">•</span>
                        <span class="order-status status-processing">${order.status}</span>
                    </div>
                </div>
                <div class="order-content">
                    <div class="order-items-preview">
                        ${itemsHtml}
                    </div>
                    <div class="order-summary">
                        <span class="total-label">Total Amount</span>
                        <p class="total-amount">$${order.total.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        `;

        ordersList.innerHTML += orderCard;
    });
});
