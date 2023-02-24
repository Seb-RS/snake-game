<template>
  <div class="tri-state-toggle border-[3px] border-solid duration-700" :class="themeColor === 0 ? 'border-green-500' : themeColor === 1 ? ' border-white' : 'border-black'"
  >
    <input
      class="button"
      type="radio"
      name="toggle"
      :style="(themeColor === 0) ? 'opacity: 1;' : ''"
      :class="themeColor === 0 ? 'bg-green-500' : themeColor === 1 ? ' bg-white' : 'bg-black'"
    />
    <input
      class="button"
      type="radio"
      name="toggle"
      :style="(themeColor === 1) ? 'opacity: 1;' : ''"
      :class="themeColor === 0 ? 'bg-green-500' : themeColor === 1 ? ' bg-white' : 'bg-black'"
    />
    <input
      class="button"
      type="radio"
      name="toggle"
      :style="(themeColor === 2) ? 'opacity: 1;' : ''"
      :class="themeColor === 0 ? 'bg-green-500' : themeColor === 1 ? ' bg-white' : 'bg-black'"
    />
  </div>
</template>

<script>
export default {
  props: {
    themeColor: Number,
  },
  mounted() {
    var buttons = document.getElementsByClassName("button");
    var arr = [...buttons];

    arr.forEach((element, index) => {
      element.addEventListener("click", () => {
        element.style.opacity = "1";
        if (index == 0) {
          this.setThemeColor(0);
        } else if (index == 1) {
          this.setThemeColor(1);
        } else {
          this.setThemeColor(2);
        }
        arr
          .filter(function (item) {
            return item != element;
          })
          .forEach((item) => {
            item.style.opacity = "0";
          });
      });
    });
  },
  methods: {
    setThemeColor(data) {
      this.$emit("setThemeColor", data);
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
input {
  height: 10px;
  width: 10px;
  appearance: none;
  border-radius: 50%;
  opacity: 0;
}
input:hover {
  cursor: pointer;
}
.tri-state-toggle {
  display: flex;
  justify-content: center;
  border-radius: 50px;
  width: 30px;
}
#one {
  opacity: 1;
}
</style>
