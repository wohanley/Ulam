ulam.draw.markers.TwoPartMarker = function (check, symbolConstructor) {
	this._check = check;
	this._symbolConstructor = symbolConstructor;
};

ulam.draw.markers.TwoPartMarker.prototype.mark = function (plot, point, n) {
	if (this._check(n)) {
		plot.draw(new this._symbolConstructor(n), point);
	}
};