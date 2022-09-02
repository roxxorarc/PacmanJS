class PacmanView {
    constructor(ctrl) {
        this._ctrl = ctrl;
        window.addEventListener("keydown", event => {
            switch (event.key) {
                case "ArrowUp":
                    this._ctrl.askToChangeDirection(Direction.NORTH)
                    break;
                case "ArrowDown":
                    this._ctrl.askToChangeDirection(Direction.SOUTH)
                    break;
                case "ArrowLeft":
                    this._ctrl.askToChangeDirection(Direction.WEST)
                    break;
                case "ArrowRight":
                    this._ctrl.askToChangeDirection(Direction.EAST)
                    break;
            }
        })
    }
}
