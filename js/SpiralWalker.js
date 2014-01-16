ulam.SpiralWalker = (function () {
	
	var Step = function (replace, bound) {
		this.replace = replace;
		this.bound = bound;
	};
	
	Step.prototype.take = function (coordinates) {
		if (this.canMove(coordinates)) {
			this.move(coordinates);
			return this;
		} else {
			var replacementStep = this.replace();
			return replacementStep.take(coordinates);
		}
	};
	
	var StepRight = function (replace, bound) {
		Step.call(this, replace, bound);
	};
	StepRight.prototype = new Step();
	StepRight.prototype.canMove = function (coordinates) {
		return coordinates.x < this.bound;
	};
	StepRight.prototype.move = function (coordinates) {
		coordinates.x += 1;
	};
	
	var StepUp = function (replace, bound) {
		Step.call(this, replace, bound);
	};
	StepUp.prototype = new Step();
	StepUp.prototype.canMove = function (coordinates) {
		return coordinates.y < this.bound;
	};
	StepUp.prototype.move = function (coordinates) {
		coordinates.y += 1;
	};
	
	var StepLeft = function (replace, bound) {
		Step.call(this, replace, bound);
	};
	StepLeft.prototype = new Step();
	StepLeft.prototype.canMove = function (coordinates) {
		return coordinates.x > 0 - this.bound;
	};
	StepLeft.prototype.move = function (coordinates) {
		coordinates.x -= 1;
	};
	
	var StepDown = function (replace, bound) {
		Step.call(this, replace, bound);
	};
	StepDown.prototype = new Step();
	StepDown.prototype.canMove = function (coordinates) {
		return coordinates.y > 0 - this.bound;
	};
	StepDown.prototype.move = function (coordinates) {
		coordinates.y -= 1;
	};
	
	return (function () {
		
		var directionNames = {
			"right": StepRight,
			"up": StepUp,
			"left": StepLeft,
			"down": StepDown
		};
		
		var parseDirectionName = function (name) {
			return directionNames[name];
		};
		
		return function (options) {
		
			options = options || {};
			var startDirection = parseDirectionName(options.startDirection || "right");
			var clockwise = !!options.clockwise;
			
			var bound = 0;
			
			var orderedStepTypes = [StepRight, StepUp, StepLeft, StepDown];
			var current = orderedStepTypes.indexOf(startDirection);
			var direction = clockwise ? 1 : -1;
			
			var nextStep = function () {
				var stepType = orderedStepTypes[current];
				bound = stepType === startDirection ? bound + 1 : bound;
				current = addModulo(4, current, direction);
				
				return new stepType(nextStep, bound);
			};
			
			var step = nextStep();
			
			this.takeStep = function (coordinates) {
				step = step.take(coordinates);
			};
			
			function addModulo(modulus, operand1, operand2) {
				var r = (operand1 + operand2) % 4;
				return r >= 0 ? r : r + modulus;
			}
		};
	})();
})();