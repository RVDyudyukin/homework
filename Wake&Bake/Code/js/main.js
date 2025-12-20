const btnBurger = document.querySelector(`.burger-icon`)
const body = document.body;

btnBurger.addEventListener('click', function () {
    if (body.classList.contains('body--opened-menu')) {
        body.classList.remove('body--opened-menu');
    } else {
        body.classList.add('body--opened-menu');
    }
});