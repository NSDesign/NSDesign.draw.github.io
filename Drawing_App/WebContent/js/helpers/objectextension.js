/**
 * @author Nick Sullivan
 */

function createControl( element, objPropsDefault, objProps ){

	var objPropsDefaults = objPropsDefault[ objProps ];
	var Control = document.createElement( objPropsDefaults.control );

	Control.type = objPropsDefaults.type;
	Control.value = objPropsDefaults.value;
	objPropsDefaults.step ? Control.step = objPropsDefaults.step : false;
	objPropsDefaults.min ? Control.min = objPropsDefaults.min : false;
	objPropsDefaults.max ? Control.max = objPropsDefaults.max : false;
	objPropsDefaults.label ? Control.name = objPropsDefaults.label : false;

	return objPropsDefaults.extend ? UTILITIES.EXTENSIONS.OBJECTS.COPY_OBJECT( new objPropsDefaults.extend( element, objPropsDefault, objProps, Control ), Control ) : Control;
};

//------------------------------------------------------------------<

function controlBase( element, objPropsDefault, objProps, control ){

	//this.previousValue = undefined;
	//this.currentValue = objPropsDefault.value;

	this.element = element;
	this.objPropsDefault = objPropsDefault;
	this.objProps = objProps;
	this.control = control;

	this.control.addEventListener( "valueChanged", this.valueChanged, false );
	this.control.addEventListener( "change", this.Logic, false );
	//element.addEventListener( "input", this.Logic, false );
	//element.addEventListener( "focus", this.Logic, false );

/*
	function valueChanged( e ) {

		Update( e, obj );
	}

	function Logic( e ){

		val = !val;
		e.currentTarget.value = val;

		DispatchCustomEvent( e );
	}

	function DispatchCustomEvent( e ) {

			//e.preventDefault();

		var event = new CustomEvent( "valueChanged", {
			detail : {
				currentValue : e.currentTarget.value
			},
			bubbles : true,
			cancelable : true
		});

		e.currentTarget.dispatchEvent( event );
	}

	function Update( e, o ){

		if( o.isPixel ){

			o.bindElement.style[ o.bindProperty ] = e.currentTarget.value + "px";
		}else{

			if(obj.isFunction){

				o.bindElement[ o.bindProperty ]( e.currentTarget.value );
			}else{
			//console.log( o.bindElement, o.bindProperty);
				o.bindElement[ o.bindProperty ] = e.currentTarget.value;
			}
		}
	}
*/

}

controlBase.prototype.initialise = function( e ){
	console.log("control loaded");
	//this.Update( e, element.obj );
};

controlBase.prototype.valueChanged = function( e ){

	this.Update( e, this.objPropsDefault[ this.objProps ] );
};

controlBase.prototype.Logic = function( e ){


	//this.previousValue = this.currentValue;
	//this.currentValue = e.currentTarget.value;


	if( e.type == "change" ){

		this.DispatchCustomEvent( e );
	}
};

controlBase.prototype.DispatchCustomEvent = function( e ){

	//e.preventDefault();
	//console.log(e.type, ":", e.currentTarget.value);

	var event = new CustomEvent( "valueChanged", {
		detail : {
			currentValue : e.currentTarget.value
		},
		bubbles : true,
		cancelable : true
	});

	e.currentTarget.dispatchEvent( event );
};

controlBase.prototype.Update = function( e, o ){

	this.element.objectPropertiesDefault[ this.objProps  ].value = e.detail.currentValue;
/*
	if( o.isPixel ){

		o.bindElement.style[ o.bindProperty ] = e.detail.currentValue + "px";
	}else{

		if(o.isFunction){

			o.bindElement[ o.bindProperty ]( e.detail.currentValue );
		}else{

			o.bindElement[ o.bindProperty ] = e.detail.currentValue;
		}
	}

	console.log(e.type, ":", e.currentTarget.value);
*/
};

