
function MainMenu( id, element, elementName, displayName, uiManager ){
	
	Module_Base.getModule().call( this, id, element, elementName, displayName, uiManager );
}

MainMenu.prototype = Object.create( Module_Base.getModule().prototype );