const bar = document.getElementById('bar')
const menu = document.getElementById('menu')
const close = document.getElementById('close')

if (bar) {
    bar.addEventListener('click', () => {
        menu.classList.add('x')
    })
}

if (close) {
    close.addEventListener('click', () => {
        menu.classList.remove('x')
    })
}

const link = document.getElementsByClassName('link')

for (let i = 0; i < link.length; i++) {
    button = link[i]
    button.addEventListener('click', closeMenu)
}

function closeMenu() {
    menu.classList.remove('x')
}
