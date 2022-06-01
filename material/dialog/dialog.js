"use strict"

class Dialog{

    constructor(div){
        this.div = div
        this.divin = div.querySelector('.dialog-in')
        this.dialog_r = []
        this.opened = false

        if(this.div.classList.contains('dialog-on')) this.on()
        
        this.div.addEventListener('click', ()=>this.off())
        this.divin.addEventListener('click', (e) => e.stopPropagation())

        this.div.addEventListener('keyup', ()=>{ if(e.key == "Escape") this.removeLast() })
    }

    off(){
        this.div.classList.remove('dialog-on')
        this.div.classList.add('dialog-off')
        this.dialog_r.pop(this.div)
        this.opened = false
    }

    on(){
        this.div.classList.remove('dialog-off')
        this.div.classList.add('dialog-on')
        this.dialog_r.push(this.div)
        this.opened = true
    }

    toogle(){
        if(this.opened)
           this.off()
        else 
            this.on()
    }

    removeLast(){
        this.dialog_r.at(-1).dialog.off()
    }

    static init(){

        for(let i of document.querySelectorAll('.dialog'))
            i.dialog = new Dialog(i)
    
        for(let i of document.querySelectorAll('[dialog]')){
            i.addEventListener('click', ()=>{
                document.querySelector(i.getAttribute('dialog')).dialog.toogle()
            })
        }
    }
}

Dialog.init()
