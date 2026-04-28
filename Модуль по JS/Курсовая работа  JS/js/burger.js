export default class BurgerMenu {
	constructor(config, headerFixedInstance = null) {
		this.config = config;
		this.burgerButton = document.querySelector(`.${this.config.BURGER}`);
		this.burgerMenu = document.querySelector(`.${this.config.HEADER_MENU}`);
		this.body = document.querySelector(`.${this.config.PAGE_BODY}`);
		this.headerFixedInstance = headerFixedInstance;
		this.main = document.querySelector(`.${this.config.MAIN}`);

		if (!this.burgerButton || !this.burgerMenu || !this.body) {
			throw new Error('Required DOM elements are missing.');
		}

		this.isMobileView = window.innerWidth <= this.config.BREAKPOINT;

		this.onBurgerClick = this.onBurgerClick.bind(this);
		this.onBodyClick = this.onBodyClick.bind(this);
		this.handleTouchStart = this.handleTouchStart.bind(this);
		this.handleTouchMove = this.handleTouchMove.bind(this);
		this.handleTouchEnd = this.handleTouchEnd.bind(this);
		this.onWindowResize = this.onWindowResize.bind(this);

		this.manageEvents();
		window.addEventListener('resize', this.onWindowResize);
	}

	manageEvents() {
		if (this.isMobileView) {
			this.initEvents();
		} else {
			this.removeEvents();
			this.hideBurgerMenu();
		}
	}

	initEvents() {
		// Click events
		this.burgerButton.addEventListener('click', this.onBurgerClick);
		this.body.addEventListener('click', this.onBodyClick);

		// Touch events
		this.body.addEventListener('touchstart', this.handleTouchStart);
		this.body.addEventListener('touchmove', this.handleTouchMove);
		this.body.addEventListener('touchend', this.handleTouchEnd);
	}

	removeEvents() {
		// Click events
		this.burgerButton.removeEventListener('click', this.onBurgerClick);
		this.body.removeEventListener('click', this.onBodyClick);

		// Touch events
		this.body.removeEventListener('touchstart', this.handleTouchStart);
		this.body.removeEventListener('touchmove', this.handleTouchMove);
		this.body.removeEventListener('touchend', this.handleTouchEnd);
	}

	onWindowResize() {
		const isNowMobileView = window.innerWidth <= this.config.BREAKPOINT;

		if (this.isMobileView !== isNowMobileView) {
			this.isMobileView = isNowMobileView;
			this.manageEvents();
		}
	}

	// Click events
	onBurgerClick() {
		const isOpen = this.burgerButton.classList.toggle(this.config.BURGER_OPEN);
		const header = document.querySelector('.header');
		if (header) {
			header.classList.toggle('header--open', isOpen);
		}
		this.burgerButton.ariaLabel = isOpen
			? this.config.lABEL.CLOSE
			: this.config.lABEL.OPEN;
		this.burgerButton.ariaExpanded = isOpen;
		this.burgerMenu.classList.toggle(this.config.HEADER_MENU_OPEN, isOpen);
		this.body.classList.toggle(this.config.PAGE_BODY_NO_SCROLL, isOpen);

		if (this.main) {
			this.main.style.pointerEvents = isOpen ? 'none' : '';
		}

		if (this.headerFixedInstance) {
			if (isOpen) {
				this.headerFixedInstance.removeFixedClass();
			} else {
				this.headerFixedInstance.updateFixedClass();
			}
		}
	}

	hideBurgerMenu() {
		const wasOpen = this.isBurgerMenuOpen();
		this.burgerButton.classList.remove(this.config.BURGER_OPEN);
		this.burgerButton.ariaLabel = this.config.lABEL.OPEN;
		this.burgerButton.ariaExpanded = false;
		this.burgerMenu.classList.remove(this.config.HEADER_MENU_OPEN);
		this.body.classList.remove(this.config.PAGE_BODY_NO_SCROLL);

		if (this.main) {
			this.main.style.pointerEvents = '';
		}

		if (wasOpen && this.headerFixedInstance) {
			this.headerFixedInstance.updateFixedClass();
		}
	}

	isBurgerMenuOpen() {
		return this.burgerMenu.classList.contains(this.config.HEADER_MENU_OPEN);
	}

	onBodyClick(event) {
		const target = event.target;
		const isLinkInMenu = target.classList.contains(this.config.MENU_LINK);
		const isMenuOpen = this.isBurgerMenuOpen();
		const isClickOutsideMenu =
			!target.closest(`.${this.config.HEADER_MENU}`) &&
			!target.closest(`.${this.config.BURGER}`);

		if (
			(isLinkInMenu && window.innerWidth <= this.config.BREAKPOINT) ||
			(isMenuOpen && isClickOutsideMenu)
		) {
			this.hideBurgerMenu();
		}
	}

	// Touch events
	handleTouchStart(event) {
		if (!this.isBurgerMenuOpen()) return;
		this.touchStartY = event.changedTouches[0].screenY;
		this.burgerMenu.style.transition = 'none';
		this.burgerMenu.style.transform = '';
	}

	handleTouchMove(event) {
		if (!this.isBurgerMenuOpen()) return;
		const currentY = event.changedTouches[0].screenY;
		const deltaY = currentY - this.touchStartY;
		if (deltaY < 0) {
			this.burgerMenu.style.transform = `translateY(${deltaY}px)`;
		} else {
			this.burgerMenu.style.transform = 'translateY(0px)';
		}
	}

	handleTouchEnd(event) {
		if (!this.isBurgerMenuOpen()) return;
		const touchEndY = event.changedTouches[0].screenY;
		const swipeDistance = touchEndY - this.touchStartY;

		this.burgerMenu.style.transition = '';
		this.burgerMenu.style.transform = '';

		if (swipeDistance < -70) {
			this.hideBurgerMenu();
		}
	}
}
