import { createApp } from 'vue';
import './style.css';
import { createPinia } from 'pinia';
import App from './App.vue';

const app = createApp(App);
const pinia = createPinia(); // Create a Pinia instance
app.use(pinia); // Use Pinia in the app
app.mount('#app'); // Mount the app
