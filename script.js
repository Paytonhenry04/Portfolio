// Initialize EmailJS
(function() {
    emailjs.init("Fkeo8O2APo1iRktRh"); // Replace with your EmailJS public key
})();

// Contact form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show sending message
            formStatus.textContent = 'Sending...';
            formStatus.style.color = '#fff';
            formStatus.style.marginTop = '1vh';
            
            // Send email using EmailJS
            emailjs.sendForm('service_u9gg547', 'template_j9w31lj', this)
                .then(function() {
                    formStatus.textContent = 'Message sent successfully!';
                    formStatus.style.color = '#4CAF50';
                    contactForm.reset();
                    
                    // Clear status message after 5 seconds
                    setTimeout(() => {
                        formStatus.textContent = '';
                    }, 5000);
                }, function(error) {
                    formStatus.textContent = 'Failed to send message. Please try again.';
                    formStatus.style.color = '#ff5722';
                    console.error('EmailJS error:', error);
                });
        });
    }
});

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