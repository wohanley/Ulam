ulam.util.test = (function () {
	
	var test = {};
	
	test.pointEqual = function (point, expected) {
		var message = "(" + expected.x + ", " + expected.y + ")";
		strictEqual(point.x, expected.x, message + " x");
		strictEqual(point.y, expected.y, message + " y");
	};

	return test;
	
})();