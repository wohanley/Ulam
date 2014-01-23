ulam.SpiralWalker = (function () {
	
	var StepRight = function (center, bound) {
		this._bound = center.y + bound;
	};
	StepRight.prototype.canMove = function (coordinates) {
		return coordinates.y < this._bound;
	};
	StepRight.prototype.move = function (coordinates) {
		coordinates.y += 1;
	};
	
	var StepUp = function (center, bound) {
		this._bound = center.x + bound;
	};
	StepUp.prototype.canMove = function (coordinates) {
		return coordinates.x < this._bound;
	};
	StepUp.prototype.move = function (coordinates) {
		coordinates.x += 1;
	};
	
	var StepLeft = function (center, bound) {
		this._bound = center.y - bound;
	};
	StepLeft.prototype.canMove = function (coordinates) {
		return coordinates.y > this._bound;
	};
	StepLeft.prototype.move = function (coordinates) {
		coordinates.y -= 1;
	};
	
	var StepDown = function (center, bound) {
		this._bound = center.x - bound;
	};
	StepDown.prototype.canMove = function (coordinates) {
		return coordinates.x > this._bound;
	};
	StepDown.prototype.move = function (coordinates) {
		coordinates.x -= 1;
	};
		
	var directionNames = {
		"right": StepRight,
		"up": StepUp,
		"left": StepLeft,
		"down": StepDown
	};
	
	var parseDirectionName = function (name) {
		return directionNames[name];
	};
	
	var orderedStepTypes = [StepRight, StepUp, StepLeft, StepDown];
	
	var lowerLeft = function (gridLength) {
		return {
			x: Math.floor(gridLength / 2) - 1,
			y: Math.floor(gridLength / 2) - 1
		};
	};
	
	var lowerRight = function (gridLength) {
		return {
			x: Math.ceil(gridLength / 2) - 1,
			y: Math.floor(gridLength / 2) - 1
		};
	};
	
	var upperLeft = function (gridLength) {
		return {
			x: Math.floor(gridLength / 2) - 1,
			y: Math.ceil(gridLength / 2) - 1
		};
	};
	
	var upperRight = function (gridLength) {
		return {
			x: Math.ceil(gridLength / 2) - 1,
			y: Math.ceil(gridLength / 2) - 1
		};
	};
	
	/*
	 * Two-level decision tree based on start and turn directions (1 being
	 * clockwise, 0 counterclockwise).
	 */
	var evenLengthStartFinders = {
		"right": { 0: lowerLeft, 1: upperLeft },
		"up": { 0: lowerRight, 1: lowerLeft },
		"left": { 0: upperRight, 1: lowerRight },
		"down": { 0: upperLeft, 1: upperRight }
	};
	
	var findStart = function (grid, startDirection, clockwise) {
		if (grid.length % 2 === 1) {
			// odd length sides are easy...
			var center = Math.floor(grid.length / 2);
			return { x: center, y: center };
		} else {
			// ...even is a little complicated.
			return evenLengthStartFinders[startDirection][clockwise ? 1 : 0](grid);
		}
	};
	
	var defaults = {
		startDirection: "right",
		clockwise: false,
		maxNumber: 0,
		action: function () {}
	};
	
	/*
	 * Grid is assumed to be square, and you will have problems if it isn't.
	 */
	var SpiralWalker = function (grid, passedOptions) {
	
		if (!grid) {
			throw new Error("No grid supplied.");
		}
		
		this._grid = grid;
		this._options = $.extend({}, defaults, passedOptions);
		
		this._center = findStart(this._grid, this._options.startDirection, this._options.clockwise);
		this._coordinates = $.extend({}, this._center);
		this._bound = 0;
		
		this._options.startDirection = parseDirectionName(this._options.startDirection);
		
		this._current = orderedStepTypes.indexOf(this._options.startDirection);
		this._direction = this._options.clockwise ? -1 : 1;
		
		this._step = this._nextStep();
		
		this._takeStep = this._takeFirstStep;
	};
	
	SpiralWalker.prototype._nextStep = function () {
		var stepType = orderedStepTypes[this._current];
		this._bound = stepType === this._options.startDirection ? this._bound + 1 : this._bound;
		this._current = ulam.math.addModulo(4, this._current, this._direction);
		
		return new stepType(this._center, this._bound);
	};
	
	SpiralWalker.prototype._nextCoordinates = function () {
		if (this._step.canMove(this._coordinates)) {
			return this._step.move(this._coordinates);
		} else {
			this._step = this._nextStep();
			return this._nextCoordinates();
		}
	};

	SpiralWalker.prototype._takeNormalStep = function () {
		this._nextCoordinates();
		this._options.action(this._grid, this._coordinates);
	};
	
	SpiralWalker.prototype._takeFirstStep = function () {
		this._takeStep = this._takeNormalStep;
		this._options.action(this._grid, this._coordinates);
	};
	
	SpiralWalker.prototype.walk = function (steps) {
		for (var i = 0; i < steps; i++) {
			this._takeStep();
		}
	};
	
	return SpiralWalker;
})();