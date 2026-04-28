import HeaderFixed from "./header.js";
import BurgerMenu from "./burger.js";
import Modal from "./modal.js";
import Modal__feedback from "./modal-feedback.js";
import { hall } from "./hall.js";
import { hallSlider } from "./hall-slider.js";
import { reservationSlider } from "./reservation-slider.js";
import initGoUpstairsButton from './scroll-button.js';

try {
    const headerFixed = new HeaderFixed({
        HEADER: "header",
        HEADER_FIXED: "header--fixed",
    });

    new BurgerMenu(
        {
            BURGER: "burger",
            BURGER_OPEN: "burger--open",
            HEADER_MENU: "header",
            HEADER_MENU_OPEN: "header--open",
            CONTAINER_MENU: "header__container",
            CONTAINER_MENU_OPEN: "header__container--open",
            lABEL: {
                OPEN: "Открыть меню",
                CLOSE: "Закрыть меню",
            },
            PAGE_BODY: "page__body",
            PAGE_BODY_NO_SCROLL: "page__body--no-scroll",
            MENU_LINK: "header__actions",  //у меня nav, у лектора menu
            BREAKPOINT: 1220,
            MAIN: "main",
        },
        headerFixed,
    );

    new Modal({
        PAGE_BODY: "page__body",
        PAGE_BODY_NO_SCROLL: "page__body--no-scroll",
    });

    new Modal__feedback({
        PAGE_BODY: "page__body",
        PAGE_BODY_NO_SCROLL: "page__body--no-scroll",
    });

    hall();
    hallSlider();
    reservationSlider();
    initGoUpstairsButton();
} catch (error) {
    console.error(error);
}