import { Snake } from "./snake.js";
import { Food } from "./food.js";
import { Grid } from "./grid.js";

export class SnakeGame {
  constructor({ board, grid, gridSize, snakeSpeed }) {
    this.board = board;
    this.gridEl = grid;
    this.gridSize = gridSize;
    this.snakeSpeed = snakeSpeed;
  }

  start() {
    this.grid = new Grid(this.gridSize);
    this.snake = new Snake();
    this.snake.init(this.grid.getRandomPosition());
    this.food = new Food();

    this.initBoard();
    this.resetFoodPosition();

    this.gameOver = false;
    this.lastRenderTime = Date.now();
    this.requestId = window.requestAnimationFrame(() => this.run());

    this.eventHandler = this.onKeydown.bind(this);
    document.addEventListener("keydown", this.eventHandler);
  }

  stop() {
    window.cancelAnimationFrame(this.requestId);
    document.removeEventListener("keydown", this.eventHandler);
  }

  restart() {
    this.stop();
    this.start();
  }

  run() {
    if (this.gameOver) {
      this.stop();
      return;
    }

    this.requestId = window.requestAnimationFrame(() => this.run());

    const currentTime = Date.now();

    if ((currentTime - this.lastRenderTime) / 1000 < 1 / this.snakeSpeed) {
      return;
    }

    this.lastRenderTime = currentTime;

    this.checkFailure();
    this.checkEat();

    this.board.innerHTML = "";
    this.snake.update();
    this.snake.render(this.board);

    this.food.update();
    this.food.render(this.board);
  }

  initBoard() {
    this.board.style.setProperty("--grid-size", this.gridSize);

    this.gridEl.innerHTML = [...Array(this.gridSize * this.gridSize)]
      .map(() => '<div class="grid-item"></div>')
      .join("");
  }

  resetFoodPosition() {
    let newPosition;
    while (!newPosition || this.snake.onBody(newPosition)) {
      newPosition = this.grid.getRandomPosition();
    }
    this.food.setPosition(newPosition);
  }

  checkEat() {
    if (this.snake.onHit(this.food.position)) {
      this.resetFoodPosition();
      this.snake.grow();
    }
  }

  checkFailure() {
    const isOutsideOfGrid = this.grid.isOutside(this.snake.getHead());
    const isSnakeHitItself = this.snake.onHitSelf();

    if (isOutsideOfGrid || isSnakeHitItself) {
      this.gameOver = true;
      if (confirm("Game Over! Click OK to restart")) {
        this.restart();
      } else {
        this.stop();
      }
    }
  }

  onKeydown(event) {
    switch (event.key) {
      case "ArrowUp":
        this.snake.moveUp();
        break;
      case "ArrowDown":
        this.snake.moveDown();
        break;
      case "ArrowLeft":
        this.snake.moveLeft();
        break;
      case "ArrowRight":
        this.snake.moveRight();
        break;
      case "Enter":
        this.snake.moveRight();
        break;
    }
  }
}
