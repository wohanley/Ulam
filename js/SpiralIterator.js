ulam.SpiralIterator = function (grid) {
	
	var stepper = new ulam.Stepper();
	
	var centerRow = Math.floor(grid.length / 2);
	var centerColumn = Math.floor(grid[centerRow].length / 2);
	
	var coordinates = {
		x: centerRow,
		y: centerColumn
	};
	
	function next() {
		grid[coordinates.x][coordinates.y].check();
		stepper = stepper.takeStep(coordinates);
	};
	
	this.go = function () {
		
	};
};