class Ghost extends Sprite {
    /**
     * Creates a ghost.
     * @param {Position} position 
     * @param {Direction} direction 
     * @param {String} id 
     */
    constructor(position, direction, id) {
        super(position, direction, id);
        setInterval(() => {
            this._choiceNewDirection();
        }, 4000);
    }

    /**
     * Sets a new random direction to the ghost every 4 seconds.
     */
    _choiceNewDirection() {
        let randomizedDirection = Math.floor(Math.random() * 4) + 1;
        switch (randomizedDirection) {
            case 1:
                this._direction = Direction.NORTH;
                break;
            case 2:
                this._direction = Direction.SOUTH
                break;
            case 3:
                this._direction = Direction.EAST
                break;
            case 4:
                this._direction = Direction.WEST
                break;
        }
    }
    /**
     * Checks if the given instance of pacman can be eaten by this ghost.
     * @param {Pacman} Pacman 
     * @returns true if the ghost is on the same position or crossed pacman.
     */
    canEat(Pacman) {
        return (this._position._equals(Pacman._position) || ((this._previousPosition._equals(Pacman._position) && (this._position._equals(Pacman._previousPosition)))))
    }
    /**
     * This method is called when the ghost cannot move further, it then makes it change its direction.
     */
    notifyIsBlocked() {
        this._choiceNewDirection();
    }

}
