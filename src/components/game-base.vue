<template>
  <div class="matrix-style">
    <canvas ref="canvas" width="400" height="400"></canvas>
    <div id="score">Score: {{ score }}</div>
    <div class="info">
      <p>Use the arrow keys to move the snake.</p>
      <p>Don't run into the walls or yourself!</p>
    </div>
    <button v-if="!isPlaying" id="start-game" @click="startGame" :disabled="isPlaying">
      {{ gameOver ? "Restart Game" : "Start Game" }}
    </button>
    <h1 v-if="!isPlaying && gameOver" id="game-over">GAME OVER</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      context: null,
      snake: [{ x: 0, y: 0 }],
      direction: "right",
      canChangeDirection: true,
      gameOver: false,
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
      if (this.canChangeDirection && this.isPlaying) {
        switch (event.key) {
          case "ArrowUp":
            if (this.direction !== "down") {
              this.direction = "up";
            }
            break;
          case "ArrowDown":
            if (this.direction !== "up") {
              this.direction = "down";
            }
            break;
          case "ArrowLeft":
            if (this.direction !== "right") {
              this.direction = "left";
            }
            break;
          case "ArrowRight":
            if (this.direction !== "left") {
              this.direction = "right";
            }
            break;
        }
        this.canChangeDirection = false;
      }
    });

    setInterval(() => {
      if (!this.isPlaying) return;
      this.canChangeDirection = true;
      this.moveSnake();
    }, 200);
  },
  methods: {
    startGame() {
      this.isPlaying = true;
      this.snake = [{ x: 10, y: 10 }];
      this.score = 0;
      this.generateFood();
    },
    stopGame() {
      this.isPlaying = false;
      this.gameOver = true;
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
      this.context.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
      this.context.fillStyle = "green";
      for (let i = 0; i < this.snake.length; i++) {
        this.context.fillRect(
          this.snake[i].x * this.gridSize,
          this.snake[i].y * this.gridSize,
          this.gridSize,
          this.gridSize
        );
      }
      this.context.fillStyle = "red";
      this.context.fillRect(
        this.food.x * this.gridSize,
        this.food.y * this.gridSize,
        this.gridSize,
        this.gridSize
      );
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

#start-game {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#game-over {
  text-align: center;
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
  color: #dc3545;
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.matrix-style {
  background-color: #000;
  color: #0f0;
  font-size: 1rem;
  font-family: monospace;
}
</style>
