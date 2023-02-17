<template>
  <div>
    <enterName v-if="!gameMain" @setUsername="setUsername($event)"></enterName>
    <game-base v-else :username="username" @state="setGame($event)"></game-base>
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
  },
};
</script>

<style>
body {
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.fonted {
  font-family: "Nunito", sans-serif;
}
</style>
