ulam.draw.Walker = (function () {
	
	/*
	 * Walker should not be directly instantiated, it is intended to serve as a
	 * base class for specific kinds of walkers (e.g. a square spiral).
	 */
	var Walker = function (canvas, sequence, options) {
	
		if (!canvas) {
			throw new Error("No canvas supplied.");
		}
		
		if (!sequence) {
			throw new Error("No number sequence supplied.");
		}
		
		this._canvas = canvas;
		this._sequence = sequence;
		this._markers = options.markers || [];
		this._initializeCoordinates();
		
		this._step = this._nextStep();
		
		this._takeStep = this._takeFirstStep;
	};
	
	Walker.prototype._nextCoordinates = function () {
		if (this._step.canMove(this._coordinates)) {
			return this._step.move(this._coordinates);
		} else {
			this._step = this._nextStep();
			return this._nextCoordinates();
		}
	};
	
	Walker.prototype._runMarkers = function (n) {
		for (var i = 0; i < this._markers.length; i++) {
			this._markers[i].mark(this._canvas, this._coordinates, n);
		}
	};

	Walker.prototype._takeNormalStep = function (n) {
		this._nextCoordinates();
		this._runMarkers(n);
	};
	
	Walker.prototype._takeFirstStep = function (n) {
		this._takeStep = this._takeNormalStep;
		this._runMarkers(n);
	};
	
	Walker.prototype.walk = function () {
		while (this._sequence.hasNext()) {
			this._takeStep(this._sequence.next());
		}
	};
	
	return Walker;
})();