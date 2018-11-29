import Login from './components/login/index.vue';
import FileMonitor from './components/file-monitor/index.vue';

export const routes = [
  { path: '', component: Login },
  { path: '/login', component: Login },
  { path: '/file-monitor', component: FileMonitor, meta: { requiresAuth: true } }
];


