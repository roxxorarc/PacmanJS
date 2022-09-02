class PacmanCtrl {
    constructor(pacman) {
        this._pacman = pacman;
    }
    askToChangeDirection(direction) {
        this._pacman.askToChangeDirection(direction);
    }
}
