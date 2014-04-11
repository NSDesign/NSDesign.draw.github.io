
var toolBar = {

		states : {
			
			selection : ["selected", "unselected"],
			docking : ["docked", "undocked"],
			visibility : ["expanded", "collapsed"]
			
		},
		
};



function initToolBar(name, states, position, tools){
	
	this.name = name;
	this.states = states;
	this.position = position;	
	this.tools = tools;
	
}

var ToolBarObject = new initToolBar("Tool Bar", new Array(toolBar.states.selection[1], toolBar.states.docking[0], toolBar.states.visibility[0]), new Array(10, 70), tools);

//console.log(ToolBarObject);