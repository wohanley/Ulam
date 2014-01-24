module("ulam.draw.symbols.Rectangle");

test("draw calls fillRect", function () {
	
	var drawingContext = {
		fillRect: sinon.spy()
	};
	
	new ulam.draw.symbols.Rectangle().draw(drawingContext, { x: 5, y: 7 }, { height: 10, width: 5 });
	
	strictEqual(drawingContext.fillRect.callCount, 1, "should draw a single rectangle");
	strictEqual(drawingContext.fillRect.firstCall.args[0], 2.5);
	strictEqual(drawingContext.fillRect.firstCall.args[1], 2);
	strictEqual(drawingContext.fillRect.firstCall.args[2], 5);
	strictEqual(drawingContext.fillRect.firstCall.args[3], 10);
});