
function ObjectProperties( id, element, elementName, displayName, uiManager ) {

	Module.call( this, id, element, elementName, displayName, uiManager );

	this.createObjectProperties = function( o ) {

		var oPropDefault = o.objectPropertiesDefault;
		
		
		for ( objectProperties in oPropDefault ) {
			
			var oPropContainer = document.createElement( "div" );
			
			this.element.appendChild( oPropContainer );
			
			oPropContainer.appendChild( document.createTextNode( " " + oPropDefault[ objectProperties ].name + " " ) );
			oPropContainer.appendChild( document.createElement( "br" ) );			
			oPropContainer.appendChild( createControl( oPropDefault[ objectProperties ] ) );
		}
	};
};

ObjectProperties.prototype = Object.create( Module.prototype );


