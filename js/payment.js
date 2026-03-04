// ===== PAYMENT PAGE SCRIPT =====

const API_URL = 'http://localhost:5000/api';

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== Payment Page Loaded ===');
    
    // Check if cart exists
    const cartData = localStorage.getItem('cart');
    console.log('Raw cart data:', cartData);
    
    if (!cartData) {
        console.warn('No cart data found in localStorage');
    }
    
    // Initialize all functions
    loadOrderSummary();
    setupPaymentEventListeners();
    updateCartCount();
    updatePaymentLoginButton();
    autoFillCustomerInfo();
});

function setupPaymentEventListeners() {
    console.log('Setting up payment event listeners');
    
    // Payment method change
    const paymentMethodRadios = document.querySelectorAll('input[name="paymentMethod"]');
    console.log('Found payment method radios:', paymentMethodRadios.length);
    
    paymentMethodRadios.forEach(radio => {
        radio.addEventListener('change', function(e) {
            console.log('Payment method changed to:', e.target.value);
            handlePaymentMethodChange(e);
        });
    });

    // Form submission
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', handlePaymentSubmit);
        console.log('Payment form listener attached');
    }

    // Cart button
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', toggleCart);
    }

    // Close cart button
    const closeCart = document.getElementById('closeCart');
    if (closeCart) {
        closeCart.addEventListener('click', toggleCart);
    }

    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
}

function loadOrderSummary() {
    console.log('=== Loading Order Summary ===');
    
    // Get cart from localStorage
    let cart = [];
    try {
        const cartData = localStorage.getItem('cart');
        cart = cartData ? JSON.parse(cartData) : [];
        console.log('Parsed cart:', cart);
    } catch (error) {
        console.error('Error parsing cart:', error);
        cart = [];
    }
    
    // Get DOM elements
    const orderItemsDiv = document.getElementById('paymentOrderItems');
    const subtotalSpan = document.getElementById('paymentSubtotal');
    const taxSpan = document.getElementById('paymentTax');
    const totalSpan = document.getElementById('paymentTotal');
    const finalTotalSpan = document.getElementById('finalTotal');

    console.log('DOM elements found:', {
        orderItemsDiv: !!orderItemsDiv,
        subtotalSpan: !!subtotalSpan,
        taxSpan: !!taxSpan,
        totalSpan: !!totalSpan,
        finalTotalSpan: !!finalTotalSpan
    });

    if (!orderItemsDiv) {
        console.error('paymentOrderItems element not found!');
        return;
    }

    // Check if cart is empty
    if (cart.length === 0) {
        console.warn('Cart is empty');
        orderItemsDiv.innerHTML = '<p class="empty-message" style="text-align: center; padding: 2rem; color: #666;">Your cart is empty. <a href="menu.html" style="color: #ff6b35; text-decoration: underline;">Browse Menu</a></p>';
        if (subtotalSpan) subtotalSpan.textContent = 'Rs. 0';
        if (taxSpan) taxSpan.textContent = 'Rs. 0';
        if (totalSpan) totalSpan.textContent = 'Rs. 0';
        if (finalTotalSpan) finalTotalSpan.textContent = 'Rs. 0';
        return;
    }

    console.log('Rendering', cart.length, 'items');

    // Display cart items with full details
    const itemsHTML = cart.map(item => {
        console.log('Rendering item:', item);
        return `
        <div class="payment-order-item" style="display: flex; justify-content: space-between; align-items: flex-start; padding: 1rem; border-bottom: 1px solid #f0f0f0; gap: 1rem;">
            <div class="item-details" style="display: flex; align-items: flex-start; gap: 1rem; flex: 1;">
                <span class="item-icon" style="font-size: 2rem; flex-shrink: 0;">${item.image || '🍕'}</span>
                <div class="item-info" style="flex: 1;">
                    <strong style="display: block; color: #1a1a1a; font-size: 1rem; margin-bottom: 0.5rem; font-weight: 600;">${item.name}</strong>
                    ${item.size ? `<p style="margin: 0.25rem 0; font-size: 0.875rem; color: #444; font-weight: 500;">Size: ${item.size}</p>` : ''}
                    ${item.crust ? `<p style="margin: 0.25rem 0; font-size: 0.875rem; color: #444; font-weight: 500;">Crust: ${item.crust}</p>` : ''}
                    ${item.toppings && item.toppings.length > 0 ? `<p style="margin: 0.25rem 0; font-size: 0.875rem; color: #ff6b35; font-style: italic;">Toppings: ${item.toppings.join(', ')}</p>` : ''}
                </div>
            </div>
            <div class="item-pricing" style="display: flex; flex-direction: column; align-items: flex-end; gap: 0.25rem;">
                <span class="item-quantity" style="font-size: 0.875rem; color: #666;">Qty: ${item.quantity}</span>
                <span class="item-price" style="font-size: 1rem; font-weight: 700; color: #ff6b35;">Rs. ${(item.price * item.quantity).toFixed(0)}</span>
            </div>
        </div>
    `;
    }).join('');

    orderItemsDiv.innerHTML = itemsHTML;
    console.log('Items rendered successfully');

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 150;
    const tax = subtotal * 0.05;
    const total = subtotal + deliveryFee + tax;

    console.log('Calculated totals:', { subtotal, deliveryFee, tax, total });

    // Update totals
    if (subtotalSpan) subtotalSpan.textContent = `Rs. ${subtotal.toFixed(0)}`;
    if (taxSpan) taxSpan.textContent = `Rs. ${tax.toFixed(0)}`;
    if (totalSpan) totalSpan.textContent = `Rs. ${total.toFixed(0)}`;
    if (finalTotalSpan) finalTotalSpan.textContent = `Rs. ${total.toFixed(0)}`;
    
    console.log('=== Order Summary Loaded Successfully ===');
}

