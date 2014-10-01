/**
 * @author Nick Sullivan
 */


function CanvasBase( id, element, elementName, displayName, objectName, uiManager ) {

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
                        bindElement : Canvas_Container,
                        bindProperty : "left",
                        isPixel : true
                    },

                    y : {
                        label : "y",
                        control : "input",
                        type : "number",
                        value : 0,
                        extend : inputNumber,
                        bindElement : Canvas_Container,
                        bindProperty : "top",
                        isPixel : true
                    },

                    width : {
                        label : "width",
                        control : "input",
                        type : "number",
                        value : window.innerWidth - 50 - 2,
                        extend : inputNumber,
                        bindElement : Canvas_Container,
                        bindProperty : "width"
                    },

                    height : {
                        label : "height",
                        control : "input",
                        type : "number",
                        value : window.innerHeight - 80 - 2,
                        extend : inputNumber,
                        bindElement : Canvas_Container,
                        bindProperty : "height"
                    },

                    showGrid : {
                        label : "show grid",
                        control : "input",
                        type : "checkBox",
                        value : true,
                        extend : checkBox,
                        bindElement : CanvasGrid,
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
                        bindElement : CanvasGrid,
                        bindProperty : "setGridSize",
                        isFunction : true
                    },

                    gridSnap : {
                        label : "grid snap",
                        control : "input",
                        type : "checkBox",
                        value : false,
                        extend : checkBox,
                        bindElement : CanvasGrid,
                        bindProperty : "setSnapToGridPoint",
                        isFunction : true
                    }
                };
    this.element.bind = this; //Required for 'this' in event handler

    this.gridSize;
    this.centroid;

    this.isRendering = false;
};

CanvasBase.prototype = Object.create( Module_Base.getModule().prototype );

//----------------------------------------------------------------------------------------


CanvasBase.prototype.getCentroid = function(){

    return this.centroid = {

        x : this.canvas.width / 2,
        y : this.canvas.height / 2
    };
};


CanvasBase.prototype.setFillStyle = function( c ){

    this.context.fillStyle = c;
};
CanvasBase.prototype.getFillStyle = function(){

    return this.context.fillStyle;
};

CanvasBase.prototype.setStrokeStyle = function( c ){

    this.context.strokeStyle = c;
};
CanvasBase.prototype.getStrokeStyle = function(){

    return this.context.strokeStyle;
};

CanvasBase.prototype.setLineWidth = function( w ){

    this.context.lineWidth = w;
};
CanvasBase.prototype.getLineWidth = function(){

    return Number( this.context.lineWidth );
};

CanvasBase.prototype.setCanvasWidth = function( w ){

    this.canvas.width = w;
};
CanvasBase.prototype.getCanvasWidth = function(){

    return Number( this.canvas.width );
};

CanvasBase.prototype.setCanvasHeight = function( h ){

    this.canvas.height = h;
};
CanvasBase.prototype.getCanvasHeight = function(){

    return Number( this.canvas.height );
};

CanvasBase.prototype.setIsRendering = function( r ){

    this.isRendering = r;
};
CanvasBase.prototype.getIsRendering = function(){

    return this.isRendering;
};
