window.onload = windowLoaded;

var toggleButton = null;
function windowLoaded() {

	toggleButton = new ToggleButton();

}

var obj = null;
function ToggleButton() {

	ToggleBase.call(this);

	obj = this;
	this.element = document.getElementById("ToggleButton");

	this.element.addEventListener("click", this.toggleButtonClickEvent, false);
	this.element.addEventListener("mouseover", this.toggleButtonOverEvent,
			false);
	this.element.addEventListener("mouseout", this.toggleButtonOutEvent, false);
}

ToggleButton.prototype = Object.create(ToggleBase.prototype);

ToggleButton.prototype.setToggleButtonStyle = function(o, s) {

	o.outlineOffset = "1px";
	o.padding = "6px";
	o.textAlign = "center";
	o.outline = "solid black 2px";
	o = s;
};

ToggleButton.prototype.toggleButtonClickEvent = function(e) {

	var newVal = ToggleBase.prototype.toggleBaseLogic.call(obj, e);
	
	var style = {
		backgroundColor : "black";
		color : "white";	
	};
	
	// this.style.outlineOffset = "1px";
	// this.style.padding = "6px";
	// this.style.textAlign = "center";

	if (newVal) {
		
		this.setToggleButtonStyle(this.style, s)
		
	} else {

		this.style.backgroundColor = "white";
		this.style.color = "black";

	}

	e.currentTarget.value = newVal;

};

ToggleButton.prototype.toggleButtonOverEvent = function(e) {

	this.style.outline = "solid black 4px";

};

ToggleButton.prototype.toggleButtonOutEvent = function(e) {

	this.style.outline = "solid black 2px";

};
