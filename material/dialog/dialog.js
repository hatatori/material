const dialog_r = []

class Dialog{

    constructor(div){
        this.a = div
        this.b = this.a.querySelector(".dialog-in")
        this.is_opened = false
        this.init()
    }

    init(){

        this.b.addEventListener('click', e=>{
            e.stopPropagation()
        })

        this.a.addEventListener('click', e=>{
            this.off()
        })
    }

    off(){
        this.a.classList.add('dialog-off')
        this.is_opened = false
        dialog_r.pop()
    }

    on(){
        this.a.classList.remove('dialog-off')
        this.is_opened = true
        dialog_r.push(this.a)
    }

    toggle(){
        this.is_opened ? this.off() : this.on()
    }
}

window.addEventListener('keyup',e=>{
    if(e.key == 'Escape' && dialog_r.length > 0)
        dialog_r[dialog_r.length-1].dialog.off()
})

for(i of document.querySelectorAll(".dialog")){
    i.dialog = new Dialog(i)
}

for(i of document.querySelectorAll("[dialog]")){
    i.addEventListener('click', function(){
        document.querySelector(this.getAttribute("dialog")).dialog.toggle()
    })
}

