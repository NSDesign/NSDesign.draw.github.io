
function ObjectProperties( id, element, elementName, displayName, uiManager ) {

	Module_Base.getModule().call( this, id, element, elementName, displayName, uiManager );

	this.createObjectProperties = function( o ) {
	
		var objPropsDefault = o.objectPropertiesDefault;
			
		ObjectPropertiesContainer.innerHTML = "";
		var objPropsContainer = document.createElement( "div" );
		ObjectPropertiesContainer.appendChild( objPropsContainer );

		for ( objectProperties in objPropsDefault ) {
			
			var oPropContainer = document.createElement( "div" );		
			objPropsContainer.appendChild( oPropContainer );
			
			oPropContainer.appendChild( document.createTextNode( " " + objPropsDefault[ objectProperties ].label + " " ) );
			oPropContainer.appendChild( document.createElement( "br" ) );			
			oPropContainer.appendChild( createControl( objPropsDefault[ objectProperties ] ) );
		}		
	};
};

ObjectProperties.prototype = Object.create( Module_Base.getModule().prototype );


