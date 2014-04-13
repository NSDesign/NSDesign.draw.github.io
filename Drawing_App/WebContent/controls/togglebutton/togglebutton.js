

window.onload = windowLoaded;

var toggleButton;
function windowLoaded(){
	
	toggleButton = new ToggleButton();

}

function ToggleButton(){

	ToggleBase.call(this, "ToggleButton");

}

ToggleButton.prototype = Object.create(ToggleBase.prototype);


ToggleButton.prototype.toggleButtonClickEvent = function (e){
	
	var self = eval(e.currentTarget.id);
	self = new self();
	
	//console.log("ON CLICK : ", self, toggleButton);
	
	this.style.outlineOffset = "1px";
	this.style.padding = "6px";
	this.style.textAlign = "center";
	
	if(toggleButton.state){
		
		toggleButton.state = false;
		
		this.style.backgroundColor = "black";
		this.style.color = "white";
		this.style.outline = "solid black 2px";	
	}else{
		
		toggleButton.state = true;
		
		this.style.backgroundColor = "white";
		this.style.color = "black";
		this.style.outline = "solid black 2px";	
	}
	
	e.currentTarget.value = toggleButton.state;
	
	
	
	//console.log("TOGGLEBUTTON", self);
	toggleButton.dispatchCustomEvent(e);
	
};

ToggleButton.prototype.toggleButtonOverEvent = function (e){

	this.style.outline = "solid black 4px";
	
};

ToggleButton.prototype.toggleButtonOutEvent = function (e){
	
	this.style.outline = "solid black 2px";
	
};
