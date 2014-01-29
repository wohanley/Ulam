ulam.draw.SquareSpiralWalker = (function () {
	
	var StepRight = function (center, bound) {
		this._bound = center.x + bound;
	};
	StepRight.prototype.canMove = function (coordinates) {
		return coordinates.x < this._bound;
	};
	StepRight.prototype.move = function (coordinates) {
		coordinates.x += 1;
	};
	
	var StepUp = function (center, bound) {
		this._bound = center.y + bound;
	};
	StepUp.prototype.canMove = function (coordinates) {
		return coordinates.y < this._bound;
	};
	StepUp.prototype.move = function (coordinates) {
		coordinates.y += 1;
	};
	
	var StepLeft = function (center, bound) {
		this._bound = center.x - bound;
	};
	StepLeft.prototype.canMove = function (coordinates) {
		return coordinates.x > this._bound;
	};
	StepLeft.prototype.move = function (coordinates) {
		coordinates.x -= 1;
	};
	
	var StepDown = function (center, bound) {
		this._bound = center.y - bound;
	};
	StepDown.prototype.canMove = function (coordinates) {
		return coordinates.y > this._bound;
	};
	StepDown.prototype.move = function (coordinates) {
		coordinates.y -= 1;
	};
	
	var defaults = {
		startDirection: "right",
		clockwise: false,
		maxNumber: 0,
		action: function () {}
	};
	
	var directionNames = {
		"right": StepRight,
		"up": StepUp,
		"left": StepLeft,
		"down": StepDown
	};
	
	var SquareSpiralWalker = function (plot, sequence, options) {
		
		this._orderedStepTypes = [StepRight, StepUp, StepLeft, StepDown];
		this._directionNames = directionNames;
		this._defaults = defaults;
		
		ulam.draw.Walker.call(this, plot, sequence, options);
	};
	
	ulam.util.extend(SquareSpiralWalker, ulam.draw.Walker);
	
	SquareSpiralWalker.prototype._nextBound = function (stepType) {
		if (stepType === this._options.startDirection) {
			this._bound++;
		}
	};
	
	SquareSpiralWalker.prototype._nextStep = function () {
		var stepType = this._orderedStepTypes[this._currentStepIndex];
		this._nextBound(stepType);
		this._currentStepIndex = ulam.math.addModulo(this._orderedStepTypes.length, this._currentStepIndex, this._direction);
		
		return new stepType(this._center, this._bound);
	};
	
	return SquareSpiralWalker;
})();