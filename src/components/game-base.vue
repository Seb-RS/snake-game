<template>
  <div class="matrix-style">
    <canvas ref="canvas" width="400" height="400"></canvas>
    <div id="score">Score: {{ score }}</div>
    <div class="info">
      <p>Use the arrow keys to move the snake.</p>
      <p>Don't run into the walls or yourself!</p>
    </div>
    <button @click="startGame" :disabled="isPlaying">Start Game</button>
    <button @click="stopGame" :disabled="!isPlaying">Stop Game</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      context: null,
      snake: [{ x: 10, y: 10 }],
      direction: "right",
      food: { x: 0, y: 0 },
      score: 0,
      gameLoop: null,
      isPlaying: false,
      gridSize: 15,
      cellCountX: 0,
      cellCountY: 0,
    };
  },
  mounted() {
    this.context = this.$refs.canvas.getContext("2d");
    this.cellCountX = this.$refs.canvas.width / this.gridSize;
    this.cellCountY = this.$refs.canvas.height / this.gridSize;
  },
  created() {
    if (this.isPlaying) this.direction = "right";

    document.addEventListener("keydown", (event) => {
      let newDirection;
      switch (event.key) {
        case "ArrowUp":
          newDirection = "up";
          break;
        case "ArrowDown":
          newDirection = "down";
          break;
        case "ArrowLeft":
          newDirection = "left";
          break;
        case "ArrowRight":
          newDirection = "right";
          break;
      }

      if (
        (newDirection === "up" && this.direction === "down") ||
        (newDirection === "down" && this.direction === "up") ||
        (newDirection === "left" && this.direction === "right") ||
        (newDirection === "right" && this.direction === "left") ||
        this.isPlaying == false
      ) {
        return;
      }

      this.direction = newDirection;
    });
  },
  methods: {
    startGame() {
      this.isPlaying = true;
      this.snake = [{ x: 10, y: 10 }];
      this.score = 0;
      this.generateFood();
      this.gameLoop = setInterval(this.moveSnake, 200);
    },
    stopGame() {
      this.isPlaying = false;
      clearInterval(this.gameLoop);
    },
    moveSnake() {
      let newHead = { x: this.snake[0].x, y: this.snake[0].y };
      switch (this.direction) {
        case "right":
          newHead.x++;
          break;
        case "left":
          newHead.x--;
          break;
        case "up":
          newHead.y--;
          break;
        case "down":
          newHead.y++;
          break;
      }
      if (this.checkCollision(newHead)) {
        this.stopGame();
        return;
      }
      this.snake.unshift(newHead);
      if (newHead.x === this.food.x && newHead.y === this.food.y) {
        this.generateFood();
        this.score++;
      } else {
        this.snake.pop();
      }
      this.drawCanvas();
    },
    generateFood() {
      let foodX, foodY;
      do {
        foodX = Math.floor(Math.random() * this.cellCountX);
        foodY = Math.floor(Math.random() * this.cellCountY);
      } while (this.snake.some((segment) => segment.x === foodX && segment.y === foodY));
      this.food = { x: foodX, y: foodY };
    },
    drawCanvas() {
      this.context.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height)
      this.context.fillStyle = 'green'
      for (let i = 0; i < this.snake.length; i++) {
        this.context.fillRect(
          this.snake[i].x * this.gridSize,
          this.snake[i].y * this.gridSize,
          this.gridSize,
          this.gridSize
        )
      }
      this.context.fillStyle = 'red'
      this.context.fillRect(
        this.food.x * this.gridSize,
        this.food.y * this.gridSize,
        this.gridSize,
        this.gridSize
      )
    },
    checkCollision(newHead) {
      if (
        newHead.x < 0 ||
        newHead.y < 0 ||
        newHead.x >= this.cellCountX ||
        newHead.y >= this.cellCountY
      ) {
        return true;
      }

      for (let i = 1; i < this.snake.length; i++) {
        if (newHead.x === this.snake[i].x && newHead.y === this.snake[i].y) {
          return true;
        }
      }
      return false;
    },
  },
};
</script>

<style>
canvas {
  border: 1px solid green;
  margin: 0 auto;
  display: block;
  box-shadow: 0 0 20px green;
}

#score {
  text-align: center;
  margin: 10px 0;
  font-size: 24px;
  font-weight: bold;
  color: green;
}

.info {
  margin: 10px 0;
  text-align: center;
  font-size: 16px;
  color: green;
}

#start-button {
  display: block;
  margin: 10px auto;
  padding: 10px 20px;
  background-color: #0f0;
  color: black;
  border: none;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 0 10px green, 0 0 20px green;
}

#game-over {
  text-align: center;
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #dc3545;
}

.matrix-style {
  background-color: #000;
  color: #0f0;
  font-size: 1rem;
  font-family: monospace;
}
</style>
