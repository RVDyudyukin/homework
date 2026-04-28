export function hallSlider() {
    let bigImage, thumbContainer, currentSlide = 1;
    const totalSlides = 17;
    
    const getActiveSlider = () => {
        const isDesktop = window.innerWidth > 1220;
        
        if (isDesktop) {
            const desktopBlock = document.querySelector('.hall__img-desktop');
            if (desktopBlock) {
                return {
                    bigImage: desktopBlock.querySelector('#bigImage'),
                    thumbContainer: desktopBlock.querySelector('#thumbContainer')
                };
            }
        } else {
            const mobileBlock = document.querySelector('.hall__img-mobile');
            if (mobileBlock) {
                return {
                    bigImage: mobileBlock.querySelector('#bigImage'),
                    thumbContainer: mobileBlock.querySelector('#thumbContainer')
                };
            }
        }
        return null;
    };
    
    // Функция обновления состояния кнопок
    const updateButtonsState = () => {
        const prevButton = document.querySelector('.switching__back');
        const nextButton = document.querySelector('.switching__next');
        
        if (prevButton) {
            if (currentSlide === 1) {
                prevButton.classList.add('switching--disabled');
            } else {
                prevButton.classList.remove('switching--disabled');
            }
        }
        
        if (nextButton) {
            if (currentSlide === totalSlides) {
                nextButton.classList.add('switching--disabled');
            } else {
                nextButton.classList.remove('switching--disabled');
            }
        }
    };
    
    const updateSlide = (slideNumber) => {
        const activeSlider = getActiveSlider();
        if (!activeSlider) return;
        
        const { bigImage, thumbContainer } = activeSlider;
        const thumbs = thumbContainer.querySelectorAll('.thumb');
        const wrappers = thumbContainer.querySelectorAll('.thumb-wrapper');
        
        if (thumbs.length === 0 || wrappers.length === 0) return;
        
        let newSlideNumber = slideNumber;
        if (newSlideNumber < 1) newSlideNumber = totalSlides;
        if (newSlideNumber > totalSlides) newSlideNumber = 1;
        
        currentSlide = newSlideNumber;
        
        const activeDigitSpan = document.querySelector('.number-slide__active-digit');
        if (activeDigitSpan) {
            activeDigitSpan.textContent = currentSlide;
        }
        
        const thumbIndex = (currentSlide - 1) % thumbs.length;
        const targetThumb = thumbs[thumbIndex];
        const targetWrapper = wrappers[thumbIndex];
        
        if (targetThumb && targetWrapper) {
            const newSrc = targetThumb.getAttribute('data-full') || targetThumb.src;
            
            bigImage.style.transition = 'opacity 0.2s ease';
            bigImage.style.opacity = '0.5';
            
            setTimeout(() => {
                bigImage.src = newSrc;
                bigImage.style.opacity = '1';
            }, 150);
            
            wrappers.forEach(w => w.classList.remove('active'));
            targetWrapper.classList.add('active');
            
            bigImage.classList.remove('active');
            void bigImage.offsetWidth;
            bigImage.classList.add('active');
        }
        
        // Обновляем состояние кнопок после смены слайда
        updateButtonsState();
    };
    
    const nextSlide = () => {
        if (currentSlide < totalSlides) {
            updateSlide(currentSlide + 1);
        }
    };
    
    const prevSlide = () => {
        if (currentSlide > 1) {
            updateSlide(currentSlide - 1);
        }
    };
    
    const initSlider = () => {
        const activeSlider = getActiveSlider();
        if (!activeSlider) return;
        
        const { bigImage, thumbContainer } = activeSlider;
        const thumbs = thumbContainer.querySelectorAll('.thumb');
        const wrappers = thumbContainer.querySelectorAll('.thumb-wrapper');
        
        if (thumbs.length === 0) {
            console.warn('Миниатюры не найдены');
            return;
        }
        
        let wrappersList = wrappers;
        
        if (wrappersList.length === 0) {
            thumbs.forEach(thumb => {
                const wrapper = document.createElement('div');
                wrapper.className = 'thumb-wrapper';
                thumb.parentNode.insertBefore(wrapper, thumb);
                wrapper.appendChild(thumb);
                
                if (thumb.classList.contains('active')) {
                    wrapper.classList.add('active');
                }
            });
            wrappersList = thumbContainer.querySelectorAll('.thumb-wrapper');
        }
        
        wrappersList.forEach((wrapper, index) => {
            const thumb = wrapper.querySelector('.thumb');
            
            wrapper.removeEventListener('click', handleThumbClick);
            wrapper.addEventListener('click', handleThumbClick);
            
            function handleThumbClick() {
                const newSrc = thumb.getAttribute('data-full') || thumb.src;
                
                bigImage.style.transition = 'opacity 0.2s ease';
                bigImage.style.opacity = '0.5';
                
                setTimeout(() => {
                    bigImage.src = newSrc;
                    bigImage.style.opacity = '1';
                }, 150);
                
                wrappersList.forEach(w => w.classList.remove('active'));
                wrapper.classList.add('active');
                
                const slideNumber = index + 1;
                currentSlide = slideNumber;
                
                const activeDigitSpan = document.querySelector('.number-slide__active-digit');
                if (activeDigitSpan) {
                    activeDigitSpan.textContent = currentSlide;
                }
                
                bigImage.classList.remove('active');
                void bigImage.offsetWidth;
                bigImage.classList.add('active');
                
                // Обновляем состояние кнопок при клике на миниатюру
                updateButtonsState();
            }
        });
        
        const activeWrapper = thumbContainer.querySelector('.thumb-wrapper.active');
        if (activeWrapper) {
            const activeIndex = Array.from(wrappersList).indexOf(activeWrapper);
            if (activeIndex !== -1) {
                currentSlide = activeIndex + 1;
                const activeDigitSpan = document.querySelector('.number-slide__active-digit');
                if (activeDigitSpan) {
                    activeDigitSpan.textContent = currentSlide;
                }
            }
        } else if (wrappersList[0]) {
            wrappersList[0].classList.add('active');
            currentSlide = 1;
            const activeDigitSpan = document.querySelector('.number-slide__active-digit');
            if (activeDigitSpan) {
                activeDigitSpan.textContent = currentSlide;
            }
        }
        
        // Устанавливаем начальное состояние кнопок
        updateButtonsState();
    };
    
    const prevButton = document.querySelector('.switching__back');
    const nextButton = document.querySelector('.switching__next');
    
    if (prevButton) {
        prevButton.removeEventListener('click', prevSlide);
        prevButton.addEventListener('click', prevSlide);
    }
    
    if (nextButton) {
        nextButton.removeEventListener('click', nextSlide);
        nextButton.addEventListener('click', nextSlide);
    }
    
    initSlider();
    
    const handleResize = () => {
        setTimeout(() => {
            initSlider();
            updateSlide(currentSlide);
        }, 100);
    };
    
    window.addEventListener('resize', handleResize);
}