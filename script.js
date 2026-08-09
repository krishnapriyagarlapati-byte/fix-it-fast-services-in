// Pause the service slider while the user touches/drags it (mobile)
const slider = document.querySelector('.slide-track');

if (slider) {
    slider.addEventListener('touchstart', () => {
        slider.style.animationPlayState = 'paused';
    });
    slider.addEventListener('touchend', () => {
        slider.style.animationPlayState = 'running';
    });
}

// Smooth scroll for the navigation links
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                e.preventDefault();
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Add a "Book Now" WhatsApp link to every service card
document.querySelectorAll('.slide .service-content').forEach(card => {
    const bookNow = document.createElement('a');
    bookNow.className = 'service-book';
    bookNow.href = 'https://wa.me/917989222741?text=' +
        encodeURIComponent('Hi Fix It Fast Services! I need help with ' + card.querySelector('h3').textContent.trim());
    bookNow.target = '_blank';
    bookNow.rel = 'noopener';
    bookNow.innerHTML = 'Book Now →';
    card.appendChild(bookNow);
});

// Reveal-on-scroll animations
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

// Animated stat counters
const statNumbers = document.querySelectorAll('.stat-num');

statNumbers.forEach(num => {
    const targetValue = parseInt(num.dataset.target, 10);
    const suffix = document.createElement('span');
    suffix.className = 'stat-suffix';
    suffix.textContent = '+';
    num.appendChild(suffix);

    const animateCounter = () => {
        let current = 0;
        const duration = 1600;
        const startTime = performance.now();

        const step = (time) => {
            const progress = Math.min((time - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            current = Math.round(targetValue * eased);
            num.firstChild.textContent = current.toLocaleString('en-IN');
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterObserver.observe(num);
});

// Submit the booking form through WhatsApp
const form = document.querySelector('form');

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = form.querySelector('input[type="text"]').value.trim();
        const phone = form.querySelector('input[type="tel"]').value.trim();
        const message = form.querySelector('textarea').value.trim();

        const text = encodeURIComponent(
            `Hi Fix It Fast Services!\n\nName: ${name}\nPhone: ${phone}\nProblem: ${message || 'Not specified'}`
        );

        window.open(`https://wa.me/917989222741?text=${text}`, '_blank');
        form.reset();
    });
}
