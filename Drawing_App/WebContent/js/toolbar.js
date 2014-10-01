/**
 * @author Nick Sullivan
 */

ToolBar = function(id, element, elementName, displayName, objectName, uiManager) {

    Module_Base.getModule().call(this, id, element, elementName, displayName, objectName, uiManager);

    this.tools;
    this.ToolBarItems;
};

ToolBar.prototype = Object.create(Module_Base.getModule().prototype);

ToolBar.prototype.initialise = function() {

    this.tools = {

        selectObject : {

            id : 0,
            longName : "Select Object",
            shortName : "Sel Obj",
            shortCut : "Q",
            state : "unselected",
            mode : "select",

            objectPropertiesDefault : {

                autoSelect : {
                    label : "auto Select",
                    control : "input",
                    type : "checkBox",
                    value : false,
                    extend : checkBox,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setAutoSelect",
                    isFunction : true
                },

                displayHandles : {
                    label : "display Handles",
                    control : "input",
                    type : "checkBox",
                    value : false,
                    extend : checkBox,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setDisplayHandles",
                    isFunction : true
                },
            },

            iconNormal : {
                x : 0,
                y : 0
            },
            iconOver : {
                x : -50,
                y : 0
            },
            iconDown : {
                x : -100,
                y : 0
            },
            iconDisabled : {
                x : -150,
                y : 0
            },
        },

        selectElement : {

            id : 1,
            longName : "Select Element",
            shortName : "Sel Ele",
            shortCut : "W",
            state : "unselected",
            mode : "selectElement",

            objectPropertiesDefault : {

                selectPoint : {
                    label : "select Point",
                    control : "input",
                    type : "radio",
                    name : "selectElement",
                    value : "unchecked",
                    extend : radioButton,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setSelectPoint",
                    isFunction : true
                },

                selectSegment : {
                    label : "select Segment",
                    control : "input",
                    type : "radio",
                    value : "unchecked",
                    name : "selectElement",
                    extend : radioButton,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setSelectSegment",
                    isFunction : true
                },

                selectBoth : {
                    label : "select Both",
                    control : "input",
                    type : "radio",
                    value : "checked",
                    name : "selectElement",
                    extend : radioButton,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setSelectBoth",
                    isFunction : true
                },
            },

            iconNormal : {
                x : 0,
                y : -50
            },
            iconOver : {
                x : -50,
                y : -50
            },
            iconDown : {
                x : -100,
                y : -50
            },
            iconDisabled : {
                x : -150,
                y : -50
            },
        },

        createRectangle : {

            id : 2,
            longName : "Create Rectangle",
            shortName : "Cre Rec",
            shortCut : "R",
            state : "unselected",
            mode : "create",

            objectPropertiesDefault : {

                fromCenter : {
                    label : "from Center",
                    control : "input",
                    type : "checkBox",
                    value : false,
                    extend : checkBox,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setFromCenter",
                    isFunction : true
                },

                x : {
                    label : "x",
                    control : "input",
                    type : "number",
                    value : 100,
                    extend : inputNumber,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setX",
                    isFunction : true
                },

                y : {
                    label : "y",
                    control : "input",
                    type : "number",
                    value : 30,
                    extend : inputNumber,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setY",
                    isFunction : true
                },

                width : {
                    label : "width",
                    control : "input",
                    type : "number",
                    value : 100,
                    extend : inputNumber,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setWidth",
                    isFunction : true
                },

                height : {
                    label : "height",
                    control : "input",
                    type : "number",
                    value : 100,
                    extend : inputNumber,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setHeight",
                    isFunction : true
                },

                fillColour : {
                    label : "fill Colour",
                    control : "input",
                    type : "color",
                    value : "rgba( 255, 255, 255, 1 )",
                    extend : colourSelect,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setFillStyle",
                    isFunction : true
                },

                strokeColour : {
                    label : "stroke Colour",
                    control : "input",
                    type : "color",
                    value : "#000000",
                    extend : colourSelect,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setStrokeStyle",
                    isFunction : true
                },

                strokeWeight : {
                    label : "stroke Weight",
                    control : "input",
                    type : "number",
                    value : 1,
                    extend : inputNumber,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setLineWidth",
                    isFunction : true
                },

            },

            iconNormal : {
                x : 0,
                y : -100
            },
            iconOver : {
                x : -50,
                y : -100
            },
            iconDown : {
                x : -100,
                y : -100
            },
            iconDisabled : {
                x : -150,
                y : -100
            },
        },

        createEllipse : {

            id : 3,
            longName : "Create Ellipse",
            shortName : "Cre Eli",
            shortCut : "E",
            state : "unselected",
            mode : "create",

            objectPropertiesDefault : {

                fromCenter : {
                    label : "from Center",
                    control : "input",
                    type : "checkBox",
                    value : true,
                    extend : checkBox,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setFromCenter",
                    isFunction : true
                },

                x : {
                    label : "x",
                    control : "input",
                    type : "number",
                    value : 100,
                    extend : inputNumber,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setX",
                    isFunction : true
                },

                y : {
                    label : "y",
                    control : "input",
                    type : "number",
                    value : 100,
                    extend : inputNumber,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setY",
                    isFunction : true
                },

                radius : {
                    label : "radius",
                    control : "input",
                    type : "number",
                    min : 0,
                    max : 10000,
                    value : 50,
                    extend : inputNumber,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setRadius",
                    isFunction : true
                },

                startAngle : {
                    label : "startAngle",
                    control : "input",
                    type : "number",
                    min : 0,
                    max : 360,
                    value : 0,
                    extend : inputNumber,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setStartAngle",
                    isFunction : true
                },

                endAngle : {
                    label : "endAngle",
                    control : "input",
                    type : "number",
                    min : 0,
                    max : 360,
                    value : 360,
                    extend : inputNumber,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setEndAngle",
                    isFunction : true
                },

                direction : {
                    label : "direction",
                    control : "input",
                    type : "checkBox",
                    value : false,
                    extend : checkBox,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setDirection",
                    isFunction : true
                },

                fillColour : {
                    label : "fill Colour",
                    control : "input",
                    type : "color",
                    value : "#FFFF00",
                    extend : colourSelect,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setFillStyle",
                    isFunction : true
                },

                strokeColour : {
                    label : "stroke Colour",
                    control : "input",
                    type : "color",
                    value : "#00FFFF",
                    extend : colourSelect,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setStrokeStyle",
                    isFunction : true
                },

                strokeWeight : {
                    label : "stroke Weight",
                    control : "input",
                    type : "number",
                    value : 1,
                    extend : inputNumber,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setLineWidth",
                    isFunction : true
                },

            },

            iconNormal : {
                x : 0,
                y : -150
            },
            iconOver : {
                x : -50,
                y : -150
            },
            iconDown : {
                x : -100,
                y : -150
            },
            iconDisabled : {
                x : -150,
                y : -150
            },
        },

        createLine : {

            id : 4,
            longName : "Create Line",
            shortName : "Cre Lin",
            shortCut : "L",
            state : "unselected",
            mode : "create",

            objectPropertiesDefault : {

                x : {
                    label : "x",
                    control : "input",
                    type : "number",
                    value : 100,
                    extend : inputNumber,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setX",
                    isFunction : true
                },

                y : {
                    label : "y",
                    control : "input",
                    type : "number",
                    value : 100,
                    extend : inputNumber,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setY",
                    isFunction : true
                },

                width : {
                    label : "width",
                    control : "input",
                    type : "number",
                    value : 100,
                    extend : inputNumber,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setWidth",
                    isFunction : true
                },

                height : {
                    label : "height",
                    control : "input",
                    type : "number",
                    value : 100,
                    extend : inputNumber,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setHeight",
                    isFunction : true
                },

                fillColour : {
                    label : "fill Colour",
                    control : "input",
                    type : "color",
                    value : "#FF0000",
                    extend : colourSelect,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setFillStyle",
                    isFunction : true
                },

                strokeColour : {
                    label : "stroke Colour",
                    control : "input",
                    type : "color",
                    value : "#0000FF",
                    extend : colourSelect,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setStrokeStyle",
                    isFunction : true
                },

                strokeWeight : {
                    label : "stroke Weight",
                    control : "input",
                    type : "number",
                    value : 1,
                    extend : inputNumber,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setLineWidth",
                    isFunction : true
                },
            },

            iconNormal : {
                x : 0,
                y : -200
            },
            iconOver : {
                x : -50,
                y : -200
            },
            iconDown : {
                x : -100,
                y : -200
            },
            iconDisabled : {
                x : -150,
                y : -200
            },
        },

        createCurve : {

            id : 5,
            longName : "Create Curve",
            shortName : "Cre Crv",
            shortCut : "T",
            state : "unselected",
            mode : "create",

            objectPropertiesDefault : {

                x : {
                    label : "x",
                    control : "input",
                    type : "number",
                    value : 100,
                    extend : inputNumber,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setX",
                    isFunction : true
                },

                y : {
                    label : "y",
                    control : "input",
                    type : "number",
                    value : 100,
                    extend : inputNumber,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setY",
                    isFunction : true
                },

                width : {
                    label : "width",
                    control : "input",
                    type : "number",
                    value : 100,
                    extend : inputNumber,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setWidth",
                    isFunction : true
                },

                height : {
                    label : "height",
                    control : "input",
                    type : "number",
                    value : 100,
                    extend : inputNumber,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setHeight",
                    isFunction : true
                },

                fillColour : {
                    label : "fill Colour",
                    control : "input",
                    type : "color",
                    value : "#FF0000",
                    extend : colourSelect,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setFillStyle",
                    isFunction : true
                },

                strokeColour : {
                    label : "stroke Colour",
                    control : "input",
                    type : "color",
                    value : "#0000FF",
                    extend : colourSelect,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setStrokeStyle",
                    isFunction : true
                },

                strokeWeight : {
                    label : "stroke Weight",
                    control : "input",
                    type : "number",
                    value : 1,
                    extend : inputNumber,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setLineWidth",
                    isFunction : true
                },
            },

            iconNormal : {
                x : 0,
                y : -250
            },
            iconOver : {
                x : -50,
                y : -250
            },
            iconDown : {
                x : -100,
                y : -250
            },
            iconDisabled : {
                x : -150,
                y : -250
            },
        },

        createText : {

            id : 6,
            longName : "Create Text",
            shortName : "Cre Txt",
            shortCut : "Y",
            state : "unselected",
            mode : "create",

            objectPropertiesDefault : {

                font : {
                    label : "font",
                    control : "input",
                    type : "text",
                    value : "Arial",
                    extend : inputNumber,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setFont",
                    isFunction : true
                },

                fontSize : {
                    label : "font Size",
                    control : "input",
                    type : "number",
                    value : 14,
                    extend : inputNumber,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setFontSize",
                    isFunction : true
                },

                fontStyle : {
                    label : "font Style",
                    control : "input",
                    type : "text",
                    value : "normal",
                    extend : inputNumber,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setFontStyle",
                    isFunction : true
                },

                fontVariant : {
                    label : "font Variant",
                    control : "input",
                    type : "text",
                    value : "normal",
                    extend : inputNumber,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setFontVariant",
                    isFunction : true
                },

                fontWeight : {
                    label : "font Weight",
                    control : "input",
                    type : "text",
                    value : "normal",
                    extend : inputNumber,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setFontWeight",
                    isFunction : true
                },

                x : {
                    label : "x",
                    control : "input",
                    type : "number",
                    value : 100,
                    extend : inputNumber,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setX",
                    isFunction : true
                },

                y : {
                    label : "y",
                    control : "input",
                    type : "number",
                    value : 100,
                    extend : inputNumber,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setY",
                    isFunction : true
                },

                width : {
                    label : "width",
                    control : "input",
                    type : "number",
                    value : 100,
                    extend : inputNumber,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setWidth",
                    isFunction : true
                },

                height : {
                    label : "height",
                    control : "input",
                    type : "number",
                    value : 100,
                    extend : inputNumber,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setHeight",
                    isFunction : true
                },

                fillStyle : {
                    label : "fill Style",
                    control : "input",
                    type : "text",
                    value : "solid",
                    extend : inputNumber,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setFillStyle",
                    isFunction : true
                },

                fillColour : {
                    label : "fill Colour",
                    control : "input",
                    type : "color",
                    value : "#FF0000",
                    extend : colourSelect,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setFillStyle",
                    isFunction : true
                },

                strokeStyle : {
                    label : "stroke Style",
                    control : "input",
                    type : "text",
                    value : "solid",
                    extend : inputNumber,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setStrokeStyle",
                    isFunction : true
                },

                strokeColour : {
                    label : "stroke Colour",
                    control : "input",
                    type : "color",
                    value : "#0000FF",
                    extend : colourSelect,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setStrokeStyle",
                    isFunction : true
                },

                strokeWeight : {
                    label : "stroke Weight",
                    control : "input",
                    type : "number",
                    value : 1,
                    extend : inputNumber,
                    bindElement : this.uiManager.getUIElement("canvas"),
                    bindProperty : "setLineWidth",
                    isFunction : true
                },
            },

            iconNormal : {
                x : 0,
                y : -300
            },
            iconOver : {
                x : -50,
                y : -300
            },
            iconDown : {
                x : -100,
                y : -300
            },
            iconDisabled : {
                x : -150,
                y : -300
            },
        },

        canvasZoom : {

            id : 7,
            longName : "Canvas Zoom",
            shortName : "Cvs Zom",
            shortCut : "Z",
            state : "unselected",
            mode : "manipulate",

            objectPropertiesDefault : {

            },

            iconNormal : {
                x : 0,
                y : -350
            },
            iconOver : {
                x : -50,
                y : -350
            },
            iconDown : {
                x : -100,
                y : -350
            },
            iconDisabled : {
                x : -150,
                y : -350
            },
        },

        canvasPan : {

            id : 8,
            longName : "Canvas Pan",
            shortName : "Cvs Pan",
            shortCut : "P",
            state : "unselected",
            mode : "manipulate",

            objectPropertiesDefault : {

            },

            iconNormal : {
                x : 0,
                y : -400
            },
            iconOver : {
                x : -50,
                y : -400
            },
            iconDown : {
                x : -100,
                y : -400
            },
            iconDisabled : {
                x : -150,
                y : -400
            },
        },
    };

    this.ToolBarItems = new ToolBarItems(0, document.getElementById("ToolBarItems"), "ToolBarItems", "Tool Bar Items", "toolBarItems", this.uiManager);
    this.ToolBarItems.initialise(this.tools);
};

