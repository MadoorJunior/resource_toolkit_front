import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index.js";
import 'tw-elements';
import Notifications from '@kyvg/vue3-notification'
const app=createApp(App)
app.use(router);
app.use(Notifications)
app.mount('#app')
