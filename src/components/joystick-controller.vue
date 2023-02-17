<template>
  <div class="flex items-center justify-center w-full h-full mb-4">
    <div class="grid grid-cols-3">
      <div class="w-10 h-10"></div>
      <div @click="keyPressed('up')"
        class="flex justify-center items-center w-10 h-10 rounded-lg border-4 border-green-800 text-green-800 hover:border-green-900 hover:text-green-900"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="1.5"
            d="M12 18H9.33c-3.31 0-4.67-2.35-3.01-5.22l1.34-2.31L9 8.16c1.66-2.87 4.37-2.87 6.03 0l1.34 2.31 1.34 2.31c1.66 2.87.3 5.22-3.01 5.22H12Z"
          />
        </svg>
      </div>
      <div class="w-10 h-10"></div>

      <div @click="keyPressed('left')"
        class="flex justify-center items-center w-10 h-10 rounded-lg border-4 border-green-800 text-green-800 hover:border-green-900 hover:text-green-900"
      >
        <svg class="-rotate-90"
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="1.5"
            d="M12 18H9.33c-3.31 0-4.67-2.35-3.01-5.22l1.34-2.31L9 8.16c1.66-2.87 4.37-2.87 6.03 0l1.34 2.31 1.34 2.31c1.66 2.87.3 5.22-3.01 5.22H12Z"
          />
        </svg>
      </div>
      <div class="w-10 h-10"></div>
      <div @click="keyPressed('right')"
        class="flex justify-center items-center w-10 h-10 rounded-lg border-4 border-green-800 text-green-800 hover:border-green-900 hover:text-green-900"
      >
        <svg class="rotate-90"
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="1.5"
            d="M12 18H9.33c-3.31 0-4.67-2.35-3.01-5.22l1.34-2.31L9 8.16c1.66-2.87 4.37-2.87 6.03 0l1.34 2.31 1.34 2.31c1.66 2.87.3 5.22-3.01 5.22H12Z"
          />
        </svg>
      </div>

      <div class="w-10 h-10"></div>
      <div @click="keyPressed('down')"
        class="flex justify-center items-center w-10 h-10 rounded-lg border-4 border-green-800 text-green-800 hover:border-green-900 hover:text-green-900"
      >
        <svg class="rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-miterlimit="10"
            stroke-width="1.5"
            d="M12 18H9.33c-3.31 0-4.67-2.35-3.01-5.22l1.34-2.31L9 8.16c1.66-2.87 4.37-2.87 6.03 0l1.34 2.31 1.34 2.31c1.66 2.87.3 5.22-3.01 5.22H12Z"
          />
        </svg>
      </div>
      <div class="w-10 h-10"></div>
    </div>
  </div>
</template>

<script>
export default {
    methods: {
        keyPressed(key)
        {  
            this.$emit('keyPressed', key)
        }
    },
}
</script>