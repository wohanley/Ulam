ulam.checkers = {
	checkPrimality: function (grid, coordinates) {
		var position = grid[coordinates.x][coordinates.y];
		position.mark(ulam.math.isPrime);
	}
};