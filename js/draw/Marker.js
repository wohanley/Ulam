ulam.draw.Marker = function (check, drawMarker) {
	this._check = check;
	this._drawMarker = drawMarker;
};

ulam.draw.Marker.prototype.mark = function (plot, point, n) {
	if (this._check(n)) {
		this._drawMarker(plot, point);
	}
};