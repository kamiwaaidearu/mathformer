import type { Platform, MathProblem, FoodType } from "./types";
import {
  ANSWER_PLATFORM_POSITIONS,
  ANSWER_PLATFORM_WIDTH,
  ANSWER_PLATFORM_HEIGHT,
  GROUND_X,
  GROUND_Y,
  GROUND_WIDTH,
  GROUND_HEIGHT,
} from "./constants";

const FOOD_TYPES: FoodType[] = ["fish", "chicken", "cupcake"];

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function createGroundPlatform(): Platform {
  return {
    rect: { x: GROUND_X, y: GROUND_Y, width: GROUND_WIDTH, height: GROUND_HEIGHT },
    answerValue: null,
    foodType: null,
    isCorrect: false,
  };
}

export function createAnswerPlatforms(
  problem: MathProblem,
  wrongAnswerGen: (correctAnswer: number, problem: MathProblem) => [number, number],
): Platform[] {
  const [wrong1, wrong2] = wrongAnswerGen(problem.correctAnswer, problem);
  const answers = shuffleArray([
    { value: problem.correctAnswer, isCorrect: true },
    { value: wrong1, isCorrect: false },
    { value: wrong2, isCorrect: false },
  ]);

  return ANSWER_PLATFORM_POSITIONS.map((pos, i) => ({
    rect: {
      x: pos.x,
      y: pos.y,
      width: ANSWER_PLATFORM_WIDTH,
      height: ANSWER_PLATFORM_HEIGHT,
    },
    answerValue: answers[i].value,
    foodType: FOOD_TYPES[Math.floor(Math.random() * FOOD_TYPES.length)],
    isCorrect: answers[i].isCorrect,
  }));
}
