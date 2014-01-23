ulam.draw.TwoDPlot = (function () {
	
	var adjustPoint = function (offset, relativePoint) {
		return {
			x: relativePoint.x + offset.x,
			y: relativePoint.y + offset.y
		};
	};
	
	var TwoDPlot = function (canvas) {
		this._pointRelativeToCenter = adjustPoint.bind(this, { x: canvas.width / 2, y: canvas.height / 2 });
		this._drawingContext = canvas.getContext("2d");
	};
	
	TwoDPlot.prototype.draw = function (shape, point) {
		shape.draw(this._drawingContext, this._pointRelativeToCenter(point));
	};
	
	return TwoDPlot;
	
})();