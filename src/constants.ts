// Canvas
export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;

// Ground — full-width floor so the kitten can walk freely underneath platforms
export const GROUND_Y = 480;
export const GROUND_WIDTH = CANVAS_WIDTH;
export const GROUND_HEIGHT = CANVAS_HEIGHT - GROUND_Y; // fills to bottom
export const GROUND_X = 0;

// Answer platforms — kitten jumps 200px, so from feet at y=480 can reach y=280.
// Platforms at y=320 gives 160px gap — comfortably reachable.
export const ANSWER_PLATFORM_Y = 320;
export const ANSWER_PLATFORM_WIDTH = 160;
export const ANSWER_PLATFORM_HEIGHT = 40;
export const ANSWER_PLATFORM_POSITIONS = [
  { x: 40, y: ANSWER_PLATFORM_Y },
  { x: 320, y: ANSWER_PLATFORM_Y },
  { x: 600, y: ANSWER_PLATFORM_Y },
];

// Kitten
export const KITTEN_WIDTH = 64;
export const KITTEN_HEIGHT = 64;
export const KITTEN_MOVE_SPEED = 280;

// Mario-style jump physics
export const JUMP_HEIGHT = 200;
export const TIME_TO_APEX = 0.42;
export const GRAVITY_RISE = (2 * JUMP_HEIGHT) / (TIME_TO_APEX ** 2);
export const JUMP_INITIAL_VELOCITY = (2 * JUMP_HEIGHT) / TIME_TO_APEX;
export const FALL_GRAVITY_MULTIPLIER = 2.5;
export const GRAVITY_FALL = GRAVITY_RISE * FALL_GRAVITY_MULTIPLIER;
export const JUMP_CUT_GRAVITY_MULTIPLIER = 3.0;
export const GRAVITY_JUMP_CUT = GRAVITY_RISE * JUMP_CUT_GRAVITY_MULTIPLIER;
export const MAX_FALL_SPEED = 720;
export const MAX_JUMP_HOLD_TIME = TIME_TO_APEX;
export const COYOTE_TIME = 0.08;
export const JUMP_BUFFER_TIME = 0.1;

// Fixed timestep
export const FIXED_TIMESTEP = 1 / 120;
export const MAX_DELTA = 0.25;

// Feedback
export const FEEDBACK_DURATION = 1.2;

// Food rain (win screen)
export const FOOD_RAIN_SPAWN_INTERVAL = 0.08;
export const FOOD_RAIN_GRAVITY = 400;
export const FOOD_RAIN_MAX_ITEMS = 80;
export const WIN_DURATION = 5.0;

// Total problems
export const TOTAL_PROBLEMS = 10;

// Colors
export const COLOR_SKY = "#87CEEB";
export const COLOR_HUD_TEXT = "#FFFFFF";
export const COLOR_HUD_SHADOW = "#000000";

// Fonts
export const FONT_HUD = 'bold 42px "Comic Sans MS", "Chalkboard SE", cursive, sans-serif';
export const FONT_ANSWER = 'bold 36px "Comic Sans MS", "Chalkboard SE", cursive, sans-serif';
export const FONT_TITLE = 'bold 52px "Comic Sans MS", "Chalkboard SE", cursive, sans-serif';
export const FONT_SUBTITLE = '28px "Comic Sans MS", "Chalkboard SE", cursive, sans-serif';
export const FONT_CONTROLS = '20px "Comic Sans MS", "Chalkboard SE", cursive, sans-serif';
