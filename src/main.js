import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import PrimeVue from "@/plugins/primeVue.js";
import { token, default as axios } from "./plugins/axios";
import useVuelidate from "@vuelidate/core";
import AuthValidation from "./middleware/AuthValidation";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

const app = createApp(App);
app
  .use(store)
  .use(PrimeVue)
  .use(axios);

store.dispatch("validarToken", token).then(() => {
  app.use(router);
  app.use(AuthValidation);
});

router.isReady().then(() => {
  app.mount("#app");
});
