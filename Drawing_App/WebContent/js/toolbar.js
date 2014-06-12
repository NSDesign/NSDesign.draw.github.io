
function ToolBar( id, element, elementName, displayName, uiManager ) {

	Module.call( this, id, element, elementName, displayName, uiManager );
	this.tools = tools;
}

ToolBar.prototype = Object.create( Module.prototype );
