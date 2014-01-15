test("primality checker wraps primality.js", function () {
	
	var n = 1;
	var result = false;
	
	var primeStub = sinon.stub(window, "primality");
	primeStub.returns(result);
	
	var outerResult = ulam.checkPrimality(n);
	
	sinon.assert.calledOnce(primeStub);
	strictEqual(outerResult, result, "should return result from primality");
});