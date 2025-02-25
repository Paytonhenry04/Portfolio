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
    const typewriterText = "Hello, My Name Is Payton Henry.";
    const typewriterElement = document.querySelector(".hero h2");
    let i = 0;
    
    // Create cursor span element
    const cursorElement = document.createElement("span");
    cursorElement.textContent = "|";
    cursorElement.style.display = "inline-block";
    typewriterElement.appendChild(cursorElement);
    
    function typeWriter() {
        if (i < typewriterText.length) {
            typewriterElement.textContent = typewriterText.substring(0, i + 1); // Update text
            typewriterElement.appendChild(cursorElement); // Keep cursor at the end
            i++;
            setTimeout(typeWriter, 120);
        } else {
            startInsertAnimation();
        }
    }
    
    typeWriter();

    // Blinking Cursor Animation
    function startInsertAnimation() {
        setInterval(() => {
            cursorElement.style.visibility = cursorElement.style.visibility === "hidden" ? "visible" : "hidden";
        }, 600); // Adjust blinking speed if needed
    }

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
