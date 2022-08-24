import {createPinia} from 'pinia'
import type {App} from "vue";
import piniaPersist from 'pinia-plugin-persist'

const store = createPinia();
store.use(piniaPersist)

export function setupStore(app: App<Element>) {
  app.use(store);
}

export default store;