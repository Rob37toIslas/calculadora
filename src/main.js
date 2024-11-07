import { createApp } from 'vue';
import App from './App.vue';

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaFlag, RiZhihuFill ,PxDelete } from "oh-vue-icons/icons";
import './registerServiceWorker'

// Registrar el Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registrado con éxito:', registration);
        })
        .catch((error) => {
          console.log('Error al registrar el Service Worker:', error);
        });
    });
  }

addIcons(FaFlag, RiZhihuFill,PxDelete);

const app = createApp(App);
app.component("v-icon", OhVueIcon);
app.mount("#app");