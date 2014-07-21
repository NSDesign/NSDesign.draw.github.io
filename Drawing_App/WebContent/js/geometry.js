/**
 * @author Nick Sullivan
 */


var Geometry = {

	Point : function( id, x, y, colour ){

		this.id = id;
		this.x = x;
		this.y = y;
		this.colour = colour;
		this.randomColour = Geometry.Colour.RGBColour( Math.random() * 255, Math.random() * 255, Math.random() * 255 );

		return point = {

			getID : this.id,
			getX : this.x,
			getY : this.y,
			getColour : this.colour,
			getRandomColour : this.randomColour,
		};
	},

	Segment : function( id, pointA, pointB, colour ){

		this.id = id;
		this.pointA = pointA;
		this.pointB = pointB;
		this.colour = colour;
		this.randomColour = Geometry.Colour.RGBColour( Math.random() * 255, Math.random() * 255, Math.random() * 255 );

		return segment = {

			getID : this.id,
			getPointA : this.pointA,
			getPointB : this.pointB,
			getColour : this.colour,
			getRandomColour : this.randomColour,
		};
	},

	Shapes : {

		BaseShape : function( x, y, width, height, fillColour, strokeColour, strokeWeight, fromCenter ){

			var alias = Geometry.Shapes.BaseShape;

			this.x = Number( x );
			alias.prototype.setX = function( x ){ this.x = Number( x ); };
			alias.prototype.getX = function(){ return this.x; };

			this.y = Number( y );
			alias.prototype.setY = function( y ){ this.y = Number( y ); };
			alias.prototype.getY = function(){ return this.y; };

			this.width = Number( width );
			alias.prototype.setWidth = function( width ){ this.width = Number( width ); };
			alias.prototype.getWidth = function(){ return this.width; };

			this.height = Number( height );
			alias.prototype.setHeight = function( height ){ this.height = Number( height ); };
			alias.prototype.getHeight = function(){ return this.height; };

			this.colourRandom = Geometry.Colour.RGBColour( Math.random() * 255, Math.random() * 255, Math.random() * 255 );
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

			alias.prototype.RenderGeometry = function(){ ; };

			this.adornerColour = "cyan";
            alias.prototype.setAdornerColour = function( adornerColour ){ this.adornerColour = adornerColour; };
            alias.prototype.getAdornerColour = function(){ return this.adornerColour; };

			this.adorners  = undefined;
			alias.prototype.setAdorners = function( adorners ){ this.adorners = adorners; };
			alias.prototype.getAdorners = function(){ return this.adorners; };

			alias.prototype.RenderAdorners = function(){ ; };


			this.selection  = undefined;
			alias.prototype.setSelection = function( selection ){ this.selection = selection; };
			alias.prototype.getSelection = function(){ return this.selection; };


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


			alias.prototype.RenderGeometry = function( canvas, canvasContext, selection ){

				//Shape

				switch( selection ){

				    case true:

				        canvas.setFillStyle( this.getColourRandom() );
                        canvas.setStrokeStyle( this.getColourRandom() );
				    break;

				    case false:

				        canvas.setFillStyle( this.getFillColour() );
                        canvas.setStrokeStyle( this.getStrokeColour() );
				    break;
				}

				canvas.setLineWidth( this.getStrokeWeight() );

				canvasContext.beginPath();
				canvasContext.rect( this.getX(), this.getY(), this.getWidth(), this.getHeight() );
				canvasContext.fill();
				canvasContext.stroke();
			};

			alias.prototype.RenderAdorners = function( canvas, canvasContext, selection ){

				//Adorners
				//Segments

				canvas.setLineWidth( 2 );

				canvas.setStrokeStyle( this.getGeometrySegments().segment0[ Geometry.Colour.ColouriseMethod( selection ) ] );
				canvasContext.beginPath();
				canvasContext.moveTo( this.getGeometrySegments().segment0.getPointA.getX, this.getGeometrySegments().segment0.getPointA.getY );
				canvasContext.lineTo( this.getGeometrySegments().segment0.getPointB.getX, this.getGeometrySegments().segment0.getPointB.getY );
				canvasContext.stroke();
				canvasContext.closePath();

				canvas.setStrokeStyle( this.getGeometrySegments().segment1[ Geometry.Colour.ColouriseMethod( selection ) ] );
				canvasContext.beginPath();
				canvasContext.moveTo( this.getGeometrySegments().segment1.getPointA.getX, this.getGeometrySegments().segment1.getPointA.getY );
				canvasContext.lineTo( this.getGeometrySegments().segment1.getPointB.getX, this.getGeometrySegments().segment1.getPointB.getY );
				canvasContext.stroke();
				canvasContext.closePath();

				canvas.setStrokeStyle( this.getGeometrySegments().segment2[ Geometry.Colour.ColouriseMethod( selection ) ] );
				canvasContext.beginPath();
				canvasContext.moveTo( this.getGeometrySegments().segment2.getPointA.getX, this.getGeometrySegments().segment2.getPointA.getY );
				canvasContext.lineTo( this.getGeometrySegments().segment2.getPointB.getX, this.getGeometrySegments().segment2.getPointB.getY );
				canvasContext.stroke();
				canvasContext.closePath();

				canvas.setStrokeStyle( this.getGeometrySegments().segment3[ Geometry.Colour.ColouriseMethod( selection ) ] );
				canvasContext.beginPath();
				canvasContext.moveTo( this.getGeometrySegments().segment3.getPointA.getX, this.getGeometrySegments().segment3.getPointA.getY );
				canvasContext.lineTo( this.getGeometrySegments().segment3.getPointB.getX, this.getGeometrySegments().segment3.getPointB.getY );
				canvasContext.stroke();
				canvasContext.closePath();

				//Adorners
				//Points
				var radius = 5;
				var start = 0;
				var end = 2 * Math.PI;

				canvas.setFillStyle( this.getGeometryPoints().point0[ Geometry.Colour.ColouriseMethod( selection ) ] );
				canvasContext.beginPath();
				canvasContext.arc( this.getGeometryPoints().point0.getX, this.getGeometryPoints().point0.getY, radius, start, end );
				canvasContext.fill();
				canvasContext.closePath();

				canvas.setFillStyle( this.getGeometryPoints().point1[ Geometry.Colour.ColouriseMethod( selection ) ] );
				canvasContext.beginPath();
				canvasContext.arc( this.getGeometryPoints().point1.getX, this.getGeometryPoints().point1.getY, radius, start, end );
				canvasContext.fill();
				canvasContext.closePath();

				canvas.setFillStyle( this.getGeometryPoints().point2[ Geometry.Colour.ColouriseMethod( selection ) ] );
				canvasContext.beginPath();
				canvasContext.arc( this.getGeometryPoints().point2.getX, this.getGeometryPoints().point2.getY, radius, start, end );
				canvasContext.fill();
				canvasContext.closePath();

				canvas.setFillStyle( this.getGeometryPoints().point3[ Geometry.Colour.ColouriseMethod( selection ) ] );
				canvasContext.beginPath();
				canvasContext.arc( this.getGeometryPoints().point3.getX, this.getGeometryPoints().point3.getY, radius, start, end );
				canvasContext.fill();
				canvasContext.closePath();
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

        RGBColour : function( r, g, b ){

            r = Math.floor( r );
            g = Math.floor( g );
            b = Math.floor( b );

            return [ "rgb(", r, ",", g, ",", b, ")" ].join( "" ); //"rgb(" + r + "," + g + "," + b + ")";
        },

        GetPixelColour : function( context, mousePos ){

            var imgData = context.getImageData( mousePos.x, mousePos.y, 1, 1 ).data;

            return {

                imageData : imgData,
                r : imgData[ 0 ],
                g : imgData[ 1 ],
                b : imgData[ 2 ],
                a : imgData[ 3 ],
            };
        },
	}
};



/*

//x, y, width, height, fillColour, strokeColour, strokeWeight, fromCenter

var base = new Geometry.Shapes.BaseShape();
var rect = new Geometry.Shapes.Rectangle(100, 100, 200, 150, "#FC00CC", "#FF0000", 2, false);
var elli = new Geometry.Shapes.Ellipse(250, 100, 200, 200, "#FF0000", "#FC00CC", 5, false, 0, 360, "CW");

console.log(base, rect, elli);

*/