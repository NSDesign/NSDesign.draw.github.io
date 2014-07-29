/**
 * @author Nick Sullivan
 */

function CanvasDraw(id, element, elementName, displayName, objectName, uiManager) {

    CanvasBase.call(this, id, element, elementName, displayName, objectName, uiManager);

    this.element.addEventListener("click", this.clickEvent, false);
    this.element.addEventListener("mousedown", this.mouseDownEvent, false );
    this.element.addEventListener("mouseup", this.mouseUpEvent, false );
    this.element.addEventListener("mousemove", this.mouseMoveEvent, false );
};

CanvasDraw.prototype = Object.create( CanvasBase.prototype );

//----------------------------------------------------------------------------------------

CanvasDraw.prototype.initialise = function() {

    var o = this.objectPropertiesDefault;
    this.gridSize = o.gridSize.value;

    this.canvas.style.left = o.x.value + "px";
    this.canvas.style.top = o.y.value + "px";
    this.canvas.width = o.width.value;
    this.canvas.height = o.height.value;


    this.activeShape = undefined;
};


CanvasDraw.prototype.mouseDownEvent = function( e ) {


    switch( this.bind.uiManager.getUIMode() ) {

        case "select" :

            this.bind.selectShape( e, this.bind.activeShape );
            break;

        case "create" :

            break;

        case "manipulate" :

            break;

        default :

    }

};

CanvasDraw.prototype.mouseUpEvent = function( e ) {


    switch( this.bind.uiManager.getUIMode() ) {

        case "select" :

            this.bind.unSelectShape();
            break;

        case "create" :

            break;

        case "manipulate" :

            break;

        default :

    }

};

CanvasDraw.prototype.clickEvent = function( e ) {

    this.bind.setAsContext();
    this.bind.setObjectPropertiesDefault();
};

CanvasDraw.prototype.mouseMoveEvent = function( e ) {

    switch( this.bind.uiManager.getUIMode() ) {

        case "select" :

            this.bind.activateShape( e );

            var selectedShapes = this.bind.uiManager.getSelectedUIShapes();
            if( Object.keys( selectedShapes ).length > 0 ){

                this.bind.moveShape( e );
            }

            break;

        case "create" :

            break;

        case "manipulate" :

            break;

        default :

    }

};

CanvasDraw.prototype.activateShape = function( e ) {

    var mousePosition = InputMonitor.Device.Mouse.getPosition( e, "local" );
    var shapes = this.uiManager.getUIShapes();
    var shapesArray = UTILITIES.EXTENSIONS.OBJECTS.TO_ARRAY( shapes ).reverse();

    for(var i = 0, j = shapesArray.length; i < j; i += 1 ){

        shapesArray[ i ].CreateGeometry( this.context );

        if( this.context.isPointInPath( mousePosition.x, mousePosition.y ) ){

            shapesArray[ i ].setIsActive( true );
            this.activeShape = shapesArray[ i ];
            InputMonitor.Device.Mouse.setCursor( this.canvas, "pointer" );

            return;
        }

        shapesArray[ i ].setIsActive( false );
        this.activeShape = undefined;
        InputMonitor.Device.Mouse.setCursor( this.canvas, "default" );
    };
};

CanvasDraw.prototype.selectShape = function( e, shape ) {

    if( shape != undefined ){

        var mousePosition = InputMonitor.Device.Mouse.getPosition( e, "local" );
        var currentShape = shape;
        var selectedShapes = this.uiManager.getSelectedUIShapes();
        var numShapes = Object.keys( this.uiManager.getUIShapes() ).length;

        var select = function(){

            //this.setObjectPropertiesDefault();
            currentShape.setIsSelected( true );
            currentShape.setZDepth( numShapes );

            this.uiManager.addSelectedUIShape( currentShape );

            currentShape.selectionOffset = {

                x : mousePosition.x - currentShape.getX(),
                y : mousePosition.y - currentShape.getY(),
            };

            for( point in currentShape.getGeometryPoints() ){

                currentShape.getGeometryPoints()[ point ].setSelectionOffset(

                    mousePosition.x - currentShape.getGeometryPoints()[ point ].getX(),
                    mousePosition.y - currentShape.getGeometryPoints()[ point ].getY()
                );
            };
        };

        if( Object.keys( selectedShapes ).length > 0 ){

            for( shape in selectedShapes ){

                if( currentShape != selectedShapes[ shape ] ){

                    select.call( this );
                }
            }
        }else{

            select.call( this );
        }
    }
        return;
};

