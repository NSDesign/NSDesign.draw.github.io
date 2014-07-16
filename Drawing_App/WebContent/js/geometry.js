/**
 * @author Nick Sullivan
 */


var Geometry = {
	
	Point : function( x, y ){
		
		this.x = x;
		this.y = y;
		
		return point = {
			
			getX : this.x,
			getY : this.y,
		};
	},
		
	Segment : function( pointA, pointB ){
		
		this.pointA = pointA;
		this.pointB = pointB;
		
		return segment = {
			
			getPointA : this.pointA,
			getPointB : this.pointB,
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
			
			
			
			/*
			return {
				
				getX : alias.prototype.getX(),
				getY : alias.prototype.getY(),
				getWidth : alias.prototype.getWidth(),
				getHeight : alias.prototype.getHeight(),
				getFillColour : alias.prototype.getFillColour(),
				getStrokeColour : alias.prototype.getStrokeColour(),
				getStrokeWeight : alias.prototype.getStrokeWeight(),
				getFromCenter : alias.prototype.getFromCenter(),
				getIDName : alias.prototype.getIDName(),
				getIDNum : alias.prototype.getIDNum(),
			};
			*/
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
					point0 : new Geometry.Point( this.getX(), this.getY() ),
					point1 : new Geometry.Point( this.getX() + this.getWidth(), this.getY() ),
					point2 : new Geometry.Point( this.getX() + this.getWidth(), this.getY() + this.getHeight() ),
					point3 : new Geometry.Point( this.getX(), this.getY() + this.getHeight() ),
				}
				
			);
			
			//Segments			
			this.editAddSegments(
				{
					segment0 : new Geometry.Segment( this.getGeometryPoints().point0, this.getGeometryPoints().point1 ),
					segment1 : new Geometry.Segment( this.getGeometryPoints().point1, this.getGeometryPoints().point2 ),
					segment2 : new Geometry.Segment( this.getGeometryPoints().point2, this.getGeometryPoints().point3 ),
					segment3 : new Geometry.Segment( this.getGeometryPoints().point3, this.getGeometryPoints().point0 ),
				}
			);
			
			
			alias.prototype.RenderGeometry = function( canvasContext, canvas ){
				
				//Shape
				console.log(this, this.getFillColour());
				
				canvas.setFillStyle( this.getFillColour() );
				canvas.setStrokeStyle( this.getStrokeColour() );
				canvas.setLineWidth( this.getStrokeWeight() );
				
				canvasContext.beginPath();
				canvasContext.rect( this.getX(), this.getY(), this.getWidth(), this.getHeight() );
				canvasContext.fill();
				canvasContext.stroke();		
			};
			
			alias.prototype.RenderAdorners = function( canvasContext, canvas ){
				
				//Adorners
				//Segments
				canvas.setStrokeStyle( "#000000" );
				canvas.setLineWidth( 2 );
				
				canvasContext.beginPath();				
				canvasContext.moveTo( this.getGeometrySegments().segment0.getPointA.getX, this.getGeometrySegments().segment0.getPointA.getY );
				canvasContext.lineTo( this.getGeometrySegments().segment0.getPointB.getX, this.getGeometrySegments().segment0.getPointB.getY );
				canvasContext.stroke();
				canvasContext.closePath();
				
				canvasContext.beginPath();	
				canvasContext.moveTo( this.getGeometrySegments().segment1.getPointA.getX, this.getGeometrySegments().segment1.getPointA.getY );
				canvasContext.lineTo( this.getGeometrySegments().segment1.getPointB.getX, this.getGeometrySegments().segment1.getPointB.getY );
				canvasContext.stroke();
				canvasContext.closePath();
				
				canvasContext.beginPath();	
				canvasContext.moveTo( this.getGeometrySegments().segment2.getPointA.getX, this.getGeometrySegments().segment2.getPointA.getY );
				canvasContext.lineTo( this.getGeometrySegments().segment2.getPointB.getX, this.getGeometrySegments().segment2.getPointB.getY );
				canvasContext.stroke();
				canvasContext.closePath();
				
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
				
				canvas.setFillStyle( "#00FF00" );
				canvas.setStrokeStyle( "#000000" );
				canvas.setLineWidth( 2 );
				
				canvasContext.beginPath();			
				canvasContext.arc( this.getGeometryPoints().point0.getX, this.getGeometryPoints().point0.getY, radius, start, end );
				canvasContext.fill();
				canvasContext.stroke();	
				canvasContext.closePath();	
				
				canvasContext.beginPath();
				canvasContext.arc( this.getGeometryPoints().point1.getX, this.getGeometryPoints().point1.getY, radius, start, end );
				canvasContext.fill();
				canvasContext.stroke();	
				canvasContext.closePath();
				
				canvasContext.beginPath();
				canvasContext.arc( this.getGeometryPoints().point2.getX, this.getGeometryPoints().point2.getY, radius, start, end );
				canvasContext.fill();
				canvasContext.stroke();	
				canvasContext.closePath();
				
				canvasContext.beginPath();
				canvasContext.arc( this.getGeometryPoints().point3.getX, this.getGeometryPoints().point3.getY, radius, start, end );
				canvasContext.fill();
				canvasContext.stroke();	
				canvasContext.closePath();
			};

			/*
			return {s};
			*/
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
};

// x, y, width, height, fillColour, strokeColour, strokeWeight, fromCenter 

//var base = new Geometry.Shapes.BaseShape();
//var rect = new Geometry.Shapes.Rectangle(100, 100, 200, 150, "#FC00CC", "#FF0000", 2, false);
//var elli = new Geometry.Shapes.Ellipse(250, 100, 200, 200, "#FF0000", "#FC00CC", 5, false, 0, 360, "CW");

//console.log(base, rect, elli);

