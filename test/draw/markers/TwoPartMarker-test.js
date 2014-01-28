module("ulam.draw.markers.TwoPartMarker");

test("mark draws symbol at point if check returns true", function () {
	
	var plot = {
		draw: sinon.spy()
	};
	var point = {};
	var check = sinon.spy(function (n) {
		return true;
	});
	var symbol = {};
	var symbolConstructor = sinon.spy(function () {
		return symbol;
	});
	var n = 1;
	
	new ulam.draw.markers.TwoPartMarker(check, symbolConstructor).mark(plot, point, n);

	strictEqual(1, symbolConstructor.callCount, "should construct one symbol");
	strictEqual(n, symbolConstructor.firstCall.args[0], "should construct one symbol");
	strictEqual(1, plot.draw.callCount, "should draw symbol once");
	strictEqual(symbol, plot.draw.firstCall.args[0], "should pass symbol to plot.draw");
	strictEqual(point, plot.draw.firstCall.args[1], "should pass point to plot.draw");
});

test("mark does nothing if check returns false", function () {
	
	var check = function () { return false; };
	var drawMarker = sinon.spy();
	
	new ulam.draw.markers.TwoPartMarker(check, drawMarker).mark(null, null, 1);
	
	ok(!drawMarker.called, "should not draw marker");
});