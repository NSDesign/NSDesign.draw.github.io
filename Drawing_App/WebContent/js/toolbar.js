/**
 * @author Nick Sullivan
 */

ToolBar = function ( id, element, elementName, displayName, uiManager ) {

	Module_Base.getModule().call( this, id, element, elementName, displayName, uiManager );

	this.tools = {

		selectObject : {
	
			id : 0,
			longName : "Select Object",
			shortName : "Sel Obj",
			shortCut : "Q",
			state : "unselected",
	
			objectPropertiesDefault : {
				
				autoSelect : {
					label : "auto Select",
					control : "input",
					type : "button",
					value : false,
					extend : toggleButton,
					bindElement : this,
					bindProperty : "setAutoSelect",
					isFunction : true
				},
				
				displayHandles : {
					label : "display Handles",
					control : "input",
					type : "button",
					value : false,
					extend : toggleButton,
					bindElement : this,
					bindProperty : "setDisplayHandles",
					isFunction : true
				},
			},
	
			iconNormal : {
				x : 0,
				y : 0
			},
			iconOver : {
				x : -50,
				y : 0
			},
			iconDown : {
				x : -100,
				y : 0
			},
			iconDisabled : {
				x : -150,
				y : 0
			},
		},

		selectElement : {
	
			id : 1,
			longName : "Select Element",
			shortName : "Sel Ele",
			shortCut : "W",
			state : "unselected",
	
			objectPropertiesDefault : {
				
				selectPoint : {
					label : "select Point",
					control : "input",
					type : "radio",
					name : "selectElement",
					value : false,
					extend : radioButton,
					bindElement : this,
					bindProperty : "setSelectPoint",
					isFunction : true
				},
				
				selectSegment : {
					label : "select Segment",
					control : "input",
					type : "radio",
					value : false,
					name : "selectElement",
					extend : radioButton,
					bindElement : this,
					bindProperty : "setSelectSegment",
					isFunction : true
				},
				
				selectBoth : {
					label : "select Both",
					control : "input",
					type : "radio",
					value : true,
					name : "selectElement",
					extend : radioButton,
					bindElement : this,
					bindProperty : "setSelectBoth",
					isFunction : true
				},
			},
	
			iconNormal : {
				x : 0,
				y : -50
			},
			iconOver : {
				x : -50,
				y : -50
			},
			iconDown : {
				x : -100,
				y : -50
			},
			iconDisabled : {
				x : -150,
				y : -50
			},
		},

		createRectangle : {
	
			id : 2,
			longName : "Create Rectangle",
			shortName : "Cre Rec",
			shortCut : "R",
			state : "unselected",
	
			objectPropertiesDefault : {
				
				fromCenter : {
					label : "from Center",
					control : "input",
					type : "button",
					value : false,
					extend : toggleButton,
					bindElement : this,
					bindProperty : "setFromCenter",
					isFunction : true
				},
				
				width : {
					label : "width",
					control : "input",
					type : "number",
					value : 100,
					extend : inputNumber,
					bindElement : this,
					bindProperty : "width"
				},
				
				height : {
					label : "height",
					control : "input",
					type : "number",
					value : 100,
					extend : inputNumber,
					bindElement : this,
					bindProperty : "width"
				},
				
				fillColour : {
					label : "fill Colour",
					control : "input",
					type : "color",
					value : "#FF",
					bindElement : this,
					bindProperty : "color"
				},
				
				strokeColour : {
					label : "stroke Colour",
					control : "input",
					type : "color",
					value : "#FF",
					bindElement : this,
					bindProperty : "color"
				},
				
				strokeWeight : {
					label : "stroke Weight",
					control : "input",
					type : "number",
					value : 1,
					extend : inputNumber,
					bindElement : this,
					bindProperty : "strokeWeight"
				},
				
			},
	
			iconNormal : {
				x : 0,
				y : -100
			},
			iconOver : {
				x : -50,
				y : -100
			},
			iconDown : {
				x : -100,
				y : -100
			},
			iconDisabled : {
				x : -150,
				y : -100
			},
		},

		createEllipse : {
	
			id : 3,
			longName : "Create Ellipse",
			shortName : "Cre Eli",
			shortCut : "E",
			state : "unselected",
	
			objectPropertiesDefault : {
	
			},
	
			iconNormal : {
				x : 0,
				y : -150
			},
			iconOver : {
				x : -50,
				y : -150
			},
			iconDown : {
				x : -100,
				y : -150
			},
			iconDisabled : {
				x : -150,
				y : -150
			},
		},

		createLine : {
	
			id : 4,
			longName : "Create Line",
			shortName : "Cre Lin",
			shortCut : "L",
			state : "unselected",
	
			objectPropertiesDefault : {
	
			},
	
			iconNormal : {
				x : 0,
				y : -200
			},
			iconOver : {
				x : -50,
				y : -200
			},
			iconDown : {
				x : -100,
				y : -200
			},
			iconDisabled : {
				x : -150,
				y : -200
			},
		},

		createCurve : {
	
			id : 5,
			longName : "Create Curve",
			shortName : "Cre Crv",
			shortCut : "T",
			state : "unselected",
	
			objectPropertiesDefault : {
	
			},
	
			iconNormal : {
				x : 0,
				y : -250
			},
			iconOver : {
				x : -50,
				y : -250
			},
			iconDown : {
				x : -100,
				y : -250
			},
			iconDisabled : {
				x : -150,
				y : -250
			},
		},

		createLText : {
	
			id : 6,
			longName : "Create Text",
			shortName : "Cre Txt",
			shortCut : "Y",
			state : "unselected",
	
			objectPropertiesDefault : {
	
			},
	
			iconNormal : {
				x : 0,
				y : -300
			},
			iconOver : {
				x : -50,
				y : -300
			},
			iconDown : {
				x : -100,
				y : -300
			},
			iconDisabled : {
				x : -150,
				y : -300
			},
		},

		canvasZoom : {
	
			id : 7,
			longName : "Canvas Zoom",
			shortName : "Cvs Zom",
			shortCut : "Z",
			state : "unselected",
	
			objectPropertiesDefault : {
	
			},
	
			iconNormal : {
				x : 0,
				y : -350
			},
			iconOver : {
				x : -50,
				y : -350
			},
			iconDown : {
				x : -100,
				y : -350
			},
			iconDisabled : {
				x : -150,
				y : -350
			},
		},

		canvasPan : {
	
			id : 8,
			longName : "Canvas Pan",
			shortName : "Cvs Pan",
			shortCut : "P",
			state : "unselected",
	
			objectPropertiesDefault : {
	
			},
	
			iconNormal : {
				x : 0,
				y : -400
			},
			iconOver : {
				x : -50,
				y : -400
			},
			iconDown : {
				x : -100,
				y : -400
			},
			iconDisabled : {
				x : -150,
				y : -400
			},
		},
	};
	
	this.ToolBarItems;
};

