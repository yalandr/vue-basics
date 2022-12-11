import { createApp } from 'vue';
import App from './App.vue';
import uiComponents from '@/components/UI';

import './assets/main.css';

const app = createApp(App);

uiComponents.forEach(uiComponent => {
    app.component(uiComponent.name, uiComponent);
})

app.mount('#app');
