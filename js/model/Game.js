class Game {
    /**
     * Initializes the maze with every tile, ghosts and pacman.
     * Ghosts and pacman are placed in their starting position.
     * @param {Maze} rawMaze 
     */
    constructor(rawMaze) {
        this._maze = new Maze(rawMaze);
        this._pacman = new Pacman(this._maze._pacSpawn, Direction.WEST);
        this._blinky = new Ghost(this._maze._ghostSpawn, Direction.WEST, "BLINKY");
        this._pinky = new Ghost(this._maze._ghostSpawn, Direction.NORTH, "PINKY");
        this._inky = new Ghost(this._maze._ghostSpawn, Direction.NORTH, "INKY");
        this._clyde = new Ghost(this._maze._ghostSpawn, Direction.NORTH, "CLYDE");
        this._sprites = [this._blinky, this._clyde, this._inky, this._pinky, this._pacman];
        this._score = 0;
        this._removedDot;
        this._highscore = localStorage.highscore = (localStorage.highscore > 0 ? this._highscore = localStorage.highscore : localStorage.highscore = 0);
    }
    get maze() {
        return this._maze;
    }
    get pacman() {
        return this._pacman;
    }
    get score() {
        return this._score;
    }
    get removedDot() {
        return this._removedDot;
    }
    get highscore() {
        return this._highscore;
    }
    /**
     * Moves every movable sprite in the game if it is not blocked by a wall.
     */
    moveSprites() {
        // pacman actions
        let pacmanPos = this._pacman._position;
        if (this._pacman._askedDirection != undefined && (this._maze.canWalkOn((pacmanPos).nextPosition(this._pacman._askedDirection)))) {
            this._pacman.changeDirection();
        }
        if (this._maze.canPick(pacmanPos)) {
            this._maze.getDotLayerTile(pacmanPos) == 3 ? this._score += 100 : this._score += 10;
            this._maze.pick(pacmanPos)
            this._maze._nbDots--;
        }

        // sprites move
        for (let sprite of this._sprites) {
            this._maze.canWalkOn((sprite._position).nextPosition(sprite._direction)) ? sprite.move() : sprite.notifyIsBlocked();
        }

        // Death 
        if (this._blinky.canEat(this._pacman) || this._inky.canEat(this._pacman) ||
            this._pinky.canEat(this._pacman) || this._clyde.canEat(this._pacman)) {
            this._pacman.hasBeenEaten();
            this.respawn()
        }

        // Wormholes
        for (let sprite of this._sprites) {
            if (sprite.isOnWormHole()) {
                (sprite._position)._equals(leftWormHole) ? sprite._position = rightWormHoleTP : sprite._position = leftWormHoleTP;
            }
        }
    }
    /**
     * Checks if the game is over (Player has no more lives).
     * @returns true if the game is over
     */
    isGameOver() {
        return (this._pacman._nbLives == 0)
    }

    /**
     * Checks if pacman is dead.
     * @returns true if pacman is dead.
     */
    pacmanHasBeenEaten() {
        return this._pacman.isDead;
    }

    /**
     * Makes all sprites respawn (resets their position & direction).
     */
    respawn() {
        for (let sprite of this._sprites) {
            sprite.respawn();
        }
    }

    /**
     * Saves the score as current highscore if it is superior.
     */
    saveScore() {
        if (this._score > this._highscore) {
            this._highscore = this._score;
            localStorage.highscore = this._score;
        }
    }

    /**
     * Checks if the current level has been cleared.
     * @returns true if the board is empty.
     */
    lvlSucceed() {
        return this._maze.isEmpty();
    }

    /**
     * Creates a new filled maze to make a new level and makes all sprites reset.
     */
    nextLevel() {
        this._nextLvl = new Maze(RAW_MAZE);
        this.respawn();
    }
}

