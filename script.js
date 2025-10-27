/*
  This file contains the GSAP scroll animations
  and the particles.js configuration.
*/

window.addEventListener('load', () => {

    /* Add .js-enabled class to <html>. */
    document.documentElement.classList.remove('no-js');
    document.documentElement.classList.add('js-enabled');


    // ======== INITIALIZE PARTICLES.JS ========
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-bg", {
            "particles": {
                "number": {
                    "value": 650,
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

        // After particles load, init GSAP with longer delay
        setTimeout(initGSAP, 500); // Increased from 100ms
    } else {
        console.error("particles.js library not loaded.");
        initGSAP(); // Init GSAP anyway
        document.documentElement.classList.remove('js-enabled'); // Fallback show
    }

    function initGSAP() {
        if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            // Normalize scroll for better mobile/partial loads
            ScrollTrigger.normalizeScroll(true);

            // --- Animate Navbar ---
            const nav = document.querySelector('.navbar');
            ScrollTrigger.create({
                trigger: 'body',
                start: 'top -100px',
                end: 'bottom top',
                onUpdate: (self) => {
                    if (self.progress > 0) { // Simpler check
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
                    toggleActions: "play none none none",
                    // Animate if already in view
                    onEnter: () => gsap.to(".services-section .section-header", { opacity: 1, y: 0, duration: 1 })
                },
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power3.out",
                immediateRender: false // Prevent premature opacity 0
            });

            // --- Animate the service cards ---
           gsap.from(".service-card", {
  scrollTrigger: {
    trigger: ".services-grid",
    start: "top 80%",
    toggleActions: "play none none none",
    markers: false, // optional, set to true for debugging
  },
  opacity: 0,
  y: 50,
  duration: 0.8,
  ease: "power3.out",
  stagger: 0.2,
  immediateRender: false
});

            // --- Animate the "Work" section header & content ---
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
                stagger: 0.3,
                immediateRender: false
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
                ease: "power3.out",
                immediateRender: false
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
                ease: "power3.out",
                immediateRender: false
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
                stagger: 0.2,
                immediateRender: false
            });

            ScrollTrigger.refresh(); // Final refresh
        } else {
            console.error("GSAP or ScrollTrigger library not loaded.");
            // Fallback: Show all content immediately
            document.querySelectorAll('.service-card, .work-content, .contact-info, .contact-form, .footer-container').forEach(el => {
                el.style.opacity = '1';
            });
            document.documentElement.classList.remove('js-enabled');
        }
    }

    // --- Mobile Nav Toggle ---
    const navToggleBtn = document.getElementById('nav-toggle-btn');
    const navLinks = document.getElementById('nav-links');

    if (navToggleBtn && navLinks) {
        navToggleBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            const icon = navToggleBtn.querySelector('i');
            if (icon) {
                if (icon.classList.contains('fa-bars')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                const icon = navToggleBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

});
