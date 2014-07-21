/**
 * @author Nick Sullivan
 */

function CanvasGrid( id, element, elementName, displayName, objectName, uiManager ) {
        
    CanvasBase.call( this, id, element, elementName, displayName, objectName, uiManager );
};

CanvasGrid.prototype = Object.create( CanvasBase.prototype );

//----------------------------------------------------------------------------------------

CanvasGrid.prototype.initialise = function() {
    
    var o = this.objectPropertiesDefault;
    this.gridSize = o.gridSize.value;

    this.canvas.style.left = o.x.value + "px";
    this.canvas.style.top = o.y.value + "px";    
    this.canvas.width = o.width.value; 
    this.canvas.height = o.height.value;
            
        
    if( o.showGrid.value ){
            
        this.context.rect( o.x.value, o.y.value, o.width.value, o.height.value );           
        this.showGridPattern();
    }else{
            
        this.hideGridPattern();
    }
};
    
CanvasGrid.prototype.setGridVisibility = function( showGrid ) {
            
        if( eval( showGrid ) ){
            
            this.showGridPattern();
        }else{
            
            this.hideGridPattern();
        }
    };
                
CanvasGrid.prototype.setGridSize = function( gridSize ) {
        
    this.gridSize = gridSize;
    this.showGridPattern(); 
};
    
CanvasGrid.prototype.setSnapToGridPoint = function( gridSize ) {
        
        console.log( " TODO : Implement Snap To Grid Functionality " );
    };
    
CanvasGrid.prototype.showGridPattern = function(){
        
        this.context.clearRect( 0, 0, this.element.width, this.element.height );
        this.context.fillStyle = this.getGridPattern( this.gridSize, "gray" );   
        this.context.fill();
    };
    
CanvasGrid.prototype.hideGridPattern = function(){
        
        this.context.clearRect( 0, 0, this.element.width, this.element.height );
    };
    
CanvasGrid.prototype.getGridPattern = function( gridSize, gridColour ) {
        
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
    