ulam.draw.markers.WalkTraceMarker = function () {
	this._previousPoint = null;
};

ulam.draw.markers.WalkTraceMarker.prototype.mark = function (plot, point, n) {
	
	if (this._previousPoint) {
		plot.drawLine(this._previousPoint, point);
	}
	
	this._previousPoint = { x: point.x, y: point.y };
};