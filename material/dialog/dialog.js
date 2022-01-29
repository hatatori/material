const dialog_r = []

class Dialog{

    constructor(div){
        this.a = div
        this.b = this.a.querySelector(".dialog-in")
        this.is_opened = false
        this.init()
    }

    init(){
        this.a.classList.add('hidden','opacity-0')
        this.b.classList.add('scale-75', 'opacity-0')

        this.b.addEventListener('click', e=>e.stopPropagation())
        this.a.addEventListener('click', e=>this.off())

        document.addEventListener('keyup', e=> {if(e.key == "Escape") {
            document.querySelectorAll(".dialog-on")
        }} )
    }

    off(){
        this.a.classList.remove('dialog-on')
        this.a.classList.add('opacity-0')
        this.b.classList.add('scale-75', 'opacity-0')
        setTimeout(()=>{ 
            this.a.classList.add('hidden')
        },150)
        this.is_opened = false
        dialog_r.pop()
    }

    on(){
        this.a.classList.add('dialog-on')
        this.a.classList.remove('hidden')
        // this.b.classList.add('scale-75')
        setTimeout(()=>{ 
            this.a.classList.remove('opacity-0') 
            this.b.classList.remove('scale-75', 'opacity-0')
        },0)
        this.is_opened = true
        dialog_r.push(this.a)
    }

    toggle(){
        if(this.is_opened)
            this.off()
        else
            this.on()
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

