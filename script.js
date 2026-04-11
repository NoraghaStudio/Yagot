/* =====================================================
   MINING & LOGISTICS - JavaScript
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // Trigger initial animations
    animateElements();

    // ====================
    // Navbar Scroll
    // ====================
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Navbar
        if (scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link
        updateActiveNavLink();
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ====================
    // Mobile Nav Toggle
    // ====================
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    const navOverlay = document.getElementById('navOverlay');

    function toggleMenu() {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        navOverlay.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    function closeMenu() {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    navToggle.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', closeMenu);

    // Close mobile nav on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // ====================
    // Active Nav Link
    // ====================
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }



    // ====================
    // Counter Animation
    // ====================
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        counters.forEach(counter => {
            if (counter.classList.contains('counted')) return;

            const target = parseInt(counter.getAttribute('data-count'));
            const increment = target / 60;
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                    counter.classList.add('counted');
                }
            };

            updateCounter();
        });
    }

    // ====================
    // Scroll Animations
    // ====================
    function animateElements() {
        const elements = document.querySelectorAll('[data-animate]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('animated');

                        // Trigger counter animation when stats are visible
                        if (entry.target.classList.contains('hero-stats') ||
                            entry.target.closest('.hero-stats')) {
                            animateCounters();
                        }
                    }, parseInt(delay));
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(el => observer.observe(el));
    }

    // Also observe hero stats directly
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        statsObserver.observe(heroStats);
    }



    // ====================
    // Contact Form
    // ====================
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('.btn');
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        btn.disabled = true;

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const serviceElement = document.getElementById('service');
        const service = serviceElement.options[serviceElement.selectedIndex].text;
        const message = document.getElementById('message').value;

        // Build WhatsApp message
        const whatsappMessage = `طلب تواصل جديد:
الاسم: ${name}
البريد الإلكتروني: ${email}
رقم الجوال: ${phone}
نوع الخدمة: ${service}
الرسالة: ${message}`;

        const whatsappNumber = '966531341908';
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        setTimeout(() => {
            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
            
            btn.innerHTML = '<i class="fas fa-check"></i> تم التوجيه للواتساب!';
            btn.style.background = 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)';

            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                btn.disabled = false;
                contactForm.reset();
            }, 3000);
        }, 1000);
    });



    // ====================
    // Parallax effect on hero
    // ====================
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.8;
        }
    });

});
