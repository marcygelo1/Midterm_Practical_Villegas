document.addEventListener('DOMContentLoaded', function() {

   
    const loader = document.getElementById('loader');
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const toast = document.getElementById('toast');
    const statValues = document.querySelectorAll('.stat-value');
    const typingText = document.querySelector('.typing-text');
    const revealElements = document.querySelectorAll('[data-reveal]');
    const skillFills = document.querySelectorAll('.skill-fill');
    const magneticBtns = document.querySelectorAll('.magnetic-btn');


    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 800);
    });


    const roles = [
        'beautiful websites',
        'mobile apps',
        'digital experiences',
        'interactive UIs',
        'scalable solutions'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeEffect() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typingSpeed = 500;
        }

        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();

    
    function handleNavbarScroll() {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });

  
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Dropdown toggle
    const aboutToggle = document.getElementById('aboutToggle');
    const aboutDropdown = document.getElementById('aboutDropdown');
    const navDropdown = document.querySelector('.nav-dropdown');

    if (aboutToggle && aboutDropdown) {
        // Click to toggle (for mobile)
        aboutToggle.addEventListener('click', function(e) {
            e.preventDefault();
            navDropdown.classList.toggle('active');
            aboutDropdown.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!navDropdown.contains(e.target)) {
                navDropdown.classList.remove('active');
                aboutDropdown.classList.remove('show');
            }
        });
    }

    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            // Also close dropdown
            if (navDropdown) {
                navDropdown.classList.remove('active');
            }
            if (aboutDropdown) {
                aboutDropdown.classList.remove('show');
            }
        });
    });

    // Dropdown item click - smooth scroll
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScrollTo(targetId);

            // Close dropdown
            if (navDropdown) {
                navDropdown.classList.remove('active');
            }
            if (aboutDropdown) {
                aboutDropdown.classList.remove('show');
            }

            // Close mobile menu
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close on ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

   
    function smoothScrollTo(targetId) {
        const target = document.querySelector(targetId);
        if (!target) return;

        const navHeight = navbar.offsetHeight;
        const targetPosition = target.offsetTop - navHeight;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScrollTo(targetId);

            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Footer links smooth scroll
    document.querySelectorAll('.footer-nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScrollTo(this.getAttribute('href'));
        });
    });

 
    function highlightActiveSection() {
        const scrollPos = window.scrollY + navbar.offsetHeight + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection, { passive: true });

  
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

 
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fills = entry.target.querySelectorAll('.skill-fill');
                fills.forEach((fill, i) => {
                    setTimeout(() => {
                        fill.style.width = fill.style.width;
                    }, i * 150);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.about-skills').forEach(el => skillObserver.observe(el));

   
    function animateCounters() {
        statValues.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2500;
            const startTime = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);

                // Ease out expo
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(easeOut * target);

                stat.textContent = current;

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    stat.textContent = target;
                }
            }

            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        requestAnimationFrame(update);
                        counterObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            counterObserver.observe(stat);
        });
    }

    animateCounters();

  
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

  
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Clear previous errors
        document.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');
        let hasError = false;

        // Validate name
        if (!name.value.trim()) {
            name.closest('.form-group').classList.add('error');
            hasError = true;
        }

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailRegex.test(email.value)) {
            email.closest('.form-group').classList.add('error');
            hasError = true;
        }

        // Validate message
        if (!message.value.trim()) {
            message.closest('.form-group').classList.add('error');
            hasError = true;
        }

        if (hasError) {
            showToast('Please fix the errors above.', 'error');
            return;
        }

        // Simulate sending
        submitBtn.classList.add('sending');

        setTimeout(() => {
            contactForm.reset();
            submitBtn.classList.remove('sending');
            showToast('Message sent successfully! I\'ll get back to you soon.', 'success');

            console.log('%c📧 Form Submission', 'color: #8b5cf6; font-weight: bold;');
            console.log({
                name: name.value,
                email: email.value,
                subject: document.getElementById('subject').value || 'No Subject',
                message: message.value,
                timestamp: new Date().toLocaleString()
            });
        }, 1800);
    });

    // Clear error on input
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
        input.addEventListener('input', function() {
            this.closest('.form-group').classList.remove('error');
        });
    });

  
    function showToast(message, type = 'success') {
        const toastTitle = toast.querySelector('.toast-title');
        const toastMessage = toast.querySelector('.toast-message');
        const toastIcon = toast.querySelector('.toast-icon i');

        toastTitle.textContent = type === 'success' ? 'Success!' : 'Oops!';
        toastMessage.textContent = message;

        if (type === 'error') {
            toast.classList.add('error');
            toastIcon.className = 'fas fa-exclamation-circle';
        } else {
            toast.classList.remove('error');
            toastIcon.className = 'fas fa-check-circle';
        }

        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

 
    function createRipple(e, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out forwards;
            pointer-events: none;
        `;

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }

    document.querySelectorAll('.btn, .submit-btn, .social-btn, .project-link, .cs-link').forEach(btn => {
        btn.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    });

    // Add ripple keyframes
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes rippleEffect {
            to { transform: scale(2.5); opacity: 0; }
        }
    `;
    document.head.appendChild(rippleStyle);

   
    document.querySelectorAll('.social-btn, .cs-link').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                showToast('Social profile coming soon!', 'success');
            }
        });
    });

   
    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showToast('Project details coming soon!', 'success');
        });
    });

   
    let ticking = false;

    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const scrolled = window.scrollY;
                const blobs = document.querySelectorAll('.bg-blob');

                blobs.forEach((blob, i) => {
                    const speed = 0.1 + (i * 0.05);
                    blob.style.transform = `translateY(${scrolled * speed}px)`;
                });

                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });


    document.querySelectorAll('.about-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const glow = this.querySelector('.card-glow');
            if (glow) {
                glow.style.left = (x - rect.width) + 'px';
                glow.style.top = (y - rect.height) + 'px';
            }
        });
    });


    console.log('%c👋 Welcome to Marcy Angelo Villegas\'s Portfolio!', 'color: #8b5cf6; font-size: 20px; font-weight: bold; font-family: monospace;');
    console.log('%cBuilt with passion, code, and a lot of coffee ☕', 'color: #06b6d4; font-size: 14px; font-family: monospace;');
    console.log('%cFeel free to explore the source code!', 'color: #94a3b8; font-size: 12px; font-family: monospace;');

});
