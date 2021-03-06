const MAX_PLAYER_Y_POS = 340;

// Height meter constants
const HEIGHT_METER_LENGTH = 2000;
const HEIGHT_METER_INTERVAL = 50;

// Player tank constants
const PLAYER_VEL_ROT_RATIO = 0.008;
const PLAYER_MAX_FUEL = 100;

// Bomber Shell Constants
const BOMBER_SHELL_VELOCITY_RETENTION = 0.93;

// Seeker Shell Constants
const SEEKER_SHELL_FTL = 225; // frames to live
const SEEKER_SHELL_STEP_SIZE = 4;

// NPC destroy values
const COMBO_MODIFIER = (combo) => Math.trunc(1/4 * 2^combo);
const VALUE_BOMBER = 10;
const VALUE_SEEKER = 20;

// Key code constants
const A_KEY = 65;
const D_KEY = 68;
const W_KEY = 87;
const SPACE_KEY = 32;

// Gravity Vector
var GRAVITY_VECTOR;
var SLOW_GRAVITY_VECTOR;

// Combo Display Constants
var COMBO_X_SHAKE = 1/8;
var COMBO_Y_SHAKE = 1/10;
var COMBO_X_FREQ = Math.PI / 2;
var COMBO_Y_FREQ = Math.PI / 3;

// Collider tool
var Collider;