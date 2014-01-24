ulam.draw.TwoDPlot = (function () {
	
	var adjustPoint = function (offset, relativePoint) {
		return {
			x: relativePoint.x + offset.x,
			y: relativePoint.y + offset.y
		};
	};
	
	var defaults = {
		stepLength: 20,
		symbolSize: 10
	};
	
	var TwoDPlot = function (canvas, options) {
		this._options = $.extend({}, defaults, options);
		this._pointRelativeToCenter = adjustPoint.bind(this, { x: canvas.width / 2, y: canvas.height / 2 });
		this._drawingContext = canvas.getContext("2d");
	};
	
	TwoDPlot.prototype.draw = function (symbol, point) {
		symbol.draw(this._drawingContext, this._pointRelativeToCenter(point),
			this._symbolSize, this._symbolSize);
	};
	
	return TwoDPlot;
	
})();