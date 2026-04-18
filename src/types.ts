export interface Vector2 {
  x: number;
  y: number;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Kitten {
  position: Vector2;
  velocity: Vector2;
  width: number;
  height: number;
  isGrounded: boolean;
  isJumpHeld: boolean;
  jumpHeldTime: number;
  coyoteTimer: number;
  facingRight: boolean;
  state: "idle" | "running" | "jumping" | "falling";
}

export interface Platform {
  rect: Rect;
  answerValue: number | null;
  foodType: FoodType | null;
  isCorrect: boolean;
}

export type FoodType = "fish" | "chicken" | "cupcake";

export interface MathProblem {
  a: number;
  b: number;
  correctAnswer: number;
  displayText: string;
}

export interface FoodParticle {
  x: number;
  y: number;
  vy: number;
  vx: number;
  rotation: number;
  rotationSpeed: number;
  foodType: FoodType;
}

export type LevelId = "doubles" | "make10" | "placeValues";

export interface LevelDefinition {
  id: LevelId;
  name: string;
  example: string;
  foodType: FoodType;
  generateProblems: () => MathProblem[];
  generateWrongAnswers: (correctAnswer: number, problem: MathProblem) => [number, number];
}

export type GameScreen = "menu" | "levelSelect" | "play" | "win";

export interface Assets {
  kitten: HTMLImageElement;
  kittenChef: HTMLImageElement;
  fish: HTMLImageElement;
  chicken: HTMLImageElement;
  cupcake: HTMLImageElement;
  platform: HTMLImageElement;
  groundPlatform: HTMLImageElement;
}
