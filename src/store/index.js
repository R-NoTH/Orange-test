import { createStore } from "vuex";
import { setToken } from "../plugins/axios";

import * as embalaje from "./modules/embalaje";

export default createStore({
  state: {
    user: null,
    modulos: [],
    estados: [
      { id: 0, descripcion: "Inhabilitado" },
      { id: 1, descripcion: "Habilitado" },
    ],
  },

  getters: {
    hashEstados(state) {
      return state.estados.reduce(
        (acc, item) => ({ ...acc, [item.id]: item }),
        {}
      );
    },
  },
  //En las mutations NO se pueden usar funcion async
  mutations: {
    setUser: (state, data) => {
      const { user, token, expires_in } = data;
      state.user = user;
      localStorage.setItem("token", token);
      setToken(token);
    },
    actualizarUser: (state, user) => (state.user = user),
  },
  //En los actions SI se puede usar funciones async
  actions: {
    async iniciarSesion({ commit }, form) {
      const { data, status } = await this.$axios
        .post("/auth/login", form)
        .catch((e) => e.response);

      if (status == 200) {
        commit("setUser", data);
        return data;
      }
      if (status == 401) {
        return status;
      }
      return null;
    },

    async validarToken({ commit }, token) {
      if (token) {
        const { data, status } = await this.$axios("/auth/me").catch(
          (e) => e.response
        );
        if (status == 200) commit("actualizarUser", data);
        else {
          commit("actualizarUser", null);
          localStorage.clear();
        }
      }
    },
    async logout({ commit }) {
      const { status } = await this.$axios
        .post("/auth/logout")
        .catch((error) => error.response);
      setToken(null);
      commit("actualizarUser", null);
    },
  },
  modules: {
    embalaje,
  },
});
