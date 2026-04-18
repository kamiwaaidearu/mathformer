import type { Assets, Kitten, Platform, FoodParticle, MathProblem, FoodType } from "./types";
import { getFoodSprite } from "./assets";
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  COLOR_SKY,
  COLOR_HUD_TEXT,
  COLOR_HUD_SHADOW,
  FONT_HUD,
  FONT_ANSWER,
  FONT_TITLE,
  FONT_SUBTITLE,
  FONT_CONTROLS,
  TOTAL_PROBLEMS,
} from "./constants";

function drawText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  font: string,
  color: string,
  align: CanvasTextAlign = "center",
  shadow = true,
): void {
  ctx.font = font;
  ctx.textAlign = align;
  ctx.textBaseline = "top";
  if (shadow) {
    ctx.fillStyle = COLOR_HUD_SHADOW;
    ctx.fillText(text, x + 2, y + 2);
  }
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

function drawBackground(ctx: CanvasRenderingContext2D): void {
  // Sky gradient
  const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
  gradient.addColorStop(0, "#4FA4E0");
  gradient.addColorStop(0.6, COLOR_SKY);
  gradient.addColorStop(1, "#B0E0F0");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  // Simple clouds
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  ctx.beginPath();
  ctx.ellipse(150, 80, 50, 20, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(550, 60, 60, 22, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(700, 100, 40, 16, 0, 0, Math.PI * 2);
  ctx.fill();
}

export function renderMenuScreen(
  ctx: CanvasRenderingContext2D,
  assets: Assets,
  time: number,
): void {
  drawBackground(ctx);

  // Title with bounce
  const bounce = Math.sin(time * 3) * 5;
  drawText(ctx, "Mathformer!", CANVAS_WIDTH / 2, 120 + bounce, FONT_TITLE, "#FF6B35");

  // Subtitle
  drawText(ctx, "Feed the hungry kitten!", CANVAS_WIDTH / 2, 190, FONT_SUBTITLE, "#FFFFFF");

  // Kitten (large, centered)
  const kittenScale = 2;
  const kittenX = CANVAS_WIDTH / 2 - 32 * kittenScale / 2;
  const kittenY = 260;
  ctx.drawImage(assets.kitten, kittenX, kittenY, 64 * kittenScale, 64 * kittenScale);

  // Food items around kitten
  ctx.drawImage(assets.fish, kittenX - 60, kittenY + 40, 48, 48);
  ctx.drawImage(assets.chicken, kittenX + 64 * kittenScale + 15, kittenY + 30, 48, 48);
  ctx.drawImage(assets.cupcake, kittenX + 20, kittenY - 50, 40, 40);

  // Start prompt with pulsing
  const alpha = 0.5 + Math.sin(time * 4) * 0.5;
  ctx.globalAlpha = alpha;
  drawText(ctx, "Press SPACE to start!", CANVAS_WIDTH / 2, 440, FONT_SUBTITLE, "#FFDD44", "center", true);
  ctx.globalAlpha = 1;

  // Controls hint
  drawText(ctx, "Arrow Keys to move  |  SPACE to jump", CANVAS_WIDTH / 2, 500, FONT_CONTROLS, "#CCCCCC", "center", false);
}

export function renderPlayScreen(
  ctx: CanvasRenderingContext2D,
  assets: Assets,
  kitten: Kitten,
  answerPlatforms: Platform[],
  groundPlatform: Platform,
  currentProblem: MathProblem | null,
  correctCount: number,
  feedbackTimer: number,
  feedbackType: "correct" | "wrong" | null,
  feedbackPlatformIndex: number | null,
): void {
  drawBackground(ctx);

  // Ground — full-width grassy floor
  ctx.fillStyle = "#6B4A2E";
  ctx.fillRect(0, groundPlatform.rect.y + 8, CANVAS_WIDTH, CANVAS_HEIGHT - groundPlatform.rect.y);
  ctx.fillStyle = "#8B6040";
  ctx.fillRect(0, groundPlatform.rect.y + 8, CANVAS_WIDTH, 20);
  // Grass strip
  ctx.fillStyle = "#4CAF50";
  ctx.fillRect(0, groundPlatform.rect.y, CANVAS_WIDTH, 10);
  ctx.fillStyle = "#66CC44";
  ctx.fillRect(0, groundPlatform.rect.y, CANVAS_WIDTH, 6);
  // Grass tufts
  ctx.fillStyle = "#55BB33";
  for (let gx = 10; gx < CANVAS_WIDTH; gx += 22) {
    ctx.beginPath();
    ctx.moveTo(gx, groundPlatform.rect.y);
    ctx.lineTo(gx + 3, groundPlatform.rect.y - 6);
    ctx.lineTo(gx + 6, groundPlatform.rect.y);
    ctx.fill();
  }

  // Answer platforms
  for (let i = 0; i < answerPlatforms.length; i++) {
    const plat = answerPlatforms[i];

    // Platform glow if feedback active
    if (feedbackTimer > 0 && feedbackPlatformIndex === i) {
      const glowAlpha = Math.min(1, feedbackTimer / 0.3) * 0.4;
      ctx.fillStyle =
        feedbackType === "correct"
          ? `rgba(0, 255, 0, ${glowAlpha})`
          : `rgba(255, 0, 0, ${glowAlpha})`;
      ctx.beginPath();
      ctx.roundRect(
        plat.rect.x - 6,
        plat.rect.y - 6,
        plat.rect.width + 12,
        plat.rect.height + 12,
        8,
      );
      ctx.fill();
    }

    // Platform sprite
    ctx.drawImage(
      assets.platform,
      plat.rect.x,
      plat.rect.y,
      plat.rect.width,
      plat.rect.height,
    );

    // Food on platform
    if (plat.foodType) {
      const foodSprite = getFoodSprite(assets, plat.foodType);
      const foodX = plat.rect.x + (plat.rect.width - 40) / 2;
      const foodY = plat.rect.y - 38;
      ctx.drawImage(foodSprite, foodX, foodY, 40, 40);
    }

    // Answer number on platform
    if (plat.answerValue !== null) {
      const centerX = plat.rect.x + plat.rect.width / 2;
      const textY = plat.rect.y + 8;
      drawText(ctx, String(plat.answerValue), centerX, textY, FONT_ANSWER, "#FFFFFF", "center", true);
    }
  }

  // Kitten — SVG faces left natively, so flip when facingRight
  ctx.save();
  if (kitten.facingRight) {
    ctx.translate(kitten.position.x + kitten.width, kitten.position.y);
    ctx.scale(-1, 1);
    ctx.drawImage(assets.kitten, 0, 0, kitten.width, kitten.height);
  } else {
    ctx.drawImage(
      assets.kitten,
      kitten.position.x,
      kitten.position.y,
      kitten.width,
      kitten.height,
    );
  }
  ctx.restore();

  // Feedback fullscreen overlay
  if (feedbackTimer > 0 && feedbackType) {
    const overlayAlpha = Math.min(1, feedbackTimer / 0.3) * 0.15;
    ctx.fillStyle =
      feedbackType === "correct"
        ? `rgba(0, 255, 0, ${overlayAlpha})`
        : `rgba(255, 0, 0, ${overlayAlpha})`;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Feedback text
    const feedbackText = feedbackType === "correct" ? "Yum!" : "Blech!";
    const feedbackColor = feedbackType === "correct" ? "#44FF44" : "#FF4444";
    const textAlpha = Math.min(1, feedbackTimer / 0.5);
    ctx.globalAlpha = textAlpha;
    drawText(ctx, feedbackText, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 40, FONT_TITLE, feedbackColor);
    ctx.globalAlpha = 1;
  }

  // HUD: question
  if (currentProblem) {
    drawText(ctx, currentProblem.displayText, CANVAS_WIDTH / 2, 20, FONT_HUD, "#FFFFFF");
  }

  // HUD: score
  drawText(
    ctx,
    `${correctCount} / ${TOTAL_PROBLEMS}`,
    CANVAS_WIDTH - 20,
    25,
    FONT_ANSWER,
    "#FFDD44",
    "right",
  );
}

export function renderWinScreen(
  ctx: CanvasRenderingContext2D,
  assets: Assets,
  foodRain: FoodParticle[],
  time: number,
  winTimer: number,
): void {
  drawBackground(ctx);

  // Food rain
  for (const food of foodRain) {
    const sprite = getFoodSprite(assets, food.foodType);
    ctx.save();
    ctx.translate(food.x + 16, food.y + 16);
    ctx.rotate(food.rotation);
    ctx.drawImage(sprite, -16, -16, 32, 32);
    ctx.restore();
  }

  // Kitten with chef hat (large, centered)
  const kittenScale = 2.5;
  const kittenX = CANVAS_WIDTH / 2 - (64 * kittenScale) / 2;
  const kittenY = 250;
  ctx.drawImage(assets.kittenChef, kittenX, kittenY, 64 * kittenScale, 64 * kittenScale);

  // "You WIN!" with rainbow-ish color cycle
  const hue = (time * 60) % 360;
  const winColor = `hsl(${hue}, 100%, 60%)`;
  const bounce = Math.sin(time * 5) * 8;
  drawText(ctx, "You WIN!", CANVAS_WIDTH / 2, 80 + bounce, FONT_TITLE, winColor);

  // Subtitle
  drawText(ctx, "Great job feeding the kitten!", CANVAS_WIDTH / 2, 160, FONT_SUBTITLE, "#FFFFFF");

  // Countdown
  const remaining = Math.ceil(5 - winTimer);
  if (remaining > 0) {
    drawText(
      ctx,
      `Back to menu in ${remaining}...`,
      CANVAS_WIDTH / 2,
      520,
      FONT_CONTROLS,
      "#CCCCCC",
      "center",
      false,
    );
  }
}
