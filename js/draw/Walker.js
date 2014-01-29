ulam.draw.Walker = (function () {
	
	/*
	 * Walker should not be directly instantiated, it is intended to serve as a
	 * base class for specific kinds of walkers (e.g. a square spiral).
	 */
	var Walker = function (plot, sequence, options) {
	
		if (!plot) {
			throw new Error("No plot supplied.");
		}
		
		if (!sequence) {
			throw new Error("No number sequence supplied.");
		}
		
		this._plot = plot;
		this._sequence = sequence;
		this._options = $.extend({}, this._defaults, options);
		this._markers = this._options.markers || [];
		
		this._center = { x: 0, y: 0 };
		this._coordinates = $.extend({}, this._center);
		this._bound = 0;
		
		// start direction is passed as a string in options object
		this._options.startDirection = this._directionNames[this._options.startDirection];
		this._currentStepIndex = this._orderedStepTypes.indexOf(this._options.startDirection);
		this._direction = this._options.clockwise ? -1 : 1;
		
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
			this._markers[i].mark(this._plot, this._coordinates, n);
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