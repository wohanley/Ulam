ulam.draw.TwoDPlot = (function () {
	
	var defaults = {
		stepLength: 20,
		symbolSize: 10
	};
	
	var TwoDPlot = function (canvas, options) {
		this._options = $.extend({}, defaults, options);
		this._center = { x: canvas.width / 2, y: canvas.width / 2 };
		this._drawingContext = canvas.getContext("2d");
	};
	
	TwoDPlot.prototype._getPoint = function (coordinates) {
		return {
			x: (this._options.stepLength * coordinates.x) + this._center.x,
			y: (this._options.stepLength * coordinates.y) + this._center.y
		};
	};
	
	TwoDPlot.prototype.draw = function (symbol, coordinates) {
		symbol.draw(this._drawingContext, this._getPoint(coordinates),
			{ height: this._options.symbolSize, width: this._options.symbolSize });
	};
	
	TwoDPlot.prototype.drawLine = function (startPoint, endPoint) {
		this._drawingContext.beginPath();
		this._drawingContext.moveTo(startPoint.x, startPoint.y);
		this._drawingContext.lineTo(endPoint.x, endPoint.y);
		this._drawingContext.stroke();
	};
	
	return TwoDPlot;
	
})();