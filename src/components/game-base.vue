<template>
  <div
    :class="
      themeColor === 0
        ? 'text-green-500 bg-black'
        : themeColor === 1
        ? ' bg-black text-white'
        : 'bg-white text-black'
    "
    class="min-w-full min-h-screen w-full flex items-center justify-center duration-1000 mt-4 md:mt-0"
  >
    <div
      :class="smallWindow() ? 'w-[220]' : 'w-[300px]'"
      class="flex items-center mx-auto h-screen"
    >
      <div
        class="mx-auto min-h-0 h-full md:h-max"
        v-motion
        :initial="{ opacity: 0, y: 100 }"
        :enter="{ opacity: 1, y: 0, scale: 1 }"
        :delay="200"
      >
        <div class="flex w-full h-max justify-between items-center mb-1">
          <div class="flex-col">
            <p>Time: {{ formatTime(time) }}</p>
            <p>Score: {{ score }}</p>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xml:space="preserve"
            id="_x32_"
            version="1.1"
            viewBox="0 0 512 512"
            class="icon flat-color cursor-pointer h-4 w-4 duration-700 hover:rotate-180"
            @click="$emit('openSlidebar')"
            :class="
              themeColor === 0
                ? 'fill-green-500 hover:fill-green-600'
                : themeColor === 1
                ? ' fill-white hover:fill-gray-100'
                : 'fill-black hover:fill-gray-800'
            "
          >
          <path d="M0 16h512v96H0zM0 208h512v96H0zM0 400h512v96H0z"/>
          </svg>
        </div>
        <div class="relative w-full">
          <canvas
            :class="
              themeColor === 0
                ? 'border-green-500 shadow-green-500'
                : themeColor === 1
                ? 'border-white shadow-white'
                : 'border-black shadow-black'
            "
            class="border m-auto block shadow-md duration-1000"
            ref="canvas"
            :width="smallWindow() ? '220' : '300'"
            :height="smallWindow() ? '220' : '300'"
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
                {{ buttonMessage }}
              </button>
            </div>
          </div>
        </div>
        <div class="flex flex-col h-max w-full">
          <joystick-controller :joystickSize="joystickSize"
            :themeColor="themeColor"
            v-if="isTouchDevice"
            @keyPressed="keyPressed($event)"
          ></joystick-controller>
          <p class="mt-1">Use the arrow keys to move the snake.</p>
          <p>Don't run into the walls or yourself!</p>
          <div
            :class="records.length > 0 ? 'visible' : 'invisible'"
            class="flex flex-col justify-start items-start w-full h-32 overflow-y-auto font-normal"
          >
            <h1 class="text-md font-bold">Top 5</h1>
            <ul class="text-xs">
              <li v-for="(record, index) in sortedRecords()" :key="index">
                <span
                  class="flex text-start"
                  :title="`${calculateTimePerScore(
                    record.score,
                    record.time
                  )}s per point`"
                >
                  <p class="font-bold w-5">{{ numberToOrdinal(index + 1) }}.</p>
                  {{ record.name }} - {{ record.score }} point/s in ({{ record.time }}s)
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import joystickController from "./joystick-controller.vue";

export default {
  props: {
    username: String,
    themeColor: Number,
    joystickSize: Number,
    isTouchDevice: Boolean,
  },
  components: {
    joystickController,
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
      loaded: false,
    };
  },
  mounted() {
    this.records = [];

    if (localStorage.records) {
      this.records = JSON.parse(localStorage.records);
    }

    window.addEventListener("resize", this.handleResize);

    if (this.windowWidth < 300) this.gridSize = 11;
    else this.gridSize = 15;

    this.context = this.$refs.canvas.getContext("2d");
    this.cellCountX = this.$refs.canvas.width / this.gridSize;
    this.cellCountY = this.$refs.canvas.height / this.gridSize;
    this.startTimer();
    this.loaded = true;
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
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
  computed: {
    buttonMessage() {
      if (this.gameOver) {
        return "Restart Game";
      } else {
        return this.isTouchDevice ? "Tap to start" : "Start Game";
      }
    },
  },
  methods: {
    sortedRecords() {
      if (this.records != null)
        return this.records.sort((a, b) => {
          if (a.score !== b.score) {
            return b.score - a.score;
          }

          return a.time - b.time;
        });
    },
    smallWindow() {
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
      if (this.themeColor == 0) this.context.fillStyle = "green";
      else if (this.themeColor == 1) this.context.fillStyle = "white";
      else this.context.fillStyle = "black";

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
      this.windowWidth = window.innerWidth;
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

      this.records.sort((a, b) => {
        if (a.score !== b.score) {
          return b.score - a.score;
        }

        return a.time - b.time;
      });

      var newRecord = this.records[this.records.length - 1];
      if (this.records.indexOf(newRecord) >= 5) {
        this.records.pop();
      }

      localStorage.records = JSON.stringify(this.records);
    },
    numberToOrdinal(n) {
      if (isNaN(n) || !isFinite(n)) {
        return "";
      }

      const suffixes = ["th", "st", "nd", "rd"];
      const suffix = n % 100;

      return `${n}${suffixes[(suffix - 20) % 10] || suffixes[suffix] || suffixes[0]}`;
    },
    calculateTimePerScore(score, time) {
      const timePerScore = this.formatTime(time / score);
      return timePerScore;
    },
    keyPressed(data) {
      var direction = data;
      if (this.canChangeDirection && this.isPlaying) {
        if (direction == "up") {
          if (this.direction !== "down") {
            this.direction = "up";
          }
        }
        if (direction == "down") {
          if (this.direction !== "up") {
            this.direction = "down";
          }
        }
        if (direction == "left") {
          if (this.direction !== "right") {
            this.direction = "left";
          }
        }

        if (direction == "right") {
          if (this.direction !== "left") {
            this.direction = "right";
          }
        }
        this.canChangeDirection = false;
      }
    },
    openSlidebar() {
      this.showSlidebar = true;
    },
    closeSlidebar() {
      this.showSlidebar = false;
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
</style>
