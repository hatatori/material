
class MenuJanela{

	constructor(e){
		
		this.el = e
		this.son = this.el.querySelector(".md-menu-in")
		this.n = 0

		this.son.onclick=function(e){
			e.stopPropagation()
		}

		var t = this
		this.el.onclick = () => t.off()

		if(e.classList.contains("md-menu-out")){
			e.classList.remove("md-menu-out")
			e.classList.add("md-menu-out-off")
			this.n = 1
		}
	}

	off(){
		this.n = 1	
		this.el.classList.remove("md-menu-out-on")
		this.el.classList.add("md-menu-out-off")
	}

	on(){
		this.n = 0
		this.el.classList.add("md-menu-out-on")
		this.el.classList.remove("md-menu-out-off")
	}

	toggle(){
		if(this.n)
			this.on()
		else
			this.off()
	}
}


