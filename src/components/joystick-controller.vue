<template>
  <div class="flex items-center justify-center w-full h-full my-4">
    <div class="grid grid-cols-3 gap-1">
      <div :style="{ width: joystickResized, height: joystickResized }"></div>
      <div
        @click="keyPressed('up')"
        :class="
          themeColor === 0
            ? 'border-green-800 text-green-800 hover:border-green-900 hover:text-green-900'
            : themeColor === 1
            ? ' border-white text-white hover:border-gray-100 hover:text-gray-100'
            : 'border-gray-900 text-gray-900 hover:border-black hover:text-black'
        "
        :style="{ width: joystickResized, height: joystickResized }"
        class="flex justify-center items-center border-4 duration-1000 transition-colors"
      >
        <svg
          fill="currentColor"
          width="50"
          height="50"
          viewBox="0 0 22 22"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5 13V14H17V13H16V12H15V11H14V10H13V9H12V8H10V9H9V10H8V11H7V12H6V13" />
        </svg>
      </div>
      <div :style="{ width: joystickResized, height: joystickResized }"></div>

      <div
        @click="keyPressed('left')"
        :style="{ width: joystickResized, height: joystickResized }"
        :class="
          themeColor === 0
            ? 'border-green-800 text-green-800 hover:border-green-900 hover:text-green-900'
            : themeColor === 1
            ? ' border-white text-white hover:border-gray-100 hover:text-gray-100'
            : 'border-gray-900 text-gray-900 hover:border-black hover:text-black'
        "
        class="flex justify-center items-center w-10 h-10 border-4 duration-1000 transition-colors"
      >
        <svg
          class="-rotate-90"
          fill="currentColor"
          width="50"
          height="50"
          viewBox="0 0 22 22"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5 13V14H17V13H16V12H15V11H14V10H13V9H12V8H10V9H9V10H8V11H7V12H6V13" />
        </svg>
      </div>
      <div :style="{ width: joystickResized, height: joystickResized }"></div>
      <div
        :style="{ width: joystickResized, height: joystickResized }"
        @click="keyPressed('right')"
        :class="
          themeColor === 0
            ? 'border-green-800 text-green-800 hover:border-green-900 hover:text-green-900'
            : themeColor === 1
            ? ' border-white text-white hover:border-gray-100 hover:text-gray-100'
            : 'border-gray-900 text-gray-900 hover:border-black hover:text-black'
        "
        class="flex justify-center items-center w-10 h-10 border-4 duration-1000 transition-colors"
      >
        <svg
          class="rotate-90"
          fill="currentColor"
          width="50"
          height="50"
          viewBox="0 0 22 22"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5 13V14H17V13H16V12H15V11H14V10H13V9H12V8H10V9H9V10H8V11H7V12H6V13" />
        </svg>
      </div>

      <div :style="{ width: joystickResized, height: joystickResized }"></div>
      <div
        :style="{ width: joystickResized, height: joystickResized }"
        @click="keyPressed('down')"
        :class="
          themeColor === 0
            ? 'border-green-800 text-green-800 hover:border-green-900 hover:text-green-900'
            : themeColor === 1
            ? ' border-white text-white hover:border-gray-100 hover:text-gray-100'
            : 'border-gray-900 text-gray-900 hover:border-black hover:text-black'
        "
        class="flex justify-center items-center w-10 h-10 border-4 duration-1000 transition-colors"
      >
        <svg
          class="rotate-180"
          fill="currentColor"
          width="50"
          height="50"
          viewBox="0 0 22 22"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5 13V14H17V13H16V12H15V11H14V10H13V9H12V8H10V9H9V10H8V11H7V12H6V13" />
        </svg>
      </div>
      <div :style="{ width: joystickResized, height: joystickResized }"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    themeColor: Number,
    joystickSize: Number,
  },
  methods: {
    keyPressed(key) {
      this.$emit("keyPressed", key);
    },
  },
  computed: {
    joystickResized() {
      return `${this.joystickSize * 0.08}rem`;
    },
  },
  watch: {
    joystickSize() {},
  },
};
</script>
