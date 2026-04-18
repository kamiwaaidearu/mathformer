import type { Assets, GameScreen, Kitten, Platform, MathProblem, FoodParticle, FoodType } from "./types";
import { InputManager } from "./input";
import { GameAudio } from "./audio";
import { ProblemQueue } from "./math";
import { createKitten, respawnKitten, clampKittenToCanvas } from "./player";
import { updateKittenPhysics } from "./physics";
import { resolvePlatformCollisions } from "./collision";
import { createGroundPlatform, createAnswerPlatforms } from "./platform";
import { renderMenuScreen, renderPlayScreen, renderWinScreen } from "./renderer";
import {
  FIXED_TIMESTEP,
  MAX_DELTA,
  FEEDBACK_DURATION,
  WIN_DURATION,
  FOOD_RAIN_SPAWN_INTERVAL,
  FOOD_RAIN_GRAVITY,
  FOOD_RAIN_MAX_ITEMS,
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
} from "./constants";

const FOOD_TYPES: FoodType[] = ["fish", "chicken", "cupcake"];

export class Game {
  private ctx: CanvasRenderingContext2D;
  private assets: Assets;
  private input: InputManager;
  private audio: GameAudio;

  private screen: GameScreen = "menu";
  private kitten: Kitten;
  private groundPlatform: Platform;
  private answerPlatforms: Platform[] = [];

  private problemQueue: ProblemQueue;
  private currentProblem: MathProblem | null = null;

  private isTransitioning = false;
  private feedbackTimer = 0;
  private feedbackType: "correct" | "wrong" | null = null;
  private feedbackPlatformIndex: number | null = null;

  private winTimer = 0;
  private foodRain: FoodParticle[] = [];
  private foodRainSpawnTimer = 0;
  private yaySoundPlayed = false;

  private previousTime = 0;
  private accumulator = 0;
  private gameTime = 0;

  constructor(ctx: CanvasRenderingContext2D, assets: Assets) {
    this.ctx = ctx;
    this.assets = assets;
    this.input = new InputManager();
    this.audio = new GameAudio();
    this.kitten = createKitten();
    this.groundPlatform = createGroundPlatform();
    this.problemQueue = new ProblemQueue();
  }

  start(): void {
    this.previousTime = performance.now() / 1000;
    requestAnimationFrame((ts) => this.loop(ts));
  }

  private loop = (timestampMs: number): void => {
    const currentTime = timestampMs / 1000;
    let deltaTime = currentTime - this.previousTime;
    this.previousTime = currentTime;

    deltaTime = Math.min(deltaTime, MAX_DELTA);
    this.accumulator += deltaTime;
    this.gameTime += deltaTime;

    while (this.accumulator >= FIXED_TIMESTEP) {
      this.update(FIXED_TIMESTEP);
      this.accumulator -= FIXED_TIMESTEP;
    }

    this.render();
    requestAnimationFrame((ts) => this.loop(ts));
  };

  private update(dt: number): void {
    this.input.update(dt);

    switch (this.screen) {
      case "menu":
        this.updateMenu();
        break;
      case "play":
        this.updatePlay(dt);
        break;
      case "win":
        this.updateWin(dt);
        break;
    }

    this.input.resetJumpPress();
  }

  private updateMenu(): void {
    if (this.input.spacePressed) {
      this.audio.init();
      this.startGame();
    }
  }

  private startGame(): void {
    this.screen = "play";
    this.kitten = createKitten();
    this.problemQueue.reset();
    this.feedbackTimer = 0;
    this.feedbackType = null;
    this.feedbackPlatformIndex = null;
    this.isTransitioning = false;
    this.loadNextProblem();
  }

  private loadNextProblem(): void {
    const problem = this.problemQueue.getNext();
    if (problem) {
      this.currentProblem = problem;
      this.answerPlatforms = createAnswerPlatforms(problem);
    }
  }

