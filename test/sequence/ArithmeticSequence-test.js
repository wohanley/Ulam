module("ulam.sequence.ArithmeticSequence");

test("default starts at 1, steps by 1 and doesn't end", function () {
	
	var sequence = new ulam.sequence.ArithmeticSequence();

	strictEqual(sequence.next(), 1);
	strictEqual(sequence.next(), 2);
	strictEqual(sequence.next(), 3);
	strictEqual(sequence.next(), 4);
	strictEqual(sequence.next(), 5);
	strictEqual(sequence.next(), 6);
	strictEqual(sequence.next(), 7);
	strictEqual(sequence.next(), 8);
	strictEqual(sequence.next(), 9);
	strictEqual(sequence.next(), 10);
});