import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { MotionPlugin } from '@vueuse/motion'

createApp(App).use(MotionPlugin).mount('#app')
