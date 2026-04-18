import type { Kitten } from "./types";
import {
  CANVAS_WIDTH,
  GROUND_X,
  GROUND_WIDTH,
  GROUND_Y,
  KITTEN_WIDTH,
  KITTEN_HEIGHT,
} from "./constants";

export function createKitten(): Kitten {
  return {
    position: {
      x: GROUND_X + (GROUND_WIDTH - KITTEN_WIDTH) / 2,
      y: GROUND_Y - KITTEN_HEIGHT,
    },
    velocity: { x: 0, y: 0 },
    width: KITTEN_WIDTH,
    height: KITTEN_HEIGHT,
    isGrounded: true,
    isJumpHeld: false,
    jumpHeldTime: 0,
    coyoteTimer: 0,
    facingRight: true,
    state: "idle",
  };
}

export function respawnKitten(kitten: Kitten): void {
  kitten.position.x = GROUND_X + (GROUND_WIDTH - KITTEN_WIDTH) / 2;
  kitten.position.y = GROUND_Y - KITTEN_HEIGHT;
  kitten.velocity.x = 0;
  kitten.velocity.y = 0;
  kitten.isGrounded = true;
  kitten.isJumpHeld = false;
  kitten.jumpHeldTime = 0;
  kitten.coyoteTimer = 0;
  kitten.state = "idle";
}

export function clampKittenToCanvas(kitten: Kitten): void {
  if (kitten.position.x < 0) kitten.position.x = 0;
  if (kitten.position.x > CANVAS_WIDTH - kitten.width) {
    kitten.position.x = CANVAS_WIDTH - kitten.width;
  }
}
