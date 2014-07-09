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


//var MA = (function(){
	
	
//})();

var MB = (function(){
	
	var B = function (a){
		this.a = a;
		this.b = a;
		this.c = function C(b){ 
						this.b = b;
					};
		return this;
	};
	B.prototype.BM = function(){
		console.log(this.b);
	};
	return{
		gB : function(){
			return B;
		}
	};
})();


	
function A(){

	MB.gB().call(this, "HI");
	
};
//console.log(MB.gB("YEP"));
A.prototype = Object.create(MB.gB().prototype);
A.prototype.AM = function(){};

var AB = new A();
//console.log(AB);

/////////////////////////////////////////////////////////////

var o = {
	
	a: 7, 
	
	get b() {
		return this.a + 1;
	},
	
	set b(x) {
		this.a = x / 2;
	}
};

console.log(o.a, o.b = 5, o.b);

/*
var z = { a:0 };
Object.defineProperties(z, {
    "b": { get: function () { return this.a + 1; } },
    "c": { set: function (x) { this.a = x / 2; } }
});
*/




