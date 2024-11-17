document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        
        const username = document.querySelector('input[type="text"]').value;
        const password = document.querySelector('input[type="password"]').value;
        
      
        if (username && password) {
            
            window.location.href = 'home.html';
        } else {
            alert('Please enter both username and password');
        }
    });
});

// Sample cart items array (this should be dynamically managed in a real application)
let cartItems = [];

// Function to update the cart dropdown
function updateCartDropdown() {
    const cartDropdown = document.getElementById('cartDropdown');
    const cartMessage = document.getElementById('cartMessage');

    // Clear previous content
    cartDropdown.innerHTML = ''; // Clear the dropdown content

    if (cartItems.length > 0) {
        // Create a list of items
        cartItems.forEach(item => {
            const itemElement = document.createElement('p');
            itemElement.textContent = item; // Assuming item is a string (item name)
            cartDropdown.appendChild(itemElement);
        });
    } else {
        cartMessage.textContent = 'No items added in cart'; // Update message
    }
}

// Example function to add items to the cart (this would be called when items are added)
function addItemToCart(item) {
    cartItems.push(item);
    updateCartDropdown(); // Update dropdown after adding an item
}

// Example usage: Call this function to simulate adding items
addItemToCart('Nike Zoom LeBron NXXT Gen AMPD EP x FaZe');
addItemToCart('Air Jordan 4 Retro GS \'Pure Platinum\'');