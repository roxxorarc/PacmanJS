class Dot extends Tile {
    /**
     * Creates a dot that can be energized or not.
     * @param {Integer} id 
     * @param {Boolean} isEnergizer 
     */
    constructor(id, isEnergizer) {
        super(id);
        this._isEnergizer = isEnergizer;
    }
    get isEnergizer() {
        return this._isEnergizer;
    }
}
