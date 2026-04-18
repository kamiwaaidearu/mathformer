import type { MathProblem } from "./types";
import { TOTAL_PROBLEMS } from "./constants";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function generateProblems(): MathProblem[] {
  const problems: MathProblem[] = [];
  for (let i = 1; i <= TOTAL_PROBLEMS; i++) {
    problems.push({
      a: i,
      b: i,
      correctAnswer: i + i,
      displayText: `${i} + ${i} = ?`,
    });
  }
  return shuffle(problems);
}

export function generateWrongAnswers(correctAnswer: number): [number, number] {
  const wrongs = new Set<number>();
  while (wrongs.size < 2) {
    const offset = Math.floor(Math.random() * 5) + 1;
    const sign = Math.random() < 0.5 ? -1 : 1;
    const candidate = correctAnswer + offset * sign;
    if (candidate >= 2 && candidate !== correctAnswer && !wrongs.has(candidate)) {
      wrongs.add(candidate);
    }
  }
  return [...wrongs] as [number, number];
}

export class ProblemQueue {
  private problems: MathProblem[];
  private currentIndex = 0;
  private wrongQueue: MathProblem[] = [];
  correctCount = 0;

  constructor() {
    this.problems = generateProblems();
  }

  reset(): void {
    this.problems = generateProblems();
    this.currentIndex = 0;
    this.wrongQueue = [];
    this.correctCount = 0;
  }

  getNext(): MathProblem | null {
    if (this.currentIndex < this.problems.length) {
      return this.problems[this.currentIndex++];
    }
    if (this.wrongQueue.length > 0) {
      return this.wrongQueue.shift()!;
    }
    return null;
  }

  markCorrect(): void {
    this.correctCount++;
  }

  markWrong(problem: MathProblem): void {
    this.wrongQueue.push(problem);
  }

  get isComplete(): boolean {
    return this.correctCount >= TOTAL_PROBLEMS;
  }
}
