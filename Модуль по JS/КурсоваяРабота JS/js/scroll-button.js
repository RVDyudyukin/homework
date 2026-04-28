export default function initGoUpstairsButton() {
    const goUpButton = document.querySelector('.go-upstairs');
    if (!goUpButton) return;

    goUpButton.classList.add('go-upstairs--hidden');

    const checkScroll = () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const windowHeight = window.innerHeight;
        const maxScroll = scrollHeight - windowHeight;
        const currentScroll = window.scrollY;

        if (maxScroll > 0 && currentScroll >= maxScroll * 0.5) {
            goUpButton.classList.remove('go-upstairs--hidden');
        } else {
            goUpButton.classList.add('go-upstairs--hidden');
        }
    };

    let ticking = false;
    const onScroll = () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                checkScroll();
                ticking = false;
            });
            ticking = true;
        }
    };

    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', checkScroll);
    checkScroll();
}