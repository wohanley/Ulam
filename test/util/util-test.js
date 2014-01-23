module("ulam.util.extend");

test("extend throws error if subtype is not a function", function () {
	raises(function () {
		ulam.util.extend({});
	}, "should throw error");
});

test("extend throws error if supertype is not a function", function () {
	raises(function () {
		ulam.util.extend(function () {}, {});
	}, "should throw error");
});

test("extend makes subtype inherit functions from supertype", function () {
	
	var subtype = function () {};
	var supertype = function () {};
	var returnValue = {};
	supertype.prototype.method = function () { return returnValue; };
	
	ulam.util.extend(subtype, supertype);
	
	strictEqual(new subtype().method(), returnValue, "should inherit method");
});

test("extend resets subtype's constructor", function () {
	
	var subtype = function () {};
	var supertype = function () {};
	
	ulam.util.extend(subtype, supertype);
	
	strictEqual(subtype.prototype.constructor, subtype, "constructor and subtype should be same function");
});

test("extend does not call constructor", function () {
	
	var subtype = sinon.spy();
	var supertype = sinon.spy();
	
	ulam.util.extend(subtype, supertype);
	
	ok(!subtype.called, "should not call subtype constructor");
	ok(!supertype.called, "should not call supertype constructor");
});