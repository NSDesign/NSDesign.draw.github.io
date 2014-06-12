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

	var i = 0;
	for (props in s) {

		var k = Object.keys(s)[i];
		var n = [ o.style + "." + k ];

		// console.log("A ", k);
		// console.log("B ", n);
		// console.log("C ", typeof s[props]);

		n = s[props];

		i += 1;
	}

};

ToggleButton.prototype.setToggleButtonValue = function(e, v) {

	e.value = v;
};

ToggleButton.prototype.toggleButtonClickEvent = function(e) {

	var newVal = ToggleBase.prototype.toggleBaseLogic.call(obj, e);

	if (newVal) {

		var styles = {
			backgroundColor : "black",
			color : "white",
			outlineOffset : "1px",
			padding : "6px",
			textAlign : "center",
			outline : "solid black 2px",
		};

		obj.setToggleButtonStyle(this, styles);

	} else {

		var styles = {
			backgroundColor : "white",
			color : "black",
			outlineOffset : "1px",
			padding : "6px",
			textAlign : "center",
			outline : "solid black 2px",
		};

		obj.setToggleButtonStyle(this, styles);
	}

	obj.setToggleButtonValue(e.currentTarget, newVal);
	// console.log(newVal);
};

ToggleButton.prototype.toggleButtonOverEvent = function(e) {

	this.style.outline = "solid black 4px";

};

ToggleButton.prototype.toggleButtonOutEvent = function(e) {

	this.style.outline = "solid black 2px";

};
