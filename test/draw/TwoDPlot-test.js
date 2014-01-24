module("ulam.draw.TwoDPlot");

test("draw adjusts shape's position relative to center", function () {
	
	var shape = {
		draw: sinon.spy()
	};
	
	var canvas = $('<canvas width="300" height="300"/>');
	$('body').append('canvas');
	
	var plot = new ulam.draw.TwoDPlot(canvas.get(0));
	
	plot.draw(shape, { x: 0, y: 0 });
	
	strictEqual(1, shape.draw.callCount, "shape should be drawn once");
	strictEqual(shape.draw.firstCall.args[1].x, 150, "should adjust horizontally");
	strictEqual(shape.draw.firstCall.args[1].y, 150, "should adjust vertically");
});

test("draw passes symbol size", function () {
	
	var shape = {
		draw: sinon.spy()
	};
	
	var canvas = $('<canvas width="300" height="300"/>');
	$('body').append('canvas');
	
	var plot = new ulam.draw.TwoDPlot(canvas.get(0), { symbolSize: 5 });
	
	plot.draw(shape, { x: 0, y: 0 });
	
	strictEqual(1, shape.draw.callCount, "shape should be drawn once");
	strictEqual(shape.draw.firstCall.args[2].height, 5, "should pass height");
	strictEqual(shape.draw.firstCall.args[2].width, 5, "should pass width");
});