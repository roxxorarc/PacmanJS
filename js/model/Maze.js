class Maze {
    /**
     * Creates a maze.
     * @param {RAW_MAZE} rawMaze 
     */
    constructor(rawMaze) {
        this._nbDots = 0;
        this._rawMaze = rawMaze.table;
        this.wallLayer = new Layer(this._rawMaze.length, this._rawMaze[0].length)
        this.dotLayer = new Layer(this._rawMaze.length, this._rawMaze[0].length)
        for (let i in this._rawMaze) {
            for (let j in this._rawMaze[i]) {
                switch (this._rawMaze[i][j]) {
                    case 0:
                        break;
                    case 1:
                        this.wallLayer.setTile(new Position(i, j), new Wall(`1`))
                        break;
                    case 2:
                        this.dotLayer.setTile(new Position(i, j), new Dot(`2`, false))
                        this._nbDots++
                        break;
                    case 3:
                        this.dotLayer.setTile(new Position(i, j), new Dot(`3`, true));
                        this._nbDots++
                        break;
                    case 4:
                        this._pacSpawn = new Position(i, j)
                        break;
                    case 5:
                        this._ghostSpawn = new Position(i, j);
                        break;
                }   
            }
        }
    }
    getWallLayerTile(pos) {
        if (this.wallLayer.contains(pos) == false) {
            throw new Error(`Position isn't in layer : ${pos.row}, ${pos.column}`)
        }
        return this.wallLayer._layer[pos.row][pos.column];
    }
    getDotLayerTile(pos) {
        if (this.dotLayer.contains(pos) == false) {
            throw new Error(`Position isn't in layer : ${pos.row}, ${pos.column}`)
        }
        return this.dotLayer._layer[pos.row][pos.column];
    }

    get pacSpawn() {
        return this.pacSpawn;
    }

    get ghostSpawn() {
        return this.ghostSpawn;
    }

    /**
     * Checks if the position can be walked on.
     * @param {Position} position 
     * @returns true if the position is not on the wall layer.
     */
    canWalkOn(position) {
        return ((this.getWallLayerTile(position) == undefined));
    }

    /**
     * Checks if there is a dot on the given position.
     * @param {Position} position 
     * @returns true if a dot can be picked at the current position.
     */
    canPick(position) {
        return this.getDotLayerTile(position) != undefined;
    }

    /**
     * Picks the dot at the given position, making it dissapear.
     * @param {Position} position 
     * @returns 
     */
    pick(position) {
        if (this.getDotLayerTile(position) == undefined) {
            throw new Error('No dot')
        }
        this.dotLayer.setTile(position, -1);
        return this.getDotLayerTile(position);
    }

    /**
     * Checks if the maze is empty.
     * @returns true if there is no more dots available.
     */
    isEmpty() {
        return this._nbDots == 0;
    }
}
