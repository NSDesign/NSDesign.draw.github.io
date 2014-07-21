/**
 * @author Nick Sullivan
 */

function CanvasManager( uiManager ){
    
    this.uiManager = uiManager;
    this.canvasCollection = {};
    
    return {
        
        Add : function( canvas ){
            
            canvasCollection[ canvas ] = canvas;
        },
        
        Remove : function( canvas ){
            
            delete canvasCollection[ canvas ];
        },
        
        GetCollection : function(){
            
            return canvasCollection;
        },
        
        GetUIManager : function(){
            
            return uiManager;
        }   
    };
}

