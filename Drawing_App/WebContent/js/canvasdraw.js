/**
 * @author Nick Sullivan
 */

function CanvasDraw( id, element, elementName, displayName, objectName, uiManager ) {

    CanvasBase.call( this, id, element, elementName, displayName, objectName, uiManager );


    //console.log(this);
};

CanvasDraw.prototype = Object.create( CanvasBase.prototype );

//----------------------------------------------------------------------------------------

CanvasDraw.prototype.initialise = function() {

//Initialise Canvas Position & Size
    var o = this.objectPropertiesDefault;
    this.gridSize = o.gridSize.value;

    this.canvas.style.left = o.x.value + "px";
    this.canvas.style.top = o.y.value + "px";
    this.canvas.width = o.width.value;
    this.canvas.height = o.height.value;

//---------------------------------------------------------------------------------------<

// Keyboard Event Listeners
    addEventListener( "keydown", this.keyboardDownEvent, false );


// Mouse Event Listeners
    this.element.addEventListener( "click", this.clickEvent, false );
    this.element.addEventListener( "mousedown", this.mouseDownEvent, false );
    this.element.addEventListener( "mouseup", this.mouseUpEvent, false );
    this.element.addEventListener( "mousemove", this.mouseMoveEvent, false );
    this.element.addEventListener( "mousewheel", this.mouseWheelEvent, false );
    this.element.addEventListener( "DOMMouseScroll", this.mouseWheelEvent, false ); //FF v3+

/*
// Custom Event Listeners
// Shape
    this.element.addEventListener( "shapecreated", this.shapeCreatedEvent, false );
    this.element.addEventListener( "mouseovershape", this.mouseOverShapeEvent, false );
    this.element.addEventListener( "mouseoutshape", this.mouseOutShapeEvent, false );
//Point
    this.element.addEventListener( "mouseoverpoint", this.mouseOverPointEvent, false );
    this.element.addEventListener( "mouseoutpoint", this.mouseOutPointEvent, false );
*/

//---------------------------------------------------------------------------------------<

    this.currentShape = undefined;
    this.currentSegment = undefined;
    this.currentPoint = undefined;

    this.activeShape = undefined;
    this.activeSegment = undefined;
    this.activePoint = undefined;

    this.currentType = undefined;
    this.boundingBox = undefined;
    this.mouseStatus = undefined;

    this.label = new Label( this.context );

    //window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame;
    //requestAnimationFrame( CanvasDraw.prototype.RenderEngine.call( CanvasDraw.prototype ) );

};



CanvasDraw.prototype.keyboardDownEvent = function( e ){
var scalar = 1;
var canvas = UIManager.getUIElement( "canvasDraw" );
    if( e.key == "Up" ){

        scalar += 0.1;
    }else if( e.key == "Down" ){

        scalar -= 0.1;
    }
    canvas.context.scale( scalar, scalar );
};

CanvasDraw.prototype.mouseWheelEvent = function( e ){

//Weird
    console.log( e.detail);
};

//
// Mouse Events Handlers ----------------------------------------------------------------<
//

CanvasDraw.prototype.mouseDownEvent = function( e ) {

    this.bind.mouseStatus = "down";

    this.bind.element.addEventListener( "mousemove", this.bind.mouseDragEvent, false );

    switch( this.bind.uiManager.getUIMode() ) {

        case "select" :

            this.bind.GeometryHitTest( e );

            if( this.bind.currentType == "shape" ){

                if( this.bind.uiManager.hasUIShapesSelected() ){

                    var mousePosition = InputMonitor.Device.Mouse.getPosition( e, "local" );
                    var selectedShapes = this.bind.uiManager.getSelectedUIShapes();
                    for( selectedShape in selectedShapes ){

                        this.bind.updateSelectionOffset( mousePosition.x, mousePosition.y, selectedShapes[ selectedShape ] );

                        //Unless Shift key is down
                        if( !this.bind.activeShape.getIsSelected() ){

                            this.bind.unSelectShapes();
                            this.bind.selectShape( e, this.bind.activeShape );
                        }
                    }
                }else{

                    this.bind.selectShape( e, this.bind.activeShape );
                }
            }else{

                this.bind.unSelectShapes();
                this.bind.boundingBoxCreate( e );
            }

            break;

        case "create" :

            //Calls canvas create function of the specific shape e.g createRectangle()
            this.bind[ this.bind.uiManager.getUIContext() ]( e );
            break;

        case "manipulate" :

            break;

        default :

    }
};

