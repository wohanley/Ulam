ulam.ui.TableCellPositionView = function (td) {
	this._td = td;
};

ulam.ui.TableCellPositionView.prototype.marked = function (highlight) {
	if (highlight) {
		this._td.addClass("marked");
	} else {
		this._td.removeClass("marked");
	}
};