CanvasDraw.prototype.unSelectShape = function() {

    var selectedShapes = this.uiManager.getSelectedUIShapes();

    if( Object.keys( selectedShapes ).length > 0 ){

        for( shape in selectedShapes ){

            selectedShapes[ shape ].setIsSelected( false );
            this.uiManager.removeSelectedUIShape( shape );
        }
    }
};

CanvasDraw.prototype.moveShape = function( e ) {

    var mousePosition = InputMonitor.Device.Mouse.getPosition( e, "local" );
    var selectedShapes = this.uiManager.getSelectedUIShapes();
    var shapes = this.uiManager.getUIShapes();
    var shapesArray = UTILITIES.EXTENSIONS.OBJECTS.TO_ARRAY( shapes );


//Refresh Canvas
    this.context.clearRect( 0, 0, this.getCanvasWidth(), this.getCanvasHeight() );
    this.uiManager.getUIElement( "canvasAdorners" ).context.clearRect( 0, 0, this.uiManager.getUIElement( "canvasAdorners" ).getCanvasWidth(), this.uiManager.getUIElement( "canvasAdorners" ).getCanvasHeight() );

//Move Shapes
    for( shape in selectedShapes ){

        selectedShapes[ shape ].setX( mousePosition.x ) ;
        selectedShapes[ shape ].setY( mousePosition.y ) ;

//Bring Selected shape to top - Make Array.prototype.shuffle method
        var index = shapesArray.indexOf( selectedShapes[ shape ] );
        var shapesTemp = shapesArray.splice( index, 1 );
        shapesArray.push( shapesTemp[ 0 ] );
    }

//RENDER SHAPES AND ADORNERS

    for(var i = 0, j = shapesArray.length; i < j; i += 1 ){

        shapesArray[ i ].RenderGeometry( this, this.context, false );

        if( shapesArray[ i ].getIsActive() ){

            shapesArray[ i ].RenderAdorners( this.uiManager.getUIElement( "canvasAdorners" ), this.uiManager.getUIElement( "canvasAdorners" ).context, false );
        }
    }


/*
        this.uiManager.getUIElement( "canvasSelection" ).context.clearRect( 0, 0, this.uiManager.getUIElement( "canvasSelection" ).getCanvasWidth(), this.uiManager.getUIElement( "canvasSelection" ).getCanvasHeight() );
        shapes[ shape ].RenderGeometry( this.uiManager.getUIElement( "canvasSelection" ), this.uiManager.getUIElement( "canvasSelection" ).context, true );
        shapes[ shape ].RenderAdorners( this.uiManager.getUIElement( "canvasSelection" ), this.uiManager.getUIElement( "canvasSelection" ).context, true );
*/


};


//FIXME Possibly depreciated method due to isPointInPath() method
CanvasDraw.prototype.selectShapeByColour = function( e ) {

    //Select Shape based on it's unique random colour
/*
    var colourSelected = Geometry.Colour.GetPixelColour( this.uiManager.getUIElement( "canvasSelection" ).context, mousePosition );
    var shapeSelected = undefined;
    var shapes = this.uiManager.getUIShapes();

    for( shape in shapes ){

        var rgbaString = shapes[ shape ].getColourRandom();
        var colourRandom = Geometry.Colour.RGBAStringtoRGBA( rgbaString );

        if( Geometry.Colour.CompareRGBAColours( colourRandom, colourSelected ) ){

            shapeSelected = shapes[ shape ].getID();
            console.log( true, ":", colourRandom, ":", colourSelected, ":", shapeSelected );
            return;
        }
    }
    */

};



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
CanvasDraw.prototype.createRectangle = function( o ) {

    var objPropsDefault = this.uiManager.getUIElement( "objectProperties" ).objectPropertiesDefault;

    var rect = new Geometry.Shapes.Rectangle(
            objPropsDefault.x.value * Object.keys( this.uiManager.getUIShapes() ).length,
            objPropsDefault.y.value * Object.keys( this.uiManager.getUIShapes() ).length,
            objPropsDefault.width.value,
            objPropsDefault.height.value,
            objPropsDefault.fillColour.value,
            objPropsDefault.strokeColour.value,
            objPropsDefault.strokeWeight.value,
            objPropsDefault.fromCenter.value
        );

    rect.RenderGeometry( this, this.context, false);

    //rect.RenderGeometry( this.uiManager.getUIElement( "canvasSelection" ), this.uiManager.getUIElement( "canvasSelection" ).context, true );
    //rect.RenderAdorners( this.uiManager.getUIElement( "canvasSelection" ), this.uiManager.getUIElement( "canvasSelection" ).context, true );

    this.uiManager.addUIShape( rect );
};

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