CanvasDraw.prototype.mouseDragEvent = function( e ){

    var mousePosition = InputMonitor.Device.Mouse.getPosition( e, "local" );

    this.bind.mouseStatus = "dragging";
    //console.log(this.bind.mouseStatus);

    switch( this.bind.uiManager.getUIMode() ) {

        case "select" :

            //There is a Bounding Box
            if( this.bind.boundingBox != undefined ){

                this.bind.boundingBox.updateSize( mousePosition );
            }else if( this.bind.uiManager.hasUIShapesSelected() ){

                if( this.bind.currentType != undefined ){

                    this.bind.moveShape( e );
                    this.bind.element.addEventListener( "mouseup", this.bind.mouseDropEvent, false );
                }
            }
       break;

    }
};

CanvasDraw.prototype.mouseDropEvent = function( e ){

    this.bind.element.removeEventListener( "mousemove", this.bind.mouseDragEvent );

    var mousePosition = InputMonitor.Device.Mouse.getPosition( e, "local" );

    this.bind.mouseStatus = "dropped";
    //console.log(this.bind.mouseStatus);

    switch( this.bind.uiManager.getUIMode() ) {

        case "select" :

            if( this.bind.currentShape == "shape" ){

                this.bind.unSelectShapes();
            }

            break;

        case "create" :

            break;

        case "manipulate" :

            break;

        default :

    }
};

CanvasDraw.prototype.mouseUpEvent = function( e ) {

    this.bind.mouseStatus = "up";

    switch( this.bind.uiManager.getUIMode() ) {

        case "select" :

            //There is a Bounding Box
            if( this.bind.boundingBox != undefined ){

                this.bind.unSelectShapes(); //Unless Shift key is down
                this.bind.selectBoundShapes( e );
                this.bind.boundingBox.destroy.call( this.bind, "boundingBox" );
            }else{

                //Canvas has Mousedown - "most likely"
                //if( this.bind.currentType != "shape" ){

                    //this.bind.unSelectShapes();
                //}
            }
            break;

        case "create" :

            if( this.bind.currentShape.getWidth() <= 1 && this.bind.currentShape.getHeight() <= 1){

                var objPropsDefault = this.bind.uiManager.getUIElement( "objectProperties" ).objectPropertiesDefault;

                this.bind.currentShape.setWidth( objPropsDefault.width.value );
                this.bind.currentShape.setHeight( objPropsDefault.height.value );
            }

            this.bind.currentShape = undefined;
            break;

        case "manipulate" :

            break;

        default :

            break;
    }

    this.bind.setIsRendering( false );
    this.bind.RenderEngine( e );
};

CanvasDraw.prototype.mouseMoveEvent = function( e ){

    var mousePosition = InputMonitor.Device.Mouse.getPosition( e, "local" );

    this.bind.mouseStatus = "moving";

    this.bind.setIsRendering( true );
    this.bind.RenderEngine( e );

    switch( this.bind.uiManager.getUIMode() ) {

        case "select" :

            //No Bounding Box has been created
            if( this.bind.boundingBox == undefined ){

                this.bind.GeometryHitTest( e );
            }

            break;

        case "create" :

            if( this.bind.currentShape != undefined ){

                this.bind.currentShape.setWidth( mousePosition.x - this.bind.currentShape.getX() );
                this.bind.currentShape.setHeight( mousePosition.y - this.bind.currentShape.getY() );
            }
            break;

        case "manipulate" :

            break;

        default :

    }
};

CanvasDraw.prototype.clickEvent = function( e ){

    this.bind.mouseStatus = "clicked";

    switch( this.bind.uiManager.getUIMode() ) {

        case "select" :


            break;

        case "create" :

            //this.bind[ this.bind.uiManager.getUIContext() ]( e );
            break;

        case "manipulate" :

            break;

        default :

            this.bind.setAsContext();
            this.bind.setObjectPropertiesDefault();
            break;
    }

};

