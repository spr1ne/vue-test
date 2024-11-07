import './class-components-hooks';
import pinia       from '@/store/init';
import Vue         from 'vue';
import VueSuspense from 'vue2-suspense';
import Fragment from 'vue-fragment';
import App         from './App.vue';
import router      from './router';

Vue.use(Fragment.Plugin);
Vue.use(VueSuspense);
Vue.config.productionTip = false;
// eslint-disable-next-line no-console
Vue.prototype.$log = console.log;

new Vue({
  router,
  render: (h) => h(App),
  pinia,
}).$mount('#app');
