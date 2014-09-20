$(function () {
	
	var canvasSize = 500;
	
	canvas = $('<canvas/>').appendTo('body');
	canvas = canvas.get(0);
	canvas.height = canvasSize;
	canvas.width = canvasSize;
	
	var context = canvas.getContext("2d");
	context.save();
	context.fillStyle = "#FFF";
	context.fillRect(0, 0, canvasSize, canvasSize);
	context.fillStyle = "#000";
	
	var sequence = new ulam.sequence.ArithmeticSequence({ end: 100 });
	var plot = new ulam.draw.TwoDPlot(canvas, { stepLength: 10, symbolSize: 8 });
	var primeMarker = new ulam.draw.markers.TwoPartMarker(ulam.math.isPrime, ulam.draw.symbols.Rectangle);
	//var pathMarker = new ulam.draw.markers.WalkTraceMarker();
	var allMarker = new ulam.draw.markers.TwoPartMarker(function () { return true; }, ulam.draw.symbols.SizeRectangle);
	var drawer = new ulam.draw.SquareSpiralWalker(plot, sequence, { markers: [ allMarker ]});
	//var drawer = new ulam.draw.HexagonalSpiralWalker(plot, sequence, { markers: [ primeMarker ] });
	
	drawer.walk();
});