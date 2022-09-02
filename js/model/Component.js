class Component {
    /**
    * To be created, a Tile just needs an id.
    *
    * @param {string} id unique tile's id
     */
    constructor(id) {
        this._id = id;
    }
    /**
     * @returns {string}
     */
    get id() {
        return this._id;
    }
}
