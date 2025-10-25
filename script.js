/*
  This file contains the GSAP scroll animations
  and the particles.js configuration.
  
  UPDATED: Wrapped in a 'window.onload' event to ensure
  all libraries (GSAP, Particles.js) are fully loaded
  before the script runs.
*/

window.addEventListener('load', () => {

    // ======== INITIALIZE PARTICLES.JS ========
    // We check if particlesJS exists first
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-bg", {
            "particles": {
                "number": {
                    "value": 1000, // INCREASED from 700 to fill the page
                    "density": {
                        "enable": true,
                        "value_area": 700 // DECREASED from 800 to make particles denser
                    }
                },
                "color": {
                    "value": "#c0a062" // Gold color for particles
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
                    "distance": 160, // INCREASED from 150 for longer lines
                    "color": "#c0a062", // Gold color for lines
                    "opacity": 0.4, 
                    "width": 0.7
                },
                "move": {
                    "enable": true,
                    "speed": 2, // DECREASED from 4 to make it less chaotic
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
                        "mode": "grab" 
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push" // Adds new particles on click
                    },
                    "resize": true
                },
                "modes": {
                    "grab": { 
                        "distance": 140,
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
    }


    // ======== GSAP SCROLL-REVEAL ANIMATIONS ========

    // We check if gsap and ScrollTrigger exist first
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        
        // Register the ScrollTrigger plugin
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
        gsap.from(".services-section .section-header, .services-section .section-subheader", {
            scrollTrigger: {
                trigger: ".services-section",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out",
            stagger: 0.2
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

        // --- NEW: Animate the "Work" section header ---
        gsap.from("#work .section-header", {
            scrollTrigger: {
                trigger: "#work",
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out"
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

        // --- NEW: Animate the Footer ---
        gsap.from(".footer-container > *", {
            scrollTrigger: {
                trigger: ".footer",
                start: "top 90%", // Start when 90% of the footer is visible
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out",
            stagger: 0.2
        });

        // Refresh ScrollTrigger once everything is set up
        ScrollTrigger.refresh();

    } else {
        console.error("GSAP or ScrollTrigger library not loaded.");
    }


    // --- Mobile Nav Toggle ---
    const navToggleBtn = document.getElementById('nav-toggle-btn');
    const navLinks = document.querySelector('.nav-links');

    if (navToggleBtn && navLinks) {
        navToggleBtn.addEventListener('click', () => {
            // This is a simple implementation.
            // For a real build, you'd add/remove a class
            // to animate the menu sliding in.
            console.log("Mobile menu clicked. Implement toggle logic here.");
        });
    }

});

