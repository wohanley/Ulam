ulam.draw.Marker = function (check, drawMarker) {
	this._check = check;
	this._drawMarker = drawMarker;
};

ulam.draw.Marker.prototype.mark = function (n) {
	this._drawMarker(this._check(n));
};