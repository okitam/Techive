// Cart State Management
let cartItems = [];

// Load cart items from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
        updateCartDisplay();
        if (window.location.pathname.includes('checkout.html')) {
            displayCheckoutItems();
        }
    }
});

// Search functionality
function toggleSearch(event) {
    if (event) {
        event.preventDefault();
    }
    
    const searchOverlay = document.getElementById('searchOverlay');
    const searchInput = document.getElementById('searchInput');
    const body = document.body;
    
    searchOverlay.classList.toggle('active');
    body.classList.toggle('search-active');
    
    if (searchOverlay.classList.contains('active')) {
        searchInput.focus();
    }
}

// Cart functionality
function toggleCart(event) {
    if (event) {
        event.preventDefault();
    }
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.toggle('active');
}

// Update cart display
function updateCartDisplay() {
    const cartItemsList = document.getElementById('cartItemsList');
    const cartCounter = document.getElementById('cartCounter');
    const cartSubtotal = document.getElementById('cartSubtotal');
    
    if (!cartItemsList) return; // Exit if not on a page with cart display
    
    // Update counter
    cartCounter.textContent = cartItems.length;
    cartCounter.style.display = cartItems.length === 0 ? 'none' : 'block';
    
    // Update cart items list
    if (cartItems.length > 0) {
        let total = 0;
        cartItemsList.innerHTML = cartItems.map(item => {
            total += parseFloat(item.price);
            return `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-size">Size: ${item.size}</div>
                        <div class="cart-item-price">₱${parseFloat(item.price).toFixed(2)}</div>
                    </div>
                    <button class="remove-item" onclick="removeFromCart('${item.id}', event)">✕</button>
                </div>
            `;
        }).join('');
        
        cartSubtotal.textContent = `₱${total.toFixed(2)}`;
    } else {
        cartItemsList.innerHTML = '<p>Your cart is empty</p>';
        cartSubtotal.textContent = '₱0.00';
    }
}

// Display items in checkout page
function displayCheckoutItems() {
    const checkoutCartItems = document.getElementById('checkoutCartItems');
    const subtotalAmount = document.getElementById('subtotalAmount');
    const totalAmount = document.getElementById('totalAmount');
    const itemCount = document.getElementById('itemCount');
    
    if (!checkoutCartItems) return; // Exit if not on checkout page
    
    if (cartItems.length > 0) {
        let total = 0;
        checkoutCartItems.innerHTML = cartItems.map(item => {
            total += parseFloat(item.price);
            return `
                <div class="cart-item">
                    <div class="item-image">
                        <span class="quantity-badge">1</span>
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="cart-item-details">
                        <span class="cart-item-title">${item.name}</span>
                        <span class="cart-item-variant">${item.size}</span>
                    </div>
                    <span class="cart-item-price">₱${parseFloat(item.price).toFixed(2)}</span>
                </div>
            `;
        }).join('');
        
        subtotalAmount.textContent = `₱${total.toFixed(2)}`;
        totalAmount.textContent = `₱${total.toFixed(2)}`;
        itemCount.textContent = cartItems.length;
    } else {
        checkoutCartItems.innerHTML = '<p>Your cart is empty</p>';
        subtotalAmount.textContent = '₱0.00';
        totalAmount.textContent = '₱0.00';
        itemCount.textContent = '0';
    }
}

// Add item to cart
function addItemToCart(item) {
    cartItems.push({
        id: Date.now().toString(),
        ...item
    });
    updateCartDisplay();
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    showNotification('Item added to cart');
}

// Remove item from cart
function removeFromCart(itemId, event) {
    if (event) {
        event.stopPropagation();
    }
    cartItems = cartItems.filter(item => item.id !== itemId);
    updateCartDisplay();
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }, 100);
}

// Navigation
function goToCheckout() {
    window.location.href = 'checkout.html';
}

// Event Listeners
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const searchOverlay = document.getElementById('searchOverlay');
        if (searchOverlay && searchOverlay.classList.contains('active')) {
            toggleSearch();
        }
    }
});

// Click outside handlers
document.addEventListener('click', function(event) {
    const searchOverlay = document.getElementById('searchOverlay');
    const searchInput = document.getElementById('searchInput');
    const searchIcon = document.querySelector('.nav-icons .fa-search');
    
    if (searchOverlay && searchOverlay.classList.contains('active') && 
        !searchInput.contains(event.target) && 
        !searchIcon.contains(event.target) &&
        !event.target.closest('.close-search')) {
        toggleSearch();
    }
    
    const cartModal = document.getElementById('cartModal');
    const cartIcon = document.querySelector('.cart-icon');
    
    if (cartModal && !cartModal.contains(event.target) && 
        !cartIcon.contains(event.target) && 
        !event.target.closest('.remove-item')) {
        cartModal.classList.remove('active');
    }
});


// Handle profile icon click
function goToAccount() {
    const userData = localStorage.getItem('userData');
    if (userData) {
        window.location.href = 'account.html';
    } else {
        window.location.href = 'index.html'; // or your login page
    }
}

// Load user data in account page
function loadUserData() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
        document.getElementById('userName').textContent = userData.name;
        document.getElementById('userEmail').textContent = userData.email;
        document.getElementById('userAddress').textContent = userData.address || 'No address added';
    } else {
        window.location.href = 'index.html'; // Redirect if not logged in
    }
}

// Logout function
function logout() {
    localStorage.removeItem('userData');
    window.location.href = 'index.html';
}

// Update your profile icon click handler in the HTML
// Keep all your existing code and add/update these functions

// Handle profile icon click - simplified version
function goToAccount() {
    window.location.href = 'account.html';
}

// Load user data in account page
function loadUserData() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
        // If no user data, create default data
        const defaultUser = {
            name: 'Edgar Jerald Toledo',
            email: 'edgarjerald19@gmail.com',
            address: 'Philippines'
        };
        localStorage.setItem('userData', JSON.stringify(defaultUser));
        displayUserData(defaultUser);
    } else {
        displayUserData(userData);
    }
}

// Display user data
function displayUserData(userData) {
    const userNameElement = document.getElementById('userName');
    const userEmailElement = document.getElementById('userEmail');
    const userAddressElement = document.getElementById('userAddress');
    
    if (userNameElement) userNameElement.textContent = userData.name;
    if (userEmailElement) userEmailElement.textContent = userData.email;
    if (userAddressElement) userAddressElement.textContent = userData.address;
}

// Logout function
function logout() {
    // Keep cart items but remove user data
    localStorage.removeItem('userData');
    window.location.href = 'index.html';
}

// Add this to your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
        updateCartDisplay();
        if (window.location.pathname.includes('checkout.html')) {
            displayCheckoutItems();
        }
    }
    
    // Add this line to load user data if on account page
    if (window.location.pathname.includes('account.html')) {
        loadUserData();
    }
});

