ulam.numberLine.Iterator = function (grid, walker, checker) {
	
	var centerRow = Math.floor(grid.length / 2);
	var centerColumn = Math.floor(grid[centerRow].length / 2);
	
	var coordinates = {
		x: centerRow,
		y: centerColumn
	};
	
	var currentNumber = 1;
	
	function next() {
		grid[coordinates.x][coordinates.y].mark(checker(currentNumber));
		walker = walker.takeStep(coordinates);
		currentNumber++;
	};
	
	this.go = function () {
		while (coordinates.x < grid.length && coordinates.y < grid[coordinates.x].length) {
			next();
		}
	};
};