document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('home-page-loaded');

    const slider = document.querySelector('.slide-animation');
    if (!slider) return;

    const slides = Array.from(slider.querySelectorAll('.slide-card'));
    const previousButton = slider.querySelector('.slide-arrow-prev');
    const nextButton = slider.querySelector('.slide-arrow-next');
    let currentSlide = 0;
    let resumeTimer;

    const showSlide = (slideIndex) => {
        currentSlide = (slideIndex + slides.length) % slides.length;
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });
    };

    const pauseAndResume = () => {
        window.clearTimeout(resumeTimer);
        resumeTimer = window.setTimeout(() => {
            showSlide(currentSlide + 1);
        }, 4000);
    };

    previousButton.addEventListener('click', () => {
        showSlide(currentSlide - 1);
        pauseAndResume();
    });

    nextButton.addEventListener('click', () => {
        showSlide(currentSlide + 1);
        pauseAndResume();
    });

    showSlide(0);
    window.setInterval(() => showSlide(currentSlide + 1), 4000);
});

