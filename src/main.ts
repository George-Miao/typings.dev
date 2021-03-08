import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/style/index.less'
import '@/style/themes.less'
import './registerServiceWorker'

createApp(App)
  .use(router)
  .mount('#app')
