import { loadAssets } from "./assets";
import { Game } from "./game";

async function main(): Promise<void> {
  const canvas = document.getElementById("game") as HTMLCanvasElement;
  if (!canvas) {
    throw new Error("Could not find canvas element");
  }
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Could not get 2D context");
  }

  ctx.imageSmoothingEnabled = true;

  const assets = await loadAssets();
  const game = new Game(ctx, assets);
  game.start();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}
