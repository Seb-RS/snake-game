<template>
  <div>
    <enterName v-if="!gameMain" @setUsername="setUsername($event)"></enterName>
    <game-base v-else :username="username"></game-base>
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
        setInterval(() => {
          this.gameMain = true;
        }, 2000);
      }
    },
  },
};
</script>