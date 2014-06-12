
function MainMenu( id, element, elementName, displayName, uiManager ){
	
	Module.call( this, id, element, elementName, displayName, uiManager );
}

MainMenu.prototype = Object.create( Module.prototype );