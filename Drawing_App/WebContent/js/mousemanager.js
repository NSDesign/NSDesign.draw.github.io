
function mouseManager(){
	
	this.mouseEvents = {
	
		mouseover : "mouseover",
		mousedown : "mousedown",
		mouseup : "mouseup",
		mouseout : "mouseout",
		mousemove : "mousemove",
		mouseenter : "mouseenter",
		mouseleave : "mouseleave",
		click : "click",
		dblclick : "dblclick",
		wheel : "wheel",
		DOMMouseScroll : "DOMMouseScroll",
		MOZMousePixelScroll : "MOZMousePixelScroll",
		contextmenu : "contextmenu",
		show : "show",
		
	};
}




mouseManager.prototype.initMouseManager = function(){
	/*
	 * ADDS CLICK EVENT HANDLERS TO ALL ELEMENTS DEFINED IN UIELEMENTS OBJECT
	var e = document.getElementById("DrawingCanvas");
	e.addEventListener("click", registerEvent, false);
	
	
	//ADD ALL MOUSE EVENTS TO ALL MAJOR UI ELEMENTS
	for(var i = 0; i < uiElements.length; i += 1){
		
		var e = document.getElementById(uiElements[i]);

		for(var j = 0; j < mouseEvents.length; j += 1){
			
			e.addEventListener(mouseEvents[j], registerEvent, false);
			
		}
	}
	
	*/
};

/*
function registerEvent(e){
	
	if(mainApp.uiManager.currentContext != e.target){
		mainApp.uiManager.manageContext(e.target);
	}
	
}

*/