/**
 * @author Nick Sullivan
 */

//var Module_Canvas = (function(){

	 function Canvas( id, element, elementName, displayName, uiManager ) {
		
		Module_Base.getModule().call( this, id, element, elementName, displayName, uiManager );
			
		this.gridImage;
		this.gridSize;
		this.objectPropertiesDefault = {
				
				x : {
					label : "x",
					control : "input",
					type : "number",
					value : 52,
					extend : inputNumber,
					bindElement : this.element,
					bindProperty : "left"
				},
				
				y : {
					label : "y",
					control : "input",
					type : "number",
					value : 92,
					extend : inputNumber,
					bindElement : this.element,
					bindProperty : "top"
				},
				
				width : {
					label : "width",
					control : "input",
					type : "number",
					value : window.innerWidth - 52 - 2,
					extend : inputNumber,
					bindElement : this.element,
					bindProperty : "width"
				},
				
				height : {
					label : "height",
					control : "input",
					type : "number",
					value : window.innerHeight - 52 - 2,
					extend : inputNumber,
					bindElement : this.element,
					bindProperty : "height"
				},
				
				showGrid : {
					label : "show grid",
					control : "input",
					type : "button",
					value : true,
					extend : toggleButton,
					bindElement : this,
					bindProperty : "setGridVisibility",
					isFunction : true
				},
				
				gridSize : {
					label : "grid size",
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
				},
			
				gridSnap : {
					label : "grid snap",
					control : "input",
					type : "button",
					value : false,
					extend : toggleButton,
					bindElement : this,
					bindProperty : "setSnapToGridPoint",
					isFunction : true
				}
			};
		this.element.bind = this; //Only required for expected meaning of 'this' in event handler
		this.element.addEventListener("click", this.clickEvent, false );
		
		//console.log( "Canvas :",  this );
	};

	Canvas.prototype = Object.create( Module_Base.getModule().prototype );

	Canvas.prototype.initialise = function( o ) {
		
		var o = o || this.objectPropertiesDefault;
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
		
		this.gridSize = gridSize;
		var canvas = this.element;
		
		if( gridSize <= this.objectPropertiesDefault.gridSize.max ){
				
			this.gridImage = 'WebContent/images/Grid_' + gridSize + 'x' + gridSize + '_px.png';
			canvas.style.backgroundImage = "url(" + this.gridImage + ")";
			canvas.style.position = "top left";
			canvas.style.repeat = "repeat";
			canvas.style.attachment = "fixed";
		}
	};
	
	Canvas.prototype.setSnapToGridPoint = function( gridSize ) {
		
		alert( " TODO : Implement Functionality " );
	};
	
	Canvas.prototype.clickEvent = function( e ) {

		this.bind.setAsContext( e );
	};

//})();


