document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Pause the service slider while the user touches/drags it (mobile)
    const slider = document.querySelector('.slide-track');

    if (slider) {
        slider.addEventListener('touchstart', () => {
            slider.style.animationPlayState = 'paused';
        }, { passive: true });
        slider.addEventListener('touchend', () => {
            slider.style.animationPlayState = 'running';
        }, { passive: true });
    }

    // Smooth scroll for internal anchor links and auto-close mobile nav
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId && targetId.startsWith('#') && targetId.length > 1) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    e.preventDefault();
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
            if (navMenu) navMenu.classList.remove('active');
            if (mobileToggle) mobileToggle.classList.remove('active');
        });
    });

    // Reveal-on-scroll animations with fallback
    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('visible'));
    }

    // Animated stat counters
    const statNumbers = document.querySelectorAll('.stat-num');

    statNumbers.forEach(num => {
        const targetValue = parseInt(num.dataset.target, 10);
        if (isNaN(targetValue)) return;

        if (!num.querySelector('.stat-suffix')) {
            const suffix = document.createElement('span');
            suffix.className = 'stat-suffix';
            suffix.textContent = '+';
            num.appendChild(suffix);
        }

        const animateCounter = () => {
            let current = 0;
            const duration = 1600;
            const startTime = performance.now();

            const step = (time) => {
                const progress = Math.min((time - startTime) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                current = Math.round(targetValue * eased);
                
                const textNode = Array.from(num.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
                if (textNode) {
                    textNode.textContent = current.toLocaleString('en-IN');
                } else {
                    num.insertBefore(document.createTextNode(current.toLocaleString('en-IN')), num.firstChild);
                }

                if (progress < 1) {
                    requestAnimationFrame(step);
                }
            };
            requestAnimationFrame(step);
        };

        if ('IntersectionObserver' in window) {
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter();
                        counterObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });

            counterObserver.observe(num);
        } else {
            animateCounter();
        }
    });

    // Submit all booking forms through WhatsApp
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const nameInput = form.querySelector('input[type="text"]');
            const phoneInput = form.querySelector('input[type="tel"]');
            const descInput = form.querySelector('textarea');

            const name = nameInput ? nameInput.value.trim() : '';
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const message = descInput ? descInput.value.trim() : '';

            const whatsappNumber = "917989222741";
            const textMessage = `*NEW REPAIR SERVICE REQUEST*%0A` +
                `🛠️ *Business:* Fix It Fast Services%0A` +
                `👤 *Name:* ${encodeURIComponent(name)}%0A` +
                `📞 *Phone:* ${encodeURIComponent(phone)}%0A` +
                `📝 *Issue Details:* ${encodeURIComponent(message || 'Not specified')}%0A` +
                `-----------------------------%0A` +
                `Please share estimated service timing & technician quote.`;

            const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${textMessage}`;

            window.open(whatsappUrl, '_blank');
            form.reset();
        });
    });
});
