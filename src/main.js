import { createApp, withDirectives } from 'vue';
import App from './App.vue';
import uiComponents from '@/components/UI';
import router from '@/router/router';
import directives from '@/directives';

import './assets/main.css';

const app = createApp(App);

uiComponents.forEach(uiComponent => {
    app.component(uiComponent.name, uiComponent);
})

directives.forEach((directive) => {
    app.directive(directive.name, directive)
})

app.use(router).mount('#app');