ToolBar.prototype = Object.create( Module_Base.getModule().prototype );

ToolBar.prototype.initialise = function(){
	
	this.ToolBarItems = new ToolBarItems( 0, document.getElementById(  "ToolBarItems" ), "ToolBarItems", "Tool Bar Items", this.uiManager);
	this.ToolBarItems.initialise( this.tools );
};


//--------->


ToolBarItems = function ( id, element, elementName, displayName, uiManager ) {
	
	Module_Base.getModule().call( this, id, element, elementName, displayName, uiManager );
	
	this.ToolBarItems = [];
	this.previousChecked;
	this.currentChecked;
};

ToolBarItems.prototype = Object.create( Module_Base.getModule().prototype );

ToolBarItems.prototype.initialise = function( tools ){
	
	var keys = [];
	var toolbarItems = {};
	var i = 0;
	for( objects in tools ){

		var toolbarItem = "ToolBarItem_" + tools[ objects ].id;
		var toolbarItemInput = toolbarItem + " input";
		var toolbarItemInputElement = document.querySelector( "#" + toolbarItemInput );
		var toolbarItemDisplayName = tools[ objects ].longName + " (" + tools[ objects ].shortCut + ")";
		
		this.ToolBarItems[ tools[ objects ].id ] = new ToolBarItem( tools[ objects ].id, toolbarItemInputElement, toolbarItem, toolbarItemDisplayName, this.uiManager );
		this.ToolBarItems[ tools[ objects ].id ].initialise( tools[ objects ], this );
		
		keys[ i ] = toolbarItemInputElement.id;
		toolbarItems[ keys[ i ] ] = this.ToolBarItems[ tools[ objects ].id ];
				
		i += 1;
	}
	
	this.uiManager.manageUIElements( toolbarItems );
};

//--------->


ToolBarItem = function ( id, element, elementName, displayName, uiManager ) {

	Module_Base.getModule().call( this, id, element, elementName, displayName, uiManager );
	
	this.id = id;
	this.toolBar;	
	this.toolBarItem;
	this.iconImage;
	this.element.bind = this; //Only required for expected meaning of 'this' in event handler
	this.element.addEventListener("mouseover", this.mouseOverEvent, false );
	this.element.addEventListener("mouseout", this.mouseOutEvent, false );
	this.element.addEventListener("click", this.clickEvent, false );
};

ToolBarItem.prototype = Object.create( Module_Base.getModule().prototype );

ToolBarItem.prototype.initialise = function( toolBarItem, toolBarItems ){
	
	this.toolBarItem = toolBarItem;
	this.toolBarItems = toolBarItems;
	this.objectPropertiesDefault = this.toolBarItem.objectPropertiesDefault;
	
	var toolbarItemImage = "#ToolBarItem_" + this.id + " img";		
	this.iconImage = document.querySelector( toolbarItemImage );

	this.setNormalState();
};

ToolBarItem.prototype.setNormalState = function(){
	
	this.setIconPosition( this.toolBarItem.iconNormal );
};

ToolBarItem.prototype.setOverState = function(){
	
	this.setIconPosition( this.toolBarItem.iconOver );
};

ToolBarItem.prototype.setDownState = function(){
	
	this.setIconPosition( this.toolBarItem.iconDown );
};

ToolBarItem.prototype.setIconPosition = function( iconState ){
	
	var iconPosition = iconState;

	this.iconImage.style.left = iconPosition.x + "px";
	this.iconImage.style.top = iconPosition.y + "px";
};

ToolBarItem.prototype.mouseOverEvent = function( e ) {

	this.checked ? this.bind.setDownState() : this.bind.setOverState();
	
};

ToolBarItem.prototype.mouseOutEvent = function( e ) {
	
	this.checked ? this.bind.setDownState() : this.bind.setNormalState();
};

ToolBarItem.prototype.clickEvent = function( e ) {
	
	this.bind.toolBarItems.previousChecked = this.bind.toolBarItems.currentChecked;
	this.bind.toolBarItems.currentChecked = this.bind;

	this.bind.toolBarItems.previousChecked != undefined ? this.bind.toolBarItems.previousChecked.setNormalState() : false;

	this.bind.setDownState();
	this.bind.setAsContext( e );
};

