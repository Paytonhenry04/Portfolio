// Typing animation for hero section
document.addEventListener('DOMContentLoaded', function() {
    const heroText = document.querySelector('.hero h2');
    const originalText = "Hello, I'm Payton Henry.";
    
    // Clear the text initially
    heroText.textContent = '';
    
    // Typing animation function
    function typeText(text, element, speed = 100) {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                // Add blinking cursor effect
                element.innerHTML += '<span class="cursor">|</span>';
            }
        }, speed);
    }
    
    // Start typing animation after a short delay
    setTimeout(() => {
        typeText(originalText, heroText, 100);
    }, 500);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Auto-grow textarea functionality
document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('messageTextarea');
    
    if (textarea) {
        // Function to adjust textarea height
        function adjustTextareaHeight() {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        }
        
        // Adjust on input
        textarea.addEventListener('input', adjustTextareaHeight);
        
        // Initial adjustment
        adjustTextareaHeight();
    }
});