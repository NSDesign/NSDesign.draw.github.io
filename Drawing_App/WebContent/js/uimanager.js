
function UIManager() {

	this.currentContext = null;
	this.uiElements = {};
	
	this.manageUIElements = function( elements ) {
		
		this.uiElements = elements;
		
		for( element in elements ){
			console.log(element, " : ", elements[element]);
		}
	};
	
	this.manageContext = function( context ) {

		this.currentContext = context;
		this.uiElements.objectProperties.createObjectProperties( this.uiElements[this.currentContext.toLowerCase()] ); //eval( "MainApp" + "." + this.currentContext )
	};
}


