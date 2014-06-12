
//TODO
//MOVE TO A UTILITY LIBRARY

Array.prototype.newunshift = function( arg ){
	
	if( arg != null && arg != undefined && arg != "" && arg != this[ 0 ] && arg != this[ 1 ] ){	
		
		if( this.length > 0 ){
			
			this[ 1 ] = this[ 0 ];
		}
			
		if( this.length > 1 ){
			
			this.splice( 2, 1 );
		}
	
		this[ 0 ] = arg;
	}
}; 