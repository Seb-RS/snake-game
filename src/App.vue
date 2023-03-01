<template>
  <div class="flex items-center w-screen h-screen overflow-x-hidden">
    <enterName
      v-if="!gameMain && vLoader"
      @setUsername="setUsername($event)"
      :themeColor="themeColor"
    ></enterName>
    <game-base
      v-if="gameMain"
      :username="username"
      :themeColor="themeColor"
      @openSlidebar="showSlidebar = true"
      :joystickSize="joystickSize"
      :isTouchDevice="isTouchDevice"
    ></game-base>
    <slide-menu
      v-if="vLoader"
      :showSlidebar="showSlidebar"
      @close="showSlidebar = false"
      @state="setGame"
      @setThemeColor="setThemeColor($event)"
      @setJoystickSize="setJoystickSize($event)"
      :themeColor="themeColor"
      :isTouchDevice="isTouchDevice"
    ></slide-menu>
  </div>
</template>

<script>
import enterName from "./components/enter-name.vue";
import gameBase from "./components/game-base.vue";
import slideMenu from "./components/slide-menu.vue";

export default {
  components: {
    enterName,
    gameBase,
    slideMenu,
  },
  data() {
    return {
      username: null,
      gameMain: false,
      themeColor: 0, //0 = Mátrix, 1 = Dark, 2 = Light
      showSlidebar: false,
      joystickSize: null,
      vLoader: false,
    };
  },
  mounted() {
    if ("ontouchstart" in window) {
      this.isTouchDevice = true;
    } else {
      this.isTouchDevice = false;
    }

    if (localStorage.themeColor) this.themeColor = Number(localStorage.themeColor);
    else this.themeColor = 0;
    this.vLoader = true;
  },
  methods: {
    setUsername(value) {
      if (value != null) {
        this.username = value;
        setTimeout(() => {
          this.gameMain = true;
        }, 2000);
      }
    },
    setGame() {
      this.gameMain = false;
      this.showSlidebar = false;
    },
    setThemeColor(data) {
      this.themeColor = data;

      localStorage.themeColor = this.themeColor;
    },
    setJoystickSize(data) {
      this.joystickSize = data;
    },
  },
  watch: {
    joystickSize(newVal) {
      localStorage.joystickSize = newVal;
    },
  },
};
</script>

<style>
@font-face {
  font-family: "EXEPixelPerfect";
  src: local("EXEPixelPerfect"),
    url("@/assets/fonts/EXEPixelPerfect.ttf") format("truetype");
}

body {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-family: "EXEPixelPerfect", Helvetica, Arial;
}

* {
  outline: 0;
}
</style>
