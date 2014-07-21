/**
 * @author Nick Sullivan
 */

function CanvasSelection( id, element, elementName, displayName, objectName, uiManager ) {
        
    CanvasBase.call( this, id, element, elementName, displayName, objectName, uiManager );
};

CanvasSelection.prototype = Object.create( CanvasBase.prototype );

//----------------------------------------------------------------------------------------

