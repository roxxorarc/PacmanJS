const SIZE = 15;
const PACMAN_ID = "PACMAN_ID"
const RUN_INTERVAL = 300;
const NB_LIVES = 2;

// DIRECTIONS
Direction.NORTH = new Direction(-1, 0);
Direction.SOUTH = new Direction(1, 0);
Direction.WEST = new Direction(0, -1);
Direction.EAST = new Direction(0, 1);

// WORMHOLES
const leftWormHole = new Position(14, 0);
const rightWormHole = new Position(14, 27);
const leftWormHoleTP = new Position(14, 1);
const rightWormHoleTP = new Position(14, 26);