/*
//
// Custom Event Dispatch ----------------------------------------------------------------<
//

//Shape Event Dispatch
CanvasDraw.prototype.DispatchShapeCustomEvent = function( e, shape, eventType ){

    e.preventDefault();

    var event = new CustomEvent( eventType, {
        detail : {
            shape : shape,
            properties : shape.objectPropertiesDefault // Needs to be added to each shape @ creation to show up here
        },
        bubbles : true,
        cancelable : true
    });

    e.currentTarget.dispatchEvent( event );
};

//Point Event Dispatch
CanvasDraw.prototype.DispatchPointCustomEvent = function( e, point, eventType ){

    e.preventDefault();

    var event = new CustomEvent( eventType, {
        detail : {
            point : point,
            properties : point.objectPropertiesDefault // Needs to be added to each shape @ creation to show up here
        },
        bubbles : true,
        cancelable : true
    });

    e.currentTarget.dispatchEvent( event );
};
*/

//
// Custom Event Handlers ---------------------------------------------------------------<
//


//Shape Event Handlers

CanvasDraw.prototype.shapeCreatedEvent = function( e ){

    console.log( "New Shape Created : " + e.detail.shape.getID() );
};

//MOVE EVENT HANDLERS TO THE RESPECTIVE OBJECT - MAYBE
/*
CanvasDraw.prototype.mouseOverShapeEvent = function( e ){

    this.bind.currentType = "shape";
    e.detail.shape.setIsActive( true );
    this.bind.activeShape = e.detail.shape;

    InputMonitor.Device.Mouse.setCursor( this.bind.canvas, "pointer" );
};

CanvasDraw.prototype.mouseOutShapeEvent = function( e ){

    this.bind.currentType = "wasshape";
    e.detail.shape.setIsActive( false );
//console.log("OUT : " + e.detail.shape.getID());
    this.bind.activeShape = undefined;

    InputMonitor.Device.Mouse.setCursor( this.bind.canvas, "default" );
};

//Point Event Handlers

CanvasDraw.prototype.mouseOverPointEvent = function( e ){

    this.bind.currentType = "point";
    e.detail.point.isActive = true;
//console.log("OVER : " + e.detail.point.id);
    e.detail.point.state = "active";
    this.bind.activePoint = e.detail.point;

    InputMonitor.Device.Mouse.setCursor( this.bind.canvas, "pointer" );
};

CanvasDraw.prototype.mouseOutPointEvent = function( e ){

    this.bind.currentType = "waspoint";
    e.detail.point.isActive = false;
//console.log("OUT : " + e.detail.point.id);
    e.detail.point.state = "normal";
    this.bind.activePoint = undefined;

    InputMonitor.Device.Mouse.setCursor( this.bind.canvas, "default" );
};
*/

//
// Methods & Object Classes ------------------------------------------------------------<
//

/*
CanvasDraw.prototype.activateShape = function( shape ){

        shape.setIsActive( true );
        this.activeShape = shape;
        InputMonitor.Device.Mouse.setCursor( this.canvas, "pointer" );

        DispatchCustomEvent( e, shape );
};
*/
/*
CanvasDraw.prototype.mouseOverShapeTest = function( e ){

    var mousePosition = InputMonitor.Device.Mouse.getPosition( e, "local" );
    var shapes = this.uiManager.getUIShapes();
    var shapesArray = UTILITIES.EXTENSIONS.OBJECTS.TO_ARRAY( shapes ).reverse();

    for(var i = 0, j = shapesArray.length; i < j; i += 1 ){

        shapesArray[ i ].HitTest( this, this.context, mousePosition.x, mousePosition.y );


        if( this.context.isPointInPath( mousePosition.x, mousePosition.y ) ){

            this.DispatchShapeCustomEvent( e, shapesArray[ i ], "mouseovershape" );

            return;
        }else{
            if( this.currentType == "shape" ){

                this.DispatchShapeCustomEvent( e, shapesArray[ i ], "mouseoutshape" );
            }
        }


    };
};
*/
CanvasDraw.prototype.GeometryHitTest = function( e ){

    var mousePosition = InputMonitor.Device.Mouse.getPosition( e, "local" );
    var shapes = this.uiManager.getUIShapes();
    var shapesArray = UTILITIES.EXTENSIONS.OBJECTS.TO_ARRAY( shapes );
    var hitTest = undefined;

    var numShapes = shapesArray.length;
    for(var i = 0; i < numShapes; i += 1 ){

        hitTest = shapesArray[ i ].HitTest( this, this.context, mousePosition.x, mousePosition.y );

        var numSegments = shapesArray[ i ].getNumSegments();
        for(var j = 0; j < numSegments; j += 1 ){

            shapesArray[ i ].getGeometrySegments()[ "segment" + j ].hitTest( this, this.context, mousePosition.x, mousePosition.y );
        }

        var numPoints = shapesArray[ i ].getNumPoints();
        for(var k = 0; k < numPoints; k += 1 ){

            shapesArray[ i ].getGeometryPoints()[ "point" + k ].hitTest( this, this.context, mousePosition.x, mousePosition.y );
        }
    };

    //console.log(hitTest);
};

