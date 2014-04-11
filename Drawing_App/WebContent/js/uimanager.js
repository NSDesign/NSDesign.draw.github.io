
// ID's OF MAIN UI ELEMENTS
// MIGHT CHANGE TO AN OBJECT CONTAINING SUB OBJECTS e.g. 
//ToolBar.ToolBarHandle 
//RATHER THAN SEPERATE OBJECTS AT THE SAME LEVEL 
//ToolBar 
//ToolBarHandle

function uiManager(){
	
	this.currentContext = null;
	this.uiElements = {
	
		MainMenu :  ["Main Menu", "File", "Edit", "Window"],
		ObjectPropertiesMenu : ["Object Properties Menu"],
		ToolBar : ["Tool Bar", "Tool Bar Handle", "Tool Bar Items"],
		DrawingCanvas : ["Drawing Canvas"],
		//AnimatePanel : ["Animate Panel"],
		
	};
	
	
	
}

uiManager.prototype.manageContext = function(context){
	
	this.currentContext = context;
	new objectProperties().createObjectProperties(eval("mainApp" + "." + context.getAttribute("data-binding")));
	
};
