import { createSSRApp } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { createPinia } from 'pinia';
import App from './App.vue';

export async function render(url) {
  const app = createSSRApp(App);
  const pinia = createPinia();
  app.use(pinia);

  console.log('Rendering for URL:' + url);
  const html = await renderToString(app);

  return {
    html,
  };
}