//--------->

ToolBarItems = function(id, element, elementName, displayName, objectName, uiManager) {

    Module_Base.getModule().call(this, id, element, elementName, displayName, objectName, uiManager);

    this.toolBarItems = {};
    this.previousChecked;
    this.currentChecked;
};

//ToolBarItems.prototype = Object.create( Module_Base.getModule().prototype );

ToolBarItems.prototype.initialise = function(tools) {

    for (tool in tools ) {

        var toolBarItem = "ToolBarItem_" + tools[tool].id;
        var toolBarItemInput = toolBarItem + " input";
        var toolBarItemInputElement = document.querySelector("#" + toolBarItemInput);
        var toolBarItemDisplayName = tools[tool].longName + " (" + tools[tool].shortCut + ")";
        var objectName = tool;

        this.toolBarItems[tool] = new ToolBarItem(tools[tool].id, toolBarItemInputElement, toolBarItem, toolBarItemDisplayName, objectName, this.uiManager);
        this.toolBarItems[tool].initialise(tools[tool], this);
    }

    this.uiManager.addUIElements(this.toolBarItems);
};

//--------->

ToolBarItem = function(id, element, elementName, displayName, objectName, uiManager) {

    Module_Base.getModule().call(this, id, element, elementName, displayName, objectName, uiManager);

    this.id = id;
    this.toolBar;
    this.toolBarItem;
    this.iconImage;
    this.element.bind = this;
    //Only required for expected meaning of 'this' in event handler
    this.element.addEventListener("mouseover", this.mouseOverEvent, false);
    this.element.addEventListener("mouseout", this.mouseOutEvent, false);
    this.element.addEventListener("click", this.clickEvent, false);
    this.element.addEventListener("dblclick", this.doubleClickEvent, false);

    //console.log(this);
};

