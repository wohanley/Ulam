ulam.util = (function () {
	
	util = {};
	
	util.extend = function (subtype, supertype) {
		
		if (!(subtype instanceof Function)) {
			throw new Error("subtype must be a function.");
		}
		
		if (!(supertype instanceof Function)) {
			throw new Error("supertype must be a function.");
		}
		
		subtype.prototype = Object.create(supertype.prototype);
		subtype.prototype.constructor = subtype;
	};
	
	return util;
	
})();