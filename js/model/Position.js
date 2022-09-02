class Position {

    /**
     * Creates a x,y position based on the given row and column.
     * @param {Integer} row 
     * @param {Integer} column 
     */
    constructor(row, column) {
        this._row = row;
        this._column = column;
    }

    get column() {
        return this._column;
    }

    get row() {
        return this._row;
    }

    /**
     * Gives the next position in the given direction.
     * @param {Direction} dir 
     * @returns the next position in the given direction.
     */
    nextPosition(dir) {
        return new Position(parseInt(this._row) + parseInt(dir.deltaRow), parseInt(this._column) + parseInt(dir.deltaColumn))
    }

    _equals(obj) {
        return ((this._row == obj._row) && (this._column == obj._column))
    }
}
