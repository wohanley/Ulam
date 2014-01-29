$(function () {
	
	var canvasSize = 300;
	
	canvas = $('<canvas/>').appendTo('body');
	canvas = canvas.get(0);
	canvas.height = canvasSize;
	canvas.width = canvasSize;
	
	var context = canvas.getContext("2d");
	context.save();
	context.fillStyle = "#001";
	context.fillRect(0, 0, canvasSize, canvasSize);
	
	var sequence = new ulam.sequence.ArithmeticSequence({ end: 29 * 29 });
	var plot = new ulam.draw.TwoDPlot(canvas, { stepLength: 10, symbolSize: 6 });
	var primeMarker = new ulam.draw.markers.TwoPartMarker(ulam.math.isPrime, ulam.draw.symbols.getTwinklingStarConstructor(5, "#eee", "#000"));
	var drawer = new ulam.draw.SquareSpiralWalker(plot, sequence, { markers: [ primeMarker ] });
	
	drawer.walk();
});