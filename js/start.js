$(function () {
	
	canvas = $('<canvas/>').appendTo('body');
	canvas = canvas.get(0);
	canvas.height = 300;
	canvas.width = 300;
	
	var sequence = new ulam.sequence.ArithmeticSequence({ end: 29 * 29 });
	var plot = new ulam.draw.TwoDPlot(canvas, { stepLength: 10, symbolSize: 10 });
	var primeMarker = new ulam.draw.markers.TwoPartMarker(ulam.math.isPrime, ulam.draw.symbols.Rectangle);
	var pathMarker = new ulam.draw.markers.WalkTraceMarker();
	var drawer = new ulam.draw.SquareSpiralWalker(plot, sequence, { markers: [ primeMarker, pathMarker ] });
	
	drawer.walk();
});