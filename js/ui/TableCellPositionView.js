ulam.ui.TableCellPositionView = function (td) {
	this._td = td;
};

ulam.ui.TableCellPositionView.prototype.marked = function (highlight) {
	this._td.css("background-color", highlight ? "#00F" : "#000");
};