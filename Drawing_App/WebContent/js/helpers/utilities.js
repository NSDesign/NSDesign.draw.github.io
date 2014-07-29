
var UTILITIES = {

	EXTENSIONS : {

		OBJECTS : {

			COPY_OBJECT : function( from, to ){

				var prop, to = to || {};

				for( prop in from ){

					to[prop] = from[prop];
				}

				return to;
			},

			COPY_OBJECTS : function(){

				var arg, len, prop, to = {};

				for (arg = 0; len = arguments.length, arg < len; arg += 1) {

			    	for (prop in arguments[arg]) {

			      		to[prop] = arguments[arg][prop];
			    	}
			  	}

			  	return to;
			},

			TO_ARRAY : function( o ){

                var i = 0, a = [];
                for( j in o ){

                    a[ i ] = o[ j ];
                    i += 1;
                }

                return a;
            }
		},

		ARRAYS : {

            SHUFFLE : function(){


            },
		},
	},

	REMOVE_UNITS_FROM_NUMBERICSTRING : function( string, remove ){

		return Number(string.replace( remove, ""));
	},
};

