import type { MathProblem, LevelDefinition } from "./types";
import { TOTAL_PROBLEMS } from "./constants";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateDoublesProblems(): MathProblem[] {
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

function generateMake10Problems(): MathProblem[] {
  const pairs: [number, number][] = [
    [1, 9], [2, 8], [3, 7], [4, 6], [5, 5],
    [6, 4], [7, 3], [8, 2], [9, 1], [0, 10],
  ];
  return shuffle(
    pairs.map(([a, b]) => ({
      a,
      b,
      correctAnswer: b,
      displayText: `${a} + ? = 10`,
    })),
  );
}

function generatePlaceValueProblems(): MathProblem[] {
  const problems: MathProblem[] = [];
  const usedNumbers = new Set<number>();

  for (let i = 0; i < 4; i++) {
    let tens: number, ones: number;
    do {
      tens = Math.floor(Math.random() * 8) + 1;
      ones = Math.floor(Math.random() * 9) + 1;
    } while (usedNumbers.has(tens * 10 + ones));
    usedNumbers.add(tens * 10 + ones);
    problems.push({
      a: tens,
      b: ones,
      correctAnswer: tens * 10 + ones,
      displayText: `${tens} tens + ${ones} ones = ?`,
    });
  }

  for (let i = 0; i < 3; i++) {
    let n: number;
    do {
      n = Math.floor(Math.random() * 79) + 20;
    } while (usedNumbers.has(n));
    usedNumbers.add(n);
    problems.push({
      a: n,
      b: 0,
      correctAnswer: Math.floor(n / 10),
      displayText: `Tens digit of ${n} = ?`,
    });
  }

  for (let i = 0; i < 3; i++) {
    let n: number;
    do {
      n = Math.floor(Math.random() * 79) + 20;
    } while (usedNumbers.has(n) || n % 10 === 0);
    usedNumbers.add(n);
    problems.push({
      a: n,
      b: 0,
      correctAnswer: n % 10,
      displayText: `Ones digit of ${n} = ?`,
    });
  }

  return shuffle(problems);
}

function generateDoublesWrongAnswers(correctAnswer: number): [number, number] {
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

function generatePlaceValueWrongAnswers(correctAnswer: number): [number, number] {
  const wrongs = new Set<number>();
  if (correctAnswer >= 10) {
    const swapped = (correctAnswer % 10) * 10 + Math.floor(correctAnswer / 10);
    if (swapped !== correctAnswer && swapped >= 10) wrongs.add(swapped);
    if (correctAnswer + 10 <= 99) wrongs.add(correctAnswer + 10);
    if (wrongs.size < 2 && correctAnswer - 10 >= 10) wrongs.add(correctAnswer - 10);
    while (wrongs.size < 2) {
      const offset = Math.floor(Math.random() * 9) + 1;
      const sign = Math.random() < 0.5 ? -1 : 1;
      const c = correctAnswer + offset * sign;
      if (c >= 10 && c !== correctAnswer) wrongs.add(c);
    }
  } else {
    while (wrongs.size < 2) {
      const offset = Math.floor(Math.random() * 3) + 1;
      const sign = Math.random() < 0.5 ? -1 : 1;
      const c = correctAnswer + offset * sign;
      if (c >= 0 && c <= 9 && c !== correctAnswer && !wrongs.has(c)) wrongs.add(c);
    }
  }
  return [...wrongs].slice(0, 2) as [number, number];
}

export const LEVELS: LevelDefinition[] = [
  {
    id: "doubles",
    name: "Doubles",
    example: "1+1, 2+2, 3+3 ...",
    foodType: "fish",
    generateProblems: generateDoublesProblems,
    generateWrongAnswers: (correct) => generateDoublesWrongAnswers(correct),
  },
  {
    id: "make10",
    name: "Make 10",
    example: "1 + ? = 10,  3 + ? = 10 ...",
    foodType: "chicken",
    generateProblems: generateMake10Problems,
    generateWrongAnswers: (correct) => generateDoublesWrongAnswers(correct),
  },
  {
    id: "placeValues",
    name: "Tens & Ones",
    example: "3 tens + 5 ones, tens digit of 47 ...",
    foodType: "cupcake",
    generateProblems: generatePlaceValueProblems,
    generateWrongAnswers: (correct) => generatePlaceValueWrongAnswers(correct),
  },
];

export class ProblemQueue {
  private generator: () => MathProblem[];
  private problems: MathProblem[];
  private currentIndex = 0;
  private wrongQueue: MathProblem[] = [];
  correctCount = 0;

  constructor(generator: () => MathProblem[]) {
    this.generator = generator;
    this.problems = generator();
  }

  reset(): void {
    this.problems = this.generator();
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
