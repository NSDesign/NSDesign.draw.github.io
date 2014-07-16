
function MainMenu( id, element, elementName, displayName, objectName, uiManager ){
	
	Module_Base.getModule().call( this, id, element, elementName, displayName, objectName, uiManager );
}

MainMenu.prototype = Object.create( Module_Base.getModule().prototype );