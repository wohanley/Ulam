module("ulam.draw.markers.WalkTraceMarker");

test("mark draws nothing on first call", function () {
	
	var plot = {};
	
	new ulam.draw.markers.WalkTraceMarker().mark(plot, { x: 0, y: 0 }, 1);
	
});

test("mark draws line between subsequent calls", function () {
	
	var plot = {
		drawLine: sinon.spy()
	};
	
	var marker = new ulam.draw.markers.WalkTraceMarker();
	
	var point = { x: 0, y: 0 };
	marker.mark(plot, point, 1);
	point = { x: 1, y: 1 };
	marker.mark(plot, point, 2);
	point = { x: 2, y: 2 };
	marker.mark(plot, point, 3);
	
	strictEqual(plot.drawLine.callCount, 2);
	ulam.util.test.pointEqual(plot.drawLine.firstCall.args[0], { x: 0, y: 0 });
	ulam.util.test.pointEqual(plot.drawLine.firstCall.args[1], { x: 1, y: 1 });
	ulam.util.test.pointEqual(plot.drawLine.secondCall.args[0], { x: 1, y: 1 });
	ulam.util.test.pointEqual(plot.drawLine.secondCall.args[1], { x: 2, y: 2 });
});