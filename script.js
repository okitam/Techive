let cartItems = [];

// Load cart items from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
        cartItems = JSON.parse(savedCart);
        updateCartDisplay();
    }
});

// Updated search functionality
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
    event.preventDefault();
    const cartModal = document.getElementById('cartModal');
    cartModal.classList.toggle('active');
}

function updateCartDisplay() {
    const cartItemsList = document.getElementById('cartItemsList');
    const cartCounter = document.getElementById('cartCounter');
    const cartSubtotal = document.getElementById('cartSubtotal');
    
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
                        <div class="cart-item-price">₱${item.price}</div>
                    </div>
                    <button class="remove-item" onclick="removeFromCart('${item.id}')">✕</button>
                </div>
            `;
        }).join('');
        
        cartSubtotal.textContent = `₱${total.toFixed(2)}`;
    } else {
        cartItemsList.innerHTML = '<p>Your cart is empty</p>';
        cartSubtotal.textContent = '₱0.00';
    }
}

function addItemToCart(item) {
    cartItems.push({
        id: Date.now().toString(), // unique identifier
        ...item
    });
    updateCartDisplay();
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function removeFromCart(itemId) {
    cartItems = cartItems.filter(item => item.id !== itemId);
    updateCartDisplay();
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function goToCheckout() {
    window.location.href = 'checkout.html';
}

// Event Listeners
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const searchOverlay = document.getElementById('searchOverlay');
        if (searchOverlay.classList.contains('active')) {
            toggleSearch();
        }
    }
});

document.addEventListener('click', function(event) {
    const searchOverlay = document.getElementById('searchOverlay');
    const searchInput = document.getElementById('searchInput');
    const searchIcon = document.querySelector('.nav-icons .fa-search');
    
    if (searchOverlay.classList.contains('active') && 
        !searchInput.contains(event.target) && 
        !searchIcon.contains(event.target) &&
        !event.target.closest('.close-search')) {
        toggleSearch();
    }
});

// Close cart when clicking outside
document.addEventListener('click', function(event) {
    const cartModal = document.getElementById('cartModal');
    const cartIcon = document.querySelector('.cart-icon');
    
    if (!cartModal.contains(event.target) && !cartIcon.contains(event.target)) {
        cartModal.classList.remove('active');
    }
});