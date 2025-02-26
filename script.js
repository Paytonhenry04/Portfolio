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
    
    if (typewriterElement) {
        let i = 0;
        // Create cursor span element for hero
        const cursorElement = document.createElement("span");
        cursorElement.textContent = "|";
        cursorElement.style.display = "inline-block";
        
        // Create a text container so updating text won't overwrite the cursor
        const heroTextContainer = document.createElement("span");
        typewriterElement.innerHTML = "";
        typewriterElement.appendChild(heroTextContainer);
        typewriterElement.appendChild(cursorElement);
        
        function typeWriter() {
            if (i < typewriterText.length) {
                heroTextContainer.textContent = typewriterText.substring(0, i + 1);
                i++;
                setTimeout(typeWriter, 120);
            } else {
                startInsertAnimation();
            }
        }
        
        typeWriter();
    
        // Blinking Cursor Animation for hero
        function startInsertAnimation() {
            setInterval(() => {
                cursorElement.style.visibility = cursorElement.style.visibility === "hidden" ? "visible" : "hidden";
            }, 600); // Adjust blinking speed if needed
        }
    } else {
        console.warn("Hero section not found.");
    }

    // Typewriter Effect for the Education Section
    const typewriterText2 = "My Education";
    const typewriterElement2 = document.querySelector(".education h2");
    
    if (typewriterElement2) {
        let j = 0;
        // Create cursor span element for education
        const cursorElement2 = document.createElement("span");
        cursorElement2.textContent = "|";
        cursorElement2.style.display = "inline-block";
        
        // Create a text container so updating text won't overwrite the cursor
        const educationTextContainer = document.createElement("span");
        typewriterElement2.innerHTML = "";
        typewriterElement2.appendChild(educationTextContainer);
        typewriterElement2.appendChild(cursorElement2);
        
        function typeWriterEducation() {
            if (j < typewriterText2.length) {
                educationTextContainer.textContent = typewriterText2.substring(0, j + 1);
                j++;
                setTimeout(typeWriterEducation, 120);
            } else {
                startInsertAnimationEducation();
            }
        }
        
        typeWriterEducation();
    
        // Blinking Cursor Animation for education
        function startInsertAnimationEducation() {
            setInterval(() => {
                cursorElement2.style.visibility = cursorElement2.style.visibility === "hidden" ? "visible" : "hidden";
            }, 600); // Adjust blinking speed if needed
        }
    } else {
        console.warn("Education section not found.");
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
