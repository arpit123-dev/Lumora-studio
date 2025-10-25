/*
  This file contains the GSAP scroll animations
  and the particles.js configuration.

  UPDATED: Wrapped in a 'window.onload' event to ensure
  all libraries (GSAP, Particles.js) are fully loaded
  before the script runs.
  Also added a .js-enabled class to the document to scope
  CSS hiding rules and a robust check for ScrollTrigger.
*/

window.addEventListener('load', () => {

    // Add a class so CSS can hide animated elements only when JS is active.
    // If an animation library fails to initialize, we remove this class
    // later so content doesn't remain invisible.
    document.documentElement.classList.add('js-enabled');

    // ======== INITIALIZE PARTICLES.JS ========
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-bg", {
            "particles": {
                "number": {
                    "value": 150,
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
                    "distance": 250,
                    "color": "#c0a062",
                    "opacity": 0.3,
                    "width": 0.7
                },
                "move": {
                    "enable": true,
                    "speed": 2,
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
    }


    // ======== GSAP SCROLL-REVEAL ANIMATIONS ========

    // Make ScrollTrigger detection robust: it may exist on window or as gsap.ScrollTrigger
    const hasGSAP = (typeof gsap !== 'undefined');
    const ScrollTriggerPlugin = (typeof ScrollTrigger !== 'undefined') ? ScrollTrigger : (hasGSAP && gsap.ScrollTrigger) ? gsap.ScrollTrigger : undefined;

    if (hasGSAP && ScrollTriggerPlugin) {

        // Register the ScrollTrigger plugin
        gsap.registerPlugin(ScrollTriggerPlugin);

        // --- Animate Navbar ---
        const nav = document.querySelector('.navbar');
        if (nav) {
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
        }

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

        // --- Animate the "Work" section header ---
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

        // Refresh ScrollTrigger once everything is set up
        ScrollTriggerPlugin.refresh();

        // All good — keep .js-enabled so animated elements stay hidden until animated
    } else {
        // If GSAP/ScrollTrigger didn't initialize, remove the js-enabled class
        // so content remains visible (prevents stuck invisible sections).
        console.error("GSAP or ScrollTrigger library not loaded.");
        document.documentElement.classList.remove('js-enabled');
    }


    // --- Mobile Nav Toggle ---
    const navToggleBtn = document.getElementById('nav-toggle-btn');
    const navLinks = document.querySelector('.nav-links');

    if (navToggleBtn && navLinks) {
        navToggleBtn.addEventListener('click', () => {
            // This is a simple implementation.
            // For a real build, you'd add/remove a class
            // to animate the menu sliding in.
            navLinks.classList.toggle('open');
        });
    }

});
