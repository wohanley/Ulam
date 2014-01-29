(function () {
	
	var plot, hasNextCount, sequence, marks, marker;
	
	module("ulam.draw.SquareSpiralWalker", {
		setup: function () {
			plot = sinon.spy();
			hasNextCount = 0;
			sequence = {
				hasNext: function () {
					return hasNextCount++ < 11;
				},
				next: function () { return 1; }
			};
			marks = [];
			marker = {
				mark: sinon.spy(function (plot, point, n) {
					marks.push($.extend({}, point));
				})
			};
		}
	});
	
	var SquareSpiralWalker = ulam.draw.SquareSpiralWalker;
	
	var checkWalk = function (mark, plot, expectedSteps, actualSteps) {
		strictEqual(mark.callCount, expectedSteps.length, "should call once for each step");
		for (var i = 0; i < expectedSteps.length; i++) {
			strictEqual(mark.getCall(i).args[0], plot);
			ulam.util.test.pointEqual(expectedSteps[i], actualSteps[i]);
		}
	};
	
	test("default starts right and moves counterclockwise", function () {
		
		new SquareSpiralWalker(plot, sequence, { markers: [marker] }).walk();
		
		checkWalk(marker.mark, plot, marks, [
		    { x: 0, y: 0 },
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
	
	test("clockwise", function () {
		
		new SquareSpiralWalker(plot, sequence, { markers: [marker] }).walk();
		
		checkWalk(marker.mark, plot, marks, [
		    { x: 0, y: 0 },
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
		
		new SquareSpiralWalker(plot, sequence, { startDirection: "down", clockwise: true }).walk();
		
		checkWalk(marker.mark, plot, marks, [
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
		
		new SquareSpiralWalker(plot, sequence, { startDirection: "left" }).walk();
		
		checkWalk(marker.mark, plot, marks, [
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