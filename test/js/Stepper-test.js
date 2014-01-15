(function () {
	
	var checkStep = function (stepper, coordinates, expected) {
		stepper.takeStep(coordinates);
		var message = "(" + expected.x + ", " + expected.y + ")";
		strictEqual(coordinates.x, expected.x, message + " x");
		strictEqual(coordinates.y, expected.y, message + " y");
	};
	
	var checkWalk = function (stepper, coordinates, steps) {
		for (var i = 0; i < steps.length; i++) {
			checkStep(stepper, coordinates, steps[i]);
		}
	};
	
	test("default starts right and moves counterclockwise", function () {
		var stepper = new ulam.Stepper();
		var coordinates = { x: 0, y: 0 };
		
		checkWalk(stepper, coordinates, [
			{ x: 1, y: 0 },
			{ x: 1, y: -1 },
			{ x: 0, y: -1 },
			{ x: -1, y: -1 },
			{ x: -1, y: 0 },
			{ x: -1, y: 1 },
			{ x: 0, y: 1 },
			{ x: 1, y: 1 },
			{ x: 2, y: 1 },
			{ x: 2, y: 0 }
		]);
	});
	
	test("clockwise", function () {
		var stepper = new ulam.Stepper({ clockwise: true });
		var coordinates = { x: 0, y: 0 };
		
		checkWalk(stepper, coordinates, [
			{ x: 1, y: 0 },
			{ x: 1, y: 1 },
			{ x: 0, y: 1 },
			{ x: -1, y: 1 },
			{ x: -1, y: 0 },
			{ x: -1, y: -1 },
			{ x: 0, y: -1 },
			{ x: 1, y: -1 },
			{ x: 2, y: -1 },
			{ x: 2, y: 0 }
		]);
	});
	
	test("starting down and moving clockwise", function () {
		var stepper = new ulam.Stepper({ startDirection: "down", clockwise: true });
		var coordinates = { x: 0, y: 0 };
		
		checkWalk(stepper, coordinates, [
			{ x: 0, y: -1 },
			{ x: 1, y: -1 },
			{ x: 1, y: 0 },
			{ x: 1, y: 1 },
			{ x: 0, y: 1 },
			{ x: -1, y: 1 },
			{ x: -1, y: 0 },
			{ x: -1, y: -1 },
			{ x: -1, y: -2 },
			{ x: 0, y: -2 }
		]);
	});
	
	test("starting left", function () {
		var stepper = new ulam.Stepper({ startDirection: "left" });
		var coordinates = { x: 0, y: 0 };
		
		checkWalk(stepper, coordinates, [
			{ x: -1, y: 0 },
			{ x: -1, y: 1 },
			{ x: 0, y: 1 },
			{ x: 1, y: 1 },
			{ x: 1, y: 0 },
			{ x: 1, y: -1 },
			{ x: 0, y: -1 },
			{ x: -1, y: -1 },
			{ x: -2, y: -1 },
			{ x: -2, y: 0 }
		]);
	});
})();