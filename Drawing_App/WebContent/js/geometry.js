/**
 * @author Nick Sullivan
 */


var Geometry = ( function(){

    return {

        GeoBase : function( id, x, y, pointA, pointB, colour ){

            this.id = id;
            this.x = x;
            this.y = y;
            this.pointA = pointA;
            this.pointB = pointB;
            this.colour = colour;

            this.states = {

                normal : {
                    state : "normal",
                    pointColour : "rgba( 0, 255, 0, 1 )",
                    segmentColour : "rgba( 0, 255, 255, 1 )",
                    radius : 3,
                    lineWidth : 6,
                    },

                active : {
                    state : "active",
                    pointColour : "rgba( 255, 128, 0, 1 )",
                    segmentColour : "rgba( 255, 0, 128, 1 )",
                    radius : 6,
                    lineWidth : 9,
                    },

                selected : {
                    state : "selected",
                    pointColour : "rgba( 255, 64, 255, 1 )",
                    segmentColour : "rgba( 64, 255, 64, 1 )",
                    radius : 6,
                    lineWidth : 9,
                    }
            };

            this.state = this.states.normal.state;
            this.type = "";
            this.selectionOffset = { x : 0, y : 0 };

            this.isActive = false;
            this.isSelected  = false;

            this.create = function( context ){};

            this.render = function( context ){};

            this.hitTest = function( canvasObject, context, x, y ){};

            this.select = function(){};
            this.unSelect = function(){};

            this.prototype = {

                move : function(){},
                add : function(){},
                remove : function(){},
            };
        },

    	Point : function( id, x, y, colour ){
    ///*
            Geometry.GeoBase.call( this, id, x, y, null, null, colour );
            Geometry.Point.prototype.__proto__ = Object.create( Geometry.GeoBase.prototype );
            Geometry.Point.prototype.constructor = Geometry.Point;
    //*/

            this.id = id;
            this.x = x;
            this.y = y;
            this.colour = colour;

            this.type = "point";
            this.radius = this.states.normal.radius;

            this.create = function( context ){

                context.beginPath();
                context.arc( this.x, this.y, this.radius, 0, Math.PI * 2);
            };

            this.render = function( context ){

                switch( this.state ){

                    case "normal" :

                        this.colour = this.states.normal.pointColour;
                        context.fillStyle = this.colour;
                        this.radius = this.states.normal.radius;
                    break;

                    case "active" :

                        this.colour = this.states.active.pointColour;
                        context.fillStyle = this.colour;
                        this.radius = this.states.active.radius;
                    break;

                    case "selected" :

                        this.colour = this.states.selected.pointColour;
                        context.fillStyle = this.colour;
                        this.radius = this.states.selected.radius;
                    break;
                }

                context.fill();
            };

            this.hitTest = function( canvasObject, context, x, y ){

                this.create( context );
                if( context.isPointInPath( x, y ) ){

                    this.state = this.states.active.state;
                    this.isActive = true;

                    canvasObject.activePoint = this;
                    canvasObject.currentType = this.type;

                    //InputMonitor.Device.Mouse.setCursor( canvasObject.canvas, "pointer" );

                }else{

                    this.state = this.states.normal.state;
                    this.isActive = false;
                }

            };

    		return this;
        },

    	Segment : function( id, pointA, pointB, colour ){
    ///*
            Geometry.GeoBase.call( this, id, null, null, pointA, pointB, colour );
            Geometry.Segment.prototype.__proto__ = Object.create( Geometry.GeoBase.prototype );
            Geometry.Segment.prototype.constructor = Geometry.Segment;
    //*/

            this.id = id;
            this.pointA = pointA;
            this.pointB = pointB;
            this.colour = colour;

            this.type = "segment";
            this.lineWidth = this.states.normal.lineWidth;

            this.create = function( context ){

                context.lineCap = "round";
                context.lineWidth = this.lineWidth;

                context.beginPath();
                context.moveTo( this.pointA.x, this.pointA.y );
                context.lineTo( this.pointB.x, this.pointB.y );
            };

            this.render = function( context ){

                switch( this.state ){

                    case "normal" :

                        this.colour = this.states.normal.segmentColour;
                        context.strokeStyle = this.colour;
                        this.lineWidth = this.states.normal.lineWidth;
                    break;

                    case "active" :

                        this.colour = this.states.active.segmentColour;
                        context.strokeStyle = this.colour;
                        this.lineWidth = this.states.active.lineWidth;
                    break;

                    case "selected" :

                        this.colour = this.states.selected.segmentColour;
                        context.strokeStyle = this.colour;
                        this.lineWidth = this.states.selected.lineWidth;
                    break;
                }

                context.stroke();
            };

            this.hitTest = function( canvasObject, context, x, y ){

                this.create( context );
                if( context.isPointInStroke( x, y ) ){

                    this.state = this.states.active.state;
                    this.isActive = true;

                    this.pointA.state = this.state;
                    this.pointA.render( context );
                    this.pointB.state = this.state;
                    this.pointB.render( context );

                    canvasObject.activeSegment = this;
                    canvasObject.currentType = this.type;

                    //InputMonitor.Device.Mouse.setCursor( canvasObject.canvas, "pointer" );

                }else{

                    this.state = this.states.normal.state;
                    this.isActive = false;

                    //this.pointA.state = this.state;
                    //this.pointB.state = this.state;
                }

            };

    		return this;
    		/*{

    			id : this.id,
    			pointA : this.pointA,
    			pointB : this.pointB,
    			colour : this.colour,
    			type : this.type,
    			isSelected : this.isSelected,
    			isActive : this.isActive,
    			lineWidth : this.lineWidth,
    			create : this.create,
    			render : this.render,
    		};*/
    	},

    	Shapes : {

    		BaseShape : function( x, y, width, height, fillColour, strokeColour, strokeWeight, fromCenter ){

    			var alias = Geometry.Shapes.BaseShape;

    			this.x = Number( x );
    			alias.prototype.setX = function( x ){

    			    this.x = x - this.selectionOffset.x;

    			    for( point in this.geometry.points ){

    			        this.geometry.points[ point ].x = x - this.geometry.points[ point ].selectionOffset.x;
    			    };
    			};
    			alias.prototype.getX = function(){ return this.x; };

    			this.y = Number( y );
    			alias.prototype.setY = function( y ){

    			    this.y = y - this.selectionOffset.y;

    			    for( point in this.geometry.points ){

                        this.geometry.points[ point ].y = y - this.geometry.points[ point ].selectionOffset.y;
                    };
    			};
    			alias.prototype.getY = function(){ return this.y; };

                this.width = Number( width );
    			alias.prototype.setWidth = function( width ){

    			    this.width = Number( width );

    			    this.geometry.points[ "point1" ].x = width + this.geometry.points[ "point0" ].x;
    			    this.geometry.points[ "point2" ].x = width + this.geometry.points[ "point3" ].x;

    			};
    			alias.prototype.getWidth = function(){ return this.width; };

    			this.height = Number( height );
    			alias.prototype.setHeight = function( height ){

    			    this.height = Number( height );

    			    this.geometry.points[ "point2" ].y = height + this.geometry.points[ "point1" ].y;
    			    this.geometry.points[ "point3" ].y = height + this.geometry.points[ "point0" ].y;

    			};
    			alias.prototype.getHeight = function(){ return this.height; };
    /*
    			this.colourRandom = Geometry.Colour.RGBAtoRGBAString( Math.random() * 255, Math.random() * 255, Math.random() * 255, 255 );
                alias.prototype.setColourRandom = function( colourRandom ){ this.colourRandom = colourRandom; };
                alias.prototype.getColourRandom = function(){ return this.colourRandom; };
    */
    			this.fillColour = fillColour;
    			alias.prototype.setFillColour = function( fillColour ){ this.fillColour = fillColour; };
    			alias.prototype.getFillColour = function(){ return this.fillColour; };

    			this.strokeColour = strokeColour;
    			alias.prototype.setStrokeColour = function( strokeColour ){ this.strokeColour = strokeColour; };
    			alias.prototype.getStrokeColour = function(){ return this.strokeColour; };

    			this.strokeWeight = Number( strokeWeight );
    			alias.prototype.setStrokeWeight = function( strokeWeight ){ this.strokeWeight = Number( strokeWeight ); };
    			alias.prototype.getStrokeWeight = function(){ return this.strokeWeight; };

    			this.fromCenter = fromCenter;
    			alias.prototype.setFromCenter = function( fromCenter ){ this.fromCenter = fromCenter; };
    			alias.prototype.getFromCenter = function(){ return this.fromCenter;};


    ////////////-----------------------------------------------------------------------------------------------------------<

                this.center = undefined;
                alias.prototype.setCenter = function( center ){ this.center = center; };
                alias.prototype.getCenter = function(){ return this.center; };

                this.pivot = undefined;
                alias.prototype.setPivot = function( pivot ){ this.pivot = pivot; };
                alias.prototype.getPivot = function(){ return this.pivot; };

                this.id = undefined;
                alias.prototype.setID = function( id ){ this.id = id; };
                alias.prototype.getID = function(){ return this.idName + "_" + this.idNum; };

    			this.idName = undefined;
    			alias.prototype.setIDName = function( idName ){ this.idName = idName; };
    			alias.prototype.getIDName = function(){ return this.idName; };

    			this.idNum = undefined;
    			alias.prototype.setIDNum = function( idNum ){ this.idNum = idNum; };
    			alias.prototype.getIDNum = function(){ return this.idNum; };

    			this.type = "shape";
                alias.prototype.getType = function(){ return this.type; };

                this.selectionOffset = { x : 0, y : 0 };
                alias.prototype.setSelectionOffset = function( x, y ){

                    this.selectionOffset.x = x;
                    this.selectionOffset.y = y;
                };
                alias.prototype.getSelectionOffset = function(){

                    return this.selectionOffset;
                };

                this.updateSelectionOffset = function( x, y ){

                    this.selectionOffset.x = x - this.x;
                    this.selectionOffset.y = y - this.y;

                    for( point in this.geometry.points ){

                        this.geometry.points[ point ].selectionOffset.x = x - this.geometry.points[ point ].x;
                        this.geometry.points[ point ].selectionOffset.y = y - this.geometry.points[ point ].y;
                    };
                };

    			this.geometry = { points : {}, segments : {} };
    			alias.prototype.setGeometry = function( geometry ){

    				this.geometry[ Object.keys( geometry ) ] = geometry[ Object.keys( geometry ) ];
    			};
    			alias.prototype.getGeometry = function(){ return this.geometry; };

    			alias.prototype.setGeometryPoints = function( points ){

    				this.geometry.points = points;
    			};
    			alias.prototype.getGeometryPoints = function(){ return this.geometry.points; };

    			alias.prototype.getNumPoints = function(){ return Object.keys( this.geometry.points ).length; };

    			alias.prototype.setGeometrySegments = function( segments ){

    				this.geometry.segments = segments;
    			};
    			alias.prototype.getGeometrySegments = function(){ return this.geometry.segments; };

    			alias.prototype.getNumSegments = function(){ return Object.keys( this.geometry.segments ).length; };

    			alias.prototype.RenderGeometry = function(){};

    			this.adornerColour = undefined;
                alias.prototype.setAdornerColour = function( adornerColour ){ this.adornerColour = adornerColour; };
                alias.prototype.getAdornerColour = function(){ return this.adornerColour; };

                this.showAdorners  = false;
                alias.prototype.setShowAdorners = function( showAdorners ){

                    this.showAdorners = showAdorners;

                };
                alias.prototype.getShowAdorners = function(){ return this.showAdorners; };

    			this.showAdornerPoints  = false;
    			alias.prototype.setShowAdornerPoints = function( showAdornerPoints ){ this.showAdornerPoints = showAdornerPoints; };
    			alias.prototype.getShowAdornerPoints = function(){ return this.showAdornerPoints; };

    			this.showAdornerSegments  = false;
                alias.prototype.setShowAdornerSegments = function( showAdornerSegments ){ this.showAdornerSegments = showAdornerSegments; };
                alias.prototype.getShowAdornerSegments = function(){ return this.showAdornerSegments; };

                this.isActive  = false;
                alias.prototype.setIsActive = function( isActive ){

                    this.isActive = isActive;
                    this.showAdornerSegments = isActive;
                };
                alias.prototype.getIsActive = function(){ return this.isActive; };

                this.isSelected  = false;
    			alias.prototype.setIsSelected = function( isSelected ){

    			    this.isSelected = isSelected;
    			    this.showAdorners = isSelected;
    			    this.showAdornerPoints = isSelected;
                    this.showAdornerSegments = isSelected;
    			};
    			alias.prototype.getIsSelected = function(){ return this.isSelected; };

                alias.prototype.HitTest = function( canvasObject, context, x, y ){

                    this.CreateGeometry( context );

                    if( context.isPointInPath( x, y ) || context.isPointInStroke( x, y ) ){

                        //this.state = this.states.active.state;
                        this.setIsActive( true );

                        canvasObject.activeShape = this;
                        canvasObject.currentType = this.type;

                        //InputMonitor.Device.Mouse.setCursor( canvasObject.canvas, "pointer" );

                        return true;
                    }else{

                        //this.state = this.states.normal.state;
                        this.setIsActive( false );
                        //canvasObject.activeShape = undefined;
                        //canvasObject.currentType = undefined;

                        //InputMonitor.Device.Mouse.setCursor( canvasObject.canvas, "default" );

                        return false;
                    }


                };

                this.zDepth = 0;
                alias.prototype.setZDepth = function( zDepth ){ this.zDepth = zDepth; };
                alias.prototype.getZDepth = function(){ return this.zDepth; };

    			alias.prototype.editAddPoints = function( points ){

    				this.geometry.points = points;
    			};
    			alias.prototype.editDeletePoint = function( point ){

    				this.geometry.points = point;
    			};

    			alias.prototype.editAddSegments = function( segments ){

    				this.geometry.segments = segments;
    			};
    			alias.prototype.editDeleteSegments = function( segment ){

    				this.geometry.segments = segment;
    			};

    			this.transform  = undefined;
    			alias.prototype.setTransform = function( transform ){ this.transform = transform; };
    			alias.prototype.getTransform = function(){ return this.transform;};
    		},

    		Rectangle : function( x, y, width, height, fillColour, strokeColour, strokeWeight, fromCenter ){

    			Geometry.Shapes.BaseShape.call( this, x, y, width, height, fillColour, strokeColour, strokeWeight, fromCenter );
    			var alias = Geometry.Shapes.Rectangle;
    			alias.prototype.__proto__ = Object.create( Geometry.Shapes.BaseShape.prototype );
                alias.prototype.constructor = alias;

                //Activate new shape
                this.setIsActive( true );

                //Shape type
                this.type = "rectangle";

    			//ID's
    			this.idName = this.type;
    			this.idNum = 0;
    			this.id = this.idName + "_" + this.idNum;

    			//Points
    			this.editAddPoints(
    				{
    					point0 : new Geometry.Point( 0, this.getX(), this.getY(), "blue" ),
    					point1 : new Geometry.Point( 1, this.getX() + this.getWidth(), this.getY(), "blue" ),
    					point2 : new Geometry.Point( 2, this.getX() + this.getWidth(), this.getY() + this.getHeight(), "blue" ),
    					point3 : new Geometry.Point( 3, this.getX(), this.getY() + this.getHeight(), "blue" ),
    				}
    			);

    			//Segments
    			this.editAddSegments(
    				{
    					segment0 : new Geometry.Segment( 0, this.getGeometryPoints().point0, this.getGeometryPoints().point1, "blue" ),
    					segment1 : new Geometry.Segment( 1, this.getGeometryPoints().point1, this.getGeometryPoints().point2, "blue" ),
    					segment2 : new Geometry.Segment( 2, this.getGeometryPoints().point2, this.getGeometryPoints().point3, "blue" ),
    					segment3 : new Geometry.Segment( 3, this.getGeometryPoints().point3, this.getGeometryPoints().point0, "blue" ),
    				}
    			);

                alias.prototype.CreateGeometry = function( canvasContext ){

                    canvasContext.lineCap = "square";
                    canvasContext.lineWidth = this.strokeWeight;

                    canvasContext.beginPath();
                    canvasContext.moveTo( this.getGeometrySegments().segment0.pointA.x, this.getGeometrySegments().segment0.pointA.y );
                    canvasContext.lineTo( this.getGeometrySegments().segment0.pointB.x, this.getGeometrySegments().segment0.pointB.y );
                    canvasContext.lineTo( this.getGeometrySegments().segment1.pointB.x, this.getGeometrySegments().segment1.pointB.y );
                    canvasContext.lineTo( this.getGeometrySegments().segment2.pointB.x, this.getGeometrySegments().segment2.pointB.y );
                    canvasContext.closePath();
                };

    			alias.prototype.RenderGeometry = function( canvasContext ){

                    canvasContext.fillStyle = this.fillColour;
                    canvasContext.strokeStyle = this.strokeColour;

    				this.CreateGeometry( canvasContext );

    				canvasContext.fill();
    				canvasContext.stroke();


                    canvasContext.fillStyle = "black";
                    canvasContext.font = "10px Arial";
                    canvasContext.fillText( "ID : " + this.getID() , this.getX() + 5, this.getY() + 10 );
                    canvasContext.fillText( "Active : " + this.getIsActive() , this.getX() + 5, this.getY() + 25 );
    				canvasContext.fillText( "Selected : " + this.getIsSelected() , this.getX() + 5, this.getY() + 40 );
    				canvasContext.fillText( "A Both : " + this.showAdorners , this.getX() + 5, this.getY() + 55 );
    				canvasContext.fillText( "A Points : " + this.showAdornerPoints , this.getX() + 5, this.getY() + 70 );
    				canvasContext.fillText( "A Segments : " + this.showAdornerSegments , this.getX() + 5, this.getY() + 85 );


    			};

    			alias.prototype.RenderAdornerSegments = function( canvasContext ){

                    for( var i = 0; l = this.getNumSegments(), i < l; i += 1 ){

                        var segments = this.getGeometrySegments()[ "segment" + i ];

                        segments.create( canvasContext );
                        segments.render( canvasContext );

    /*
                        if( i == 3 ){

                            var s = this.getGeometrySegments()[ "segment" + i ];

                            canvasContext.fillStyle = "black";
                            canvasContext.font = "10px Arial";
                            canvasContext.fillText( "ID : " + s.id , s.pointB.x - 105, s.pointB.y + 20 );
                            canvasContext.fillText( "Type : " + s.type , s.pointB.x - 105, s.pointB.y + 35 );
                            canvasContext.fillText( "Active : " + s.isActive , s.pointB.x - 105, s.pointB.y + 50 );
                            canvasContext.fillText( "Selected : " + s.isSelected , s.pointB.x - 105, s.pointB.y + 65 );
                            canvasContext.fillText( "State : " + s.state , s.pointB.x - 105, s.pointB.y + 80);
                            canvasContext.fillText( "LineWidth : " + s.lineWidth , s.pointB.x - 105, s.pointB.y + 95 );
                            canvasContext.fillText( "Colour : " + s.colour , s.pointB.x - 105, s.pointB.y + 110 );
                        }
    */
                    }
    			};

    			alias.prototype.RenderAdornerPoints = function( canvasContext ){

                    for( var i = 0; l = this.getNumPoints(), i < l; i += 1 ){

                        var points = this.getGeometryPoints()[ "point" + i ];

                        points.create( canvasContext );
                        points.render( canvasContext );
    /*
                        if( i == 3 ){

                            var p = this.getGeometryPoints()[ "point" + i ];

                            canvasContext.fillStyle =  "black";
                            canvasContext.font = "10px Arial";
                            canvasContext.fillText( "ID : " + p.id , p.x + 5, p.y + 10 );
                            canvasContext.fillText( "Type : " + p.type , p.x + 5, p.y + 25 );
                            canvasContext.fillText( "Active : " + p.isActive , p.x + 5, p.y + 40 );
                            canvasContext.fillText( "Selected : " + p.isSelected , p.x + 5, p.y + 55 );
                            canvasContext.fillText( "State : " + p.state , p.x + 5, p.y + 70 );
                            canvasContext.fillText( "Radius : " + p.radius , p.x + 5, p.y + 85 );
                            canvasContext.fillText( "Colour : " + p.colour , p.x + 5, p.y + 100 );
                        }
    */
                    }
                };


    		},

    		Ellipse : function( x, y, width, height, fillColour, strokeColour, strokeWeight, fromCenter, startAngle, endAngle, direction ){

    			Geometry.Shapes.BaseShape.call( this, x, y, width, height, fillColour, strokeColour, strokeWeight, fromCenter );
    			var alias = Geometry.Shapes.Ellipse;
    			alias.prototype.__proto__ = Object.create( Geometry.Shapes.BaseShape.prototype );
                alias.prototype.construtor = alias;


    			this.startAngle = startAngle;
    			this.endAngle = endAngle;
    			this.direction = direction;
    		},

            Polygon : {

            },

    		Line : {

    		},

    		Freeform : {

            },

    		CubicBezierCurve : {

    		},

    		QuadraticBezierCurve : {

            },

    		TextFont : {

    		},

        },

    };

})();


