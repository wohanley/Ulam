ulam.math = {
	addModulo: function (modulus, operand1, operand2) {
		var r = (operand1 + operand2) % 4;
		return r >= 0 ? r : r + modulus;
	},
	isPrime: function (n) {
		return primality(n);
	}
};