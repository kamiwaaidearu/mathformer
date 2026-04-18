import { JUMP_BUFFER_TIME } from "./constants";

export class InputManager {
  private keysDown = new Set<string>();
  private jumpPressedThisFrame = false;
  private jumpBufferTimer = 0;

  constructor() {
    document.addEventListener("keydown", (e) => this.onKeyDown(e));
    document.addEventListener("keyup", (e) => this.onKeyUp(e));
  }

  private onKeyDown(e: KeyboardEvent): void {
    if (e.code === "Space" || e.code === "ArrowLeft" || e.code === "ArrowRight" || e.code === "ArrowUp") {
      e.preventDefault();
    }
    this.keysDown.add(e.code);
    if (e.code === "Space") {
      this.jumpPressedThisFrame = true;
      this.jumpBufferTimer = JUMP_BUFFER_TIME;
    }
  }

  private onKeyUp(e: KeyboardEvent): void {
    this.keysDown.delete(e.code);
  }

  update(dt: number): void {
    if (this.jumpBufferTimer > 0) {
      this.jumpBufferTimer -= dt;
    }
  }

  resetJumpPress(): void {
    this.jumpPressedThisFrame = false;
  }

  consumeJump(): boolean {
    if (this.jumpPressedThisFrame || this.jumpBufferTimer > 0) {
      this.jumpPressedThisFrame = false;
      this.jumpBufferTimer = 0;
      return true;
    }
    return false;
  }

  get left(): boolean {
    return this.keysDown.has("ArrowLeft");
  }

  get right(): boolean {
    return this.keysDown.has("ArrowRight");
  }

  get jumpHeld(): boolean {
    return this.keysDown.has("Space");
  }

  get spacePressed(): boolean {
    return this.jumpPressedThisFrame;
  }
}
