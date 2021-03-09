import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/style/index.less'
import '@/style/themes.less'
import './registerServiceWorker'

const asciiArt = `
 _____             _                      _            
/__   \\_   _ _ __ (_)_ __   __ _ ___   __| | _____   __
  / /\\| | | | '_ \\| | '_ \\ / _\` / __| / _\` |/ _ \\ \\ / /
 / /  | |_| | |_) | | | | | (_| \\__ \\| (_| |  __/\\ V / 
 \\/    \\__, | .__/|_|_| |_|\\__, |___(_\\__,_|\\___| \\_/  
       |___/|_|            |___/    

       `

console.log(asciiArt)

createApp(App)
  .use(router)
  .mount('#app')
