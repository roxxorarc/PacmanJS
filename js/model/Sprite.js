class Sprite extends Component {

    /**
     * Creates a sprite at a given position with a given direction and ID.
     * @param {Position} position 
     * @param {Direction} direction 
     * @param {String} id 
     */
    constructor(position, direction, id) {
        super(id);
        this._position = position;
        this._direction = direction;
        this._askedToChangeDirection = false;
        this._previousPosition = position;
        this._isDead = false;
        this._initPosition = position;
        this._initDirection = direction;
    }


    get previousPosition() {
        return this._previousPosition;
    }

    get position() {
        return this._position;
    }

    get direction() {
        return this._direction;
    }

    get askedToChangeDirection() {
        return this._askedToChangeDirection;
    }

    get askedDirection() {
        return this._askedDirection;
    }

    get isDead() {
        return this._isDead;
    }


    /**
     * Makes the sprite move in his direction.
     */
    move() {
        this._previousPosition = this._position;
        this._position = (this._position).nextPosition(this._direction);
    }



    /**
     * Asks the sprite to change his direction.
     * @param {Direction} direction 
     */
    askToChangeDirection(direction) {
        this._askedToChangeDirection = true;
        this._askedDirection = direction;
    }

    /**
     * Changes the sprite direction.
     */
    changeDirection() {
        this._direction = this._askedDirection;
    }

    notifyIsBlocked() {

    }

    /**
     * Makes the sprite dead.
     */
    hasBeenEaten() {
        this._isDead = true;
    }

    /**
     * Respawns the sprite, making it resets its position and direction and making its isDead status false.
     */
    respawn() {
        this._isDead = false;
        this._position = this._initPosition;
        this._direction = this._initDirection;
        this._askedDirection = this._direction;
    }

    /**
     * Checks if the sprite is on a wormhole
     * @returns true if it is on a wormhole
     */
    isOnWormHole() {
        return ((this._position)._equals(leftWormHole) && (this._direction == Direction.WEST) ||
            (this._position)._equals(rightWormHole) && (this._direction == Direction.EAST));
    }
}

