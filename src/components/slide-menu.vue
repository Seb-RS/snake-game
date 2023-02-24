<template>
  <div
    class="slidebar fixed top-0 left-0 h-full bg-white w-1/3 shadow-md transform ease-in-out duration-300"
    :class="{ '-translate-x-full': !showSlidebar, 'translate-x-0': showSlidebar }"
  >
    <div class="p-4">
      <p>Este es el contenido del slidebar.</p>
      <button
        @click="$emit('close')"
        class="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Cerrar slidebar
      </button>
    </div>
  </div>
</template>

<script>
    export default {
        props:{
             showSlidebar: Boolean
        }
    }
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
