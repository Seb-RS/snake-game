<template>
  <div class="flex items-center w-screen h-screen">
    <enterName v-if="!gameMain" @setUsername="setUsername($event)"></enterName>
    <game-base
      v-else
      :username="username"
      @state="setGame($event)"
      @setThemeColor="setThemeColor($event)"
      :themeColor="themeColor"
    ></game-base>
  </div>
</template>

<script>
import enterName from "./components/enter-name.vue";
import gameBase from "./components/game-base.vue";
export default {
  components: {
    enterName,
    gameBase,
  },
  data() {
    return {
      username: null,
      gameMain: false,
      themeColor: 0, //0 = Mátrix, 1 = Dark, 2 = Light
    };
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
    },
    setThemeColor() {
      if (this.themeColor != 2) this.themeColor++;
      else this.themeColor = 0;
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
