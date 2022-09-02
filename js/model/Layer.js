class Layer {
    constructor(nbRows, nbColumns) {
        this._nbRows = nbRows;
        this._nbColumns = nbColumns;
        this._layer = Array(nbRows).fill().map(() => Array(nbColumns));
    }
    contains(pos) {
        return (pos.row >= 0 && pos.column >= 0) && (pos.row <= this._nbRows - 1 && pos.column <= this._nbColumns - 1)
    }
    setTile(pos, tile) {
        if (this.contains(pos) == false) {
            throw new Error(`Position isn't in layer : ${pos.row}, ${pos.column}`)
        }
        this._layer[pos.row][pos.column] = tile.id
    }
    getTile(pos) {
        if (this.contains(pos) == false) {
            throw new Error(`Position isn't in layer : ${pos.row}, ${pos.column}`)
        }
        return this._layer[pos.row][pos.column];

    }
    hasTile(pos) {
        if (this.contains(pos) == false) {
            throw new Error(`Position isn't in layer : ${pos.row}, ${pos.column}`)
        }
        return this.getTile(pos) != null
    }
}
