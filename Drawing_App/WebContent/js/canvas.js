

//var Module_Canvas = (function(){

	function Canvas( id, element, elementName, displayName, uiManager ) {
		
		Module.call( this, id, element, elementName, displayName, uiManager );
			
		this.gridImage;
		this.objectPropertiesDefault = {
				
				x : {
					name : "x",
					control : "input",
					type : "number",
					value : 52,
					extend : inputNumber,
					bindElement : this.element,
					bindProperty : "left"
				},
				
				y : {
					name : "y",
					control : "input",
					type : "number",
					value : 92,
					extend : inputNumber,
					bindElement : this.element,
					bindProperty : "top"
				},
				
				width : {
					name : "width",
					control : "input",
					type : "number",
					value : window.innerWidth - 52 - 2,
					extend : inputNumber,
					bindElement : this.element,
					bindProperty : "width"
				},
				
				height : {
					name : "height",
					control : "input",
					type : "number",
					value : window.innerHeight - 52 - 2,
					extend : inputNumber,
					bindElement : this.element,
					bindProperty : "height"
				},
				
				showGrid : {
					name : "show grid",
					control : "input",
					type : "button",
					value : true,
					extend : toggleButton,
					bindElement : this,
					bindProperty : "setGridVisibility",
					isFunction : true
				},
				
				gridSize : {
					name : "grid size",
					control : "input",
					type : "number",
					value : 5,
					step : 5,
					min : 5,
					max : 50,
					extend : inputNumber,
					bindElement : this,
					bindProperty : "setGridSize",
					isFunction : true
				}
			};
		this.element.bind = this; //Only required for correct 'this' in event handler
		this.element.addEventListener("click", this.clickEvent, false );
		
		//console.log( "Canvas :",  this );
	};
	
	Canvas.prototype = Object.create( Module.prototype );
	//console.log( "Canvas Proto:", Canvas.prototype );
	
	Canvas.prototype.initialise = function( o ) {
		
		var canvas = this.element;
			
		canvas.style.left = o.x.value + "px";
		canvas.style.top = o.y.value + "px";	
		canvas.width = o.width.value; 
		canvas.height = o.height.value;
			
		if( o.showGrid.value ){
				
			this.gridImage = 'WebContent/images/Grid_' + o.gridSize.value + 'x' + o.gridSize.value + '_px.png';
			canvas.style.backgroundImage = "url(" + this.gridImage + ")";
			canvas.style.position = "top left";
			canvas.style.repeat = "repeat";
			canvas.style.attachment = "fixed";
		}else{
				
			canvas.style.backgroundImage = null;
		}
				
	};
	
	Canvas.prototype.setGridVisibility = function( showGrid ) {
			
		var canvas = this.element;
			
		showGrid = ( eval( showGrid ) );
		if( showGrid ){
		
			canvas.style.backgroundImage = "url(" + this.gridImage + ")";
			canvas.style.position = "top left";
			canvas.style.repeat = "repeat";
			canvas.style.attachment = "fixed";
		}else{
				
			canvas.style.backgroundImage = null;
		}
	};
				
	Canvas.prototype.setGridSize = function( gridSize ) {

		var canvas = this.element;
			
		if( gridSize <= this.objectPropertiesDefault.gridSize.max ){
				
			this.gridImage = 'WebContent/images/Grid_' + gridSize + 'x' + gridSize + '_px.png';
			canvas.style.backgroundImage = "url(" + this.gridImage + ")";
			canvas.style.position = "top left";
			canvas.style.repeat = "repeat";
			canvas.style.attachment = "fixed";
		}
	};

	Canvas.prototype.clickEvent = function( e ) {

		this.bind.setAsContext( e );
	};

//})();


