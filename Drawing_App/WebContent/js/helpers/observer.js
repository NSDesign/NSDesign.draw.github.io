/**
 * @author Nick Sullivan
 */

function SubscriberBase(){
    
    this.Update = function(){};
}

function PublisherBase(){
    
    this.subscribers = {};
    
    this.Attach = function( subscriber ){
        
        this.subscribers[ subscriber ] = subscriber;
                  
        console.log( "ADDED SUBSCRIBER :", this.subscribers );
    };
        
    this.Detach = function( subscriber ){
        
        delete this.subscribers[ subscriber ];
            
        console.log( "REMOVED SUBSCRIBER :", this.subscribers );
    };
        
    this.Notify = function(){
        
        for( subscriber in this.subscribers){
   
            this.subscribers[ subscriber ].Update();
        }
            
        console.log( "SUBSCRIBERS UPDATED :", this.subscribers );
    };    
}


//-----------------------------------------------------------------------

function Publisher(){
    
    PublisherBase.call( this );
    
    this.state;
    
    this.getState = function(){
            
        return this.state;
    };
        
    this.setState = function( newState ){
            
        this.state = newState;
        this.Notify();
    };  
}


function Subscriber( publisher ){
    
    SubscriberBase.call( this );
    
    this.publisher = publisher;
            
    this.Update = function(){
            
        var publisherState = this.publisher.getState();
        console.log( publisherState );  
    };
}


//-----------------------------------------------------------------------

/*
publisher = new Publisher();
subscriber = new Subscriber( publisher );
publisher.Attach( subscriber );
publisher.setState( "HELLO" );
*/






