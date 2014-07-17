/**
 * @author Nick Sullivan
 */

//var Module_Canvas = (function(){

	function Canvas( id, element, elementName, displayName, objectName, uiManager ) {
		
		Module_Base.getModule().call( this, id, element, elementName, displayName, objectName, uiManager );
		
		this.canvas = this.element;
		this.context = this.canvas.getContext( "2d" );		

		this.objectPropertiesDefault = {
				
				x : {
					label : "x",
					control : "input",
					type : "number",
					value : 0,
					extend : inputNumber,
					bindElement : this.element,
					bindProperty : "left",
					isPixel : true
				},
				
				y : {
					label : "y",
					control : "input",
					type : "number",
					value : 0,
					extend : inputNumber,
					bindElement : this.element,
					bindProperty : "top",
					isPixel : true
				},
				
				width : {
					label : "width",
					control : "input",
					type : "number",
					value : window.innerWidth - 50 - 2,
					extend : inputNumber,
					bindElement : this.element,
					bindProperty : "width"
				},
				
				height : {
					label : "height",
					control : "input",
					type : "number",
					value : window.innerHeight - 80 - 2,
					extend : inputNumber,
					bindElement : this.element,
					bindProperty : "height"
				},
				
				showGrid : {
					label : "show grid",
					control : "input",
					type : "checkBox",
					value : true,
					extend : checkBox,
					bindElement : this,
					bindProperty : "setGridVisibility",
					isFunction : true
				},
				
				gridSize : {
					label : "grid size",
					control : "input",
					type : "number",
					value : 10,
					step : 1,
					min : 5,
					max : 500,
					extend : inputNumber,
					bindElement : this,
					bindProperty : "setGridSize",
					isFunction : true
				},
			
				gridSnap : {
					label : "grid snap",
					control : "input",
					type : "checkBox",
					value : false,
					extend : checkBox,
					bindElement : this,
					bindProperty : "setSnapToGridPoint",
					isFunction : true
				}
			};
		this.element.bind = this; //Required for 'this' in event handler
		
		this.gridSize;
        this.centroid;
        
		this.element.addEventListener("click", this.clickEvent, false );
		//this.element.addEventListener("mouseover", this.mouseOverEvent, false );
	};

	Canvas.prototype = Object.create( Module_Base.getModule().prototype );

	Canvas.prototype.initialise = function( o ) {
		
		var o = o || this.objectPropertiesDefault;
		var canvas = this.element;
		this.context = canvas.getContext( "2d" );
		this.gridSize = o.gridSize.value;

		canvas.style.left = o.x.value + "px";
		canvas.style.top = o.y.value + "px";	
		canvas.width = o.width.value; 
		canvas.height = o.height.value;
			
		
		if( o.showGrid.value ){
			
			this.context.rect( o.x.value, o.y.value, o.width.value, o.height.value );			
			this.showGridPattern();
		}else{
			
			this.hideGridPattern();
		}
	};
	
	Canvas.prototype.setGridVisibility = function( showGrid ) {
			
		if( eval( showGrid ) ){
		    
		    this.showGridPattern();
		}else{
			
			this.hideGridPattern();
		}
	};
				
	Canvas.prototype.setGridSize = function( gridSize ) {
		
		this.gridSize = gridSize;
        
        this.showGridPattern(); 
	};
	
	Canvas.prototype.setSnapToGridPoint = function( gridSize ) {
		
		console.log( " TODO : Implement Snap To Grid Functionality " );
	};
	
	Canvas.prototype.showGridPattern = function(){
	    
	    this.context.clearRect( 0, 0, this.element.width, this.element.height );
        this.context.fillStyle = this.getGridPattern( this.gridSize, "gray" );   
        this.context.fill();
	};
	
	Canvas.prototype.hideGridPattern = function(){
        
        this.context.clearRect( 0, 0, this.element.width, this.element.height );
    };
    
    
	Canvas.prototype.getGridPattern = function( gridSize, gridColour ) {
        
        var gridCanvas = document.createElement( "canvas" );
        var gridCanvasContext = gridCanvas.getContext( "2d" );
        var lineWidth = 1;
        var lineWidthOffset = lineWidth;
        
        
        gridCanvas.width = gridSize * 2; 
        gridCanvas.height = gridSize * 2;
        
        gridCanvasContext.moveTo( 0, lineWidthOffset );
        gridCanvasContext.lineTo( gridSize * 2, lineWidthOffset );
        
        gridCanvasContext.moveTo( lineWidthOffset, 0 );
        gridCanvasContext.lineTo( lineWidthOffset, gridSize * 2 );
        
        gridCanvasContext.moveTo( gridSize + lineWidthOffset, 0 );
        gridCanvasContext.lineTo( gridSize + lineWidthOffset, gridSize * 2 );
        
        gridCanvasContext.moveTo( 0, gridSize + lineWidthOffset );
        gridCanvasContext.lineTo( gridSize * 2, gridSize + lineWidthOffset );
        
        gridCanvasContext.lineWidth = lineWidth;
        gridCanvasContext.strokeStyle = gridColour;
        gridCanvasContext.stroke();
        
        return gridCanvasContext.createPattern( gridCanvas, "repeat" );
    };
    
    Canvas.prototype.getCentroid = function(){
        
        return this.centroid = {
            x : this.element.width / 2,
            y : this.element.height / 2
        };
    };
    
	//Canvas.prototype.mouseOverEvent = function( e ) {};
	
	Canvas.prototype.clickEvent = function( e ) {

		this.bind.setAsContext(); 
		
		this.bind.setObjectPropertiesDefault();
	};
	
	
	
