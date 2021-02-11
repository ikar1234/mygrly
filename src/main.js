import { createApp } from 'vue'
import App from '../client/App.vue'
import router from '../client/router/index'
import store from '../client/store/index'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)

// Vue.component('font-awesome-icon', FontAwesomeIcon)


import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import '@/../client/assets/styles/tailwind.css';

createApp(App).use(store).use(router).mount('#app')
