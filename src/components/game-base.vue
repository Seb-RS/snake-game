<template>
  <div :class="smallWindow() ? 'p-8' : 'p12'"
    class="flex flex-col justify-center items-center bg-black w-screen h-screen p-12 text-green-500 overflow-x-hidden"
  >
    <div
      class="flex flex-col mx-auto"
      v-motion
      :initial="{ opacity: 0, y: 100 }"
      :enter="{ opacity: 1, y: 0, scale: 1 }"
      :delay="200"
    >
      <div class="flex-col w-full h-max justify-start items-center mb-1">
        <p>Time: {{ formatTime(time) }}</p>
        <p>Score: {{ score }}</p>
      </div>
      <div class="relative w-full h-full">
        <canvas
          class="border border-green-500 m-auto block shadow-green-500 shadow-md"
          ref="canvas"
          :width="smallWindow() ? '220' : '300' "
          :height="smallWindow() ? '220' : '300' "
        ></canvas>
        <div
          class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-40 h-20"
        >
          <div class="flex flex-col justify-center items-center">
            <h1
              :class="!isPlaying && gameOver ? 'visible' : 'invisible'"
              class="text-lg font-bold text-[#dc3545] mt-4"
            >
              GAME OVER
            </h1>
            <button
              class=""
              v-if="!isPlaying"
              id="start-game"
              @click="startGame"
              :disabled="isPlaying"
            >
              {{ gameOver ? "Restart Game" : "Start Game" }}
            </button>
          </div>
        </div>
      </div>
      <div
        class="flex flex-col w-full justify-center items-start mt-2 text-center text-green-700 font-extralight"
      >
        <p>Use the arrow keys to move the snake.</p>
        <p>Don't run into the walls or yourself!</p>
        <div
          class="flex flex-col justify-start items-start w-full h-32 overflow-y-auto font-normal"
        >
          <div v-if="records.length > 0" class="decoration-slice decoration-slate-400">
            <h1 class="text-md font-bold">Récords</h1>
          </div>
          <transition-group name="list" tag="ul">
            <li v-for="(record, index) in sortedRecords()" :key="index">
              <p class="text-start">{{ record.name }} - {{ record.score }} point/s in ({{ record.time }}s)</p>
            </li>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    username: String,
  },
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
      gridSize: 7,
      cellCountX: 0,
      cellCountY: 0,
      time: 0.0,
      records: [],
      windowWidth: window.innerWidth,
      loaded: false
    };
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)

    if(this.windowWidth < 300 )
    this.gridSize = 11
    else
    this.gridSize = 15

    this.context = this.$refs.canvas.getContext("2d");
    this.cellCountX = this.$refs.canvas.width / this.gridSize;
    this.cellCountY = this.$refs.canvas.height / this.gridSize;
    this.startTimer();
    this.loaded=true
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
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
    sortedRecords() {
      return this.records.sort((a, b) => b.score - a.score);
    },
    smallWindow(){
      return this.windowWidth < 300 ? true : false;
    },
    startTimer() {
      setInterval(() => {
        if (!this.isPlaying) return;
        this.time += 0.1;
      }, 100);
    },
    startGame() {
      this.isPlaying = true;
      this.snake = [{ x: 10, y: 10 }];
      this.clearData();
      this.generateFood();
    },
    stopGame() {
      this.isPlaying = false;
      this.gameOver = true;
      this.addRecord(this.username, this.time, this.score);
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
    handleResize() {
      this.windowWidth = window.innerWidth
    },
    formatTime(seconds) {
      return parseFloat(seconds.toFixed(2));
    },
    clearData() {
      this.score = 0;
      this.time = 0;
    },
    addRecord() {
      this.records.push({
        name: this.username,
        time: this.formatTime(this.time),
        score: this.score,
      });
    },
  },
};
</script>

<style>
::-webkit-scrollbar {
  width: 6px;
  background-color: #000000;
  border-radius: 10px;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(193, 193, 193, 0.3);
}

::-webkit-scrollbar-thumb {
  margin: auto;
  width: 6px;
  border-radius: 10px;
  background-color: rgb(34 197 94 / 1);
  -webkit-box-shadow: inset 0 0 6px rgba(57, 56, 56, 0.878);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.list-enter-to,
.list-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
