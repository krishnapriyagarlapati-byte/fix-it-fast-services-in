// Pause the slider while the user touches it (mobile)
const slider = document.querySelector('.slide-track');

if (slider) {
    slider.addEventListener('touchstart', () => {
        slider.style.animationPlayState = 'paused';
    });

    slider.addEventListener('touchend', () => {
        slider.style.animationPlayState = 'running';
    });
}

// Smooth scroll for navigation links
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        const targetSection = targetId ? document.querySelector(targetId) : null;

        if (targetSection) {
            e.preventDefault();
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Form submission handling - send the request via WhatsApp
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