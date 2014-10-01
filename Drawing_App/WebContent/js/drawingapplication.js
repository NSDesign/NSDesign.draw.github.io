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

/*//Get Set looks like error but works fine
var o = {

	a: 7,

	get get() {
		return this.a + 1;
	},

	set set(x) {
		this.a = x / 2;
	}
};
*/


var o = { a : 7 };
Object.defineProperties(o, {
    "get": { get: function () { return this.a + 2; } },
    "set": { set: function (x) { this.a = x / 2; } }
});

var person = {
    firstName: 'Jimmy',
    lastName: 'Smith',
};

Object.defineProperty(person, 'fullName', {
    get: function() {
        return firstName + ' ' + lastName;
    },
    set: function(name) {
        var words = name.split(' ');
        this.firstName = words[0] || '';
        this.lastName = words[1] || '';
    }
});

//console.log(o.a, o.set = 15, o.get);

var obj = {};
        Object.defineProperty( obj, "value", { value: true, writable: false, enumerable: true, configurable: true });

        (function(){
            var name = "John";
            Object.defineProperty( obj, "name", {
                get: function(){ return name; },
                set: function(value){ name = value; }
                });
        })();

        console.log( obj.value ); // true
        console.log( obj.name ); // John
        obj.name = "Ted";
        console.log( obj.name ); // Ted

        for ( var prop in obj ) {
            console.log( prop );
        }
        // value
        // name

        obj.value = false; // Exception if in strict mode Object.defineProperty( obj, "value", { writable: true, configurable: false });

        obj.value = false;
        console.log( obj.value ); // false delete obj.value; // Exception

