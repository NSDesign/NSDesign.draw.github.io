/**
 * @author Nick Sullivan
 */

function UIManager() {

	this.currentContext = null;
	this.uiElements = {};
	
	this.manageUIElements = function( elements ) {
		
		for( element in elements ){
			
			this.uiElements[ element ] = elements[ element ];
			console.log(element, " : ", this.uiElements[ element ]);
		}
	};
	
	this.manageContext = function( context ) {

		this.currentContext = context;
		this.uiElements.objectProperties.createObjectProperties( this.uiElements[ toCamelCase( this.currentContext ) ] );
	};
}



/*TODO
 * Needs work to become a true mechanism for converting to Camel Case
 * Also move to Utility Library
 */

toCamelCase = function( words ){
	
	return words.replace( words.substr( 0, 1 ), words.substr( 0, 1 ).toLowerCase() );
};
