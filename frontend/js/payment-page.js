/**
 * PAYMENT PAGE JAVASCRIPT
 * Handles all payment page functionality
 */

(function() {
    'use strict';

    const API_URL = 'http://localhost:5000/api';

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        console.log('Payment page initializing...');
        
        // Load order summary
        loadOrderSummary();
        
        // Setup event listeners
        setupEventListeners();
        
        // Update cart count in header
        updateCartCount();
        
        // Update login button
        updateLoginButton();
        
        // Auto-fill customer info if logged in
        autoFillCustomerInfo();
        
        console.log('Payment page initialized successfully');
    }

    function setupEventListeners() {
        // Payment method radio buttons
        const paymentRadios = document.querySelectorAll('input[name="paymentMethod"]');
        paymentRadios.forEach(radio => {
            radio.addEventListener('change', handlePaymentMethodChange);
        });

        // Payment form submission
        const paymentForm = document.getElementById('paymentForm');
        if (paymentForm) {
            paymentForm.addEventListener('submit', handleFormSubmit);
        }

        // Cart button
        const cartBtn = document.getElementById('cartBtn');
        if (cartBtn) {
            cartBtn.addEventListener('click', toggleCart);
        }

        // Close cart
        const closeCart = document.getElementById('closeCart');
        if (closeCart) {
            closeCart.addEventListener('click', toggleCart);
        }

        // Hamburger menu
        const hamburger = document.getElementById('hamburger');
        if (hamburger) {
            hamburger.addEventListener('click', toggleMobileMenu);
        }

        // Wallet toggle
        window.toggleWalletOptions = toggleWalletOptions;

        // Card input formatting and validation
        setupCardInputs();

        // Wallet sub-option listeners
        setupWalletOptions();
    }

    function setupWalletOptions() {
        const walletSubOptions = document.querySelectorAll('input[name="walletType"]');
        walletSubOptions.forEach(radio => {
            radio.addEventListener('change', function() {
                console.log('Wallet type selected:', this.value);
                // Ensure wallet payment method is selected
                const walletRadio = document.getElementById('walletRadio');
                if (walletRadio) {
                    walletRadio.checked = true;
                }
                // Show wallet details
                handlePaymentMethodChange({ target: { value: 'wallet' } });
            });
        });
    }

    function setupCardInputs() {
        // Card number formatting
        const cardNumberInput = document.getElementById('cardNumber');
        if (cardNumberInput) {
            // Remove required attribute - we'll validate manually
            cardNumberInput.removeAttribute('required');
            
            cardNumberInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\s/g, '');
                let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
                e.target.value = formattedValue;

                // Real-time validation
                const errorMsg = document.getElementById('cardNumberError');
                if (value.length === 16) {
                    if (validateCardNumber(value)) {
                        errorMsg.style.display = 'none';
                        e.target.style.borderColor = '#27ae60';
                    } else {
                        errorMsg.textContent = 'Invalid card number';
                        errorMsg.style.display = 'block';
                        e.target.style.borderColor = '#e74c3c';
                    }
                } else if (value.length > 0) {
                    errorMsg.textContent = 'Card number must be 16 digits';
                    errorMsg.style.display = 'block';
                    e.target.style.borderColor = '#e0e0e0';
                } else {
                    errorMsg.style.display = 'none';
                    e.target.style.borderColor = '#e0e0e0';
                }
            });

            // Only allow numbers
            cardNumberInput.addEventListener('keypress', function(e) {
                if (!/\d/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
                    e.preventDefault();
                }
            });
        }

        // Expiry date formatting
        const cardExpiryInput = document.getElementById('cardExpiry');
        if (cardExpiryInput) {
            // Remove required attribute - we'll validate manually
            cardExpiryInput.removeAttribute('required');
            
            cardExpiryInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value.length >= 2) {
                    value = value.substring(0, 2) + '/' + value.substring(2, 4);
                }
                
                e.target.value = value;

                // Real-time validation
                const errorMsg = document.getElementById('cardExpiryError');
                if (value.length === 5) {
                    if (validateExpiryDate(value)) {
                        errorMsg.style.display = 'none';
                        e.target.style.borderColor = '#27ae60';
                    } else {
                        errorMsg.textContent = 'Invalid or expired date';
                        errorMsg.style.display = 'block';
                        e.target.style.borderColor = '#e74c3c';
                    }
                } else if (value.length > 0) {
                    errorMsg.textContent = 'Format: MM/YY';
                    errorMsg.style.display = 'block';
                    e.target.style.borderColor = '#e0e0e0';
                } else {
                    errorMsg.style.display = 'none';
                    e.target.style.borderColor = '#e0e0e0';
                }
            });

            // Only allow numbers and slash
            cardExpiryInput.addEventListener('keypress', function(e) {
                if (!/[\d/]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
                    e.preventDefault();
                }
            });
        }

        // CVV validation
        const cardCVVInput = document.getElementById('cardCVV');
        if (cardCVVInput) {
            // Remove required attribute - we'll validate manually
            cardCVVInput.removeAttribute('required');
            
            cardCVVInput.addEventListener('input', function(e) {
                const value = e.target.value;
                const errorMsg = document.getElementById('cardCVVError');
                
                if (value.length >= 3) {
                    if (validateCVV(value)) {
                        errorMsg.style.display = 'none';
                        e.target.style.borderColor = '#27ae60';
                    } else {
                        errorMsg.textContent = 'CVV must be 3-4 digits';
                        errorMsg.style.display = 'block';
                        e.target.style.borderColor = '#e74c3c';
                    }
                } else if (value.length > 0) {
                    errorMsg.textContent = 'CVV must be 3-4 digits';
                    errorMsg.style.display = 'block';
                    e.target.style.borderColor = '#e0e0e0';
                } else {
                    errorMsg.style.display = 'none';
                    e.target.style.borderColor = '#e0e0e0';
                }
            });

            // Only allow numbers
            cardCVVInput.addEventListener('keypress', function(e) {
                if (!/\d/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
                    e.preventDefault();
                }
            });
        }

        // Wallet mobile number formatting
        setupWalletMobileInput();
    }

    function setupWalletMobileInput() {
        const walletMobileInput = document.getElementById('walletMobile');
        if (!walletMobileInput) return;

        // Remove required attribute - we'll validate manually
        walletMobileInput.removeAttribute('required');

        // Set initial value with country code
        if (!walletMobileInput.value) {
            walletMobileInput.value = '+92 ';
        }

        walletMobileInput.addEventListener('focus', function() {
            if (!this.value || this.value === '+92') {
                this.value = '+92 ';
            }
        });

        walletMobileInput.addEventListener('input', function(e) {
            let value = e.target.value;

            // Ensure it always starts with +92
            if (!value.startsWith('+92')) {
                value = '+92 ' + value.replace(/^\+92\s*/, '');
            }

            // Remove all non-digits except the + at the start
            const cleaned = value.substring(3).replace(/\D/g, '');

            // Format as +92 XXX XXXXXXX
            let formatted = '+92 ';
            if (cleaned.length > 0) {
                formatted += cleaned.substring(0, 3);
                if (cleaned.length > 3) {
                    formatted += ' ' + cleaned.substring(3, 10);
                }
            }

            e.target.value = formatted;
        });

        // Only allow numbers after +92
        walletMobileInput.addEventListener('keypress', function(e) {
            const cursorPosition = this.selectionStart;
            // Don't allow editing before "+92 "
            if (cursorPosition < 4) {
                e.preventDefault();
                return;
            }
            // Only allow digits
            if (!/\d/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
                e.preventDefault();
            }
        });

        // Prevent deleting the country code
        walletMobileInput.addEventListener('keydown', function(e) {
            const cursorPosition = this.selectionStart;
            if ((e.key === 'Backspace' || e.key === 'Delete') && cursorPosition <= 4) {
                e.preventDefault();
            }
        });
    }

    function loadOrderSummary() {
        console.log('Loading order summary...');
        
        // Get cart from localStorage
        const cart = getCart();
        console.log('Cart items:', cart);

        // Get DOM elements
        const orderItemsDiv = document.getElementById('paymentOrderItems');
        const subtotalSpan = document.getElementById('paymentSubtotal');
        const taxSpan = document.getElementById('paymentTax');
        const totalSpan = document.getElementById('paymentTotal');
        const finalTotalSpan = document.getElementById('finalTotal');

        if (!orderItemsDiv) {
            console.error('Order items container not found');
            return;
        }

        // Check if cart is empty
        if (cart.length === 0) {
            orderItemsDiv.innerHTML = `
                <div class="empty-message">
                    <p>Your cart is empty.</p>
                    <p><a href="menu.html">Browse Menu</a> or <a href="deals.html">View Deals</a></p>
                </div>
            `;
            updateTotals(0, 0, 0, 0);
            return;
        }

        // Render cart items
        orderItemsDiv.innerHTML = cart.map(item => `
            <div class="payment-order-item">
                <div class="item-details">
                    <span class="item-icon">${item.image || '🍕'}</span>
                    <div class="item-info">
                        <strong>${item.name}</strong>
                        ${item.size ? `<p class="item-size">Size: ${item.size}</p>` : ''}
                        ${item.crust ? `<p class="item-crust">Crust: ${item.crust}</p>` : ''}
                        ${item.toppings && item.toppings.length > 0 ? 
                            `<p class="item-toppings">Toppings: ${item.toppings.join(', ')}</p>` : ''}
                    </div>
                </div>
                <div class="item-pricing">
                    <span class="item-quantity">Qty: ${item.quantity}</span>
                    <span class="item-price">Rs. ${formatPrice(item.price * item.quantity)}</span>
                </div>
            </div>
        `).join('');

        // Calculate and update totals
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const deliveryFee = 150;
        const discount = subtotal * 0.05;
        const total = subtotal + deliveryFee - discount;

        updateTotals(subtotal, deliveryFee, discount, total);
        
        console.log('Order summary loaded successfully');
    }

    function updateTotals(subtotal, deliveryFee, discount, total) {
        const subtotalSpan = document.getElementById('paymentSubtotal');
        const taxSpan = document.getElementById('paymentTax');
        const totalSpan = document.getElementById('paymentTotal');
        const finalTotalSpan = document.getElementById('finalTotal');

        if (subtotalSpan) subtotalSpan.textContent = `Rs. ${formatPrice(subtotal)}`;
        if (taxSpan) taxSpan.textContent = `Rs. ${formatPrice(discount)}`;
        if (totalSpan) totalSpan.textContent = `Rs. ${formatPrice(total)}`;
        if (finalTotalSpan) finalTotalSpan.textContent = `Rs. ${formatPrice(total)}`;
    }

    function handlePaymentMethodChange(e) {
        const method = e.target.value;
        console.log('Payment method changed to:', method);

        const paymentDetails = document.getElementById('paymentDetails');
        const cardDetails = document.getElementById('cardDetails');
        const walletDetails = document.getElementById('walletDetails');
        const bankDetails = document.getElementById('bankDetails');

        if (!paymentDetails) return;

        // Hide all details first with smooth transition
        paymentDetails.style.display = 'none';
        if (cardDetails) cardDetails.style.display = 'none';
        if (walletDetails) walletDetails.style.display = 'none';
        if (bankDetails) bankDetails.style.display = 'none';

        // Small delay for smooth transition
        setTimeout(() => {
            // Show relevant details based on selected method
            if (method === 'card' && cardDetails) {
                paymentDetails.style.display = 'block';
                cardDetails.style.display = 'block';
                // Focus on first input
                const firstInput = cardDetails.querySelector('input');
                if (firstInput) firstInput.focus();
            } else if (method === 'wallet' && walletDetails) {
                paymentDetails.style.display = 'block';
                walletDetails.style.display = 'block';
            } else if (method === 'bank' && bankDetails) {
                paymentDetails.style.display = 'block';
                bankDetails.style.display = 'block';
            }
            // If COD is selected, nothing additional is shown
        }, 50);
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        console.log('Form submitted');

        const cart = getCart();
        if (cart.length === 0) {
            showToast('Your cart is empty!');
            return;
        }

        const formData = new FormData(e.target);
        const paymentMethod = formData.get('paymentMethod');

        // Validate required fields
        const fullName = formData.get('fullName');
        const phone = formData.get('phone');
        const address = formData.get('address');

        if (!fullName || fullName.trim() === '') {
            showToast('Please enter your full name');
            document.querySelector('input[name="fullName"]')?.focus();
            return;
        }

        if (!phone || phone.trim() === '') {
            showToast('Please enter your phone number');
            document.querySelector('input[name="phone"]')?.focus();
            return;
        }

        if (!address || address.trim() === '') {
            showToast('Please enter your delivery address');
            document.querySelector('textarea[name="address"]')?.focus();
            return;
        }

        // Validate card details if card payment is selected
        if (paymentMethod === 'card') {
            const cardNumber = document.getElementById('cardNumber')?.value.replace(/\s/g, '');
            const expiryDate = document.getElementById('cardExpiry')?.value;
            const cvv = document.getElementById('cardCVV')?.value;

            // Validate card number
            if (!cardNumber || !validateCardNumber(cardNumber)) {
                showToast('Please enter a valid 16-digit card number');
                document.getElementById('cardNumber')?.focus();
                return;
            }

            // Validate expiry date
            if (!expiryDate || !validateExpiryDate(expiryDate)) {
                showToast('Please enter a valid expiry date (MM/YY) - card must not be expired');
                document.getElementById('cardExpiry')?.focus();
                return;
            }

            // Validate CVV
            if (!cvv || !validateCVV(cvv)) {
                showToast('Please enter a valid CVV (3-4 digits)');
                document.getElementById('cardCVV')?.focus();
                return;
            }
        }

        // Validate wallet details if wallet payment is selected
        if (paymentMethod === 'wallet') {
            const walletType = formData.get('walletType');
            const walletMobile = document.getElementById('walletMobile')?.value;
            const walletReceipt = document.getElementById('walletReceipt')?.files[0];

            if (!walletType) {
                showToast('Please select a wallet provider (JazzCash, EasyPaisa, etc.)');
                return;
            }

            if (!walletMobile || walletMobile.replace(/\D/g, '').length !== 12) {
                showToast('Please enter a valid mobile number for wallet payment');
                document.getElementById('walletMobile')?.focus();
                return;
            }

            if (!walletReceipt) {
                showToast('Please upload payment receipt');
                document.getElementById('walletReceipt')?.focus();
                return;
            }
        }

        // Validate bank transfer receipt if bank payment is selected
        if (paymentMethod === 'bank') {
            const bankReceipt = document.getElementById('receiptUpload')?.files[0];
            if (!bankReceipt) {
                showToast('Please upload bank transfer receipt');
                document.getElementById('receiptUpload')?.focus();
                return;
            }
        }

        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const deliveryFee = 150;
        const discount = subtotal * 0.05;
        const total = subtotal + deliveryFee - discount;

        const orderData = {
            userInfo: {
                fullName: fullName,
                phone: phone,
                email: formData.get('email') || ''
            },
            deliveryAddress: address,
            items: cart,
            paymentMethod: paymentMethod,
            totalPrice: total
        };

        console.log('Order data:', orderData);
        showToast('Processing your order...');

        // Simulate order placement
        setTimeout(() => {
            const orderId = 'HP' + Date.now().toString().slice(-8);
            showOrderConfirmation(orderId, total, orderData.paymentMethod);
            
            // Clear cart
            localStorage.setItem('cart', JSON.stringify([]));
            updateCartCount();
        }, 1000);
    }

    function showOrderConfirmation(orderId, total, paymentMethod) {
        const modal = document.getElementById('confirmationModal');
        if (!modal) return;

        const orderIdSpan = document.getElementById('orderId');
        const confirmedTotalSpan = document.getElementById('confirmedTotal');
        const confirmedPaymentSpan = document.getElementById('confirmedPayment');

        if (orderIdSpan) orderIdSpan.textContent = orderId;
        if (confirmedTotalSpan) confirmedTotalSpan.textContent = `Rs. ${formatPrice(total)}`;
        
        const paymentNames = {
            'cod': 'Cash on Delivery',
            'wallet': 'Online Wallet',
            'card': 'Credit/Debit Card',
            'bank': 'Bank Transfer'
        };
        
        if (confirmedPaymentSpan) {
            confirmedPaymentSpan.textContent = paymentNames[paymentMethod] || paymentMethod;
        }

        modal.classList.add('active');
        modal.style.display = 'flex';
    }

    function toggleWalletOptions() {
        const walletOptions = document.getElementById('walletOptions');
        const walletRadio = document.getElementById('walletRadio');
        const walletArrow = document.querySelector('.wallet-arrow');

        if (!walletOptions || !walletRadio) return;

        // Check the wallet radio button
        walletRadio.checked = true;

        // Toggle wallet options visibility
        if (walletOptions.style.display === 'none' || walletOptions.style.display === '') {
            walletOptions.style.display = 'block';
            if (walletArrow) walletArrow.textContent = '▲';
        } else {
            walletOptions.style.display = 'none';
            if (walletArrow) walletArrow.textContent = '▼';
        }

        // Trigger payment method change to show wallet details
        handlePaymentMethodChange({ target: { value: 'wallet' } });
    }

    function updateCartCount() {
        const cart = getCart();
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }

    function updateLoginButton() {
        const loginBtn = document.getElementById('loginBtn');
        const loginText = loginBtn?.querySelector('.login-text');
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

        if (loginBtn && loginText) {
            if (currentUser && currentUser.phone) {
                loginText.textContent = currentUser.phone.substring(0, 10) + '...';
                loginBtn.onclick = function() {
                    if (typeof showUserMenu === 'function') {
                        showUserMenu();
                    }
                };
            } else {
                loginText.textContent = 'Login';
                loginBtn.onclick = function() {
                    if (typeof openLoginModal === 'function') {
                        openLoginModal();
                    }
                };
            }
        }
    }

    function autoFillCustomerInfo() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (!currentUser) return;

        const phoneInput = document.querySelector('input[name="phone"]');
        if (phoneInput && currentUser.phone) {
            phoneInput.value = currentUser.phone;
        }

        const addressInput = document.querySelector('textarea[name="address"]');
        if (addressInput && currentUser.address) {
            addressInput.value = currentUser.address;
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
        const cart = getCart();
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
                            ${item.size || ''} ${item.crust ? '| ' + item.crust : ''}
                            ${item.toppings && item.toppings.length > 0 ? '<br>+ ' + item.toppings.join(', ') : ''}
                        </div>
                        <div class="cart-item-controls">
                            <button class="qty-btn" onclick="window.updateCartQuantity(${item.id}, -1)">-</button>
                            <span class="cart-item-quantity">${item.quantity}</span>
                            <button class="qty-btn" onclick="window.updateCartQuantity(${item.id}, 1)">+</button>
                            <span class="cart-item-price">Rs. ${formatPrice(item.price * item.quantity)}</span>
                        </div>
                        <button class="remove-item" onclick="window.removeCartItem(${item.id})">Remove</button>
                    </div>
                </div>
            `).join('');
            checkoutBtn.disabled = false;
        }

        cartTotal.textContent = `Rs. ${formatPrice(totalPrice)}`;
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

    // Utility functions
    function getCart() {
        try {
            const cartData = localStorage.getItem('cart');
            return cartData ? JSON.parse(cartData) : [];
        } catch (error) {
            console.error('Error parsing cart:', error);
            return [];
        }
    }

    function formatPrice(price) {
        return Math.round(price).toLocaleString();
    }

    // Card validation functions
    function validateCardNumber(cardNumber) {
        // Remove spaces and dashes
        const cleaned = cardNumber.replace(/[\s-]/g, '');
        
        // Check if it's 16 digits
        if (!/^\d{16}$/.test(cleaned)) {
            return false;
        }

        // Luhn algorithm for card validation
        let sum = 0;
        let isEven = false;

        for (let i = cleaned.length - 1; i >= 0; i--) {
            let digit = parseInt(cleaned[i]);

            if (isEven) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }

            sum += digit;
            isEven = !isEven;
        }

        return sum % 10 === 0;
    }

    function validateExpiryDate(expiryDate) {
        // Check format MM/YY
        if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
            return false;
        }

        const [month, year] = expiryDate.split('/').map(num => parseInt(num));

        // Validate month
        if (month < 1 || month > 12) {
            return false;
        }

        // Check if card is expired
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits
        const currentMonth = currentDate.getMonth() + 1;

        // Card is expired if year is less than current year
        if (year < currentYear) {
            return false;
        }

        // If same year, check if month has passed
        if (year === currentYear && month < currentMonth) {
            return false;
        }

        return true;
    }

    function validateCVV(cvv) {
        // CVV should be 3 or 4 digits
        return /^\d{3,4}$/.test(cvv);
    }

    // Global functions for cart management
    window.updateCartQuantity = function(itemId, change) {
        const cart = getCart();
        const item = cart.find(i => i.id === itemId);
        if (!item) return;

        item.quantity += change;

        if (item.quantity <= 0) {
            window.removeCartItem(itemId);
            return;
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartSidebar();
        updateCartCount();
        loadOrderSummary();
    };

    window.removeCartItem = function(itemId) {
        let cart = getCart();
        cart = cart.filter(item => item.id !== itemId);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartSidebar();
        updateCartCount();
        loadOrderSummary();
        showToast('Item removed from cart');
    };

    // Close modal on outside click
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
            e.target.style.display = 'none';
        }
    });

})();
