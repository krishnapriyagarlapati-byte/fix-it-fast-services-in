const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        const targetSection = targetId ? document.querySelector(targetId) : null;

        if (targetSection) {
            e.preventDefault();
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

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

const revealElements = document.querySelectorAll('.service-card, .panel-card, .contact-card, .info-card, .brand-box');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.animate([
                { opacity: 0, transform: 'translateY(20px)' },
                { opacity: 1, transform: 'translateY(0)' }
            ], {
                duration: 500,
                easing: 'ease-out',
                fill: 'forwards'
            });
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

revealElements.forEach((element) => {
    observer.observe(element);
});