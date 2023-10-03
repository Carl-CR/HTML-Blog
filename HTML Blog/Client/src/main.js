import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'

import { createPinia } from 'pinia';
import '@fortawesome/fontawesome-free/css/all.css';

// Bulma Import
require('@/assets/main.scss');

const pinia = createPinia()
createApp(App).use(router).use(pinia).mount('#app')
