ulam.draw.symbols.Star = (function () {

	var Star = function (numPoints, colour) {
		this._numPoints = numPoints;
		this._colour = colour;
	};
	
	Star.prototype.draw = function (drawingContext, point, dimensions) {
		
		var radius = dimensions.height / 2;
		
		drawingContext.save();
		
		drawingContext.translate(point.x, point.y);
		drawingContext.rotate(Math.random());
		
		drawingContext.fillStyle = this._colour;
		
		drawingContext.beginPath();
		
		drawingContext.moveTo(0, 0 - radius);
	    for (var i = 0; i < this._numPoints; i++)
	    {
	    	drawingContext.rotate(Math.PI / this._numPoints);
	    	drawingContext.lineTo(0, 0 - (radius * 0.35));
	    	drawingContext.rotate(Math.PI / this._numPoints);
	    	drawingContext.lineTo(0, 0 - radius);
	    }
	    
	    drawingContext.closePath();
	    drawingContext.fill();
		
		drawingContext.restore();
	};
	
	return Star;
	
})();

ulam.draw.symbols.getStarConstructor = function (numPoints, colour) {
	return ulam.draw.symbols.Star.bind(null, numPoints, colour);
};

ulam.draw.symbols.TwinklingStar = (function () {
	
	var TwinklingStar = function (numPoints, colour, backgroundColour, n) {
		this._star = new ulam.draw.symbols.Star(numPoints, colour);
		this._backgroundColour = backgroundColour;
		this._n = n;
	};
	
	TwinklingStar.prototype.draw = function (drawingContext, point, dimensions) {
		
		this._star.draw(drawingContext, point, dimensions);
		
		var self = this;
		var groundRectangleOrigin = { x: point.x - dimensions.width / 2, y: point.y - dimensions.height / 2 };
		
		setInterval(function () {
			drawingContext.save();
			drawingContext.fillStyle = self._backgroundColour;
			drawingContext.fillRect(groundRectangleOrigin.x, groundRectangleOrigin.y, dimensions.width, dimensions.height);
			drawingContext.restore();
			self._star.draw(drawingContext, point, dimensions);
		}, Math.random() * 1000 + 500);
	};
	
	return TwinklingStar;
	
})();

ulam.draw.symbols.getTwinklingStarConstructor = function (numPoints, colour, backgroundColour) {
	return ulam.draw.symbols.TwinklingStar.bind(null, numPoints, colour, backgroundColour);
};