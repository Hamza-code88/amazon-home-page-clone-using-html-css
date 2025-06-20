   document.addEventListener('DOMContentLoaded', function() {
            const heroSlider = document.querySelector('.slider');
            const heroSlides = document.querySelectorAll('.slide');
            const prevBtn = document.querySelector('.slider-prev');
            const nextBtn = document.querySelector('.slider-next');
            const dots = document.querySelectorAll('.slider-dot');
            
            let currentIndex = 0;
            const slideCount = heroSlides.length;
            
            function updateHeroSlider() {
                heroSlider.style.transform = `translateX(-${currentIndex * 100}%)`;
                
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                });
            }
            
            function nextHeroSlide() {
                currentIndex = (currentIndex + 1) % slideCount;
                updateHeroSlider();
            }
            
            function prevHeroSlide() {
                currentIndex = (currentIndex - 1 + slideCount) % slideCount;
                updateHeroSlider();
            }
            
            let heroSlideInterval = setInterval(nextHeroSlide, 5000);
            
            function resetHeroInterval() {
                clearInterval(heroSlideInterval);
                heroSlideInterval = setInterval(nextHeroSlide, 5000);
            }
            
            nextBtn.addEventListener('click', () => {
                nextHeroSlide();
                resetHeroInterval();
            });
            
            prevBtn.addEventListener('click', () => {
                prevHeroSlide();
                resetHeroInterval();
            });
            
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentIndex = index;
                    updateHeroSlider();
                    resetHeroInterval();
                });
            });
            
            heroSlider.addEventListener('mouseenter', () => {
                clearInterval(heroSlideInterval);
            });
            
            heroSlider.addEventListener('mouseleave', () => {
                resetHeroInterval();
            });

            // Product sliders
            const productSliders = document.querySelectorAll('.product-slider');
            
            productSliders.forEach(slider => {
                const container = slider.querySelector('.product-container');
                const products = slider.querySelectorAll('.product-card');
                const prevBtn = slider.querySelector('.prev');
                const nextBtn = slider.querySelector('.next');
                
                const productWidth = products[0].offsetWidth;
                let scrollPosition = 0;
                const maxScroll = container.scrollWidth - container.clientWidth;
                
                nextBtn.addEventListener('click', () => {
                    scrollPosition += productWidth * 2;
                    if (scrollPosition > maxScroll) {
                        scrollPosition = maxScroll;
                    }
                    container.style.transform = `translateX(-${scrollPosition}px)`;
                });
                
                prevBtn.addEventListener('click', () => {
                    scrollPosition -= productWidth * 2;
                    if (scrollPosition < 0) {
                        scrollPosition = 0;
                    }
                    container.style.transform = `translateX(-${scrollPosition}px)`;
                });
                
                // Hide arrows when at ends
                function checkArrows() {
                    prevBtn.style.display = scrollPosition <= 0 ? 'none' : 'flex';
                    nextBtn.style.display = scrollPosition >= maxScroll ? 'none' : 'flex';
                }
                
                checkArrows();
                
                // Update on resize
                window.addEventListener('resize', () => {
                    const newMaxScroll = container.scrollWidth - container.clientWidth;
                    if (scrollPosition > newMaxScroll) {
                        scrollPosition = newMaxScroll;
                        container.style.transform = `translateX(-${scrollPosition}px)`;
                    }
                    maxScroll = newMaxScroll;
                    checkArrows();
                });
            });
        });