<template>
  <div
    :class="bgThemeEffect"
    class="h-screen flex flex-col w-full items-center justify-center"
  >
    <form
      v-if="!effect"
      @submit.prevent="submitForm"
      :class="effect ? 'invisible' : ''"
      v-motion
      :initial="{ opacity: 0, x: 100 }"
      :enter="{ opacity: 1, x: 0, scale: 1 }"
      :delay="200"
    >
      <input
        v-model="username"
        maxlength="15"
        type="text"
        :class="
          themeColor === 0
            ? 'text-green-500 placeholder-green-800'
            : themeColor === 1
            ? ' text-black placeholder-gray-900'
            : 'text-white placeholder-gray-100'
        "
        class="w-full bg-transparent h-full rounded py-2 px-3 text-3xl md:text-5xl lg:text-8xl text-center font-bold"
        placeholder="Enter your name"
      />
    </form>
    <transition class="h-full w-full">
      <div
        v-if="effect"
        :class="
          themeColor === 0
            ? 'text-black'
            : themeColor === 1
            ? ' text-white'
            : 'text-black '
        "
        class="flex flex-col w-full h-full justify-center items-center text-3xl md:text-5xl lg:text-8xl text-center font-bold"
      >
        <h1>Welcome{{ registred ? " back" : "" }}</h1>
        <span class="flex">
          <p
            v-motion
            :initial="{ opacity: 0, x: 100 }"
            :enter="{ opacity: 1, x: 0, scale: 1 }"
            :delay="registred? 700 : 200"
          >
            {{ username }}
          </p>
          <p
            v-motion
            :initial="{ opacity: 0, x: 100 }"
            :enter="{ opacity: 1, x: 0, scale: 1 }"
            :delay="registred? 900:400"
            class="ml-2 md:ml-4 lg:ml-7"
          >
            :)
          </p>
        </span>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    themeColor: Number,
  },
  data() {
    return {
      username: null,
      effect: false,
      registred: false,
    };
  },
  mounted() {
    this.effect = false;
    this.registred = false;
    if (localStorage.username) {
      this.username = localStorage.username;
      this.$emit("setUsername", this.username);
      this.effect = true;
      this.registred = true;
    }
  },
  computed: {
    bgThemeEffect() {
      if (this.themeColor == 0) return this.effect ? "bg-green-500" : "bg-black";
      else if (this.themeColor == 1) return this.effect ? "bg-black" : "bg-white";
      else return this.effect ? "bg-white" : "bg-black";
    },
  },
  methods: {
    submitForm() {
      if (this.empty(this.username)) return;

      localStorage.username = this.username;
      this.$emit("setUsername", this.username);
      this.effect = true;
    },
    empty(str) {
      return str.length === 0;
    },
  },
};
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 1.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

input:focus {
  outline: none;
}
</style>
