
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = 1000; // Duration in milliseconds
        let start = null;

        window.requestAnimationFrame(function step(timestamp) {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            const progressRate = Math.min(progress / duration, 1); // Ensure progressRate does not exceed 1
            window.scrollTo(0, startPosition + distance * easeInOutQuad(progressRate));
            if (progress < duration) {
                window.requestAnimationFrame(step);
            }
        });

        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slide-track');
    const slides = document.querySelectorAll('.book-item');
    const leftButton = document.querySelector('.nav-left');
    const rightButton = document.querySelector('.nav-right');
  
    let currentIndex = 0;
    let isTransitioning = false;
  
    // Clone the first and last slides for infinite effect
    const firstSlideClone = slides[0].cloneNode(true);
    const lastSlideClone = slides[slides.length - 1].cloneNode(true);
  
    slider.appendChild(firstSlideClone);
    slider.insertBefore(lastSlideClone, slides[0]);
  
    const totalSlides = document.querySelectorAll('.book-item').length;
  
    const updateSlider = (withTransition = true) => {
        const slideWidth = slides[0].getBoundingClientRect().width;
        slider.style.transition = withTransition ? 'transform 0.5s ease-in-out' : 'none';
        slider.style.transform = `translateX(-${slideWidth * (currentIndex + 1)}px)`;
    };
  
    const handleLeftButton = () => {
        if (isTransitioning) return;
        currentIndex--;
        isTransitioning = true;
        updateSlider();
    };
  
    const handleRightButton = () => {
        if (isTransitioning) return;
        currentIndex++;
        isTransitioning = true;
        updateSlider();
    };
  
    leftButton.addEventListener('click', handleLeftButton);
    rightButton.addEventListener('click', handleRightButton);
  
    slider.addEventListener('transitionend', () => {
        if (currentIndex === totalSlides - 1) {
            currentIndex = 0;
            updateSlider(false);
        } else if (currentIndex === -1) {
            currentIndex = slides.length - 1;
            updateSlider(false);
        }
        isTransitioning = false;
    });
  
    // Initialize the slider position
    updateSlider(false);
  });
  
