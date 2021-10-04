const axios = require("axios");
axios.defaults.baseURL = "https://orangetest.apping.com.co/api";

export const setToken = (token) =>
  (axios.defaults.headers.common["Authorization"] = token);

//Agregar token por defecto
export const token =
  "token" in localStorage ? localStorage.getItem("token") : null;
if (token) setToken(token);

export default {
  install(app) {
    app.config.globalProperties.$axios = axios;
    app.config.globalProperties.$store.$axios = axios;
  },
};