/*
 * ToolBar Tools > Object Properties > Functions
 */

	Canvas.prototype.updateCanvasContext = function(){
		
		var contextObject = this.uiManager.getUIElement( this.uiManager.getUIContext() ); //this.uiManager.uiElements[ this.uiManager.currentContext ];
		var objPropsDefault = contextObject.objectPropertiesDefault;

		for( props in objPropsDefault ){

			this[ objPropsDefault[ props ].bindProperty ]( objPropsDefault[ props ].value );
		}
	};
	
////Select Object
	Canvas.prototype.setAutoSelect = function(){
	

	};
	
	Canvas.prototype.setDisplayHandles = function(){
	

	};
	
////Select Element
	Canvas.prototype.setSelectPoint = function(){
	
	
	};
	
	Canvas.prototype.setSelectSegment = function(){
	
	
	};
	
	Canvas.prototype.setSelectBoth = function(){
	
	
	};
	
////Create Shapes	
	Canvas.prototype.setFromCenter = function( b ){
		
		this.context.fromCenter = b;
	};
	
	Canvas.prototype.getFromCenter = function(){
		
		return this.context.fromCenter;
	};
	
	Canvas.prototype.setX = function( x ){
	
		this.context.x = x;
	};
	
	Canvas.prototype.getX = function(){
	
		return Number( this.context.x );
	};
	
	Canvas.prototype.setY = function( y ){
	
		this.context.y = y;
	};
	
	Canvas.prototype.getY = function(){
	
		return Number( this.context.y );
	};
	
	Canvas.prototype.setFillStyle = function( c ){

		this.context.fillStyle = c;
	};
	
	Canvas.prototype.getFillStyle = function(){

		return this.context.fillStyle;
	};
	
	Canvas.prototype.setStrokeStyle = function( c ){

		this.context.strokeStyle = c;
	};
	
	Canvas.prototype.getStrokeStyle = function(){

		return this.context.strokeStyle;
	};
	
	Canvas.prototype.setLineWidth = function( w ){
	
		this.context.lineWidth = w;
	};
		
	Canvas.prototype.getLineWidth = function(){
	
		return Number( this.context.lineWidth );
	};

////Create Rectangle	
	Canvas.prototype.setWidth = function( w ){
	
		this.context.width = w;
	};
	
	Canvas.prototype.getWidth = function(){
	
		return Number( this.context.width );
	};
	
	Canvas.prototype.setHeight = function( h ){
	
		this.context.height = h;
	};
	
	Canvas.prototype.getHeight = function(){
	
		return Number( this.context.height );
	};
	
	Canvas.prototype.createRectangle = function( o ){
		
		var objPropsDefault = this.uiManager.getUIElement( "objectProperties" ).objectPropertiesDefault;

		var rect = new Geometry.Shapes.Rectangle( 
				objPropsDefault.x.value, 
				objPropsDefault.y.value, 
				objPropsDefault.width.value, 
				objPropsDefault.height.value, 
				objPropsDefault.fillColour.value, 
				objPropsDefault.strokeColour.value, 
				objPropsDefault.strokeWeight.value, 
				objPropsDefault.fromCenter.value 
			);
			
		rect.RenderGeometry( this.context, this );
		
		rect.RenderAdorners( this.uiManager.getUIElement( "canvasAdorners" ).context, this.uiManager.getUIElement( "canvasAdorners" ) );
		
		this.uiManager.addUIShape( rect );
		
		//TODO
		//Rectangle needs to be added to uiManager.uiElements so it can be made the application 'Context' upon selection therfore enabling editing of properties 
	};
	
////Create Ellipse
	
	Canvas.prototype.setRadius = function( r ){
	
		this.context.radius = r;
	};
	
	Canvas.prototype.getRadius = function(){
	
		return Number( this.context.radius );
	};
	
	Canvas.prototype.setStartAngle = function( s ){
	
		this.context.startAngle = s;
	};
	
	Canvas.prototype.getStartAngle = function(){
	
		return Number( this.context.startAngle );
	};
	
	Canvas.prototype.setEndAngle = function( e ){
	
		this.context.endAngle = e;
	};
	
	Canvas.prototype.getEndAngle = function(){
	
		return Number( this.context.endAngle );
	};
	
	Canvas.prototype.setDirection = function( d ){
	
		this.context.direction = d;
	};
	
	Canvas.prototype.getDirection = function(){
	
		return this.context.direction;
	};
	
	Canvas.prototype.createEllipse = function( o ){
		
		this.context.beginPath();
		this.context.arc( this.context.x, this.context.y, this.context.radius, this.context.startAngle * ( Math.PI / 180 ), this.context.endAngle * ( Math.PI / 180 ), this.context.direction );
		this.context.fill();		
		this.context.stroke();		
	};
	
////Create Curve

////Create Line

////Create Text

    Canvas.prototype.setFont = function( f ){
    
        this.context.font = f;
    };
    
    Canvas.prototype.getFont = function(){
    
        return this.context.font;
    };
    
    Canvas.prototype.setFontSize = function( f ){
    
        this.context.fontSize = f;
    };
    
    Canvas.prototype.getFontSize = function(){
    
        return this.context.fontSize;
    };
    
    Canvas.prototype.setFontStyle = function( f ){
    
        this.context.fontStyle = f;
    };
    
    Canvas.prototype.getFontStyle = function(){
    
        return this.context.fontStyle;
    };
    
    Canvas.prototype.setFontWeight = function( f ){
    
        this.context.fontWeight = f;
    };
    
    Canvas.prototype.getFontWeight = function(){
    
        return this.context.fontWeight;
    };
    
    Canvas.prototype.setFontVariant = function( f ){
    
        this.context.fontVariant = f;
    };
    
    Canvas.prototype.getFontVariant = function(){
    
        return this.context.fontVariant;
    };



//})();


