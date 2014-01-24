ulam.sequence.ArithmeticSequence = (function () {
	
	var defaults = {
		start: 1,
		step: 1
	};
	
	var ArithmeticSequence = function (options) {
		this._options = $.extend({}, defaults, options);
		this._current = this._options.start;
	};
	
	ArithmeticSequence.prototype.hasNext = function () {
		return !!this._options.end && this._current + this._options.step <= this._options.end;
	};
	
	ArithmeticSequence.prototype.next = function () {
		return this._current++;
	};
	
	return ArithmeticSequence;
	
})();