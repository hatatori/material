class Collapse {

    constructor(el) {
        this.el = el
        this.el.isOpen = (this.el.classList.contains('collapse-off')) ? false : true
    }

    open() {
        this.el.isOpen = true
        this.el.style.transition = "0.5s"
        this.el.style.height = this.el.scrollHeight + "px"
        this.el.ontransitionend = () => {
            this.el.style.removeProperty('transition')
            this.el.style.removeProperty('height')
            this.el.classList.remove('collapse-off')
        }
    }

    close() {
        this.el.isOpen = false
        this.el.style.height = this.el.scrollHeight + "px"
        this.el.style.transition = "0.5s"
        setTimeout(() => {
            this.el.style.height = 0 + 'px'
        }, 0)
        this.el.ontransitionend = () => {
            this.el.style.removeProperty('transition')
            this.el.classList.add('collapse-off')
            this.el.style.removeProperty('height')
        }
    }

    toggle() {
        (this.el.isOpen) ? this.close(): this.open()
    }
}

for (i of document.querySelectorAll("[collapse]")) {
    elemento = document.querySelector(i.getAttribute('collapse'))
    elemento.collapse = new Collapse(elemento)
    i.addEventListener('click', () => {
        elemento.collapse.toggle()
    })
}

for (i of document.querySelectorAll("[collapsenext]")) {
    i.nextElementSibling.collapse = new Collapse(i.nextElementSibling)
    i.addEventListener('click', () => {
        i.nextElementSibling.collapse.toggle()
    })
}