// Over-the-top interactive JavaScript for your portfolio website

document.addEventListener("DOMContentLoaded", function () {
    // Smooth Scrolling Effect for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    // Typewriter Effect for the Hero Section
    const typewriterText = "Hi, I'm Payton Henry";
    const typewriterElement = document.querySelector(".hero h2");
    let i = 0;
    function typeWriter() {
        if (i < typewriterText.length) {
            typewriterElement.textContent += typewriterText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    typewriterElement.textContent = ""; // Clear existing text
    typeWriter();

    // Hover Effect on Project Cards
    document.querySelectorAll(".project-card").forEach(card => {
        card.addEventListener("mouseover", function () {
            this.style.transform = "scale(1.1) rotate(3deg)";
            this.style.transition = "0.3s";
        });
        card.addEventListener("mouseout", function () {
            this.style.transform = "scale(1) rotate(0deg)";
        });
    });

    
});
