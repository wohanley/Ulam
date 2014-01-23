test("mark sends drawMarker result of check", function () {
	
	var result = {};
	
	var check = sinon.spy(function (n) {
		return result;
	});
	
	var drawMarker = sinon.spy();
	
	new ulam.draw.Marker(check, drawMarker).mark(1);
	
	sinon.assert.calledOnce(drawMarker);
	sinon.assert.calledWith(drawMarker, result);
});