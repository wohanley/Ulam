ulam.numberLine.Position = function (n) {
	this.number = n;
	this._checkObservers = [];
};

ulam.numberLine.Position.prototype.mark = function (check) {
	for (var i = 0; i < this._checkObservers.length; i++) {
		this._checkObservers[i].marked(check(this.number));
	}
};

ulam.numberLine.Position.prototype.addCheckObserver = function (observer) {
	this._checkObservers.push(observer);
};

ulam.numberLine.Position.prototype.removeCheckObserver = function (observer) {
	this._checkObservers.splice(this._checkObservers.indexOf(observer), 1);
};