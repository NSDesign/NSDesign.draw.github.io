/**
 * @author Nick Sullivan
 */

window.onload = function () {

	MainApp = new MainApp();
};

function MainApp() {
	
	var instance = this;
	
	this.UIManager = UIManager;
	this.UIManager.addUIElements( 
		{ 
			mainMenu : new MainMenu( 0, document.getElementById( "MainMenu" ), "MainMenu", "Main Menu", "mainMenu", this.UIManager ),
			objectProperties : new ObjectProperties( 1, document.getElementById( "ObjectProperties" ), "ObjectProperties", "Object Properties", "objectProperties", this.UIManager ),
			canvasSelection : new Canvas( 2, document.getElementById( "Canvas_Selection" ), "Canvas_Selection", "Canvas Selection", "canvasSelection", this.UIManager ),
			canvasAdorners : new Canvas( 3, document.getElementById( "Canvas_Adorners" ), "Canvas_Adorners", "Canvas Adorners", "canvasAdorners", this.UIManager ),
			canvasDraw : new Canvas( 4, document.getElementById( "Canvas_Draw" ), "Canvas_Draw", "Canvas Draw", "canvasDraw", this.UIManager ),
			canvasGrid : new Canvas( 5, document.getElementById( "Canvas_Grid" ), "Canvas_Grid", "Canvas Grid", "canvasGrid", this.UIManager ),
			toolBar : new ToolBar( 6, document.getElementById( "ToolBar" ), "ToolBar", "Tool Bar", "toolBar", this.UIManager ),	
		}
	);
	
	this.UIManager.getUIElement( "canvasDraw" ).initialise();
	this.UIManager.getUIElement( "toolBar" ).initialise();
	
	/*
	 * 	 
	this.Canvas = new Module_Canvas( 0, document.getElementById( "Canvas" ), "Canvas", "Drawing Canvas", this.UIManager );	
	this.Canvas.initialise( this.Canvas.objectPropertiesDefault );
	*/
	
	/*
	 * SINGLETON CONSTRUCTOR 
	 */
		
	MainApp = function () {
		
		console.log(this);
		
		return instance;
	};
	
	
	/*	
	// TEST HTML CONTROLS
	var tC = document.createElement( "div" );
	tC.id = "TestControl";
	document.body.appendChild( tC );
	*/
};

