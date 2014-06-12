SubModules = {
	Sub1 : (function (){})(),
	Sub2 : (function (){})()
};


var DrawingApplication = {
	
	MainModule : new (function( modules ) {
		
		//console.log( this, modules );
		
		var privateVar, privateMethod;
		
		privateVar = 0;
		
		privateMethod = function( foo ) {
			
			
		};
		
		
		return{
			
			publicVar : "Public Var",
			
			publicMethod : (function (){
				
				privateVar++;
				
				privateMethod( "bar" );
				
			})()
		};
		
	})(SubModules),
	
};



//console.log(DrawingApplication);
