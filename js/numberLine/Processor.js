ulam.numberLine.Processor = function (walker, check) {
	
	var position = null;
	
	function next() {
		position.mark(check);
		position = walker.takeStep(coordinates);
	};
	
	this.go = function () {
		while (position.number <= maxNumber) {
			next();
		}
	};
};