var Colour = ( function(){

    ColourMethods = {

        RGBAtoRGBAString : function( r, g, b, a ){

            var r = Math.floor( r );
            var g = Math.floor( g );
            var b = Math.floor( b );
            var a = Math.floor( a );

            return [ "rgba(", r, ",", g, ",", b, ",", a, ")" ].join( "" );
        },

        RGBAStringtoRGBA : function( rgba ){

            var start = rgba.indexOf( "(" );
            var end = rgba.lastIndexOf( ")" );
            var rgbExtract = rgba.substring( start + 1, end );
            var rgbArray = rgbExtract.split( "," );

            return {

                r : Number( rgbArray[ 0 ] ),
                g : Number( rgbArray[ 1 ] ),
                b : Number( rgbArray[ 2 ] ),
                a : Number( rgbArray[ 3 ] ),
            };
        },

        GetPixelColour : function( context, mousePos ){

            var imgData = context.getImageData( Math.floor( mousePos.x ), Math.floor( mousePos.y ), 1, 1 ).data;

            return {

                r : imgData[ 0 ],
                g : imgData[ 1 ],
                b : imgData[ 2 ],
                a : imgData[ 3 ],
            };
        },

        CompareRGBAColours : function( colourA, colourB ){

            //Get the colour objects component keys
            var cA = Object.keys( colourA );
            var cB = Object.keys( colourB );

            //Test colour objects has the same number of component keys
            if( cA.length === cB.length ){

            //Test colour objects component keys are the same

                cA.forEach( function( cB, index ){

                    if( this[ index ] !== cB )
                        return;
                }, cA );
            }

            //Test colour objects component values are the same
            for( component in colourA, colourB){

                if( colourA[ component ] !== colourB[ component ] ){

                   return false;
                }
            }

            return true;
        },
    };

    return ColourMethods;

})();


var Selection = ( function(){


})();







/*

//x, y, width, height, fillColour, strokeColour, strokeWeight, fromCenter

var base = new Geometry.Shapes.BaseShape();
var rect = new Geometry.Shapes.Rectangle(100, 100, 200, 150, "#FC00CC", "#FF0000", 2, false);
var elli = new Geometry.Shapes.Ellipse(250, 100, 200, 200, "#FF0000", "#FC00CC", 5, false, 0, 360, "CW");

console.log(base, rect, elli);

*/