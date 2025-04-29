import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import vue3GoogleLogin from 'vue3-google-login'


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(vue3GoogleLogin, {
  clientId: '565196005649-10j8cl7o055a3k1kfqd73cmgdiqm4ppv.apps.googleusercontent.com'
})

app.mount('#app')
