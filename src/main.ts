import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import '@/style/themes/white.less'

createApp(App)
  .use(router)
  .mount('#app')
