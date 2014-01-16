test("iterator starts in center of grid", function () {
	var grid = [
	    [{ mark: sinon.spy() }, { mark: sinon.spy() }, { mark: sinon.spy() }],
	    [{ mark: sinon.spy() }, { mark: sinon.spy() }, { mark: sinon.spy() }],
	    [{ mark: sinon.spy() }, { mark: sinon.spy() }, { mark: sinon.spy() }]
	];
	
	var walker = {};
	walker.takeStep = function (coordinates) { return walker; };
	
	var checker = sinon.spy();
	
	new ulam.numberLine.Iterator(grid, walker, checker).go();
	
	sinon.assert.callCount(grid[1][1].mark, 9);
});