function handlePaymentMethodChange(e) {
    const method = e.target.value;
    console.log('=== Payment Method Changed ===');
    console.log('Selected method:', method);
    
    const paymentDetails = document.getElementById('paymentDetails');
    const cardDetails = document.getElementById('cardDetails');
    const walletDetails = document.getElementById('walletDetails');
    const bankDetails = document.getElementById('bankDetails');

    console.log('Payment detail elements:', {
        paymentDetails: !!paymentDetails,
        cardDetails: !!cardDetails,
        walletDetails: !!walletDetails,
        bankDetails: !!bankDetails
    });

    if (!paymentDetails || !cardDetails || !walletDetails || !bankDetails) {
        console.error('Some payment detail elements not found!');
        return;
    }

    // Hide all details first
    console.log('Hiding all payment details');
    cardDetails.style.display = 'none';
    walletDetails.style.display = 'none';
    bankDetails.style.display = 'none';
    paymentDetails.style.display = 'none';

    // Show relevant details based on method
    if (method === 'card') {
        console.log('Showing card details');
        paymentDetails.style.display = 'block';
        cardDetails.style.display = 'block';
    } else if (method === 'wallet') {
        console.log('Showing wallet details');
        paymentDetails.style.display = 'block';
        walletDetails.style.display = 'block';
    } else if (method === 'bank') {
        console.log('Showing bank details');
        paymentDetails.style.display = 'block';
        bankDetails.style.display = 'block';
    } else {
        console.log('COD selected - no additional details needed');
    }
}

function handlePaymentSubmit(e) {
    e.preventDefault();
    console.log('=== Form Submitted ===');

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        showToast('Your cart is empty!');
        return;
    }

    const formData = new FormData(e.target);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 150;
    const tax = subtotal * 0.05;
    const total = subtotal + deliveryFee + tax;

    const orderData = {
        userInfo: {
            fullName: formData.get('fullName'),
            phone: formData.get('phone'),
            email: formData.get('email')
        },
        deliveryAddress: formData.get('address'),
        items: cart.map(item => ({
            productId: item.productId || 'deal',
            name: item.name,
            size: item.size || 'N/A',
            crust: item.crust || 'N/A',
            toppings: item.toppings || [],
            price: item.price,
            quantity: item.quantity
        })),
        paymentMethod: formData.get('paymentMethod'),
        totalPrice: total
    };

    console.log('Order data:', orderData);
    showToast('Processing your order...');

    // Simulate order placement (in production, this would be an API call)
    setTimeout(() => {
        showOrderConfirmation(generateOrderId(), total, formData.get('paymentMethod'));
        localStorage.setItem('cart', JSON.stringify([]));
    }, 1000);
}

