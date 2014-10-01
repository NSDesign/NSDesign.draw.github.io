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
			canvasGrid : new CanvasGrid( 5, document.getElementById( "Canvas_Grid" ), "Canvas_Grid", "Canvas Grid", "canvasGrid", this.UIManager ),
			//canvasSelection : new CanvasSelection( 2, document.getElementById( "Canvas_Selection" ), "Canvas_Selection", "Canvas Selection", "canvasSelection", this.UIManager ),
			//canvasAdorners : new CanvasAdorners( 3, document.getElementById( "Canvas_Adorners" ), "Canvas_Adorners", "Canvas Adorners", "canvasAdorners", this.UIManager ),
			canvasDraw : new CanvasDraw( 4, document.getElementById( "Canvas_Draw" ), "Canvas_Draw", "Canvas Draw", "canvasDraw", this.UIManager ),
			toolBar : new ToolBar( 6, document.getElementById( "ToolBar" ), "ToolBar", "Tool Bar", "toolBar", this.UIManager ),
		}
	);

	this.UIManager.getUIElement( "canvasGrid" ).initialise();
	this.UIManager.getUIElement( "canvasDraw" ).initialise();

	this.UIManager.getUIElement( "toolBar" ).initialise();


	this.CanvasManager = new CanvasManager( this.UIManager );



	/*
	 * SINGLETON CONSTRUCTOR
	 */

	MainApp = function () {

		console.log(this);

		return instance;
	};


};

