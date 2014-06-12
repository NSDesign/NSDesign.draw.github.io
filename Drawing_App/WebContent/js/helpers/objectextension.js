/**
 * @author Nick Sullivan
 */


function createControl( o ){

	var Control = document.createElement( o.control );
	Control.type = o.type;
	Control.value = o.value || false;
	o.step ? Control.step = o.step : false;
	o.min ? Control.min = o.min : false;
	o.max ? Control.max = o.max : false;
	
	return o.extend ? UTILITIES.EXTENSIONS.OBJECTS.COPY_OBJECT( new o.extend( o, Control ), Control ) : Control;
};

function inputNumber( obj, element ){
	
	var previousValue = undefined;
	var currentValue = obj.value;
	
	element.addEventListener("valueChanged", valueChanged, false);
	function valueChanged( e ) {
	
		Update( e, obj );
	}
	
	element.addEventListener("mousedown", onMouseDown, false);
	function onMouseDown( e ){

		Logic( e );
	}
	
	element.addEventListener("mouseup", onMouseUp, false);
	function onMouseUp( e ){

		Logic( e );
	}
	
	//CLICK EVENT
	/* 
	element.addEventListener("click", onClicked, false);
	function onClicked( e ){

		Logic( e );
	} 
	*/
	
	
	element.addEventListener("keydown", onKeyDown, false);
	function onKeyDown( e ){
		
		Logic( e );
	}
	
	element.addEventListener("keyup", onKeyUp, false);
	function onKeyUp( e ){
		
		Logic( e );
	}
	
	function Logic( e ){
			
		previousValue = currentValue;
		currentValue = e.currentTarget.value;
		
		if(previousValue != currentValue){
			
			DispatchCustomEvent( e );	
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
	
	function Update( e, o){
		
		if( o.name === "x" || o.name === "y" ){
		
			o.bindElement.style[o.bindProperty] = e.currentTarget.value + "px";			
		}else{
			
			if(obj.isFunction){
			
				o.bindElement[o.bindProperty]( e.currentTarget.value );
			}else{
			
				o.bindElement[o.bindProperty] = e.currentTarget.value;
			}	
		}
	}
}



function toggleButton( obj, element ){
		
	var val = obj.value;
		
	element.addEventListener("valueChanged", valueChanged, false);
	function valueChanged( e ) {
		
		Update( e, obj );
	}
	
	element.addEventListener("click", onClicked, false);
	function onClicked( e ){
	
		Logic( e );
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
	
	function Update( e, o){
			
		if(obj.isFunction){
			//console.log( o.bindElement );	
			o.bindElement[o.bindProperty]( e.currentTarget.value );
		}else{
			
			o.bindElement[o.bindProperty] = e.currentTarget.value;
		}
				
	}
}







//TODO
var extendedControls = {
	
	controlTypes : {
		
		toggleButton : function( value ){
			
			
		},
		
		inputNumber : function (){
			
			
		}
	},	
};


			