function showOrderConfirmation(orderId, total, paymentMethod) {
    const modal = document.getElementById('confirmationModal');
    document.getElementById('orderId').textContent = orderId;
    document.getElementById('confirmedTotal').textContent = `Rs. ${total.toFixed(0)}`;
    
    const paymentNames = {
        'cod': 'Cash on Delivery',
        'wallet': 'Online Wallet',
        'card': 'Credit/Debit Card',
        'bank': 'Bank Transfer'
    };
    
    document.getElementById('confirmedPayment').textContent = paymentNames[paymentMethod] || paymentMethod;
    modal.classList.add('active');
}

function generateOrderId() {
    return 'HP' + Date.now().toString().slice(-8);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}

function updatePaymentLoginButton() {
    const loginBtn = document.getElementById('loginBtn');
    const loginText = loginBtn?.querySelector('.login-text');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (loginBtn && loginText) {
        if (currentUser) {
            loginText.textContent = currentUser.phone.substring(0, 10) + '...';
            loginBtn.onclick = showUserMenu;
        } else {
            loginText.textContent = 'Login';
            loginBtn.onclick = openLoginModal;
        }
    }
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
        cartSidebar.classList.toggle('active');
        updateCartSidebar();
    }
}

function updateCartSidebar() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (!cartItems || !cartTotal || !checkoutBtn) return;
    
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        checkoutBtn.disabled = true;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.image || '🍕'}</div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-options">
                        ${item.size ? item.size : ''} ${item.crust ? '| ' + item.crust : ''}
                        ${item.toppings && item.toppings.length > 0 ? `<br>+ ${item.toppings.join(', ')}` : ''}
                    </div>
                    <div class="cart-item-controls">
                        <button class="qty-btn" onclick="updateQuantityPayment(${item.id}, -1)">-</button>
                        <span class="cart-item-quantity">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantityPayment(${item.id}, 1)">+</button>
                        <span class="cart-item-price">Rs. ${(item.price * item.quantity).toFixed(0)}</span>
                    </div>
                    <button class="remove-item" onclick="removeFromCartPayment(${item.id})">Remove</button>
                </div>
            </div>
        `).join('');
        checkoutBtn.disabled = false;
    }
    
    cartTotal.textContent = `Rs. ${totalPrice.toFixed(0)}`;
}

function updateQuantityPayment(itemId, change) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(i => i.id === itemId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCartPayment(itemId);
        return;
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartSidebar();
    updateCartCount();
    loadOrderSummary();
}

function removeFromCartPayment(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartSidebar();
    updateCartCount();
    loadOrderSummary();
    showToast('Item removed from cart');
}

function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.getElementById('hamburger');
    if (navLinks) navLinks.classList.toggle('active');
    if (hamburger) hamburger.classList.toggle('active');
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
}

function autoFillCustomerInfo() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser) {
        const phoneInput = document.querySelector('input[name="phone"]');
        if (phoneInput) {
            phoneInput.value = currentUser.phone;
        }
        
        if (currentUser.address) {
            const addressInput = document.querySelector('textarea[name="address"]');
            if (addressInput) {
                addressInput.value = currentUser.address || '';
            }
        }
    }
}

// Toggle wallet options
function toggleWalletOptions() {
    const walletOptions = document.getElementById('walletOptions');
    const walletRadio = document.getElementById('walletRadio');
    const walletArrow = document.querySelector('.wallet-arrow');
    
    walletRadio.checked = true;
    
    if (walletOptions.style.display === 'none' || walletOptions.style.display === '') {
        walletOptions.style.display = 'block';
        if (walletArrow) walletArrow.textContent = '▲';
    } else {
        walletOptions.style.display = 'none';
        if (walletArrow) walletArrow.textContent = '▼';
    }
    
    handlePaymentMethodChange({ target: { value: 'wallet' } });
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

console.log('Payment.js loaded successfully');