ToolBarItem.prototype = Object.create(Module_Base.getModule().prototype);

ToolBarItem.prototype.initialise = function(toolBarItem, toolBarItems) {

    this.toolBarItem = toolBarItem;
    this.toolBarItems = toolBarItems;
    this.objectPropertiesDefault = this.toolBarItem.objectPropertiesDefault;

    var toolBarItemImage = "#ToolBarItem_" + this.id + " img";
    this.iconImage = document.querySelector(toolBarItemImage);

    this.setNormalState();

    //Check if toolBarItem is a publisher? -
    //Has been determined it is, if it's objectPropertiesDefault{ properties } apply to the canvas.context
    //e.g fillColour, strokeWeight etc

};

ToolBarItem.prototype.setNormalState = function() {

    this.setIconPosition(this.toolBarItem.iconNormal);
};

ToolBarItem.prototype.setOverState = function() {

    this.setIconPosition(this.toolBarItem.iconOver);
};

ToolBarItem.prototype.setDownState = function() {

    this.setIconPosition(this.toolBarItem.iconDown);
};

ToolBarItem.prototype.setIconPosition = function(iconState) {

    var iconPosition = iconState;

    this.iconImage.style.left = iconPosition.x + "px";
    this.iconImage.style.top = iconPosition.y + "px";
};

