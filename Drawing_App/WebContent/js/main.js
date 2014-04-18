

window.onload = windowLoaded;


function windowLoaded(){
	
	//console.log(typeof(this.mainApp));
	
	this.mainApp = new mainApp();

	//console.log(typeof(this.mainApp));
}

function mainApp(){
	
	if(this instanceof mainApp && this.init == false){
		//mainApp is being instantiated : Singleton
		this.init = true;
		
		//console.log("mainApp Instantiated : " + this.init);
		
		
		this.DrawingCanvas = new drawingCanvas();
		//this.drawingCanvas.initCanvas();
		
		this.uiManager = new uiManager();
	
		//this.mouseManager = new mouseManager();
		
		//initTestOutput();
	
		// TEST HTML CONTROLS
		//var tC = document.getElementById("TestControl");
		//tC.innerHTML += "<object type='text/html' data='WebContent/controls/togglebutton/togglebutton.html'></object>";
	}
	
};

mainApp.prototype.init = false;

/*

window.onclick = test;

function test(){
	
	console.log(this.mainApp);
	
}

*/