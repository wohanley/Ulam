module("ulam.draw.Marker");

test("mark passes drawMarker context and point if check returns true", function () {
	
	var context = {};
	var point = {};
	
	var check = sinon.spy(function (n) {
		return true;
	});
	
	var drawMarker = sinon.spy();
	
	new ulam.draw.Marker(check, drawMarker).mark(context, point, 1);

	strictEqual(1, drawMarker.callCount, "should call drawMarker only once");
	strictEqual(context, drawMarker.firstCall.args[0], "should pass context to drawMarker");
	strictEqual(point, drawMarker.firstCall.args[1], "should pass point to drawMarker");
});

test("mark does nothing if check returns false", function () {
	
	var check = function () { return false; };
	var drawMarker = sinon.spy();
	
	new ulam.draw.Marker(check, drawMarker).mark(null, null, 1);
	
	ok(!drawMarker.called, "should not draw marker");
});