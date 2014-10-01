/**
 * @author Nick Sullivan
 */

//TODO
//Add Tool Default Properties Object
//To all Tools

Module_Base.Tools = (function(){

	var tools = {

		selectObject : {

			id : 0,
			longName : "Select Object",
			shortName : "Sel Obj",
			shortCut : "Q",
			state : "unselected",

			objectPropertiesDefault : {

				autoSelect : {
					label : "auto Select",
					control : "input",
					type : "button",
					value : false,
					extend : toggleButton,
					bindElement : this,
					bindProperty : "setAutoSelect",
					isFunction : true
				},

				displayHandles : {
					label : "display Handles",
					control : "input",
					type : "button",
					value : false,
					extend : toggleButton,
					bindElement : this,
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

			objectPropertiesDefault : {

				selectPoint : {
					label : "select Point",
					control : "input",
					type : "radio",
					name : "selectElement",
					value : false,
					extend : radioButton,
					bindElement : this,
					bindProperty : "setSelectPoint",
					isFunction : true
				},

				selectSegment : {
					label : "select Segment",
					control : "input",
					type : "radio",
					value : false,
					name : "selectElement",
					extend : radioButton,
					bindElement : this,
					bindProperty : "setSelectSegment",
					isFunction : true
				},

				selectBoth : {
					label : "select Both",
					control : "input",
					type : "radio",
					value : true,
					name : "selectElement",
					extend : radioButton,
					bindElement : this,
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

			objectPropertiesDefault : {

				fromCenter : {
					label : "from Center",
					control : "input",
					type : "button",
					value : false,
					extend : toggleButton,
					bindElement : this,
					bindProperty : "setFromCenter",
					isFunction : true
				},

				width : {
					label : "width",
					control : "input",
					type : "number",
					value : 100,
					extend : inputNumber,
					bindElement : this,
					bindProperty : "width"
				},

				height : {
					label : "height",
					control : "input",
					type : "number",
					value : 100,
					extend : inputNumber,
					bindElement : this,
					bindProperty : "width"
				},

				fillColour : {
					label : "fill Colour",
					control : "input",
					type : "color",
					value : "rgba( 255, 0, 0, 0.5 )",
					bindElement : this,
					bindProperty : "color"
				},

				strokeColour : {
					label : "stroke Colour",
					control : "input",
					type : "color",
					value : "#FF0000",
					bindElement : this,
					bindProperty : "color"
				},

				strokeWeight : {
					label : "stroke Weight",
					control : "input",
					type : "number",
					value : 1,
					extend : inputNumber,
					bindElement : this,
					bindProperty : "strokeWeight"
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

			objectPropertiesDefault : {

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

			objectPropertiesDefault : {

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

			objectPropertiesDefault : {

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

			objectPropertiesDefault : {

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

	return{

		getTools : function(){

			return tools;
		},

		getTool : function( tool ){

			return tools[ tool ];
		},
	};
})();
