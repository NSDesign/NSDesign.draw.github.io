/**
 * @author Nick Sullivan
 */

function CanvasDraw(id, element, elementName, displayName, objectName, uiManager) {

    CanvasBase.call(this, id, element, elementName, displayName, objectName, uiManager);

    this.element.addEventListener("click", this.clickEvent, false);
    //this.element.addEventListener("mouseover", this.mouseOverEvent, false );
};

CanvasDraw.prototype = Object.create(CanvasBase.prototype);

//----------------------------------------------------------------------------------------

CanvasDraw.prototype.initialise = function() {

    var o = this.objectPropertiesDefault;
    this.gridSize = o.gridSize.value;

    this.canvas.style.left = o.x.value + "px";
    this.canvas.style.top = o.y.value + "px";
    this.canvas.width = o.width.value;
    this.canvas.height = o.height.value;
};

CanvasDraw.prototype.mouseOverEvent = function(e) {

};

CanvasDraw.prototype.mouseDownEvent = function( e ) {

    /*
    switch( this.uiManager.getUIMode() ) {

        case "select" :

            break;

        case "create" :

            break;

        default :

    }
    */
};

CanvasDraw.prototype.clickEvent = function( e ) {

    this.bind.setAsContext();
    this.bind.setObjectPropertiesDefault();


    var mousePosition = {

        x : e.offsetX,
        y : e.offsetY,
    };

    var colourSelected = Geometry.Colour.GetPixelColour( this.bind.context, mousePosition );

    console.log(colourSelected);

};

/*
 * ToolBar Tools > Object Properties > Functions
 */

CanvasDraw.prototype.updateCanvasContext = function() {

    var contextObject = this.uiManager.getUIElement(this.uiManager.getUIContext());
    //this.uiManager.uiElements[ this.uiManager.currentContext ];
    var objPropsDefault = contextObject.objectPropertiesDefault;

    for (props in objPropsDefault ) {

        this[ objPropsDefault[ props ].bindProperty ](objPropsDefault[props].value);
    }
};

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

////Create Shapes
CanvasDraw.prototype.setFromCenter = function(b) {

    this.context.fromCenter = b;
};
CanvasDraw.prototype.getFromCenter = function() {

    return this.context.fromCenter;
};

CanvasDraw.prototype.setX = function(x) {

    this.context.x = x;
};
CanvasDraw.prototype.getX = function() {

    return Number(this.context.x);
};

CanvasDraw.prototype.setY = function(y) {

    this.context.y = y;
};
CanvasDraw.prototype.getY = function() {

    return Number(this.context.y);
};

////Create Rectangle
CanvasDraw.prototype.setWidth = function(w) {

    this.context.width = w;
};
CanvasDraw.prototype.getWidth = function() {

    return Number(this.context.width);
};

CanvasDraw.prototype.setHeight = function(h) {

    this.context.height = h;
};
CanvasDraw.prototype.getHeight = function() {

    return Number(this.context.height);
};

CanvasDraw.prototype.createRectangle = function(o) {

    var objPropsDefault = this.uiManager.getUIElement("objectProperties").objectPropertiesDefault;

    var rect = new Geometry.Shapes.Rectangle(objPropsDefault.x.value, objPropsDefault.y.value, objPropsDefault.width.value, objPropsDefault.height.value, objPropsDefault.fillColour.value, objPropsDefault.strokeColour.value, objPropsDefault.strokeWeight.value, objPropsDefault.fromCenter.value);

    rect.RenderGeometry(this, this.context, false);
    rect.RenderAdorners(this.uiManager.getUIElement("canvasAdorners"), this.uiManager.getUIElement("canvasAdorners").context, false);

    rect.RenderGeometry(this.uiManager.getUIElement("canvasSelection"), this.uiManager.getUIElement("canvasSelection").context, true);
    rect.RenderAdorners(this.uiManager.getUIElement("canvasSelection"), this.uiManager.getUIElement("canvasSelection").context, true);

    this.uiManager.addUIShape(rect);
};

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

