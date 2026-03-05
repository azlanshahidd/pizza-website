// ===== CONFIGURATION =====
// Backend removed - using localStorage only

// ===== STATE MANAGEMENT =====
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let products = [];

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

async function initializeApp() {
    setupEventListeners();
    updateCartUI();
    setupSmoothScroll();
    
    // Only load products if on menu page
    if (document.getElementById('menuGrid') && document.getElementById('menuGrid').querySelector('.loading')) {
        await loadProducts();
    }
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Navigation
    const hamburger = document.getElementById('hamburger');
    const cartBtn = document.getElementById('cartBtn');
    const closeCart = document.getElementById('closeCart');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (hamburger) {
        hamburger.addEventListener('click', toggleMobileMenu);
    }
    
    if (cartBtn) {
        cartBtn.addEventListener('click', toggleCart);
    }
    
    if (closeCart) {
        closeCart.addEventListener('click', toggleCart);
    }
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', openCheckout);
    }
    
    // Contact form if exists
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // Filter buttons if exist
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', handleFilter);
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', handleNavbarScroll);
    
    // ESC key handler for all modals - works on entire website
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' || e.key === 'Esc') {
            // Close login modal
            const loginModal = document.getElementById('loginModal');
            if (loginModal && (loginModal.style.display === 'flex' || loginModal.classList.contains('active'))) {
                closeLoginModal();
                return;
            }
            
            // Close confirmation modal
            const confirmationModal = document.getElementById('confirmationModal');
            if (confirmationModal && confirmationModal.classList.contains('active')) {
                confirmationModal.classList.remove('active');
                return;
            }
            
            // Close cart sidebar
            const cartSidebar = document.getElementById('cartSidebar');
            if (cartSidebar && cartSidebar.classList.contains('active')) {
                cartSidebar.classList.remove('active');
                return;
            }
            
            // Close any other modal with class 'modal' that is active
            const activeModals = document.querySelectorAll('.modal.active');
            activeModals.forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });
}

// ===== PRODUCT LOADING =====
async function loadProducts() {
    try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) throw new Error('Failed to load products');
        
        products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error('Error loading products:', error);
        showToast('Failed to load menu. Using sample data.');
        loadSampleProducts();
    }
}

function loadSampleProducts() {
    // Sample data for demo purposes
    products = [
        {
            _id: '1',
            name: 'Margherita',
            description: 'Classic tomato sauce, mozzarella, fresh basil',
            basePrice: 12.99,
            category: 'vegetarian',
            image: '🍕',
            sizes: ['Small', 'Medium', 'Large'],
            crusts: ['Thin', 'Regular', 'Thick'],
            toppings: ['Extra Cheese', 'Olives', 'Mushrooms', 'Peppers']
        },
        {
            _id: '2',
            name: 'Pepperoni',
            description: 'Spicy pepperoni, mozzarella, tomato sauce',
            basePrice: 14.99,
            category: 'non-veg',
            image: '🍕',
            sizes: ['Small', 'Medium', 'Large'],
            crusts: ['Thin', 'Regular', 'Thick'],
            toppings: ['Extra Pepperoni', 'Jalapeños', 'Onions', 'Mushrooms']
        },
        {
            _id: '3',
            name: 'Veggie Supreme',
            description: 'Bell peppers, onions, mushrooms, olives, tomatoes',
            basePrice: 13.99,
            category: 'vegetarian',
            image: '🍕',
            sizes: ['Small', 'Medium', 'Large'],
            crusts: ['Thin', 'Regular', 'Thick'],
            toppings: ['Extra Veggies', 'Feta Cheese', 'Spinach', 'Corn']
        },
        {
            _id: '4',
            name: 'BBQ Chicken',
            description: 'Grilled chicken, BBQ sauce, red onions, cilantro',
            basePrice: 15.99,
            category: 'non-veg',
            image: '🍕',
            sizes: ['Small', 'Medium', 'Large'],
            crusts: ['Thin', 'Regular', 'Thick'],
            toppings: ['Extra Chicken', 'Bacon', 'Pineapple', 'Jalapeños']
        },
        {
            _id: '5',
            name: 'Hawaiian',
            description: 'Ham, pineapple, mozzarella, tomato sauce',
            basePrice: 14.99,
            category: 'non-veg',
            image: '🍕',
            sizes: ['Small', 'Medium', 'Large'],
            crusts: ['Thin', 'Regular', 'Thick'],
            toppings: ['Extra Ham', 'Extra Pineapple', 'Bacon', 'Jalapeños']
        },
        {
            _id: '6',
            name: 'Truffle Deluxe',
            description: 'Truffle oil, wild mushrooms, parmesan, arugula',
            basePrice: 18.99,
            category: 'premium',
            image: '🍕',
            sizes: ['Small', 'Medium', 'Large'],
            crusts: ['Thin', 'Regular', 'Thick'],
            toppings: ['Prosciutto', 'Burrata', 'Sun-dried Tomatoes', 'Artichokes']
        }
    ];
    renderProducts(products);
}