//------------------------------------------------------------------<

function inputNumber( element, objPropsDefault, objProps, control ){

	controlBase.call( this, element, objPropsDefault, objProps, control );

	/*
	this.previousValue = undefined;
	this.currentValue = obj.value;
	*/
	/*
	element.addEventListener("valueChanged", valueChanged, false);
	function valueChanged( e ) {

		Update( e, obj );
	}
	*/

	/*
	element.addEventListener("mousedown", onMouseDown, false);
	function onMouseDown( e ){

		this.Logic( e );
	}

	element.addEventListener("mouseup", onMouseUp, false);
	function onMouseUp( e ){

		this.Logic( e );
	}

	element.addEventListener("keydown", onKeyDown, false);
	function onKeyDown( e ){

		this.Logic( e );
	}

	element.addEventListener("keyup", onKeyUp, false);
	function onKeyUp( e ){

		this.Logic( e );
	}
	*/
	/*
	element.addEventListener("click", onClicked, false);
	function onClicked( e ){

		Logic( e );
	}


	function Logic( e ){

		previousValue = currentValue;
		currentValue = e.currentTarget.value;

		if(previousValue != currentValue){

			this.DispatchCustomEvent( e );
		}
	}


	function DispatchCustomEvent( e ) {

			//e.preventDefault();

		var event = new CustomEvent( "valueChanged", {
			detail : {
				currentValue : e.currentTarget.value
			},
			bubbles : true,
			cancelable : true
		});

		e.currentTarget.dispatchEvent( event );
	}

	function Update( e, o ){

		if( o.isPixel ){

			o.bindElement.style[ o.bindProperty ] = e.currentTarget.value + "px";
		}else{

			if(obj.isFunction){

				o.bindElement[ o.bindProperty ]( e.currentTarget.value );
			}else{
			//console.log( o.bindElement, o.bindProperty);
				o.bindElement[ o.bindProperty ] = e.currentTarget.value;
			}
		}
	}
	*/
}

inputNumber.prototype = Object.create( controlBase.prototype );

/*
inputNumber.prototype.Logic = function( e ){

	this.previousValue = this.currentValue;
	this.currentValue = e.currentTarget.value;

	if( this.previousValue != this.currentValue ){

		this.DispatchCustomEvent( e );
	}
};
*/


//------------------------------------------------------------------<

function rangeSlider( element, objPropsDefault, objProps, control ){

	controlBase.call( this, element, objPropsDefault, objProps, control );

	/*
	this.previousValue = undefined;
	this.currentValue = obj.value;
	*/
	/*
	element.addEventListener("valueChanged", valueChanged, false);
	function valueChanged( e ) {

		Update( e, obj );
	}
	*/

	/*
	element.addEventListener("click", onClicked, false);
	function onClicked( e ){

		Logic( e );
	}


	function Logic( e ){

		previousValue = currentValue;
		currentValue = e.currentTarget.value;

		if(previousValue != currentValue){

			this.DispatchCustomEvent( e );
		}
	}


	function DispatchCustomEvent( e ) {

			//e.preventDefault();

		var event = new CustomEvent( "valueChanged", {
			detail : {
				currentValue : e.currentTarget.value
			},
			bubbles : true,
			cancelable : true
		});

		e.currentTarget.dispatchEvent( event );
	}

	function Update( e, o ){

		if( o.isPixel ){

			o.bindElement.style[ o.bindProperty ] = e.currentTarget.value + "px";
		}else{

			if(obj.isFunction){

				o.bindElement[ o.bindProperty ]( e.currentTarget.value );
			}else{
			//console.log( o.bindElement, o.bindProperty);
				o.bindElement[ o.bindProperty ] = e.currentTarget.value;
			}
		}
	}
	*/
}

rangeSlider.prototype = Object.create( controlBase.prototype );

