window.onload=function(){

	
	style = '/*box*/  .md-box{  overflow: hidden;  /*transition: 0.3s;*/ }  /*cores*/ .danger{  background-color: #c62828;  color: white; }  .success{  background-color: #198754;  color: white; }  .primary{  background-color: #0d6efd;  color: white; }  .dark{  background-color: #212529;  color: white; }  .light{  background-color: #efefef;  color: black; }  /*button*/  .md-bt{  font-family: monospace;  font-size: 14;  outline: none;  font-weight: 500;  padding: 0px 8px;  border-radius: 4px;  border: solid 0px #6200ee;  height: 30;  transition: 0.2s; }  .md-bt:hover{box-shadow: 0px 0px 5px rgba(0,0,0,.4);}  /*DIALOG*/  .md-dialog > *{transition: 0.2s;}  .md-dialog{  width: 100%;  height: 100%;  background-color: rgba(0,0,0,0.3);  position: fixed;  top: 0;  left: 0;  display: flex;  justify-content: center;  align-items: center;  visibility: hidden; }  .md-dialog .md-dialog-content{margin-bottom: 100px}  .md-dialog-content{  background-color: white;  border-radius: 3px;  box-shadow: 0px 10px 10px rgba(0,0,0,0.2);  padding: 10; }  .md-dialog-square{  width: 600;  height: 300;  max-width: 90%;  max-height: 90%;  overflow: auto; }  .md-dialog-off{  animation: dialog-off 0.2s forwards; }  .md-dialog-on{ animation: dialog-on 0.2s forwards; } .md-dialog-on .md-dialog-content{margin-bottom: 0 }  .md-dialog-off .md-dialog-content{margin-bottom: 100px;}  @keyframes dialog-off{  0%{opacity: 1;visibility: visible;}  100%{opacity: 0;visibility: hidden;display: none;} }  @keyframes dialog-on{  0%{opacity: 0;visibility: hidden;}  100%{opacity: 1;visibility: visible;} }  /*alert*/  .md-alerta *{transition: 0.3}  .md-alerta{  width: 100%;  height: 100%;  background-color: rgba(0,0,0,0.3);  position: fixed;  top: 0;  left: 0;  display: flex;  justify-content: center;  align-items: center; }  .md-alerta-content{  background-color: white;  border-radius: 3px;  box-shadow: 0px 10px 10px rgba(0,0,0,0.2);  padding: 10;  max-height: 90%;  max-width: 90%; }  .md-alerta-content > *{  max-height: 90vh;  max-width: 90vw; }   .md-alerta-off{ animation: alerta-off 0.2s forwards; } .md-alerta-on{ animation: alerta-on 0.2s forwards; }  .md-alerta-off .md-alerta-content{animation: up 0.2s forwards} .md-alerta-on .md-alerta-content{animation: down 0.2s forwards}  @keyframes alerta-off{  0%{opacity: 1;visibility: visible;}  100%{opacity: 0;visibility: hidden;} }  @keyframes alerta-on{  0%{opacity: 0;visibility: hidden;}  100%{opacity: 1;visibility: visible;} }  @keyframes down{  0%{margin-bottom: 50px}  100%{margin-bottom: 0px} }  @keyframes up{  0%{margin-bottom: 0px}  100%{margin-bottom: 50px} }'
	st = document.createElement("style")
	st.innerHTML = style
	document.head.appendChild(st)


	// BOX

	class Box{
		constructor(div){

			this.div = div
			this.h = this.div.offsetHeight
			this.n = 1
			this.aux = this.div.parentElement


			var s = setInterval(function(){
				if(this.div.classList.value.match(/md-box/g) && this.div.scrollHeight != 0){
					this.div.style.height = this.div.scrollHeight
					this.h = this.div.scrollHeight
					
					if(this.div.classList.value.match(/md-box-close/g)){
						this.div.style.height = 0
						this.close()
					}
					
					clearInterval(s)
				}
			}.bind(this),0)
		}

		open(){
			this.div.style.height = this.div.scrollHeight
			this.div.style.opacity=1
			this.n = 1
			this.div.style.visibility='visible'
		}

		close(){
			this.div.style.height = 0
			this.div.style.opacity=0
			this.div.style.visibility='hidden'
			this.n = 0
		}

		toggle(){
			if(this.n == 0)
				this.open()
			else
				this.close()

			this.div.style.transition="0.2s"
		}
	}


	mdBox = document.querySelectorAll(".md-Box")
	for(l of mdBox){
		l.box = new Box(l)
	}

	for(i of document.querySelectorAll("[boxopen]")){
		i.addEventListener('click',function(e){
			el = document.getElementById(this.getAttribute('boxopen'))
			el.box.toggle()
		})
	}

	// DIALOG

	class Dialog{

		constructor(div){
			this.div = div
			this.inside = this.div.querySelector(".md-dialog-content")
			
			this.div.onclick=function(e){
				this.close()
			}.bind(this)

			this.inside.onclick= e =>{e.stopPropagation()}
		}

		open(div){
			this.div.classList.add("md-dialog-on")
			this.div.classList.remove("md-dialog-off")
		}

		close(div){
			this.div.classList.add("md-dialog-off")
			this.div.classList.remove("md-dialog-on")
		}

		toggle(div){
			if(this.div.classList.value.match("md-dialog-on"))
				this.close()
			else
				this.open()
		}

	}

	dialogs = document.querySelectorAll(".md-dialog")

	for(i of dialogs){
		i.dialog = new Dialog(document.querySelector("#"+i.id))
	}

	for(j of document.querySelectorAll("[dialogopen]")){
		j.onclick=function(e){
			document.querySelector("#"+this.getAttribute("dialogopen")).dialog.open()
		}
	}

	for(j of document.querySelectorAll("[dialogclose]")){
		j.onclick=function(e){
			document.querySelector("#"+this.getAttribute("dialogclose")).dialog.close()
		}
	}

	for(j of document.querySelectorAll("[dialogtoggle]")){
		j.onclick=function(e){
			document.querySelector("#"+this.getAttribute("dialogtoggle")).dialog.toggle()
		}
	}



	// ALERTA

	class Alerta{

		constructor(div){
			this.div = div
			this.inside = this.div.querySelector(".md-alerta-content")
			
			this.div.onclick=function(e){
				this.close()
			}.bind(this)

			this.inside.onclick=e=>{e.stopPropagation()}
		}

		open(div){
			this.div.classList.add("md-alerta-on")
			this.div.classList.remove("md-alert-off")
		}

		close(div){
			this.div.classList.add("md-alerta-off")
			this.div.classList.remove("md-alerta-on")	
			setTimeout(function(){
				this.div.remove()
			}.bind(this),300)
		}

		toggle(div){
			if(this.div.classList.value.match("md-alerta-on"))
				this.close()
			else
				this.open()
		}

	}

	function alertar(valor){

		div = document.createElement("div")
		div.classList.add("md-alerta")
		div.innerHTML = "<div class='md-alerta-content'>"+valor+"</div>"
		document.body.appendChild(div)
		div.classList.add("md-alerta-on")

		al = document.querySelectorAll(".md-alerta")

		for(i of al){
			i.alerta = new Alerta(i)
		}
	}

	for(j of document.querySelectorAll("[alertar]")){
		j.onclick=function(e){
			alertar(this.getAttribute("alertar"))
		}
	}


	// CODIGO
	codigos = document.querySelectorAll("code")
	for(i of codigos){
		i.innerHTML = i.innerHTML.replace(/</g,"&lt;").replace(/\n/g,"<br>")
	}


	

}