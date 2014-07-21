function managerBase(){

	this.currentSelection = null;
	this.previousSelection = null;
	
	this.selection = new Array();
};


managerBase.prototype.manageSelection = function(s){
	
	this.selection.newunshift(s);
		
	this.currentSelection = this.selection[0];
	if(this.selection.length > 1){
		this.previousSelection = this.selection[1];
	}
		
	return this.selection;
};

