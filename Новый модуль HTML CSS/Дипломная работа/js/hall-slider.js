export function hallSlider() {
    let bigImage, thumbContainer, currentSlide = 1;
    const totalSlides = 17; // Всего слайдов
    
    // Функция для получения активного слайдера
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
    
    // Функция для обновления отображаемого слайда
    const updateSlide = (slideNumber) => {
        const activeSlider = getActiveSlider();
        if (!activeSlider) return;
        
        const { bigImage, thumbContainer } = activeSlider;
        const thumbs = thumbContainer.querySelectorAll('.thumb');
        const wrappers = thumbContainer.querySelectorAll('.thumb-wrapper');
        
        if (thumbs.length === 0 || wrappers.length === 0) return;
        
        // Корректируем номер слайда (циклическое переключение)
        let newSlideNumber = slideNumber;
        if (newSlideNumber < 1) newSlideNumber = totalSlides;
        if (newSlideNumber > totalSlides) newSlideNumber = 1;
        
        currentSlide = newSlideNumber;
        
        // Обновляем счетчик
        const activeDigitSpan = document.querySelector('.number-slide__active-digit');
        if (activeDigitSpan) {
            activeDigitSpan.textContent = currentSlide;
        }
        
        // Получаем индекс миниатюры (циклически)
        const thumbIndex = (currentSlide - 1) % thumbs.length;
        
        // Получаем миниатюру и ее обертку
        const targetThumb = thumbs[thumbIndex];
        const targetWrapper = wrappers[thumbIndex];
        
        if (targetThumb && targetWrapper) {
            // Обновить источник большой картинки
            const newSrc = targetThumb.getAttribute('data-full') || targetThumb.src;
            
            // Эффект затухания при смене картинки
            bigImage.style.transition = 'opacity 0.2s ease';
            bigImage.style.opacity = '0.5';
            
            setTimeout(() => {
                bigImage.src = newSrc;
                bigImage.style.opacity = '1';
            }, 150);
            
            // Убрать активный класс у всех оберток
            wrappers.forEach(w => w.classList.remove('active'));
            // Добавить активный класс текущей обертке
            targetWrapper.classList.add('active');
            
            // Добавить эффект тени на большую картинку
            bigImage.classList.remove('active');
            void bigImage.offsetWidth;
            bigImage.classList.add('active');
        }
    };
    
    // Функция для переключения на следующий слайд
    const nextSlide = () => {
        updateSlide(currentSlide + 1);
    };
    
    // Функция для переключения на предыдущий слайд
    const prevSlide = () => {
        updateSlide(currentSlide - 1);
    };
    
    // Функция для инициализации слайдера
    const initSlider = () => {
        const activeSlider = getActiveSlider();
        if (!activeSlider) return;
        
        const { bigImage, thumbContainer } = activeSlider;
        const thumbs = thumbContainer.querySelectorAll('.thumb');
        const wrappers = thumbContainer.querySelectorAll('.thumb-wrapper');
        
        // Проверяем, есть ли миниатюры
        if (thumbs.length === 0) {
            console.warn('Миниатюры не найдены');
            return;
        }
        
        // Находим обертки миниатюр
        let wrappersList = wrappers;
        
        // Если оберток нет, создаем их
        if (wrappersList.length === 0) {
            thumbs.forEach(thumb => {
                const wrapper = document.createElement('div');
                wrapper.className = 'thumb-wrapper';
                thumb.parentNode.insertBefore(wrapper, thumb);
                wrapper.appendChild(thumb);
                
                // Если миниатюра была активной, добавить класс и wrapper-у
                if (thumb.classList.contains('active')) {
                    wrapper.classList.add('active');
                }
            });
            wrappersList = thumbContainer.querySelectorAll('.thumb-wrapper');
        }
        
        // По клику на миниатюру обновляем большую картинку и счетчик
        wrappersList.forEach((wrapper, index) => {
            const thumb = wrapper.querySelector('.thumb');
            
            // Убираем старые обработчики, чтобы не было дублирования
            wrapper.removeEventListener('click', handleThumbClick);
            wrapper.addEventListener('click', handleThumbClick);
            
            function handleThumbClick() {
                // Обновить источник большой картинки
                const newSrc = thumb.getAttribute('data-full') || thumb.src;
                
                // Эффект затухания при смене картинки
                bigImage.style.transition = 'opacity 0.2s ease';
                bigImage.style.opacity = '0.5';
                
                setTimeout(() => {
                    bigImage.src = newSrc;
                    bigImage.style.opacity = '1';
                }, 150);
                
                // Убрать активный класс у всех оберток
                wrappersList.forEach(w => w.classList.remove('active'));
                // Добавить активный класс текущей обертке
                wrapper.classList.add('active');
                
                // Обновляем текущий слайд (нумерация с 1)
                const slideNumber = index + 1;
                currentSlide = slideNumber;
                
                // Обновляем счетчик
                const activeDigitSpan = document.querySelector('.number-slide__active-digit');
                if (activeDigitSpan) {
                    activeDigitSpan.textContent = currentSlide;
                }
                
                // Добавить эффект тени на большую картинку
                bigImage.classList.remove('active');
                void bigImage.offsetWidth;
                bigImage.classList.add('active');
            }
        });
        
        // Инициализируем текущий слайд из активной миниатюры
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
            // Если нет активной, делаем первую активной
            wrappersList[0].classList.add('active');
            currentSlide = 1;
            const activeDigitSpan = document.querySelector('.number-slide__active-digit');
            if (activeDigitSpan) {
                activeDigitSpan.textContent = currentSlide;
            }
        }
    };
    
    // Получаем кнопки переключения
    const prevButton = document.querySelector('.switching__back');
    const nextButton = document.querySelector('.switching__next');
    
    // Добавляем обработчики для кнопок переключения
    if (prevButton) {
        prevButton.removeEventListener('click', prevSlide);
        prevButton.addEventListener('click', prevSlide);
    }
    
    if (nextButton) {
        nextButton.removeEventListener('click', nextSlide);
        nextButton.addEventListener('click', nextSlide);
    }
    
    // Инициализируем слайдер
    initSlider();
    
    // Обработчик изменения размера окна
    const handleResize = () => {
        // Обновляем слайдер при изменении размера
        setTimeout(() => {
            initSlider();
            // Сохраняем текущий слайд
            updateSlide(currentSlide);
        }, 100);
    };
    
    window.addEventListener('resize', handleResize);
}