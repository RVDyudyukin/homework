export const reservationSlider = () => {
    const swiper = new Swiper(".swiper", {
        slidesPerView: "5.3",
        spaceBetween: 10,
        centeredSlides: true,
        // snapToSlideEdge: true,
        loop: true,
        mousewheel: { forceToAxis: true },
        navigation: {
            prevEl: ".swiper-box__button-prev",
            nextEl: ".swiper-box__button-next",
        },
        breakpoints: {
            1800: {
                slidesPerView: "5.3",
                // spaceBetween: 50,
            },
            1600: {
                slidesPerView: "4.3",
                spaceBetween: 10
            },
            1220: {
                slidesPerView: "3.3",
                spaceBetween: 10
            },

            768: {
                slidesPerView: "2.5",
                spaceBetween: 10
            },

            361: {
                slidesPerView: "1.2",
                centeredSlides: false,
                marginLeft: 10,
            },
        },
    });

    const activeDigit = document.querySelector('.pagination-number-slide__active-digit');
    const passiveSpan = document.querySelector('.pagination-number-slide__passive-digit');

    // Получаем максимальное число (например, "из 12" → 12)
    let maxNumber = 12;
    if (passiveSpan) {
        const match = passiveSpan.textContent.match(/\d+/);
        if (match) maxNumber = parseInt(match[0]);
    }

    let currentNumber = 3; // начальное значение (третий слайд)

    // Функция обновления цифр
    const updateNumbers = (direction) => {
        if (direction === 'next') {
            currentNumber++;
            if (currentNumber > maxNumber) currentNumber = 1;
        } else if (direction === 'prev') {
            currentNumber--;
            if (currentNumber < 1) currentNumber = maxNumber;
        }

        // Обновляем текст активной цифры
        if (activeDigit) activeDigit.textContent = currentNumber;

        // Устанавливаем атрибут data-number для текущего активного слайда
        const activeSlide = swiper.slides[swiper.activeIndex];
        if (activeSlide) activeSlide.setAttribute('data-number', currentNumber);
    };

    // Инициализация начальных значений
    const initNumbers = () => {
        if (activeDigit) activeDigit.textContent = currentNumber;
        const activeSlide = swiper.slides[swiper.activeIndex];
        if (activeSlide) activeSlide.setAttribute('data-number', currentNumber);
    };

    // Подписываемся на события Swiper
    swiper.on('init', initNumbers);
    swiper.on('slideNextTransitionStart', () => updateNumbers('next'));
    swiper.on('slidePrevTransitionStart', () => updateNumbers('prev'));

    // Если Swiper уже инициализирован, запускаем инициализацию
    if (swiper.initialized) initNumbers();
};