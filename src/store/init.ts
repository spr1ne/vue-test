import { createPinia, PiniaVuePlugin } from 'pinia';
import { createORM }                   from 'pinia-orm';
import piniaPluginPersistedstate       from 'pinia-plugin-persistedstate';
import Vue                             from 'vue';

Vue.use(PiniaVuePlugin);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
pinia.use(createORM());

export default pinia;
