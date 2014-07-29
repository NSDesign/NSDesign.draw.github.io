/**
 * @author Nick Sullivan
 */


var Geometry = {

    GeoBase : function( id, x, y, pointA, pointB, colour ){

        this.id = id;
        this.x = x;
        this.y = y;
        this.pointA = pointA;
        this.pointB = pointB;
        this.colour = colour;

        this.randomColour = Geometry.Colour.RGBAtoRGBAString( Math.random() * 255, Math.random() * 255, Math.random() * 255, 255 );
        this.isSelected  = false;

    },

	Point : function( id, x, y, colour ){

        //Geometry.GeoBase.call( this, id, x, y, null, null, colour );
        this.id = id;
        this.x = x;
        this.y = y;
        this.colour = colour;

        this.randomColour = Geometry.Colour.RGBAtoRGBAString( Math.random() * 255, Math.random() * 255, Math.random() * 255, 255 );
        this.isSelected  = false;
        this.selectionOffset = { x : 0, y : 0 };

		//return {

			this.getID = function(){

			    return this.id;
			};

			this.getX = function(){

                return this.x;
            };

			this.setX = function( x ){

			    this.x = x;
			};

			this.getY = function(){

                return this.y;
            };

			this.setY = function( y ){

                this.y = y;
            };

            this.getSelectionOffset = function(){

                return this.selectionOffset;
            };

            this.setSelectionOffset = function( x, y ){

                this.selectionOffset.x = x;
                this.selectionOffset.y = y;
            };

			this.getColour = function(){

                return this.colour;
            };

			this.getRandomColour = function(){

                return this.randomColour;
            };

            this.setIsSelected = function( s ){

                this.isSelected = s;
            };

			this.getIsSelected = function(){

                return this.isSelected;
            };
		//};
	},

	Segment : function( id, pointA, pointB, colour ){

        Geometry.GeoBase.call( this, id, null, null, pointA, pointB, colour );

		return {

			getID : this.id,
			getPointA : this.pointA,
			getPointB : this.pointB,
			getColour : this.colour,
			getRandomColour : this.randomColour,
			getIsSelected : this.isSelected,
		};
	},

	Shapes : {

		BaseShape : function( x, y, width, height, fillColour, strokeColour, strokeWeight, fromCenter ){

			var alias = Geometry.Shapes.BaseShape;

			this.x = Number( x );
			alias.prototype.setX = function( x ){

			    this.x = x - this.selectionOffset.x;

			    for( point in this.geometry.points ){

			        this.geometry.points[ point ].setX( x - this.geometry.points[ point ].getSelectionOffset().x );
			    };
			};
			alias.prototype.getX = function(){ return this.x; };

			this.y = Number( y );
			alias.prototype.setY = function( y ){

			    this.y = y - this.selectionOffset.y;

			    for( point in this.geometry.points ){

                    this.geometry.points[ point ].setY( y - this.geometry.points[ point ].getSelectionOffset().y );
                };
			};
			alias.prototype.getY = function(){ return this.y; };

			this.width = Number( width );
			alias.prototype.setWidth = function( width ){ this.width = Number( width ); };
			alias.prototype.getWidth = function(){ return this.width; };

			this.height = Number( height );
			alias.prototype.setHeight = function( height ){ this.height = Number( height ); };
			alias.prototype.getHeight = function(){ return this.height; };

			this.colourRandom = Geometry.Colour.RGBAtoRGBAString( Math.random() * 255, Math.random() * 255, Math.random() * 255, 255 );
            alias.prototype.setColourRandom = function( colourRandom ){ this.colourRandom = colourRandom; };
            alias.prototype.getColourRandom = function(){ return this.colourRandom; };

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

            this.id = undefined;
            alias.prototype.setID = function( id ){ this.id = id; };
            alias.prototype.getID = function(){ return this.idName + "_" + this.idNum; };

			this.idName = undefined;
			alias.prototype.setIDName = function( idName ){ this.idName = idName; };
			alias.prototype.getIDName = function(){ return this.idName; };

			this.idNum = undefined;
			alias.prototype.setIDNum = function( idNum ){ this.idNum = idNum; };
			alias.prototype.getIDNum = function(){ return this.idNum; };

////////////-----------------------------------------------------------------------------------------------------------<

			this.geometry = { points : {}, segments : {} };
			alias.prototype.setGeometry = function( geometry ){

				this.geometry[ Object.keys( geometry ) ] = geometry[ Object.keys( geometry ) ];
			};
			alias.prototype.getGeometry = function(){ return this.geometry; };

			alias.prototype.setGeometryPoints = function( points ){

				this.geometry.points = points;
			};
			alias.prototype.getGeometryPoints = function(){ return this.geometry.points; };

			alias.prototype.setGeometrySegments = function( segments ){

				this.geometry.segments = segments;
			};
			alias.prototype.getGeometrySegments = function(){ return this.geometry.segments; };

			alias.prototype.RenderGeometry = function(){};

			this.adornerColour = undefined;
            alias.prototype.setAdornerColour = function( adornerColour ){ this.adornerColour = adornerColour; };
            alias.prototype.getAdornerColour = function(){ return this.adornerColour; };

			this.adorners  = undefined;
			alias.prototype.setAdorners = function( adorners ){ this.adorners = adorners; };
			alias.prototype.getAdorners = function(){ return this.adorners; };

			alias.prototype.RenderAdorners = function(){ ; };

            this.zDepth = 0;
            alias.prototype.setZDepth = function( zDepth ){ this.zDepth = zDepth; };
            alias.prototype.getZDepth = function(){ return this.zDepth; };

            this.isActive  = false;
            alias.prototype.setIsActive = function( isActive ){ this.isActive = isActive; };
            alias.prototype.getIsActive = function(){ return this.isActive; };

            this.isSelected  = false;
			alias.prototype.setIsSelected = function( isSelected ){ this.isSelected = isSelected; };
			alias.prototype.getIsSelected = function(){ return this.isSelected; };


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


			//ID's
			this.setIDName( "Rectangle" );
			this.setIDNum( 0 );
			this.setID( this.getID() );

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

                return {

                    beginPath : canvasContext.beginPath(),

                    moveTo : canvasContext.moveTo( this.getGeometrySegments().segment0.getPointA.getX(), this.getGeometrySegments().segment0.getPointA.getY() ),
                    lineTo : canvasContext.lineTo( this.getGeometrySegments().segment0.getPointB.getX(), this.getGeometrySegments().segment0.getPointB.getY() ),
                    lineTo : canvasContext.lineTo( this.getGeometrySegments().segment1.getPointB.getX(), this.getGeometrySegments().segment1.getPointB.getY() ),
                    lineTo : canvasContext.lineTo( this.getGeometrySegments().segment2.getPointB.getX(), this.getGeometrySegments().segment2.getPointB.getY() ),

                    closePath : canvasContext.closePath()
                };
            };

			alias.prototype.RenderGeometry = function( canvas, canvasContext ){

				//Shape

                canvas.setFillStyle( this.getFillColour() );
                canvas.setStrokeStyle( this.getStrokeColour() );
				canvas.setLineWidth( this.getStrokeWeight() );

				this.CreateGeometry( canvasContext );

				canvasContext.fill();
				canvasContext.stroke();


                canvasContext.fillStyle =  "black";
                canvasContext.font = "16px Arial";
				canvasContext.fillText( this.getIsSelected() , this.getX() + 5, this.getY() + 20 );
				canvasContext.fillText( this.getID() , this.getX() + 5, this.getY() + 40 );
				canvasContext.fillText( this.getIsActive() , this.getX() + 110, this.getY() + 20 );
				canvasContext.fillText( this.getZDepth() , this.getX() + 110, this.getY() + 40 );
			};

			alias.prototype.RenderAdorners = function( canvas, canvasContext, selection ){

				//Adorners
				//Segments

				canvas.setLineWidth( 2 );

				canvas.setStrokeStyle( this.getGeometrySegments().segment0.getColour );
				canvasContext.beginPath();
				canvasContext.moveTo( this.getGeometrySegments().segment0.getPointA.getX(), this.getGeometrySegments().segment0.getPointA.getY() );
				canvasContext.lineTo( this.getGeometrySegments().segment0.getPointB.getX(), this.getGeometrySegments().segment0.getPointB.getY() );
				canvasContext.stroke();

				canvas.setStrokeStyle( this.getGeometrySegments().segment1.getColour );
				canvasContext.beginPath();
				canvasContext.moveTo( this.getGeometrySegments().segment1.getPointA.getX(), this.getGeometrySegments().segment1.getPointA.getY() );
				canvasContext.lineTo( this.getGeometrySegments().segment1.getPointB.getX(), this.getGeometrySegments().segment1.getPointB.getY() );
				canvasContext.stroke();

				canvas.setStrokeStyle( this.getGeometrySegments().segment2.getColour );
				canvasContext.beginPath();
				canvasContext.moveTo( this.getGeometrySegments().segment2.getPointA.getX(), this.getGeometrySegments().segment2.getPointA.getY() );
				canvasContext.lineTo( this.getGeometrySegments().segment2.getPointB.getX(), this.getGeometrySegments().segment2.getPointB.getY() );
				canvasContext.stroke();

				canvas.setStrokeStyle( this.getGeometrySegments().segment3.getColour );
				canvasContext.beginPath();
				canvasContext.moveTo( this.getGeometrySegments().segment3.getPointA.getX(), this.getGeometrySegments().segment3.getPointA.getY() );
				canvasContext.lineTo( this.getGeometrySegments().segment3.getPointB.getX(), this.getGeometrySegments().segment3.getPointB.getY() );
				canvasContext.stroke();

				//Adorners
				//Points
				var radius = 5;
				var start = 0;
				var end = 2 * Math.PI;

				canvas.setFillStyle( this.getGeometryPoints().point0.getColour() );
				canvasContext.beginPath();
				canvasContext.arc( this.getGeometryPoints().point0.getX(), this.getGeometryPoints().point0.getY(), radius, start, end );
				canvasContext.fill();

				canvas.setFillStyle( this.getGeometryPoints().point1.getColour() );
				canvasContext.beginPath();
				canvasContext.arc( this.getGeometryPoints().point1.getX(), this.getGeometryPoints().point1.getY(), radius, start, end );
				canvasContext.fill();

				canvas.setFillStyle( this.getGeometryPoints().point2.getColour() );
				canvasContext.beginPath();
				canvasContext.arc( this.getGeometryPoints().point2.getX(), this.getGeometryPoints().point2.getY(), radius, start, end );
				canvasContext.fill();

				canvas.setFillStyle( this.getGeometryPoints().point3.getColour() );
				canvasContext.beginPath();
				canvasContext.arc( this.getGeometryPoints().point3.getX(), this.getGeometryPoints().point3.getY(), radius, start, end );
				canvasContext.fill();
			};
		},

		Ellipse : function( x, y, width, height, fillColour, strokeColour, strokeWeight, fromCenter, startAngle, endAngle, direction ){

			Geometry.Shapes.BaseShape.call( this, x, y, width, height, fillColour, strokeColour, strokeWeight, fromCenter );

			var alias = Geometry.Shapes.Ellipse;

			alias.prototype.__proto__ = Object.create( Geometry.Shapes.BaseShape.prototype );

			this.startAngle = startAngle;
			this.endAngle = endAngle;
			this.direction = direction;
		},

		Line : {

		},

		Curve : {

		},

		Text : {

		},

	},

	Colour : {

	    ColouriseMethod : function ( selection ){

            return selection ? "getRandomColour" : "getColour";
        },

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
                var inc = 0;
                cA.forEach( function( cB ){

                    if( this[ inc ] !== cB )
                        return;

                    inc += 1;
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
	},

	Selection : {


	},


};



/*

//x, y, width, height, fillColour, strokeColour, strokeWeight, fromCenter

var base = new Geometry.Shapes.BaseShape();
var rect = new Geometry.Shapes.Rectangle(100, 100, 200, 150, "#FC00CC", "#FF0000", 2, false);
var elli = new Geometry.Shapes.Ellipse(250, 100, 200, 200, "#FF0000", "#FC00CC", 5, false, 0, 360, "CW");

console.log(base, rect, elli);

*/