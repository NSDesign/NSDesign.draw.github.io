/**
 * @author Nick Sullivan
 */

window.onload = function () {

	MainApp = new MainApp();
};

function MainApp() {
	
	var instance = this;
	
	this.UIManager = new UIManager();
	this.UIManager.manageUIElements( 
		{ 
			mainMenu : new MainMenu( 0, document.getElementById( "MainMenu" ), "MainMenu", "Main Menu", this.UIManager ),
			objectProperties : new ObjectProperties( 1, document.getElementById( "ObjectProperties" ), "ObjectProperties", "Object Properties", this.UIManager ),
			toolBar : new ToolBar( 2, document.getElementById( "ToolBar" ), "ToolBar", "Tool Bar", this.UIManager ),
			canvas : new Canvas( 3, document.getElementById( "Canvas" ), "Canvas", "Drawing Canvas", this.UIManager ),		
		}
	);
	this.UIManager.uiElements.canvas.initialise();
	this.UIManager.uiElements.toolBar.initialise();
	
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

