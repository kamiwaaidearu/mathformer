import type { Kitten, Platform } from "./types";
import { CANVAS_HEIGHT } from "./constants";

export interface LandingResult {
  landed: boolean;
  platform: Platform | null;
  fellOffScreen: boolean;
}

export function resolvePlatformCollisions(
  kitten: Kitten,
  platforms: Platform[],
  dt: number,
): LandingResult {
  const kittenFeetCurrent = kitten.position.y + kitten.height;
  const kittenFeetPrevious = kittenFeetCurrent - kitten.velocity.y * dt;

  const wasGrounded = kitten.isGrounded;
  kitten.isGrounded = false;

  let landedPlatform: Platform | null = null;
  let justLanded = false;

  for (const platform of platforms) {
    // Horizontal overlap check
    const horizontalOverlap =
      kitten.position.x + kitten.width > platform.rect.x &&
      kitten.position.x < platform.rect.x + platform.rect.width;

    if (!horizontalOverlap) continue;

    const platformTopY = platform.rect.y;

    // ONE-WAY PLATFORM: only collide when falling down onto the top surface.
    // If kitten is moving upward (jumping), skip entirely — let them pass through.
    if (kitten.velocity.y < 0) continue;

    // Only collide if kitten's feet were above (or at) the platform top last frame.
    // This prevents catching on platforms the kitten is already below.
    if (kittenFeetPrevious > platformTopY + 6) continue;

    // Is kitten's feet now at or below platform top?
    if (kittenFeetCurrent >= platformTopY) {
      kitten.position.y = platformTopY - kitten.height;
      kitten.velocity.y = 0;
      kitten.isGrounded = true;
      kitten.isJumpHeld = false;

      if (!wasGrounded) {
        justLanded = true;
        landedPlatform = platform;
      }

      break;
    }
  }

  // Check if kitten fell off the bottom of the screen
  const fellOffScreen = kitten.position.y > CANVAS_HEIGHT + 50;

  return {
    landed: justLanded,
    platform: landedPlatform,
    fellOffScreen,
  };
}
