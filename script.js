document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        
        const username = document.querySelector('input[type="text"]').value;
        const password = document.querySelector('input[type="password"]').value;
        
      
        if (username && password) {
            
            window.location.href = 'products.html';
        } else {
            alert('Please enter both username and password');
        }
    });
});