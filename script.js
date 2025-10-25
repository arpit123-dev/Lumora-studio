/*
  This file contains the GSAP scroll animations
  and the particles.js configuration.
*/

window.addEventListener('load', () => {

    /* FIX: Add .js-enabled class to <html>.
      This tells the CSS to hide animated elements,
      preventing the "flash" of content.
    */
    document.documentElement.classList.remove('no-js');
    document.documentElement.classList.add('js-enabled');


    // ======== INITIALIZE PARTICLES.JS ========
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-bg", {
            "particles": {
                "number": {
                    "value": 150, // Balanced particle count
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#c0a062"
                },
                "shape": {
                    "type": "circle",
                },
                "opacity": {
                    "value": 0.5,
                    "random": true
                },
                "size": {
                    "value": 2,
                    "random": true
                },
                "line_linked": {
                    "enable": true,
                    "distance": 250, // Long lines for "full" look
                    "color": "#c0a062",
                    "opacity": 0.3,
                    "width": 0.7
                },
                "move": {
                    "enable": true,
                    "speed": 2, // Balanced speed
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": true
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab" // Reactive grab
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 150,
                        "line_opacity": 1
                    },
                    "push": {
                        "particles_nb": 4
                    }
                }
            },
            "retina_detect": true
        });
    } else {
        console.error("particles.js library not loaded.");
        document.documentElement.classList.remove('js-enabled'); // Show content if particles fails
    }


    // ======== GSAP SCROLL-REVEAL ANIMATIONS ========

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {

        gsap.registerPlugin(ScrollTrigger);

        // --- Animate Navbar ---
        const nav = document.querySelector('.navbar');
        ScrollTrigger.create({
            trigger: 'body',
            start: 'top -100px',
            end: 'bottom top',
            onUpdate: (self) => {
                if (self.direction === 1) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }
            },
        });

        // --- Animate Hero Content (on load) ---
        gsap.from(".hero-content > *", {
            opacity: 0,
            y: 30,
            duration: 1,
            ease: "power3.out",
            stagger: 0.2,
            delay: 0.2
        });

        // --- Animate the "Our Services" title ---
        gsap.from(".services-section .section-header", {
            scrollTrigger: {
                trigger: ".services-section",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out"
        });

        // --- Animate the service cards ---
        gsap.from(".service-card", {
            scrollTrigger: {
                trigger: ".services-grid",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.2
        });

        // --- Animate the "Work" section header ---
        gsap.from(".work-section .section-header, .work-content", {
            scrollTrigger: {
                trigger: ".work-section",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out",
            stagger: 0.3
        });

        // --- Animate the Contact Form ---
        gsap.from(".contact-info", {
            scrollTrigger: {
                trigger: ".contact-container",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            x: -50,
            duration: 1,
            ease: "power3.out"
        });

        gsap.from(".contact-form", {
            scrollTrigger: {
                trigger: ".contact-container",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            x: 50,
            duration: 1,
            ease: "power3.out"
        });

        // --- Animate the Footer ---
        gsap.from(".footer-container > *", {
            scrollTrigger: {
                trigger: ".footer",
                start: "top 90%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out",
            stagger: 0.2
        });

        // FIX: Corrected typo from ScrollTriggerPlugin to ScrollTrigger
        ScrollTrigger.refresh();

    } else {
        console.error("GSAP or ScrollTrigger library not loaded.");
        document.documentElement.classList.remove('js-enabled'); // Show all content if GSAP fails
    }


    // --- Mobile Nav Toggle ---
    const navToggleBtn = document.getElementById('nav-toggle-btn');
    // FIX: Get navLinks by ID
    const navLinks = document.getElementById('nav-links');

    if (navToggleBtn && navLinks) {
        navToggleBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            // Toggle hamburger icon to 'X'
            const icon = navToggleBtn.querySelector('i');
            if (icon) { // Check if icon exists
                if (icon.classList.contains('fa-bars')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                const icon = navToggleBtn.querySelector('i');
                if (icon) { // Check if icon exists
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

});

