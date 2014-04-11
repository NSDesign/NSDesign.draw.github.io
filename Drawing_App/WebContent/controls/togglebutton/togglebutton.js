
function ToggleButton(){

	ToggleBase.call(this, "ToggleButton");
	
}

ToggleButton.prototype = Object.create(ToggleBase.prototype);

console.log(ToggleButton.click);

/*
ToggleButton.prototype.toggleButtonClickEvent = function (e){
	
	this.style.outlineOffset = "1px";
	this.style.padding = "6px";
	this.style.textAlign = "center";
	
	if(this.state){
		
		this.style.backgroundColor = "black";
		this.style.color = "white";
		this.style.outline = "solid black 2px";
		
	}else{
		
		this.style.backgroundColor = "white";
		this.style.color = "black";
		this.style.outline = "solid black 2px";
	}
	
};
*/
ToggleButton.prototype.toggleButtonOverEvent = function (e){

	this.style.outline = "solid black 4px";
	
};

ToggleButton.prototype.toggleButtonOutEvent = function (e){
	
	this.style.outline = "solid black 2px";
	
};
