test("iterator starts in center of grid", function () {
	
	var markTracker = {
		count: 0
	};
	var mark = sinon.spy(function (track) {
		track.count += 1;
	}.bind(markTracker));
	
	var grid = [
	    [{ number:7, mark: mark }, { number: 8, mark: mark }, { number: 9, mark: mark }],
	    [{ number: 6, mark: mark }, { number: 1, mark: mark }, { number: 2, mark: mark }],
	    [{ number: 5, mark: mark }, { number: 4, mark: mark }, { number: 3, mark: mark }]
	];
	
	var walker = {};
	walker.takeStep = function (coordinates) {
		coordinates.x += 1;
		return walker;
	};
	
	new ulam.numberLine.Iterator(grid, 1, walker, markTracker).go();
	
	strictEqual(mark.firstCall.args[0].count, grid[1][1].number);
});