<template>
  <div
    class="slidebar fixed top-0 left-0 h-full w-[80%] lg:w-1/3 shadow-md transform ease-in-out duration-300"
    :class="{
      '-translate-x-full': !showSlidebar,
      'translate-x-0': showSlidebar,
    }"
  >
    <div :class="bgTheme" class="w-full h-full duration-1000 px-4">
      <div class="flex justify-between w-full py-4">
        <p class="font-bold text-lg">Settings</p>
        <button @click="$emit('close')">
          <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <path
              fill="currentColor"
              stroke="currentColor"
              d="m14.41 3.27-.82-.94L8 7.17 2.41 2.33l-.82.94L7.05 8l-5.46 4.73.82.94L8 8.83l5.59 4.84.82-.94L8.95 8l5.46-4.73z"
            />
          </svg>
        </button>
      </div>
      <button
        @click="setGame()"
        :class="divTheme"
        class="rounded-md w-full py-2 border mb-2 text-left pl-2 duration-150"
      >
        Set username
      </button>
      <div :class="divTheme" class="rounded-md w-full py-2 border pl-2 duration-150">
        <p>Set color theme</p>
        <triple-radio-button
          :themeColor="themeColor"
          @setThemeColor="setThemeColor($event)"
        ></triple-radio-button>
      </div>
    </div>
  </div>
</template>

<script>
import tripleRadioButton from "./triple-radio-button.vue";

export default {
  props: {
    showSlidebar: Boolean,
    themeColor: Number,
  },
  components: {
    tripleRadioButton,
  },
  methods: {
    setGame() {
      localStorage.removeItem("username");
      this.$emit("state");
    },
    setThemeColor(data) {
      this.$emit("setThemeColor", data);
    },
  },
  computed: {
    bgTheme() {
      return this.themeColor === 0
        ? "bg-gray-900 border-r border-green-500 text-green-500"
        : this.themeColor === 1
        ? "bg-gray-900 border-r border-gray-500 text-white"
        : "bg-gray-100 border-r border-gray-200 text-black";
    },
    divTheme() {
      return this.themeColor === 0
        ? "border-green-500 hover:border-green-400 hover:text-green-400 hover:bg-black cursor-pointer"
        : this.themeColor === 1
        ? "border-gray-500 hover:border-gray-100 hover:text-gray-100 hover:bg-black cursor-pointer"
        : "border-gray-200 hover:border-gray-800 hover:text-gray-800 hover:bg-white cursor-pointer";
    },
  },
};
</script>

<style>
.slidebar {
  position: fixed;
  top: 0;
  left: -300px;
  width: 300px;
  height: 100%;
  background-color: #fff;
  transition: transform 0.3s ease-in-out;
}

.slidebar.active {
  transform: translateX(300px);
}

.slidebar-content {
  padding: 20px;
}
</style>
