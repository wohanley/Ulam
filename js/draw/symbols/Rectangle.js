ulam.draw.symbols.Rectangle = (function () {

	var Rectangle = function () {};
	
	Rectangle.prototype.draw = function (drawingContext, point, dimensions) {
		drawingContext.fillRect(point.x - dimensions.width / 2,
			point.y - dimensions.height / 2,
			dimensions.width,
			dimensions.height);
	};
	
	return Rectangle;
	
})();