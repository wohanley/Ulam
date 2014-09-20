ulam.draw.symbols.Rectangle = function () {};
ulam.draw.symbols.Rectangle.prototype.draw = function (drawingContext, point, dimensions) {
	drawingContext.fillRect(point.x - dimensions.width / 2,
		point.y - dimensions.height / 2,
		dimensions.width,
		dimensions.height);
};


ulam.draw.symbols.SizeRectangle = function (n) {
	this.draw = function (drawingContext, point, dimensions) {
		var size = 10 * n;
		drawingContext.strokeRect(point.x - size / 2,
				point.y - size / 2,
				size,
				size);
	};
};