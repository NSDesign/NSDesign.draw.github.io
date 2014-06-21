
function toolBarManager(){
	managerBase.call( this );
	
	
}

toolBarManager.prototype = Object.create( managerBase.prototype );

var toolBarManagerObject = new toolBarManager();

//console.log(toolBarManagerObject.manageSelection(toolBarManagerObject));