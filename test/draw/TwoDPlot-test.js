module("ulam.draw.TwoDPlot");

test("draw adjusts shape's position relative to center", function () {
	
	var shape = {
		draw: sinon.spy()
	};
	
	var canvas = $('<canvas width="300" height="300"/>');
	$('body').append('canvas');
	
	var plot = new ulam.draw.TwoDPlot(canvas.get(0));
	
	plot.draw(shape, { x: 0, y: 0 });
	
	ok(shape.draw.called, "shape should be drawn");
	strictEqual(shape.draw.firstCall.args[1].x, 150, "should adjust horizontally");
	strictEqual(shape.draw.firstCall.args[1].y, 150, "should adjust vertically");
});