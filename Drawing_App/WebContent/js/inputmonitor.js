/**
 * @author Nick Sullivan
 */


/*

function InputMonitorBase(){


}

InputMonitorBase.prototype.initilise = function(){};

//----------------------------------------------------------------------------------------


function MouseMonitor(){


}

MouseMonitor.prototype.initilise = function(){};


function KeyBoardMonitor(){


}

KeyBoardMonitor.prototype.initilise = function(){};

 */

//----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------

var InputMonitor = {

    Device : {

        Mouse : {

            getPosition : function( event, scope ) {

                var event = event || new MouseEvent( "click" );
                var scope = scope || "local";

                switch( scope ){

                    case "local" :

                        return {

                            x : event.layerX,
                            y : event.layerY
                        };
                        break;

                    case "global" :

                        return {

                            x : event.clientX,
                            y : event.clientY
                        };
                        break;
                }
            },

            setCursor : function( element, cursor ){

                element.style.cursor = cursor;
            }
        },


        Keyboard : {

        }
    },
};
