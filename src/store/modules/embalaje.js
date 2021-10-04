export const namespaced = true;

export const state = () => ({
  embalajes: [],
});

export const mutations = {
  setEmbalaje: (state, embalajes) => {
    state.embalajes = embalajes;
  },
  setItem: (state, item) => state.embalajes.push(item),
  refrescar: (state, data) => {
    const i = state.embalajes.findIndex((element) => element.Id == data.Id);
    if (i >= 0) state.embalajes[i] = data;
  },
};

export const actions = {
  async getembalajes({ commit }) {
    const { status, data } = await this.$axios
      .get("/embalaje")
      .catch((error) => error.response);
    commit("setEmbalaje", data);
  },
  async enviarEmbalaje({ commit }, form) {
    const { status, data } = await this.$axios
      .post("/embalaje", form)
      .catch((error) => error.response);
    if (status == 201) {
      commit("setItem", data);
      return true;
    }
    return false;
  },
  async editarEmbalaje({ commit }, form) {
    const { status, data } = await this.$axios
      .put(`/embalaje/${form.Id}`, form)
      .catch((error) => error.response);
    if (status == 200) {
      commit("refrescar", data);
    }
    return false;
  },
};
