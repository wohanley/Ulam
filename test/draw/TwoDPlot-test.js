(function () {
	
	module("ulam.draw.TwoDPlot");
	
	var FakeCanvas = function () {
		this.width = 300;
		this.height = 300;
		this._context = {
			beginPath: sinon.spy(),
			moveTo: sinon.spy(),
			lineTo: sinon.spy(),
			stroke: sinon.spy()
		};
	};
	
	FakeCanvas.prototype.getContext = function () {
		return this._context;
	};
	
	test("draw adjusts shape's position relative to center", function () {
		
		var shape = {
			draw: sinon.spy()
		};
		
		var canvas = $('<canvas width="300" height="300"/>');
		$('body').append('canvas');
		
		var plot = new ulam.draw.TwoDPlot(canvas.get(0));
		
		plot.draw(shape, { x: 0, y: 0 });
		
		strictEqual(1, shape.draw.callCount, "shape should be drawn once");
		strictEqual(shape.draw.firstCall.args[1].x, 150, "should adjust horizontally");
		strictEqual(shape.draw.firstCall.args[1].y, 150, "should adjust vertically");
	});
	
	test("draw passes symbol size", function () {
		
		var shape = {
			draw: sinon.spy()
		};
		
		var canvas = $('<canvas width="300" height="300"/>');
		$('body').append('canvas');
		
		var plot = new ulam.draw.TwoDPlot(canvas.get(0), { symbolSize: 5 });
		
		plot.draw(shape, { x: 0, y: 0 });
		
		strictEqual(1, shape.draw.callCount, "shape should be drawn once");
		strictEqual(shape.draw.firstCall.args[2].height, 5, "should pass height");
		strictEqual(shape.draw.firstCall.args[2].width, 5, "should pass width");
	});
	
	test("drawLine draws line on context", function () {
	
		var canvas = new FakeCanvas();
		var context = canvas.getContext("2d");
		
		var plot = new ulam.draw.TwoDPlot(canvas);
		
		var startPoint = { x: 1, y: 1 };
		var endPoint = { x: 2, y: 2 };
		
		plot.drawLine(startPoint, endPoint);

		ok(context.beginPath.calledBefore(context.moveTo));
		ok(context.moveTo.calledBefore(context.lineTo));
		ok(context.lineTo.calledBefore(context.stroke));
		ok(context.moveTo.calledWith(170, 170), "should adjust start relative to center");
		ok(context.lineTo.calledWith(190, 190), "should adjust end relative to center");
	});
})();