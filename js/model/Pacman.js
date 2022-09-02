class Pacman extends Sprite {

    /**
     * Creates a pacman.
     * @param {Position} position 
     * @param {Direction} direction 
     */
    constructor(position, direction) {
        super(position, direction, PACMAN_ID);
        this._nbLives = NB_LIVES;
    }


    get nbLives() {
        return this._nbLives;
    }

    /**
     * Makes the pacman lose one life and sets its status to dead.
     */
    hasBeenEaten() {
        super.hasBeenEaten();
        this._nbLives--;
    }
}