/*
inputNumber.prototype.Logic = function( e ){

	this.previousValue = this.currentValue;
	this.currentValue = e.currentTarget.value;

	if( this.previousValue != this.currentValue ){

		this.DispatchCustomEvent( e );
	}
};
*/

//------------------------------------------------------------------<


function toggleButton( element, objPropsDefault, objProps, control ){

	controlBase.call( this, element, objPropsDefault, objProps, control );

	this.val = this.objPropsDefault[ objProps ].value;
	this.control.checked = this.val;


	/*
	element.addEventListener("valueChanged", valueChanged, false);
	function valueChanged( e ) {

		Update( e, obj );
	}
	*/
	/*
	element.addEventListener("click", onClicked, false);
	function onClicked( e ){

		this.Logic( e );
	}
	*/
	/*
	function Logic( e ){

		val = !val;
		e.currentTarget.value = val;

		this.DispatchCustomEvent( e );
	}


	function DispatchCustomEvent( e ) {

			//e.preventDefault();

		var event = new CustomEvent( "valueChanged", {
			detail : {
				currentValue : e.currentTarget.value
			},
			bubbles : true,
			cancelable : true
		});

		e.currentTarget.dispatchEvent( event );
	}

	function Update( e, o){

		if( obj.isFunction ){
			//console.log( o.bindElement );
			o.bindElement[ o.bindProperty ]( e.currentTarget.value );
		}else{

			o.bindElement[ o.bindProperty ] = e.currentTarget.value;
		}

	}
	*/
}

toggleButton.prototype = Object.create( controlBase.prototype );

toggleButton.prototype.Logic = function( e ){

	this.val = !this.val;
	e.currentTarget.value = this.val;

	this.DispatchCustomEvent( e );
};

//------------------------------------------------------------------<

function checkBox( element, objPropsDefault, objProps, control ){

	controlBase.call( this, element, objPropsDefault, objProps, control );

	this.val = this.objPropsDefault[ objProps ].value;
	this.control.checked = this.val;

	/*
	element.addEventListener("valueChanged", valueChanged, false);
	function valueChanged( e ) {

		Update( e, obj );
	}
	*/

	/*
	element.addEventListener("click", onClicked, false);
	function onClicked( e ){

		this.Logic( e );
	}
	*/
	/*
	function Logic( e ){

		val = !val;
		e.currentTarget.value = val;

		this.DispatchCustomEvent( e );
	}


	function DispatchCustomEvent( e ) {

			//e.preventDefault();

		var event = new CustomEvent( "valueChanged", {
			detail : {
				currentValue : e.currentTarget.value
			},
			bubbles : true,
			cancelable : true
		});

		e.currentTarget.dispatchEvent( event );
	}

	function Update( e, o){

		if( obj.isFunction ){
			//console.log( o.bindElement );
			o.bindElement[ o.bindProperty ]( e.currentTarget.value );
		}else{

			o.bindElement[ o.bindProperty ] = e.currentTarget.value;
		}

	}
	*/
}

checkBox.prototype = Object.create( controlBase.prototype );

checkBox.prototype.Logic = function( e ){

	this.val = !this.val;
	e.currentTarget.value = this.val;

	this.DispatchCustomEvent( e );
};

//------------------------------------------------------------------<

function radioButton( element, objPropsDefault, objProps, control ){

	controlBase.call( this, element, objPropsDefault, objProps, control );

	/*
	element.addEventListener("click", onClicked, false);
	function onClicked( e ){

		this.Logic( e );
	}
	*/
}

radioButton.prototype = Object.create( controlBase.prototype );

//------------------------------------------------------------------<

function colourSelect( element, objPropsDefault, objProps, control ){

	controlBase.call( this, element, objPropsDefault, objProps, control );

	/*
	element.addEventListener("click", onClicked, false);
	function onClicked( e ){

		this.Logic( e );
	}
	*/
}

colourSelect.prototype = Object.create( controlBase.prototype );

//------------------------------------------------------------------<