ToolBarItem.prototype.createShape = function(o) {

    //this.uiManager.getUIElement( "canvasDraw" )[ this.element.id ](o);
    //console.log( this.uiManager.getUIElement( "canvasDraw" )[ this.element.id ] );
};

ToolBarItem.prototype.setUIMode = function(e) {

    this.uiManager.setUIMode(this.toolBarItem.mode);
};

ToolBarItem.prototype.mouseOverEvent = function(e) {

    this.checked ? this.bind.setDownState() : this.bind.setOverState();
};

ToolBarItem.prototype.mouseOutEvent = function(e) {

    this.checked ? this.bind.setDownState() : this.bind.setNormalState();
};

ToolBarItem.prototype.clickEvent = function(e) {

    this.bind.toolBarItems.previousChecked = this.bind.toolBarItems.currentChecked;
    this.bind.toolBarItems.currentChecked = this.bind;

    this.bind.toolBarItems.previousChecked != undefined ? this.bind.toolBarItems.previousChecked.setNormalState() : false;

    this.bind.setDownState();

    this.bind.setAsContext();
    this.bind.setUIMode();

    //TODO Setup Subscriber to "ObjectPropertiesDefault" rather than setting property explicitly
    this.bind.setObjectPropertiesDefault();

};

ToolBarItem.prototype.doubleClickEvent = function(e) {

    //this.bind.createShape(this.bind.objectPropertiesDefault);
};