CanvasDraw.prototype.selectShape = function( e, shape ){

    if( shape != undefined ){

        var selectedShapes = this.uiManager.getSelectedUIShapes();

        var select = function(){

            shape.setIsSelected( true );
            this.uiManager.addSelectedUIShape( shape );

            var mousePosition = InputMonitor.Device.Mouse.getPosition( e, "local" );

            this.updateSelectionOffset( mousePosition.x, mousePosition.y , shape );
        };

        if( this.uiManager.hasUIShapesSelected() ){

            for( s in selectedShapes ){

                if( shape != selectedShapes[ s ] ){

                    select.call( this );
                }
            }
        }else{

            select.call( this );
        }
    }
};

CanvasDraw.prototype.selectBoundShapes = function( e ){

    var shapes = this.uiManager.getUIShapes();

    for( shape in shapes ){

        var s = shapes[ shape ];
        this.boundingBox.isInsideBounds( this.context, s.getX(), s.getY(), s.getWidth(), s.getHeight() ) ? this.selectShape( e, s ) : false;
    }
};

CanvasDraw.prototype.updateSelectionOffset = function( x, y, shape ){

    shape.updateSelectionOffset( x, y );
};

CanvasDraw.prototype.unSelectShapes = function(){

    var selectedShapes = this.uiManager.getSelectedUIShapes();

    if( this.uiManager.hasUIShapesSelected() ){

        for( shape in selectedShapes ){

            selectedShapes[ shape ].setIsSelected( false );
            this.uiManager.removeSelectedUIShape( shape );
        }
    }
};

