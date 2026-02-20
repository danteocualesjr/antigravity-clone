document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observeElements = (elements, className) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(className);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        elements.forEach(el => observer.observe(el));
    };

    // Apply reveal to sections and cards
    const featureCards = document.querySelectorAll('.feature-card');
    const sections = document.querySelectorAll('section');
    
    // Add initial classes for JS-driven animations
    featureCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    observeElements(featureCards, 'fade-in');
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.8rem 0';
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        } else {
            navbar.style.padding = '1.5rem 0';
            navbar.style.boxShadow = 'none';
        }
    });

    // Smooth scroll for nav links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetEntry = document.querySelector(targetId);
            if (targetEntry) {
                const navHeight = navbar.offsetHeight;
                window.scrollTo({
                    top: targetEntry.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hero interaction placeholder
    const heroContent = document.querySelector('.hero-content');
    heroContent.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20;
        const yPos = (clientY / window.innerHeight - 0.5) * 20;
        
        heroContent.style.transform = `translate(${xPos}px, ${yPos}px)`;
    });
});
