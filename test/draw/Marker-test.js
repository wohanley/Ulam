module("ulam.draw.Marker");

test("mark sends drawMarker result of check", function () {
	
	var result = {};
	
	var check = sinon.spy(function (n) {
		return result;
	});
	
	var drawMarker = sinon.spy();
	
	new ulam.draw.Marker(check, drawMarker).mark(1);

	ok(drawMarker.firstCall.args[0] === result, "should call drawMarker with result of check");
	ok(drawMarker.calledOnce, "should call drawMarker only once");
});