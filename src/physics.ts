import type { Kitten } from "./types";
import { InputManager } from "./input";
import {
  KITTEN_MOVE_SPEED,
  COYOTE_TIME,
  JUMP_INITIAL_VELOCITY,
  MAX_JUMP_HOLD_TIME,
  GRAVITY_RISE,
  GRAVITY_FALL,
  GRAVITY_JUMP_CUT,
  MAX_FALL_SPEED,
} from "./constants";

export function updateKittenPhysics(
  kitten: Kitten,
  input: InputManager,
  dt: number,
  playJumpSound: () => void,
): boolean {
  // Horizontal movement
  if (input.left) {
    kitten.velocity.x = -KITTEN_MOVE_SPEED;
    kitten.facingRight = false;
  } else if (input.right) {
    kitten.velocity.x = KITTEN_MOVE_SPEED;
    kitten.facingRight = true;
  } else {
    kitten.velocity.x = 0;
  }

  // Coyote time
  if (kitten.isGrounded) {
    kitten.coyoteTimer = COYOTE_TIME;
  } else {
    kitten.coyoteTimer = Math.max(0, kitten.coyoteTimer - dt);
  }

  // Jump initiation
  let jumped = false;
  const canJump = kitten.isGrounded || kitten.coyoteTimer > 0;
  if (input.consumeJump() && canJump) {
    kitten.velocity.y = -JUMP_INITIAL_VELOCITY;
    kitten.isGrounded = false;
    kitten.isJumpHeld = true;
    kitten.jumpHeldTime = 0;
    kitten.coyoteTimer = 0;
    playJumpSound();
    jumped = true;
  }

  // Track jump hold
  if (kitten.isJumpHeld) {
    if (input.jumpHeld) {
      kitten.jumpHeldTime += dt;
      if (kitten.jumpHeldTime >= MAX_JUMP_HOLD_TIME) {
        kitten.isJumpHeld = false;
      }
    } else {
      kitten.isJumpHeld = false;
    }
  }

  // Select gravity
  let gravity: number;
  if (kitten.velocity.y < 0) {
    gravity = kitten.isJumpHeld ? GRAVITY_RISE : GRAVITY_JUMP_CUT;
  } else {
    gravity = GRAVITY_FALL;
  }

  // Apply gravity
  if (!kitten.isGrounded) {
    kitten.velocity.y += gravity * dt;
    kitten.velocity.y = Math.min(kitten.velocity.y, MAX_FALL_SPEED);
  }

  // Integrate position
  kitten.position.x += kitten.velocity.x * dt;
  kitten.position.y += kitten.velocity.y * dt;

  // Update animation state
  if (!kitten.isGrounded) {
    kitten.state = kitten.velocity.y < 0 ? "jumping" : "falling";
  } else if (kitten.velocity.x !== 0) {
    kitten.state = "running";
  } else {
    kitten.state = "idle";
  }

  return jumped;
}
