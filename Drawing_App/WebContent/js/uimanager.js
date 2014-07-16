/**
 * @author Nick Sullivan
 */

//TODO
//Look at the 'this' variable - inside function "this" refers to "Window" - I don't think that this is actually required
//Can it be wrapped in another variable or object to isolate from the "Window"
//Currently it seems to be a form of Static object

var UIManager = (function() {
	
	this.objectPropertiesDefault = {};
	this.currentUIContext = undefined;
	this.currentUIMode = undefined;
	
	this.uiElements = {};
	this.uiShapes = {};
	
	

	
	this.manageObjectPropertiesDefault = function( objPropsDefault ){
		
		this.objectPropertiesDefault = objPropsDefault;
//console.log( "OBJECT PROPERTIES DEFAULT : ", this.objectPropertiesDefault );
	};
	
	this.manageUIShapes = function( shape ){
		
		shape.idNum = Object.keys( this.uiShapes ).length;
		this.uiShapes[ shape.idName + "_" + shape.idNum ] = shape;
//console.log("UI SHAPES : ", this.uiShapes);
	};
	
	this.manageUIElements = function( elements ) {
		
		for( element in elements ){
			
			this.uiElements[ element ] = elements[ element ];
//console.log("UI ELEMENTS : ", element, " : ", this.uiElements[ element ]);
		}
	};
	
	this.manageUIMode = function( mode ){
		
//console.log("MODE : ", mode);
		
		this.currentUIMode = mode;	
	};
	
	this.manageUIContext = function( context ) {
		
//console.log("CONTEXT : ", context);
		
		this.currentUIContext = context;
		
	//		
	//TODO Utilise UIMangers objectPropertiesDefault throughout application : Provides central location for others to Publish(set) to Subscribe(get) to 
	//
		this.objectPropertiesDefault = this.uiElements[ this.currentUIContext ].objectPropertiesDefault;  
	//
	//	
		this.uiElements.objectProperties.objectPropertiesDefault = this.objectPropertiesDefault;
		this.uiElements.objectProperties.createObjectProperties();
				
		this.currentUIContext != "canvasDraw" ? this.uiElements.canvasDraw.updateCanvasContext() : false;
	};
	
	return {
		
		//UIContext
		getUIContext : function(){
				
			return currentUIContext;
		},
			
		setUIContext : function( context ){
				
			manageUIContext( context );
		},
		
		//UIMode
		getUIMode : function(){
				
			return currentUIMode;
		},
			
		setUIMode : function( mode ){
				
			manageUIMode( mode );
		},
			
		//UIElements
		addUIElement : function( element ){
				
		},
			
		removeUIElement : function( element ){
			
			delete uiElements[ element ];
		},
			
		addUIElements : function( elements ){
				
			manageUIElements( elements );
		},
			
		removeUIElements : function( elements ){
			
			//TODO loop over uiElements
			delete uiElements[ elements ];
		},
		
		getUIElement : function( element ){

			return uiElements[ element ];
		},
		
		//UIShapes
		getUIShape : function( shape ){
			
			return uiShapes[ shape ];
		},
		
		addUIShape : function( shape ){
			
			manageUIShapes( shape );	
		},
		
		removeUIShape : function( shape ){
			
			delete uiShapes[ shape ];	
		},
		
		//ObjectPropertiesDefault
		getObjectPropertiesDefault : function(){
			
			return objectPropertiesDefault;
		},
		
		setObjectPropertiesDefault : function( objPropsDefault ){
			
			manageObjectPropertiesDefault( objPropsDefault );
		},
	};
})();
