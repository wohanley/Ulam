module("ulam.math");

test("addModulo where a + b < m", function () {
	strictEqual(ulam.math.addModulo(8, 3, 4), 7);
});

test("addModulo where a + b == m", function () {
	strictEqual(ulam.math.addModulo(3, 2, 1), 0);
});

test("addModulo where a + b > m", function () {
	strictEqual(ulam.math.addModulo(6, 8, 1), 3);
});

test("euclideanDistance horizontal", function () {
	strictEqual(ulam.math.euclideanDistance({ x: 1, y: 0 }, { x: 3, y: 0 }), 2);
});

test("euclideanDistance vertical", function () {
	strictEqual(ulam.math.euclideanDistance({ x: 1, y: 2 }, { x: 1, y: -2 }), 4);
});

test("euclideanDistance diagonal", function () {
	strictEqual(ulam.math.euclideanDistance({ x: 1, y: 0 }, { x: 3, y: 2 }), Math.sqrt(8));
});