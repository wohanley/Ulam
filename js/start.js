(function () {
	
	var gridSize = 100;
	
	var grid = [];
	
	for (var i = 0; i < gridSize; i++) {
		grid[i] = [];
		for (var j = 0; j < gridSize; j++) {
			grid[i][j] = new ulam.numberLine.Position();
		}
	}
	
	new ulam.numberLine.Iterator(grid, new ulam.SpiralWalker(), ulam.checkers.checkPrimality).go();
})();