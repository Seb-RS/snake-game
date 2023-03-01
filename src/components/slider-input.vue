<template>
  <div
    class="slider"
    ref="slider"
    @mousedown="startDrag"
    @touchstart="startDrag"
    @click="setHandlePosition"
  >
    <div class="slider-track"></div>
    <div class="slider-progress" :style="{ width: handlePosition + '%' }"></div>
    <div
      class="slider-handle"
      ref="handle"
      :style="{ left: handlePosition + '%' }"
      @mousedown.prevent
    ></div>
    <p>
      {{ handlePosition }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    min: {
      type: Number,
      default: 20,
    },
    max: {
      type: Number,
      default: 50,
    },
  },
  data() {
    return {
      isDragging: false,
      startPosition: 0,
      handlePosition: 0,
      sliderWidth: 0,
      handleWidth: 0,
      initVal: 33,
    };
  },
  mounted() {
    this.sliderWidth = this.$refs.slider.clientWidth;
    this.handleWidth = this.$refs.handle.clientWidth;

    this.updateHandlePosition(this.initVal);
  },
  methods: {
    startDrag(event) {
      this.isDragging = true;
      this.startPosition = this.getMousePosition(event);
      document.addEventListener("mousemove", this.drag);
      document.addEventListener("touchmove", this.drag);
      document.addEventListener("mouseup", this.stopDrag);
      document.addEventListener("touchend", this.stopDrag);
    },
    stopDrag() {
      this.isDragging = false;
      document.removeEventListener("mousemove", this.drag);
      document.removeEventListener("touchmove", this.drag);
      document.removeEventListener("mouseup", this.stopDrag);
      document.removeEventListener("touchend", this.stopDrag);
    },
    drag(event) {
      if (this.isDragging) {
        const newPosition = this.getMousePosition(event);
        const delta = newPosition - this.startPosition;
        const sliderWidth = this.$refs.slider.clientWidth;
        const handlePosition = (this.handlePosition / 100) * sliderWidth;
        let newPositionPercentage = ((handlePosition + delta) / sliderWidth) * 100;

        if (handlePosition + delta < 0) {
          newPositionPercentage = 0;
        } else if (handlePosition + delta > sliderWidth - this.handleWidth) {
          newPositionPercentage = ((sliderWidth - this.handleWidth) / sliderWidth) * 100;
        }

        this.updateHandlePosition(newPositionPercentage);
        this.startPosition = newPosition;

        const newValue = Math.round(
          (newPositionPercentage / 100) * (this.max - this.min) + this.min
        );

        if (this.initVal !== newValue) {
          this.initVal = newValue;
          this.$emit("input", newValue);
        }
      }
    },
    updateHandlePosition(position) {
      if (position < 0) {
        position = 0;
      }
      if (position > 100) {
        position = 100;
      }
      this.handlePosition = position;
    },
    setHandlePosition(event) {
      const sliderWidth = this.$refs.slider.clientWidth;
      const handleWidth = this.$refs.handle.clientWidth;
      const handleOffset = this.$refs.handle.offsetLeft;
      const clickOffset = event.clientX - this.$refs.slider.getBoundingClientRect().left;
      const handleRight = handleOffset + handleWidth;
      const delta = clickOffset - handleRight;
      let newHandlePosition =
        ((handleOffset + delta) / (sliderWidth - handleWidth)) * 100;

      if (newHandlePosition < 0) {
        newHandlePosition = 0;
      } else if (newHandlePosition > 100) {
        newHandlePosition = 100;
      }

      const maxHandlePosition = ((sliderWidth - handleWidth) / sliderWidth) * 100;
      if (newHandlePosition > maxHandlePosition) {
        newHandlePosition = maxHandlePosition;
      }

      this.updateHandlePosition(newHandlePosition);

      const newValue = Math.round(
        (newHandlePosition / 100) * (this.max - this.min) + this.min
      );

      if (this.initVal !== newValue) {
        this.initVal = newValue;
        this.$emit("input", newValue);
      }
    },
    getMousePosition(event) {
      if (event.touches) {
        return event.touches[0].clientX;
      } else {
        return event.clientX;
      }
    },
  },
};
</script>

<style>
.slider {
  position: relative;
  width: 100%;
  height: 20px;
  background-color: #ddd;
  border-radius: 10px;
  cursor: pointer;
}

.slider-track {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  width: 100%;
  height: 5px;
  background-color: #666;
  border-radius: 3px;
}

.slider-progress {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  height: 5px;
  background-color: #000;
  border-radius: 3px;
}

.slider-handle {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  background-color: #fff;
  border: 1px solid #666;
  border-radius: 50%;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}
</style>
