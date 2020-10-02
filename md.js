// codigo
Codigo = document.querySelectorAll(".codigo")
for(i of Codigo){
	i.innerHTML = i.innerHTML.replace(/</g,"&lt;").replace(/\n/g,"<br>")


	// &lt;
	
}

// showhide

MdShowHide = document.querySelectorAll("*[mdshowhide]")

for(i of MdShowHide){

	el = i.getAttribute("mdshowhide")
	ele = document.querySelector("#"+el)
	ele.h = ele.offsetHeight
	ele.style.overflow='hidden'

	if(ele.s == undefined){
		ele.style.transition = '0.3s'
	}


	if(ele.classList.contains('close')){
		ele.style.transition = '0s'
		ele.style.height = 0
		ele.s = 1
		ele.classList.remove('close')
	}else{
		ele.style.height = ele.h
		ele.s = 0
	}

	i.onclick=function(){
		el = this.getAttribute("mdshowhide")
		ele = document.querySelector("#"+el)

		if(ele.s)
			open(ele)
		else
			close(ele)
	}
}

function open(div){ 
	div.style.transition = '0.3s'
	div.style.height = div.h 
	div.s = 0 
}
function close(div){ 
	div.style.transition = '0.3s'
	div.style.height = 0
	div.s = 1 
}

// modal

mdModalTigger = document.querySelectorAll(".md-modal-trigger")
mdModalOut = document.querySelectorAll(".md-modal-out")
mdModalIn = document.querySelectorAll(".md-modal-in")

for(i of mdModalTigger){
	i.onclick=function(e){
		d = document.querySelector("#"+this.getAttribute("for"))
		d.classList.remove("md-modal-out-off")
		d.classList.toggle("md-modal-out-on")
	}
}

for(i of mdModalOut){
	i.onclick=function(e){
		this.classList.toggle("md-modal-out-on")
		this.classList.toggle("md-modal-out-off")
	}
}

for(i of mdModalIn){
	i.onclick=function(e){
		e.stopPropagation()
	}
}

// alert

function alertar(texto){

	div = document.createElement("div")

	div.innerHTML= '<div class="md-alert-out"><div class="md-alert-in">'+texto+'</div></div>'

	document.body.appendChild(div)

	const MdAlertOut = div.querySelector(".md-alert-out")
	const MdAlertIn = div.querySelector(".md-alert-In")

	MdAlertIn.onclick=e=>{e.stopPropagation()}
	MdAlertOut.onclick=e=>{
		MdAlertOut.classList.add("md-alert-out-off")
		MdAlertIn.classList.add("md-alert-in-off")
		setTimeout(()=>{MdAlertOut.parentElement.remove()},200)
	}

}


TagCode = document.querySelectorAll("code")
for(i of TagCode)
	i.innerHTML = i.innerHTML.replace(/</g,"&lt;").replace(/\n/g,"<br>")


/* efeito ripple */

MdRip = document.querySelectorAll(".md-rip")

for(i of MdRip){

	if(i.querySelector(".md-ripple") == null){
		let div = document.createElement('div')
		div.classList.add('md-ripple')
		i.appendChild(div)
		setTimeout(()=>{div.remove()},0)
	}


	if(!i.getAttribute("ripcolor")){

		if(i.classList.contains("md-button-text") || i.classList.contains("md-button-outlined") && i.classList.contains("md-rip") )
			i.setAttribute("ripcolor","purple")

	}



	i.onmousedown=function(e){
		x = e.offsetX
		y = e.offsetY

		try{
			efeitoRipple(x,y,this)
		}catch(e){
			let div = document.createElement('div')
			div.classList.add('md-ripple')
			this.appendChild(div)
			
		}	
	}

	function efeitoRipple(x,y,el){
		let div = document.createElement('div')
		div.classList.add('md-ripple')
		div.style.left = x
		div.style.top = y

		cor = el.getAttribute("ripcolor")


		if(cor)
			div.style.backgroundColor = cor

		el.appendChild(div)
		setTimeout(()=>{div.remove()},1000)
	}
}