CanvasDraw.prototype.moveShape = function( e ) {

    var mousePosition = InputMonitor.Device.Mouse.getPosition( e, "local" );
    var selectedShapes = this.uiManager.getSelectedUIShapes();

//Move Shapes
    for( shape in selectedShapes ){

        selectedShapes[ shape ].setX( mousePosition.x ) ;
        selectedShapes[ shape ].setY( mousePosition.y ) ;
    }
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// RENDER ENGINE ////// RENDER ENGINE ////// RENDER ENGINE ////// RENDER ENGINE ////// RENDER ENGINE ////// RENDER ENGINE //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

CanvasDraw.prototype.RenderEngine = function(){

    var shapes = this.uiManager.getUIShapes();
    var shapesArray = UTILITIES.EXTENSIONS.OBJECTS.TO_ARRAY( shapes );

//Refresh Canvas - Entirely /*COULD BE WAY MORE EFFICIENT*/
    var refreshRegion = { x : 0, y : 0, w : this.getCanvasWidth(), h : this.getCanvasHeight() };
    this.context.clearRect( refreshRegion.x, refreshRegion.y, refreshRegion.w, refreshRegion.h );

/*//Draw Refresh Region Outline
    this.context.strokeStyle = "red";
    this.context.strokeRect( refreshRegion.x + 1, refreshRegion.y + 1, refreshRegion.w - 2, refreshRegion.h - 2 );
    this.context.stroke();
*/

//RENDER SHAPES AND ADORNERS
    for(var i = 0, j = shapesArray.length; i < j; i += 1 ){

        shapesArray[ i ].RenderGeometry( this.context );

        if( shapesArray[ i ].getShowAdorners() ){

            shapesArray[ i ].RenderAdornerSegments( this.context );
            shapesArray[ i ].RenderAdornerPoints( this.context );
        }

        if( shapesArray[ i ].getShowAdornerSegments() ){

            shapesArray[ i ].RenderAdornerSegments( this.context );
        }

        if( shapesArray[ i ].getShowAdornerPoints() ){

            shapesArray[ i ].RenderAdornerPoints( this.context );
        }

    }

//Render Selection Bounding Box Here <
    if( this.boundingBox != undefined ){
        this.boundingBox.render( this.context );
    }

//Render Mouse Trailing Label - Displays various value changes being made by mouse interactions
    //this.label.setDisplayText( { title : "Mouse", x : mousePosition.x + " px", y : mousePosition.y + " px" } );
    //this.label.setPosition( mousePosition.x, mousePosition.y );
    //this.label.render();



//////------------------------------------------------------------------------------------------------------------------<

    //Render output helper variables
    this.context.fillStyle = "rgba( 255, 255, 255, 0.75 )";
    this.context.fillRect( 5, 5, 250, 150);

    this.context.fillStyle =  "black";
    this.context.font = "10px Arial";

    this.context.fillText( "Rendering : " + this.getIsRendering(), 11, 25 );
    this.context.fillText( "Mouse Status : " + this.mouseStatus, 11, 45 );
    this.context.fillText( "Current Type : " + this.currentType, 11, 65 );

    this.context.fillText( "Active Shape : " , 11, 85 );
    if( this.activeShape != undefined ){
        this.context.fillText( "Active Shape : " + this.activeShape.getID(), 11, 85 );
    }
    this.context.fillText( "Current Shape : " , 11, 105 );
    if( this.currentShape != undefined ){
        this.context.fillText( "Current Shape : " + this.currentShape.getID(), 11, 105 );
    }
    this.context.fillText( "Selected Shapes : " + ( typeof this.uiManager.getSelectedUIShapes() == "object" ? getItems( this.uiManager.getSelectedUIShapes() ) : this.uiManager.getSelectedUIShapes() ), 11, 125 );

    function getItems( object ){

        var items = [];
        var i = -1;
        for ( item in object ){

            items[ i += 1 ] = object[ item ].getID();
        }
        return items;
    }


    //requestAnimationFrame( RenderEngine.call( this ) );
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

CanvasDraw.prototype.createRectangle = function( e ) {

    var mousePosition = InputMonitor.Device.Mouse.getPosition( e, "local" );
    var objPropsDefault = this.uiManager.getUIElement( "objectProperties" ).objectPropertiesDefault;

    var rect = new Geometry.Shapes.Rectangle(
            mousePosition.x /*objPropsDefault.x.value*/,
            mousePosition.y /*objPropsDefault.y.value*/,
            0 /*objPropsDefault.width.value*/,
            0 /*objPropsDefault.height.value*/,
            objPropsDefault.fillColour.value,
            objPropsDefault.strokeColour.value,
            objPropsDefault.strokeWeight.value,
            objPropsDefault.fromCenter.value
        );


    rect.RenderGeometry( this.context );

    this.currentShape = rect;
    this.uiManager.addUIShape( rect );


    //this.DispatchShapeCustomEvent( e, rect, "shapecreated" );
    //window.setInterval( function(){ console.log(this.activeShape);}, 10 );
};

function Label( context ){

    this.context = context;

    var fontSize = 10;
    var numValues = 2;
    var labelOffset = 20;
    var padding = 5;
    var labels = undefined;
    var rowHeights = [];

    this.position = { x : 0, y : 0 };
    this.setPosition = function( x, y ){

        this.position.x = x + labelOffset;
        this.position.y = y;
    };

    this.size = { w : 0, h : 0 };
    this.setSize = function( w, h ){

        this.size.w = w;
        this.size.h = h;
    };

    this.autoSize = function(){

        var maxTextWidth = 0;
        var values = this.displayText;
        var add = 0;

        for( var i = 0, j = values.length; i < j; i += 1 ){

            maxTextWidth = Math.max( maxTextWidth, this.context.measureText( values[ i ] ).width );
            add += rowHeights[ i ];
        }

        this.size.w = maxTextWidth + padding * 2;
        this.size.h = add - fontSize;

        //console.log( acc);
    };

    this.displayText = undefined;
    this.setDisplayText = function( object /* { title : Point, x : 100, y : 100 }*/){

        labels = Object.keys( object );
        var hasTitle = false;
        var titleLabel = undefined;
        var values = [];

        if( labels[ 0 ] == "title" ){

            hasTitle = true;
            titleLabel = object.title;

            numValues = labels.length;

            values[ 0 ] = titleLabel;
        }

        for( var i = 0; i < numValues; i += 1 ){

            if( hasTitle ){

                i > 0 ? appendValues() : false;
            }else{

                appendValues();
            }

        };

        function appendValues(){

            return values[ i ] = labels[ i ] + " : " + object[ labels[ i ] ];
        }

        this.displayText = values;

        this.autoSize();
    };

    this.render = function(){

        this.context.fillStyle =  "#CCCCCC";
        this.context.fillRect( this.position.x, this.position.y, this.size.w, this.size.h );
        this.context.fillStyle =  "black";
        this.context.font = fontSize + "px Arial";
        this.context.textBaseline="top";

        for( var i = 0; i < numValues; i += 1 ){

            var row = ( fontSize + padding ) * i + padding;
            this.context.fillText( this.displayText[ i ], this.position.x + padding, this.position.y + row );
            rowHeights[ i ] = row;
        };
    };
}

function BoundingBox( start, end, colour, lineWidth, linePattern ){

    this.start = start || { x : 0, y : 0 };
    this.end = end || { x : 0, y : 0 };
    this.width = 0;
    this.height = 0;
    this.colour = colour || "black";
    this.lineWidth = lineWidth || 2;
    this.linePattern = getPattern.call( this ) || linePattern;


    this.setStart = function( start ){

        this.start = start;
    };
    this.getStart = function(){

        return this.start;
    };
    this.setEnd = function( end ){

        this.end = end;
    };
    this.setColour = function( colour ){
        this.colour = colour;
    };
    this.setLineWidth = function( lineWidth ){
        this.lineWidth = lineWidth;
    };
    this.setLinePattern = function( linePattern ){
        this.linePattern = linePattern;
    };

    this.updateSize = function( point ){

        this.end.x = point.x;
        this.end.y = point.y;

        this.width = point.x - this.start.x;
        this.height = point.y - this.start.y;
    };

    this.destroy = function( instance ){

        this[ instance ] = undefined;
    };

    this.isInsideBounds = function( context, x, y, w, h ){

        var type = undefined;
        var inBounds = false;

        if( this.start.x < this.end.x && this.start.y < this.end.y ){

            type = "TLtoBR";
        }else if( this.start.x > this.end.x && this.start.y < this.end.y ){

            type = "TRtoBL";
        }else if( this.start.x < this.end.x && this.start.y > this.end.y ){

            type = "BLtoTR";
        }else if( this.start.x > this.end.x && this.start.y > this.end.y ){

            type = "BRtoTL";
        }


        switch( type ){

            case "TLtoBR" :

                if( this.start.x < ( x + w ) && this.end.x > x && this.start.y < ( y + h ) && this.end.y > y ){

                    inBounds = true;
                }
            break;

            case "TRtoBL" :

            break;

            case "BLtoTR" :

            break;

            case "BRtoTL" :

            break;
        }

        return inBounds;
    };

    this.getGeometry = function( context ){

        return context.rect( this.start.x, this.start.y, this.width, this.height );
    };

    this.render = function( context ){

        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.linePattern;
        context.strokeRect( this.start.x, this.start.y, this.width, this.height );
    };

    function getPattern(){

        var gridCanvas = document.createElement( "canvas" );
        var gridCanvasContext = gridCanvas.getContext( "2d" );

        gridCanvas.width = this.lineWidth;
        gridCanvas.height = this.lineWidth;

        gridCanvasContext.rect( 0, 0, this.lineWidth, this.lineWidth );

        gridCanvasContext.beginPath();
        gridCanvasContext.moveTo( 0, 0 );
        gridCanvasContext.lineTo( this.lineWidth, this.lineWidth );

        gridCanvasContext.fillStyle = "blue";
        gridCanvasContext.fill();

        gridCanvasContext.lineWidth = this.lineWidth / 2;
        gridCanvasContext.strokeStyle = this.colour;
        gridCanvasContext.stroke();



        return gridCanvasContext.createPattern( gridCanvas, "repeat" );
    };

}

CanvasDraw.prototype.boundingBoxCreate = function( e ) {

    var mousePosition = InputMonitor.Device.Mouse.getPosition( e, "local" );
    this.boundingBox = new BoundingBox( { x : mousePosition.x, y : mousePosition.y } );
};



//Arrange z-depth for shapes or groups of shapes
CanvasDraw.prototype.bringToFront = function( ) {

    var selectedShapes = this.uiManager.getSelectedUIShapes();
    var shapes = this.uiManager.getUIShapes();
    var shapesArray = UTILITIES.EXTENSIONS.OBJECTS.TO_ARRAY( shapes );


//Bring Selected shape to top - Make Array.prototype.shuffle method
    for( shape in selectedShapes ){

        var index = shapesArray.indexOf( selectedShapes[ shape ] );
        var shapesTemp = shapesArray.splice( index, 1 );
        shapesArray.push( shapesTemp[ 0 ] );
    }
};

CanvasDraw.prototype.bringForward = function() {};

CanvasDraw.prototype.sendToBack = function() {};

CanvasDraw.prototype.sendBackward = function() {};



/*
 * ToolBar Tools > Object Properties > Functions
 */

////Select Object
CanvasDraw.prototype.setAutoSelect = function() {

};

CanvasDraw.prototype.setDisplayHandles = function() {

};

////Select Element
CanvasDraw.prototype.setSelectPoint = function() {

};

CanvasDraw.prototype.setSelectSegment = function() {

};

CanvasDraw.prototype.setSelectBoth = function() {

};

/*
////Create Shapes
CanvasDraw.prototype.setFromCenter = function( b ) {

    this.context.fromCenter = b;
};
CanvasDraw.prototype.getFromCenter = function() {

    return this.context.fromCenter;
};

CanvasDraw.prototype.setX = function( x ) {

    this.context.x = x;
};
CanvasDraw.prototype.getX = function() {

    return Number(this.context.x);
};

CanvasDraw.prototype.setY = function( y ) {

    this.context.y = y;
};
CanvasDraw.prototype.getY = function() {

    return Number(this.context.y);
};

////Create Rectangle
CanvasDraw.prototype.setWidth = function( w ) {

    this.context.width = w;
};
CanvasDraw.prototype.getWidth = function() {

    return Number(this.context.width);
};

CanvasDraw.prototype.setHeight = function( h ) {

    this.context.height = h;
};
CanvasDraw.prototype.getHeight = function() {

    return Number(this.context.height);
};
*/


/*
////Create Ellipse

CanvasDraw.prototype.setRadius = function(r) {

    this.context.radius = r;
};
CanvasDraw.prototype.getRadius = function() {

    return Number(this.context.radius);
};

CanvasDraw.prototype.setStartAngle = function(s) {

    this.context.startAngle = s;
};
CanvasDraw.prototype.getStartAngle = function() {

    return Number(this.context.startAngle);
};

CanvasDraw.prototype.setEndAngle = function(e) {

    this.context.endAngle = e;
};
CanvasDraw.prototype.getEndAngle = function() {

    return Number(this.context.endAngle);
};

CanvasDraw.prototype.setDirection = function(d) {

    this.context.direction = d;
};
CanvasDraw.prototype.getDirection = function() {

    return this.context.direction;
};

CanvasDraw.prototype.createEllipse = function(o) {

    this.context.beginPath();
    this.context.arc(this.context.x, this.context.y, this.context.radius, this.context.startAngle * (Math.PI / 180 ), this.context.endAngle * (Math.PI / 180 ), this.context.direction);
    this.context.fill();
    this.context.stroke();
};

////Create Curve

////Create Line

////Create Text

CanvasDraw.prototype.setFont = function(f) {

    this.context.font = f;
};
CanvasDraw.prototype.getFont = function() {

    return this.context.font;
};

CanvasDraw.prototype.setFontSize = function(f) {

    this.context.fontSize = f;
};
CanvasDraw.prototype.getFontSize = function() {

    return this.context.fontSize;
};

CanvasDraw.prototype.setFontStyle = function(f) {

    this.context.fontStyle = f;
};
CanvasDraw.prototype.getFontStyle = function() {

    return this.context.fontStyle;
};

CanvasDraw.prototype.setFontWeight = function(f) {

    this.context.fontWeight = f;
};
CanvasDraw.prototype.getFontWeight = function() {

    return this.context.fontWeight;
};

CanvasDraw.prototype.setFontVariant = function(f) {

    this.context.fontVariant = f;
};
CanvasDraw.prototype.getFontVariant = function() {

    return this.context.fontVariant;
};
*/
