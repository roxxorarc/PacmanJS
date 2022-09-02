class GameCtrl {
    constructor() {
        this._game = new Game(RAW_MAZE);
        this._view = new GameView(this._game, this);
        this._pacview = new PacmanView(new PacmanCtrl(this._game._pacman));
    }
    run() {
        this.timer = setInterval(() => {
            this._game.moveSprites();
            this._view.updateFrame();
            this._view.updateLives();
            if (this._game.isGameOver()) {
                clearInterval(this.timer)
                this._game.saveScore();
                this._view.displayGameOver();
            } else if (this._game.lvlSucceed()) {
                this._game.nextLevel()
                this._view.nextLevel();
            }
        }, RUN_INTERVAL)
    }
    startHasBeenRequested() {
        this.run();
    }
}
