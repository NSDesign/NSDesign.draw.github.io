
function ObjectProperties( id, element, elementName, displayName, objectName, uiManager ) {

	Module_Base.getModule().call( this, id, element, elementName, displayName, objectName, uiManager );
	
	this.objectPropertiesDefault;
	
	
	this.createObjectProperties = function( contextObject ) {
		
		var objPropsDefault = this.objectPropertiesDefault || contextObject.objectPropertiesDefault;
			
		ObjectProperties_Container.innerHTML = "";
		var objPropsContainer = document.createElement( "div" );
		ObjectProperties_Container.appendChild( objPropsContainer );

		for ( objectProperties in objPropsDefault ) {
			
			var oPropContainer = document.createElement( "div" );		
			objPropsContainer.appendChild( oPropContainer );
			
			oPropContainer.appendChild( document.createTextNode( " " + objPropsDefault[ objectProperties ].label + " " ) );
			oPropContainer.appendChild( document.createElement( "br" ) );			
			oPropContainer.appendChild( createControl( this, objPropsDefault, objectProperties ) );
		}		
	};
};

ObjectProperties.prototype = Object.create( Module_Base.getModule().prototype );


