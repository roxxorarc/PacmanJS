class Direction {
    /**
     * Creates a direction based on the given x and y axes.
     * Used directions are constants in consts.js
     * @param {Integer} deltaRow 
     * @param {Integer} deltaColumn 
     */
    constructor(deltaRow, deltaColumn) {
        this._deltaRow = deltaRow; // 1 = down  -1 = up
        this._deltaColumn = deltaColumn; // 1 = right  -1 = left
    }
    get deltaRow() {
        return this._deltaRow;
    }
    get deltaColumn() {
        return this._deltaColumn;
    }
}

