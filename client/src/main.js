import Vue from 'vue'
import App from './App.vue'
import { store } from './store/store'
import VueRouter from 'vue-router';
import { routes } from './routes';
import moment from 'vue-moment';

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

// Add all icons to the library so you can use it in your page
library.add(fas, far, fab);

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(moment);

const router = new VueRouter({
  routes,
  mode: 'history'
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.username !== '') {
      next({
        query: {redirect: to.fullPath}
      })
    } else {
      next({path: './login'})
    }
  } else {
    next({})
  }
});

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
