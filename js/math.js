ulam.math = (function () {
	
	var math = {};
	
	math.addModulo = function (modulus, operand1, operand2) {
		var r = (operand1 + operand2) % modulus;
		return r >= 0 ? r : r + modulus;
	};
	
	math.isPrime = function (n) {
		return primality(n);
	};
	
	math.euclideanDistance = function (p1, p2) {
		return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
	};
	
	return math;
	
})();