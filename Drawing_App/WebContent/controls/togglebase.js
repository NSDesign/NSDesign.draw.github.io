
function ToggleBase(element){

	this.element = document.getElementById(element);
	this.style = this.element.style;
	
	this._state = false;
	this.state = {
			
		get : function(){
			
			return this._state;
			
		},
			
		set : function(value){
			
			 this._state = value;
			 
		},
	};
	
	this.click = this.element.addEventListener("click", this.toggleButtonClickEvent, false);
	this.over = this.element.addEventListener("mouseover", this.toggleButtonOverEvent, false);
	this.out = this.element.addEventListener("mouseout", this.toggleButtonOutEvent, false);

}

ToggleBase.prototype.toggleButtonClickEvent = function (e){
	
	if(this.state){
		
		this.state = false;		
	}else{
		
		this.state = true;	
	}
	
	e.target.value = this.state;
	
};

ToggleBase.prototype.toggleButtonOverEvent = function (e){};

ToggleBase.prototype.toggleButtonOutEvent = function (e){};
