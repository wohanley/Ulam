ulam.draw.HexagonalGridWalker = (function () {
	
	var HexagonalStep = function (center, bound) {
		this._center = center;
		this._bound = bound;
	};
	HexagonalStep.prototype.canMove = function (coordinates) {
		var clone = { x: coordinates.x, y: coordinates.y };
		this.move(clone);
		// fudge the comparison a little to account for floating point problems
		return ulam.math.euclideanDistance(this._center, clone) <= this._bound + 0.01;
	};
	HexagonalStep.prototype.move = function (coordinates) {
		coordinates.x += Math.cos(2 * Math.PI * this._segment/6);
		coordinates.y += Math.sin(2 * Math.PI * this._segment/6);
	};
	
	var StepRight = function (center, bound) {
		HexagonalStep.call(this, center, bound);
		this._segment = 0;
	};
	ulam.util.extend(StepRight, HexagonalStep);
	
	var StepUpAndRight = function (center, bound) {
		HexagonalStep.call(this, center, bound);
		this._segment = 1;
	};
	ulam.util.extend(StepUpAndRight, HexagonalStep);
	
	var StepUpAndLeft = function (center, bound) {
		HexagonalStep.call(this, center, bound);
		this._segment = 2;
	};
	ulam.util.extend(StepUpAndLeft, HexagonalStep);
	
	var StepLeft = function (center, bound) {
		HexagonalStep.call(this, center, bound);
		this._segment = 3;
	};
	ulam.util.extend(StepLeft, HexagonalStep);
	
	var StepDownAndLeft = function (center, bound) {
		HexagonalStep.call(this, center, bound);
		this._segment = 4;
	};
	ulam.util.extend(StepDownAndLeft, HexagonalStep);
	
	var StepDownAndRight = function (center, bound) {
		HexagonalStep.call(this, center, bound);
		this._segment = 5;
	};
	ulam.util.extend(StepDownAndRight, HexagonalStep);
	
	var defaults = {
		startDirection: "right",
		clockwise: false,
		maxNumber: 0,
		action: function () {}
	};
	
	var directionNames = {
		"right": StepRight,
		"upAndRight": StepUpAndRight,
		"upAndLeft": StepUpAndLeft,
		"left": StepLeft,
		"downAndLeft": StepDownAndLeft,
		"downAndRight": StepDownAndRight
	};
	
	var HexagonalGridWalker = function (plot, sequence, options) {
		
		this._orderedStepTypes = [StepRight,
		    StepUpAndRight,
		    StepUpAndLeft,
		    StepLeft,
		    StepDownAndLeft,
		    StepDownAndRight];
		this._directionNames = directionNames;
		this._defaults = defaults;
		
		ulam.draw.Walker.call(this, plot, sequence, options);
	};
	
	ulam.util.extend(HexagonalGridWalker, ulam.draw.Walker);
	
	return HexagonalGridWalker;
})();

(function () {

	ulam.draw.HexagonalSpiralWalker = function (plot, sequence, options) {
		
		ulam.draw.HexagonalGridWalker.call(this, plot, sequence, options);

		this._stepsBounded = 0;
		this._bound = 1;
		this._step = this._firstStep();
	};
	ulam.util.extend(ulam.draw.HexagonalSpiralWalker, ulam.draw.HexagonalGridWalker);
	
	ulam.draw.HexagonalSpiralWalker.prototype._firstStep = function () {
		
		var stepType = this._orderedStepTypes[this._currentStepIndex];
		this._nextBound(stepType);
		this._currentStepIndex = ulam.math.addModulo(this._orderedStepTypes.length, this._currentStepIndex, this._direction * 2);
		
		return new stepType(this._center, this._bound);
	};

	ulam.draw.HexagonalSpiralWalker.prototype._nextBound = function (stepType) {
		
		if (this._stepsBounded < 3) {
			// leave the bound alone for the first few legs
			this._stepsBounded++;
		} else if (stepType === this._options.startDirection) {
			this._bound++;
		}
	};
})();