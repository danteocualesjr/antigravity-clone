/**
 * Minimalist interaction logic for Antigravity engine landing page
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Reveal Animations (Stripe/Linear style smooth reveals)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to trigger CSS transition
                entry.target.classList.add('visible');
                // Unobserve after showing for performance
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Grab all elements with .fade-up and begin observing
    const hiddenElements = document.querySelectorAll('.fade-up');
    hiddenElements.forEach((el) => animateOnScroll.observe(el));

    // 2. Navbar Styling on Scroll (Hard edge border reveal)
    const navbar = document.querySelector('.nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.style.borderBottom = '1px solid var(--border-hover)';
            navbar.style.background = 'rgba(10, 10, 10, 0.85)';
        } else {
            navbar.style.borderBottom = '1px solid var(--border)';
            navbar.style.background = 'rgba(0, 0, 0, 0.7)';
        }
    });

    // 3. Smooth Smooth Scrolling
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Subtle mouse tracker for the terminal window (glow effect)
    const terminal = document.querySelector('.terminal-window');
    if (terminal) {
        terminal.addEventListener('mousemove', (e) => {
            const rect = terminal.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element

            // Apply a very subtle radial gradient highlight that follows the mouse
            terminal.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.05), rgba(10,10,10,1) 40%)`;
        });

        terminal.addEventListener('mouseleave', () => {
            terminal.style.background = 'var(--bg-surface)';
        });
    }
});
