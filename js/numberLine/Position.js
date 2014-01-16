ulam.numberLine.Position = function () {
	this._checkObservers = [];
};

ulam.numberLine.Position.prototype.mark = function (highlight) {
	for (var i = 0; i < this._checkObservers.length; i++) {
		observer.marked(highlight);
	}
};

ulam.numberLine.Position.prototype.addCheckObserver = function (observer) {
	this._checkObservers.add(observer);
};

ulam.numberLine.Position.prototype.addCheckObserver = function (observer) {
	this._checkObservers.splice(this._checkObservers.indexOf(observer), 1);
};