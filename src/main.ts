import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import store from './stores'
import App from './App.vue'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

library.add(faMagnifyingGlass)
const app = createApp(App)
app.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAP_API_KEY,
    v: '3.51',
    language: 'en',
    libraries: 'places'
  }
})
app.use(store)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
