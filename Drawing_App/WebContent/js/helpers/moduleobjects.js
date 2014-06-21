/**
 * @author Nick Sullivan
 */

var Module_Base = (function(){

	var Module = function( id, element, elementName, displayName, uiManager ){
						
		this.id = id;
		this.element = element || null;
		this.elementName = elementName || null;
		this.displayName = displayName || null;		
		this.uiManager = uiManager || null;
		this.objectPropertiesDefault = {} || null;

		return this;
	};
	
	Module.prototype.initialise = function(){};
	
	Module.prototype.setAsContext = function( e ){
			
		if ( this.uiManager.currentContext != e.currentTarget.id ) {
					
			this.uiManager.manageContext( e.currentTarget.id );
		}
	};
	
	return {
		
		getModule : function(){
			
			return Module;
		},
	};
})();






