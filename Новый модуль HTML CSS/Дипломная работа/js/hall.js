export const hall = () => {
    const hallList = document.querySelector('[data-hall="list"]');
    const hallButtons = document.querySelectorAll('[data-hall="button"]');
    
    // Получаем все блоки с характеристиками
    const characteristicsOne = document.querySelector('.hall__characteristics-one');
    const characteristicsTwo = document.querySelector('.hall__characteristics-two');
    const characteristicsThree = document.querySelector('.hall__characteristics-three');
    const characteristicsFour = document.querySelector('.hall__characteristics-four');
    
    // Массив всех характеристик
    const characteristics = [
        characteristicsOne,
        characteristicsTwo,
        characteristicsThree,
        characteristicsFour
    ];
    
    // Функция для скрытия всех характеристик
    const hideAllCharacteristics = () => {
        characteristics.forEach(char => {
            if (char) {
                char.style.display = 'none';
            }
        });
    };
    
    // Функция для показа выбранных характеристик
    const showCharacteristic = (index) => {
        hideAllCharacteristics();
        if (characteristics[index]) {
            characteristics[index].style.display = 'flex';
        }
    };
    
    // Инициализация: показываем первый зал
    if (characteristicsOne) {
        characteristicsOne.style.display = 'flex';
    }
    
    // Функция для обновления большого изображения и миниатюр
    const updateHallImages = (hallNumber) => {
        // Определяем, какой слайдер сейчас видим
        const isDesktop = window.innerWidth > 1220;
        let bigImage, thumbContainer;
        
        if (isDesktop) {
            const desktopBlock = document.querySelector('.hall__img-desktop');
            if (desktopBlock) {
                bigImage = desktopBlock.querySelector('#bigImage');
                thumbContainer = desktopBlock.querySelector('#thumbContainer');
            }
        } else {
            const mobileBlock = document.querySelector('.hall__img-mobile');
            if (mobileBlock) {
                bigImage = mobileBlock.querySelector('#bigImage');
                thumbContainer = mobileBlock.querySelector('#thumbContainer');
            }
        }
        
        if (!bigImage || !thumbContainer) return;
        
        // Массив с данными для каждого зала
        const hallImages = {
            1: {
                large: './imgs/hall-slider/hall1-large.jpeg',
                thumbs: [
                    './imgs/hall-slider/hall1-1.jpeg',
                    './imgs/hall-slider/hall1-2.jpeg',
                    './imgs/hall-slider/hall1-3.jpeg',
                    './imgs/hall-slider/hall1-4.jpeg',
                    './imgs/hall-slider/hall1-5.jpeg'
                ]
            },
            2: {
                large: './imgs/hall-slider/hall1-1.jpeg',
                thumbs: [
                    './imgs/hall-slider/hall1-large.jpeg',
                    './imgs/hall-slider/hall1-2.jpeg',
                    './imgs/hall-slider/hall1-3.jpeg',
                    './imgs/hall-slider/hall1-4.jpeg',
                    './imgs/hall-slider/hall1-5.jpeg'
                ]
            },
            3: {
                large: './imgs/hall-slider/hall1-2.jpeg',
                thumbs: [
                    './imgs/hall-slider/hall1-1.jpeg',
                    './imgs/hall-slider/hall1-large.jpeg',
                    './imgs/hall-slider/hall1-3.jpeg',
                    './imgs/hall-slider/hall1-4.jpeg',
                    './imgs/hall-slider/hall1-5.jpeg'
                ]
            },
            4: {
                large: './imgs/hall-slider/hall1-3.jpeg',
                thumbs: [
                    './imgs/hall-slider/hall1-1.jpeg',
                    './imgs/hall-slider/hall1-2.jpeg',
                    './imgs/hall-slider/hall1-large.jpeg',
                    './imgs/hall-slider/hall1-4.jpeg',
                    './imgs/hall-slider/hall1-5.jpeg'
                ]
            }
        };
        
        const images = hallImages[hallNumber];
        if (images) {
            // Обновляем большую картинку
            bigImage.src = images.large;
            
            // Обновляем миниатюры
            const thumbs = thumbContainer.querySelectorAll('.thumb');
            thumbs.forEach((thumb, index) => {
                if (images.thumbs[index]) {
                    thumb.src = images.thumbs[index];
                    thumb.setAttribute('data-full', images.thumbs[index]);
                }
            });
            
            // Сбрасываем активный класс на первой миниатюре
            const wrappers = thumbContainer.querySelectorAll('.thumb-wrapper');
            wrappers.forEach(w => w.classList.remove('active'));
            if (wrappers[0]) {
                wrappers[0].classList.add('active');
            }
            
            // Сбрасываем счетчик слайдов на 1
            const activeDigitSpan = document.querySelector('.number-slide__active-digit');
            if (activeDigitSpan) {
                activeDigitSpan.textContent = '1';
            }
            
            // Обновляем currentSlide через глобальную переменную, если она есть
            if (window.currentSlide) {
                window.currentSlide = 1;
            }
            
            // Перезапускаем анимацию тени
            bigImage.classList.remove('active');
            void bigImage.offsetWidth;
            bigImage.classList.add('active');
        }
    };

    const handleSizeClick = (event) => {
        const target = event.target;

        if (!target?.classList.contains("hall-number__button")) return;

        // Получаем номер зала из текста кнопки
        const buttonText = target.textContent;
        let hallNumber = 1;
        
        if (buttonText.includes('№1') || buttonText.includes('1')) {
            hallNumber = 1;
        } else if (buttonText.includes('№2') || buttonText.includes('2')) {
            hallNumber = 2;
        } else if (buttonText.includes('№3') || buttonText.includes('3')) {
            hallNumber = 3;
        } else if (buttonText.includes('№4') || buttonText.includes('4')) {
            hallNumber = 4;
        }

        // Переключаем активный класс у кнопок
        hallButtons.forEach((button) =>
            button.classList.remove("hall-number__button--active")
        );
        target.classList.add("hall-number__button--active");
        
        // Показываем соответствующие характеристики
        showCharacteristic(hallNumber - 1);
        
        // Обновляем изображения зала
        updateHallImages(hallNumber);
    };

    if (hallList) {
        hallList.addEventListener("click", handleSizeClick);
    }
    
    // Инициализация изображений для первого зала
    updateHallImages(1);
};