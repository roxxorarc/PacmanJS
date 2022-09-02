class GameView {
    constructor(game, ctrl) {
        this._game = game;
        this._ctrl = ctrl;
        $("#game").css({
            width: `${game._maze._rawMaze[0].length * SIZE}`,
            height: `${game._maze._rawMaze.length * SIZE}`
        });
        $("#game").append(`<div id="START"><img src="\PngItem_2097834.png"></div>`);
        $("#START").click(() => ctrl._view.startGame());
        $(".highscore").text(localStorage.highscore);
        addDot(game);
        addEnergizedDot(game);
        addWall(game);
        addPacman(game);
        addGhost(game, "blinky");
        addGhost(game, "pinky");
        addGhost(game, "inky");
        addGhost(game, "clyde");
    }

    /**
     * Updates every updatable frame.
     * => updates pacmans mouth depending on its direction.
     * => updates the score.
     * => when pacman is on a cell, clears it.
     * => updates ghosts frames.
     */
    updateFrame() {
        let pacmanPos = this._game._pacman._position;
        let blinkyPos = this._game._blinky._position;
        let pinkyPos = this._game._pinky._position;
        let inkyPos = this._game._inky._position;
        let clydePos = this._game._clyde._position;
        let direction = this._game._pacman._direction;
        // ================= updating pacman frames ================= // 
        switch (direction) {
            case Direction.NORTH:
                $(".pacman").css({
                    "border-color": "transparent yellow yellow yellow"
                })
                break;
            case Direction.SOUTH:
                $(".pacman").css({
                    "border-color": "yellow yellow transparent yellow"
                })
                break;
            case Direction.WEST:
                $(".pacman").css({
                    "border-color": "yellow yellow yellow transparent"
                })
                break;
            case Direction.EAST:
                $(".pacman").css({
                    "border-color": "yellow transparent yellow yellow"
                })
                break;
        }
        $(".pacman").css({
            top: `${(pacmanPos.row) * SIZE}px`,
            left: `${(pacmanPos.column) * SIZE}px`
        })
        // ================= updating pacman frames ================= // 
        $(`#${(pacmanPos.row)}${(pacmanPos.column)}${pacmanPos.row}`).remove(); // removing dots
        $(`.score`).text(`${this._game._score}`);  // updating score

        // ================= updating ghosts frames ================= // 
        $("#blinky").css({
            top: `${(blinkyPos.row) * SIZE}px`,
            left: `${(blinkyPos.column) * SIZE}px`
        });
        $("#pinky").css({
            top: `${(pinkyPos.row) * SIZE}px`,
            left: `${(pinkyPos.column) * SIZE}px`
        });
        $("#inky").css({
            top: `${(inkyPos.row) * SIZE}px`,
            left: `${(inkyPos.column) * SIZE}px`
        });
        $("#clyde").css({
            top: `${(clydePos.row) * SIZE}px`,
            left: `${(clydePos.column) * SIZE}px`
        });
    }
    // ================= updating ghosts frames ================= // 

    /**
     * Updates the remaning lives.
     */
    updateLives() {
        $(".life").remove();
        for (let i = 0; i < this._game._pacman._nbLives; i++) {
            $(`<span class="life"></span>`).appendTo("#lifeBorder")
                .css({
                    left: `${i * SIZE * 2}px`
                });
        }
    }

    /**
     * Displays the game over message and updates the highscore.
     */
    displayGameOver() {
        $(".highscore").text(localStorage.highscore);
        $("#game").append(`<div id="gameover">GAME OVER</div>`);
        $("#game").append(`<button id="reset" onclick="ctrl._view.resetGame()">PLAY AGAIN</button>`)
    }

    /**
     * Updates the view for the next level.
     * => removes every dot.
     * => adds the dots back.
     * => updates the frames to make *instantly* visible.
     */
    nextLevel() {
        this._game._maze = this._game._nextLvl;
        addDot(this._game);
        addEnergizedDot(this._game);
        this.updateFrame();
    }

    /**
     * Starts the game when the button is clicked.
     */
    startGame() {
        $("#START").hide();
        this._ctrl.startHasBeenRequested();
    }

    resetGame() {
        $("#game").empty();
        ctrl = new GameCtrl();
    }
}

function addEnergizedDot(game) {
    for (let i in game._maze._rawMaze) {
        for (let j in game._maze._rawMaze[i]) {
            if (game._maze.getDotLayerTile(new Position(i, j)) == 3) {
                $(`<span class="energizer" id="${i}${j}${i}"></span>`).appendTo("#game")
                    .css({
                        top: `${SIZE * i}px`,
                        left: `${SIZE * j}px`
                    })
            }
        }
    }
}

function addDot(game) {
    for (let i in game._maze._rawMaze) {
        for (let j in game._maze._rawMaze[i]) {
            if (game._maze.getDotLayerTile(new Position(i, j)) == 2) {
                $(`<span class="gum" id="${i}${j}${i}"></span>`).appendTo("#game")
                    .css({
                        top: `${SIZE * i}px`,
                        left: `${SIZE * j}px`
                    })
            }
        }
    }
}

function addWall(game) {
    for (let i in game._maze._rawMaze) {
        for (let j in game._maze._rawMaze[i]) {
            if (game._maze.getWallLayerTile(new Position(i, j)) != undefined) {
                $(`<span class="wall">.</span>`).appendTo("#game")
                    .css({
                        top: `${SIZE * i}px`,
                        left: `${SIZE * j}px`
                    })
            }
        }
    }
}

function addPacman(game) {
    $(`<span class="pacman"></span>`).appendTo("#game")
        .css({
            top: `${game._maze._pacSpawn._row * SIZE}px`,
            left: `${game._maze._pacSpawn._column * SIZE}px`
        })
}

function addGhost(game, id) {
    $(`<span class="ghost" id="${id}"></span>`).appendTo("#game")
        .css({
            top: `${game._maze._ghostSpawn._row * SIZE}px`,
            left: `${game._maze._ghostSpawn._column * SIZE}px`
        })
}

function removeDots(game) {
    for (let i in game._maze._rawMaze) {
        for (let j in game._maze._rawMaze[i]) {
            $(`#${(i)}${(j)}${i}`).remove();
        }
    }
}
