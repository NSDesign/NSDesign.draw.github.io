function ToggleBase() {

	Object.defineProperty(this, "state", {

		get : function() {
			// console.log("GET STATE", this._state);
			return this._state;

		},

		set : function(value) {
			// console.log("SET STATE", value);
			this._state = value;
		},

		enumerable : true,
		configurable : true
	});
	this.state = false;

	addEventListener("stateChanged", this.toggleBaseStateChanged, false);

}

ToggleBase.prototype.toggleBaseLogic = function(e) {

	if (this.state) {

		this.state = false;

	} else {

		this.state = true;
	}

	this.dispatchCustomEvent(e);

	return this.state;
};

ToggleBase.prototype.toggleBaseStateChanged = function(e) {

	var d = e.detail.currentState;
	console.log("ON CHANGED CURRENT STATE : ", d);
};

ToggleBase.prototype.dispatchCustomEvent = function(e) {

	e.preventDefault();

	var event = new CustomEvent("stateChanged", {
		detail : {
			currentState : this.state
		},
		bubbles : true,
		cancelable : true
	});

	e.currentTarget.dispatchEvent(event);

};
