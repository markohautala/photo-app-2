import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import '@mdi/font/css/materialdesignicons.css'
import naive from 'naive-ui';
import 'vuetify/styles'
import router from './router';  // Import the router
import { createPinia } from 'pinia';

const app = createApp(App)
app.use(createPinia());
app.use(vuetify)
app.use(router);  // Use the router
app.use(naive);
app.mount('#app')