  private updatePlay(dt: number): void {
    // Handle feedback timer
    if (this.isTransitioning) {
      this.feedbackTimer -= dt;
      if (this.feedbackTimer <= 0) {
        this.feedbackTimer = 0;
        this.feedbackType = null;
        this.feedbackPlatformIndex = null;
        this.isTransitioning = false;

        if (this.problemQueue.isComplete) {
          this.screen = "win";
          this.winTimer = 0;
          this.foodRain = [];
          this.foodRainSpawnTimer = 0;
          this.yaySoundPlayed = false;
          return;
        }

        this.loadNextProblem();
        respawnKitten(this.kitten);
      }
      return;
    }

    // Physics
    updateKittenPhysics(this.kitten, this.input, dt, () => this.audio.playJump());
    clampKittenToCanvas(this.kitten);

    // Collision
    const allPlatforms = [this.groundPlatform, ...this.answerPlatforms];
    const result = resolvePlatformCollisions(this.kitten, allPlatforms, dt);

    if (result.landed && result.platform) {
      if (result.platform.answerValue !== null) {
        this.handleAnswer(result.platform);
      } else {
        this.audio.playLand();
      }
    }

    // Fell off screen: respawn
    if (result.fellOffScreen) {
      respawnKitten(this.kitten);
    }
  }

  private handleAnswer(platform: Platform): void {
    this.isTransitioning = true;
    this.feedbackTimer = FEEDBACK_DURATION;
    this.feedbackPlatformIndex = this.answerPlatforms.indexOf(platform);
    this.kitten.velocity.x = 0;
    this.kitten.velocity.y = 0;

    if (platform.isCorrect) {
      this.feedbackType = "correct";
      this.problemQueue.markCorrect();
      this.audio.playMunch();
    } else {
      this.feedbackType = "wrong";
      if (this.currentProblem) {
        this.problemQueue.markWrong(this.currentProblem);
      }
      this.audio.playBlech();
    }
  }

  private updateWin(dt: number): void {
    if (!this.yaySoundPlayed) {
      this.audio.playYay();
      this.yaySoundPlayed = true;
    }

    this.winTimer += dt;

    // Food rain
    this.foodRainSpawnTimer += dt;
    while (this.foodRainSpawnTimer >= FOOD_RAIN_SPAWN_INTERVAL) {
      this.foodRainSpawnTimer -= FOOD_RAIN_SPAWN_INTERVAL;
      if (this.foodRain.length < FOOD_RAIN_MAX_ITEMS) {
        this.foodRain.push({
          x: Math.random() * (CANVAS_WIDTH - 32),
          y: -40,
          vy: 60 + Math.random() * 90,
          vx: (Math.random() - 0.5) * 60,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 4,
          foodType: FOOD_TYPES[Math.floor(Math.random() * FOOD_TYPES.length)],
        });
      }
    }

    for (const food of this.foodRain) {
      food.vy += FOOD_RAIN_GRAVITY * dt;
      food.x += food.vx * dt;
      food.y += food.vy * dt;
      food.rotation += food.rotationSpeed * dt;
    }

    this.foodRain = this.foodRain.filter((f) => f.y < CANVAS_HEIGHT + 50);

    if (this.winTimer >= WIN_DURATION) {
      this.screen = "menu";
    }
  }

  private render(): void {
    this.ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    switch (this.screen) {
      case "menu":
        renderMenuScreen(this.ctx, this.assets, this.gameTime);
        break;
      case "play":
        renderPlayScreen(
          this.ctx,
          this.assets,
          this.kitten,
          this.answerPlatforms,
          this.groundPlatform,
          this.currentProblem,
          this.problemQueue.correctCount,
          this.feedbackTimer,
          this.feedbackType,
          this.feedbackPlatformIndex,
        );
        break;
      case "win":
        renderWinScreen(this.ctx, this.assets, this.foodRain, this.gameTime, this.winTimer);
        break;
    }
  }
}
