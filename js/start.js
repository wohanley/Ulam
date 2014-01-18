(function () {
	
	var gridSize = 151;
	
	var grid = [];
	var table = $('<table/>');
	$('body').append(table);
	
	for (var i = 0; i < gridSize; i++) {
		grid[i] = [];
		var tr = $('<tr/>');
		table.append(tr);
		for (var j = 0; j < gridSize; j++) {
			var td = $('<td style="height:10px; width:10px;"/>');
			tr.append(td);
		}
	}
	
	var currentNumber = 1;
	new ulam.SpiralWalker(grid, { action: function (grid, coordinates) {
		var position = new ulam.numberLine.Position(currentNumber);
		var td = $('td', $('tr', table).eq(coordinates.x)).eq(coordinates.y);
		position.addCheckObserver(new ulam.ui.TableCellPositionView(td));
		grid[coordinates.x][coordinates.y] = position;
		currentNumber++;
	}}).walk(gridSize * gridSize);
	
	new ulam.SpiralWalker(grid, { action: ulam.checkers.checkPrimality }).walk(gridSize * gridSize);
})();