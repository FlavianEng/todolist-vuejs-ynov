import './index.css';
import App from './App.vue';
import { createApp } from 'vue';
import router from './router';
import stores from '@/store';

const app = createApp(App);

app.use(router);

app.use(stores);

app.mount('#app');
