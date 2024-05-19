import { type Component, createApp } from 'vue';
import { createPinia } from 'pinia';
import './style.css';
import App from '@/App.vue';
import galaxy from '@/data/galaxy.json';
import { convertGalaxy } from './utils/GalaxyGenerator/GalaxyJsonHandlers';

const pinia = createPinia();
const app = createApp(App as Component).use(pinia);

app.provide('$galaxy', convertGalaxy(galaxy));
app.mount('#app');
