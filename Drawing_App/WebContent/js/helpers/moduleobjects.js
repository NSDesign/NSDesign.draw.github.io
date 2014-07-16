/**
 * @author Nick Sullivan
 */

var Module_Base = (function(){

	var Module = function( id, element, elementName, displayName, objectName, uiManager ){
						
		this.id = id;
		this.element = element || null;
		this.elementName = elementName || null;
		this.displayName = displayName || null;		
		this.objectName = objectName || null;
		this.uiManager = uiManager || null;
		this.objectPropertiesDefault = {} || null;

		return this;
	};
	
	Module.prototype.initialise = function(){};
	
	Module.prototype.setAsContext = function(){ 

		if ( this.uiManager.getUIContext() != this.objectName ) {
					
			this.uiManager.setUIContext( this.objectName );
		}
	};
	
	Module.prototype.setObjectPropertiesDefault = function(){ 
		
		this.uiManager.setObjectPropertiesDefault( this.objectPropertiesDefault );
	};
	
	return {
		
		getModule : function(){
			
			return Module;
		},
	};
})();