// ===== PRODUCT RENDERING =====
function renderProducts(productsToRender) {
    const menuGrid = document.getElementById('menuGrid');
    
    if (productsToRender.length === 0) {
        menuGrid.innerHTML = '<p class="loading">No products found</p>';
        return;
    }
    
    menuGrid.innerHTML = productsToRender.map(product => `
        <div class="pizza-card" data-category="${product.category}">
            <div class="pizza-image">${product.image || '🍕'}</div>
            <div class="pizza-content">
                <h3 class="pizza-name">${product.name}</h3>
                <p class="pizza-description">${product.description}</p>
                
                <div class="pizza-options">
                    <div class="option-group">
                        <label class="option-label">Size:</label>
                        <select class="option-select" data-option="size">
                            ${product.sizes.map(size => `<option value="${size}">${size}</option>`).join('')}
                        </select>
                    </div>
                    
                    <div class="option-group">
                        <label class="option-label">Crust:</label>
                        <select class="option-select" data-option="crust">
                            ${product.crusts.map(crust => `<option value="${crust}">${crust}</option>`).join('')}
                        </select>
                    </div>
                    
                    <div class="option-group">
                        <label class="option-label">Extra Toppings ($1.50 each):</label>
                        <div class="toppings-grid">
                            ${product.toppings.map(topping => `
                                <label class="topping-checkbox">
                                    <input type="checkbox" value="${topping}">
                                    <span>${topping}</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <div class="pizza-footer">
                    <span class="pizza-price" data-base-price="${product.basePrice}">${product.basePrice.toFixed(2)}</span>
                    <button class="add-to-cart-btn" onclick="addToCart('${product._id}')">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Add event listeners for dynamic pricing
    document.querySelectorAll('.pizza-card').forEach(card => {
        card.querySelectorAll('.option-select, .topping-checkbox input').forEach(input => {
            input.addEventListener('change', () => updateCardPrice(card));
        });
    });
}

// ===== DYNAMIC PRICING =====
function updateCardPrice(card) {
    const basePrice = parseFloat(card.querySelector('.pizza-price').dataset.basePrice);
    const size = card.querySelector('[data-option="size"]').value;
    const toppings = card.querySelectorAll('.topping-checkbox input:checked').length;
    
    let price = basePrice;
    
    // Size multiplier
    if (size === 'Medium') price *= 1.3;
    if (size === 'Large') price *= 1.6;
    
    // Toppings
    price += toppings * 1.5;
    
    card.querySelector('.pizza-price').textContent = `Rs. ${price.toFixed(0)}`;
}

// ===== CART MANAGEMENT =====
function addToCart(productId) {
    const product = products.find(p => p._id === productId);
    if (!product) return;
    
    const card = document.querySelector(`[data-category] .add-to-cart-btn[onclick*="${productId}"]`).closest('.pizza-card');
    const size = card.querySelector('[data-option="size"]').value;
    const crust = card.querySelector('[data-option="crust"]').value;
    const toppings = Array.from(card.querySelectorAll('.topping-checkbox input:checked')).map(cb => cb.value);
    const price = parseFloat(card.querySelector('.pizza-price').textContent.replace('Rs. ', '').replace(',', ''));
    
    const cartItem = {
        id: Date.now(),
        productId: product._id,
        name: product.name,
        size,
        crust,
        toppings,
        price,
        quantity: 1,
        image: product.image
    };
    
    cart.push(cartItem);
    saveCart();
    updateCartUI();
    showToast(`${product.name} added to cart!`);
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    updateCartUI();
    showToast('Item removed from cart');
}

function updateQuantity(itemId, change) {
    const item = cart.find(i => i.id === itemId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(itemId);
        return;
    }
    
    saveCart();
    updateCartUI();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    // Check if cart elements exist (they might not on all pages)
    if (!cartCount || !cartItems || !cartTotal || !checkoutBtn) {
        return;
    }
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    cartCount.textContent = totalItems;
    cartTotal.textContent = `Rs. ${totalPrice.toFixed(0)}`;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        checkoutBtn.disabled = true;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.image}</div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-options">
                        ${item.size ? item.size : ''} ${item.crust ? '| ' + item.crust : ''}
                        ${item.toppings && item.toppings.length > 0 ? `<br>+ ${item.toppings.join(', ')}` : ''}
                    </div>
                    <div class="cart-item-controls">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="cart-item-quantity">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        <span class="cart-item-price">Rs. ${(item.price * item.quantity).toFixed(0)}</span>
                    </div>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `).join('');
        checkoutBtn.disabled = false;
    }
}

// ===== CHECKOUT =====
function openCheckout() {
    if (cart.length === 0) return;
    
    // Redirect to payment page
    window.location.href = 'payment.html';
}

function closeCheckout() {
    // Redirect back if needed
    window.history.back();
}

// ===== DEAL FUNCTIONS =====
function addDealToCart(dealId, price) {
    const dealNames = {
        'bogo-trail': 'BOGO Trail Deal',
        'bogo-hunter': 'BOGO Hunter Deal',
        'bogo-blast': 'BOGO Blast Deal',
        'bogo-hattrick': 'Bogo Hat Trick Deal',
        'tryo-plus': 'Tryo Plus Deal',
        'feast-plus': 'Feast Plus Deal',
        'ultimate-plus': 'Ultimate Plus Deal',
        'family-plus': 'Family Plus Deal',
        'premium-plus': 'Premium Plus Deal',
        'party-plus': 'Party Plus Deal',
        'pizza-fries': 'Pizza + Fries Combo',
        'double-pizza': 'Double Pizza Combo',
        'family-feast': 'Family Feast Deal',
        'family-pack': 'Family Pack',
        'weekend-special': 'Weekend Special',
        'student-deal': 'Student Deal'
    };

    const cartItem = {
        id: Date.now(),
        productId: dealId,
        name: dealNames[dealId] || 'Special Deal',
        price: price,
        quantity: 1,
        image: '🍕'
    };

    cart.push(cartItem);
    saveCart();
    updateCartUI();
    showToast(`${cartItem.name} added to cart!`);
}

async function handleCheckout(e) {
    e.preventDefault();
    
    // This function is no longer used as we redirect to payment.html
    // Keeping for backward compatibility
    window.location.href = 'payment.html';
}

function showOrderConfirmation(orderId) {
    closeCheckout();
    
    const modal = document.getElementById('confirmationModal');
    document.getElementById('orderId').textContent = orderId;
    modal.classList.add('active');
}

function closeConfirmation() {
    document.getElementById('confirmationModal').classList.remove('active');
}

function generateOrderId() {
    return 'ORD' + Date.now().toString().slice(-8);
}

// ===== UI INTERACTIONS =====
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
        cartSidebar.classList.toggle('active');
    }
}

function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.getElementById('hamburger');
    if (navLinks) navLinks.classList.toggle('active');
    if (hamburger) hamburger.classList.toggle('active');
}

function toggleCardDetails() {
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
    const cardDetails = document.getElementById('cardDetails');
    if (paymentMethod && cardDetails) {
        cardDetails.style.display = paymentMethod.value === 'card' ? 'block' : 'none';
    }
}

function handleFilter(e) {
    const filter = e.target.dataset.filter;
    
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    // Check if we have static menu cards (menu.html) or dynamic products
    const pizzaCards = document.querySelectorAll('.pizza-card');
    
    if (pizzaCards.length > 0) {
        // Static menu cards - filter by data-category
        pizzaCards.forEach(card => {
            if (filter === 'all') {
                card.style.display = 'block';
            } else {
                if (card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    } else if (products.length > 0) {
        // Dynamic products - use renderProducts
        const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
        renderProducts(filtered);
    }
}

function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    }
}

function scrollToMenu() {
    const menu = document.getElementById('menu');
    if (menu) {
        menu.scrollIntoView({ behavior: 'smooth' });
    }
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                this.classList.add('active');
                
                // Close mobile menu
                const navLinks = document.getElementById('navLinks');
                if (navLinks) navLinks.classList.remove('active');
            }
        });
    });
}

async function handleContactForm(e) {
    e.preventDefault();
    showToast('Message sent! We\'ll get back to you soon.');
    e.target.reset();
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

// ===== UTILITY FUNCTIONS =====
// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});

// ===== MENU ITEM ADD TO CART =====
function addMenuItemToCart(button) {
    const card = button.closest('.pizza-card');
    const name = card.querySelector('.pizza-name').textContent;
    const priceElement = card.querySelector('.pizza-price');
    const price = parseFloat(priceElement.textContent.replace('Rs. ', '').replace(',', ''));
    
    // Get selected options
    const sizeSelect = card.querySelector('[data-option="size"]');
    const crustSelect = card.querySelector('[data-option="crust"]');
    
    const size = sizeSelect ? sizeSelect.value : 'Regular';
    const crust = crustSelect ? crustSelect.value : 'Regular';
    
    const cartItem = {
        id: Date.now(),
        productId: 'menu-' + Date.now(),
        name: name,
        size: size,
        crust: crust,
        toppings: [],
        price: price,
        quantity: 1,
        image: '🍕'
    };
    
    cart.push(cartItem);
    saveCart();
    updateCartUI();
    showToast(`${name} added to cart!`);
}

// ===== MENU FILTER FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            const pizzaCards = document.querySelectorAll('.pizza-card');
            
            pizzaCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    if (card.dataset.category === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // Update price when size changes
    const sizeSelects = document.querySelectorAll('[data-option="size"]');
    sizeSelects.forEach(select => {
        select.addEventListener('change', function() {
            const card = this.closest('.pizza-card');
            const priceElement = card.querySelector('.pizza-price');
            const selectedOption = this.options[this.selectedIndex];
            const newPrice = selectedOption.dataset.price;
            
            if (newPrice) {
                priceElement.textContent = `Rs. ${parseInt(newPrice).toLocaleString()}`;
                priceElement.dataset.basePrice = newPrice;
            }
        });
    });
});


// ===== AUTHENTICATION SYSTEM =====
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let isGuest = localStorage.getItem('isGuest') === 'true';

// Update login button text on page load
document.addEventListener('DOMContentLoaded', () => {
    updateLoginButton();
});

function updateLoginButton() {
    const loginBtn = document.getElementById('loginBtn');
    const loginText = loginBtn?.querySelector('.login-text');
    
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

function openLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.style.display = 'flex';
    modal.classList.add('active');
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.style.display = 'none';
    modal.classList.remove('active');
}

function showLoginOptions() {
    // Simplified login - no options screen needed
}

function showPhoneLogin() {
    // Simplified login - directly show phone form
}

let otpSent = false;

// Phone number validation and formatting
function formatPhoneNumber(input) {
    // Remove all non-digit characters
    let cleaned = input.replace(/\D/g, '');
    
    // If starts with 92, keep it; if starts with 0, replace with 92; otherwise add 92
    if (cleaned.startsWith('92')) {
        cleaned = cleaned;
    } else if (cleaned.startsWith('0')) {
        cleaned = '92' + cleaned.substring(1);
    } else if (cleaned.length === 10) {
        cleaned = '92' + cleaned;
    }
    
    // Format as +92 XXX XXXXXXX
    if (cleaned.length >= 2) {
        return '+' + cleaned.substring(0, 2) + ' ' + 
               (cleaned.length > 2 ? cleaned.substring(2, 5) : '') + 
               (cleaned.length > 5 ? ' ' + cleaned.substring(5, 12) : '');
    }
    
    return '+' + cleaned;
}

function validatePhoneNumber(phone) {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Check if it's a valid Pakistani number (92 followed by 10 digits)
    return cleaned.length === 12 && cleaned.startsWith('92');
}

function validateOTP(otp) {
    // Check if OTP is exactly 6 digits
    return /^\d{6}$/.test(otp);
}

// Auto-format phone number as user types
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phoneNumber');
    const countryCodeSelect = document.getElementById('countryCode');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            // Remove all non-digit characters
            let value = this.value.replace(/\D/g, '');
            
            // Limit length based on country code
            const countryCode = countryCodeSelect ? countryCodeSelect.value : '+92';
            let maxLength = 10; // Default for most countries
            
            if (countryCode === '+1') maxLength = 10;
            else if (countryCode === '+44') maxLength = 10;
            else if (countryCode === '+91') maxLength = 10;
            else if (countryCode === '+92') maxLength = 10;
            
            value = value.substring(0, maxLength);
            
            // Format with spaces for readability
            if (value.length > 3) {
                value = value.substring(0, 3) + ' ' + value.substring(3);
            }
            if (value.length > 7) {
                value = value.substring(0, 7) + ' ' + value.substring(7);
            }
            
            this.value = value;
        });
        
        phoneInput.addEventListener('keypress', function(e) {
            // Only allow numbers
            if (!/\d/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
                e.preventDefault();
            }
        });
    }
});

async function handlePhoneLogin(e) {
    e.preventDefault();
    
    const phoneInput = document.getElementById('phoneNumber');
    const countryCodeSelect = document.getElementById('countryCode');
    const countryCode = countryCodeSelect ? countryCodeSelect.value : '+92';
    const phoneNumber = phoneInput.value.replace(/\s/g, ''); // Remove spaces
    const fullPhone = countryCode + phoneNumber;
    
    const otpInput = document.getElementById('otpCode');
    const otpCode = otpInput ? otpInput.value : '';
    const otpSection = document.getElementById('otpSection');
    const phoneLoginBtn = document.getElementById('phoneLoginBtn');
    
    if (!otpSent) {
        // Validate phone number (at least 10 digits)
        if (phoneNumber.length < 10) {
            showToast('Please enter a valid phone number (at least 10 digits)');
            phoneInput.focus();
            return;
        }
        
        // Disable button and show loading
        phoneLoginBtn.disabled = true;
        phoneLoginBtn.textContent = 'Sending OTP...';
        
        try {
            // Send OTP via backend API
            const response = await fetch(`${API_URL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ phone: fullPhone })
            });
            
            const data = await response.json();
            
            if (response.ok && data.success) {
                otpSection.style.display = 'block';
                phoneLoginBtn.textContent = 'Verify OTP';
                phoneLoginBtn.disabled = false;
                otpSent = true;
                
                // Show OTP in console for development
                if (data.otp) {
                    console.log('🔐 OTP for testing:', data.otp);
                    showToast(`OTP sent to ${fullPhone}. Check console for OTP (dev mode)`);
                } else {
                    showToast(`OTP sent to ${fullPhone}`);
                }
                
                // Focus on OTP input
                setTimeout(() => {
                    if (otpInput) otpInput.focus();
                }, 100);
            } else {
                throw new Error(data.message || 'Failed to send OTP');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            showToast(error.message || 'Error sending OTP. Please try again.');
            phoneLoginBtn.disabled = false;
            phoneLoginBtn.textContent = 'SEND OTP';
        }
    } else {
        // Validate OTP format
        if (!validateOTP(otpCode)) {
            showToast('Please enter a valid 6-digit OTP');
            otpInput.focus();
            return;
        }
        
        // Disable button and show loading
        phoneLoginBtn.disabled = true;
        phoneLoginBtn.textContent = 'Verifying...';
        
        try {
            // Verify OTP via backend API
            const response = await fetch(`${API_URL}/users/verify-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    phone: fullPhone,
                    otp: otpCode
                })
            });
            
            const data = await response.json();
            
            if (response.ok && data.success) {
                // Store user data
                currentUser = {
                    phone: data.data.user.phone,
                    email: data.data.user.email || '',
                    fullName: data.data.user.fullName || '',
                    address: data.data.user.address || null,
                    token: data.data.token,
                    loginTime: new Date().toISOString()
                };
                
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                localStorage.removeItem('isGuest');
                isGuest = false;
                
                closeLoginModal();
                updateLoginButton();
                showToast('Login successful!');
                
                // Reset form
                document.getElementById('phoneAuthForm').reset();
                otpSection.style.display = 'none';
                phoneLoginBtn.textContent = 'SEND OTP';
                phoneLoginBtn.disabled = false;
                otpSent = false;
                phoneInput.value = '';
            } else {
                throw new Error(data.message || 'Invalid OTP');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            showToast(error.message || 'Invalid OTP. Please try again.');
            phoneLoginBtn.disabled = false;
            phoneLoginBtn.textContent = 'Verify OTP';
            otpInput.value = '';
            otpInput.focus();
        }
    }
}

function showUserMenu() {
    if (currentUser) {
        const addressStr = currentUser.address ? 
            `${currentUser.address}` : 
            'No address set';
        
        // Create custom modal for logout
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        const modalContent = document.createElement('div');
        modalContent.style.cssText = `
            background: white;
            padding: 2rem;
            border-radius: 15px;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        `;
        
        modalContent.innerHTML = `
            <h3 style="margin: 0 0 1rem 0; color: #333; font-size: 1.3rem;">Account Information</h3>
            <p style="margin: 0.5rem 0; color: #666;"><strong>Phone:</strong> ${currentUser.phone}</p>
            <p style="margin: 0.5rem 0 1.5rem 0; color: #666;"><strong>Address:</strong> ${addressStr}</p>
            <div style="display: flex; gap: 1rem;">
                <button id="logoutBtn" style="
                    flex: 1;
                    padding: 0.75rem;
                    background: #ff6b35;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    font-size: 1rem;
                ">Logout</button>
                <button id="cancelBtn" style="
                    flex: 1;
                    padding: 0.75rem;
                    background: #e0e0e0;
                    color: #333;
                    border: none;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    font-size: 1rem;
                ">Cancel</button>
            </div>
        `;
        
        modal.appendChild(modalContent);
        document.body.appendChild(modal);
        
        // Add event listeners
        document.getElementById('logoutBtn').addEventListener('click', () => {
            document.body.removeChild(modal);
            logout();
        });
        
        document.getElementById('cancelBtn').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }
}

function logout() {
    currentUser = null;
    isGuest = false;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isGuest');
    updateLoginButton();
    showToast('Logged out successfully');
}

// Check authentication before checkout
function checkAuthBeforeCheckout() {
    if (!currentUser) {
        openLoginModal();
        return false;
    }
    return true;
}

// Override openCheckout function
const originalOpenCheckout = openCheckout;
openCheckout = function() {
    if (cart.length === 0) return;
    
    if (!checkAuthBeforeCheckout()) {
        showToast('Please login to continue with checkout');
        return;
    }
    
    // Redirect to payment page
    window.location.href = 'payment.html';
};
