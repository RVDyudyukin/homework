export const productSlider = () => {
    new Swiper(".product__slider", {
        sliderPerView: "auto",
        centeredSlider: true,
        loop: true,
        mousewheel: {
            forceToAxis: true,
        },
        navigation: {
            prevEl: ".product__slider-button--prev",
            nextEl: ".product__slider-button--next",
        },
    });
};
