
var objectProperties = function(){
	
	this.name = "ObjectProperties";
};

objectProperties.prototype.createObjectProperties = function(o){
	
	var oN = o.objectPropertiesDefault;
	var oP = document.getElementById(this.name).firstChild.nextSibling;
	
	oP.innerHTML = "";
	oP.innerHTML += "Object Properties : ";
	
	for(var i = 0; i < oN.length; i += 1){
		
		oP.innerHTML += oN[i][0]; 

		switch(oN[i][1]){
		
			case "input":
				
				oP.innerHTML += "<" + oN[i][1] + " " + "type=" + oN[i][2] + " " + "value=" + oN[i][3] + "></" + oN[i][1] + ">";
				oP.innerHTML += " ";
				break;
				
			case "toggle":
				
				oP.innerHTML += "<object type='text/html' data='WebContent/controls/togglebutton/togglebutton.html' width='52' height='41'></object>";
				oP.innerHTML += " ";
				
				//oP.innerHTML += "<" + oN[i][1] + " " + "type=" + oN[i][1] + " " + "value=" + oN[i][3] + ">" + oN[i][3] + "</" + oN[i][1] + ">";
				//oP.innerHTML += " ";
				break;
				
		}
	}	
	
	//oP.innerHTML += "</hgroup>";
	
};