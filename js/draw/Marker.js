ulam.draw.Marker = function (check, symbolConstructor) {
	this._check = check;
	this._symbolConstructor = symbolConstructor;
};

ulam.draw.Marker.prototype.mark = function (plot, point, n) {
	if (this._check(n)) {
		plot.draw(new this._symbolConstructor(n), point);
	}
};