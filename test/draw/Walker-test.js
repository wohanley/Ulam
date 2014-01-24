(function () {
	
	module("ulam.draw.Walker");

	var Walker = ulam.draw.Walker;
	Walker.prototype._nextStep = function () { return {
		canMove: function () {
			return true;
		},
		move: function () {}
	};};
	
	test("constructor throws error if canvas not supplied", function () {
		raises(function () {
			new Walker();
		}, "should throw error");
	});

	test("constructor throws error if sequence not supplied", function () {
		raises(function () {
			new Walker({});
		}, "should throw error");
	});
	
	test("walk goes nowhere for empty sequence", function () {
		
		var sequence = { hasNext: function () { return false; } };
		var markers = [{ mark: sinon.spy() }];
		
		new Walker({}, sequence, markers).walk();
		
		ok(!markers[0].mark.called, "should not run marker");
	});

	test("walk calls each marker for each element of sequence", function () {
		
		var hasNextCalls = 0;
		var value = 0;
		var sequence = {
			hasNext: function () {
				hasNextCalls++;
				return hasNextCalls <= 3;
			},
			next: function () {
				value++;
				return value;
			}
		};
		
		var markers = [{ mark: sinon.spy() }, { mark: sinon.spy() }];
		
		var walker = new Walker({}, sequence, { markers: markers });
		walker._coordinates = { x: 0, y: 0 };
		walker._step = {
			canMove: function () { return true; },
			move: function () {}
		};
		
		walker.walk();

		ok(markers[0].mark.calledThrice, "should call each marker once for each value");
		ok(markers[1].mark.calledThrice, "should call each marker once for each value");
		strictEqual(markers[0].mark.firstCall.args[2], 1, "should call markers with values in order");
		strictEqual(markers[0].mark.secondCall.args[2], 2, "should call markers with values in order");
		strictEqual(markers[0].mark.thirdCall.args[2], 3, "should call markers with values in order");
		strictEqual(markers[1].mark.firstCall.args[2], 1, "should call markers with values in order");
		strictEqual(markers[1].mark.secondCall.args[2], 2, "should call markers with values in order");
		strictEqual(markers[1].mark.thirdCall.args[2], 3, "should call markers with values in order");
	});
})();