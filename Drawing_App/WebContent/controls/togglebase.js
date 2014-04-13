
function ToggleBase(element){

	this.element = document.getElementById(element);
	this.style = this.element.style;
	
	Object.defineProperty(this, "state", {
	
			get : function(){
				//console.log("GET STATE");
				return this._state;
				
			},
				
			set : function(value){
				//console.log("SET STATE");
				 this._state = value;
			},
			
	        enumerable : true,
	        configurable : true
		}
	);
	
	this.element.addEventListener("click", this.toggleButtonClickEvent, false);
	this.element.addEventListener("mouseover", this.toggleButtonOverEvent, false);
	this.element.addEventListener("mouseout", this.toggleButtonOutEvent, false);
	
	this.element.addEventListener("stateChanged", this.toggleButtonStateChanged, false);

}

ToggleBase.prototype.toggleButtonClickEvent = function (e){

	//NOT SURE ABOUT NEWING SELF IN THIS WAY REFER TO TOGGLEBUTTON INSTANCE FOR POSSIBLE SOLUTION ALTHOUGH THIS INSTANCE IS BASE ???
	/*
	var self = eval(e.currentTarget.id);
	self = new self();
	
	if(self.state){
		
		self.state = false;		
		
	}else{
		
		self.state = true;		
	}
	
	e.currentTarget.value = self.state;

	self.dispatchCustomEvent(e);
	*/
};

ToggleBase.prototype.toggleButtonOverEvent = function (e){};

ToggleBase.prototype.toggleButtonOutEvent = function (e){};

ToggleBase.prototype.dispatchCustomEvent = function (e){
	
	e.preventDefault();
	
	var event = new CustomEvent("stateChanged", {
		detail: {currentState: this.state}, 
		bubbles : true, 
		cancelable : true
		}
	);
	
	e.currentTarget.dispatchEvent(event);
	
};

ToggleBase.prototype.toggleButtonStateChanged = function (e){
	
	var d = e.detail.currentState;
	//console.log("ON CHANGED CURRENT STATE : ", d);
};
