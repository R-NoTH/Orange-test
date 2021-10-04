<template>
  <div class="p-grid p-jc-center">
    <div class="p-col-12 p-md-4">
      <Dialog
        :header="esEditar ? 'Editar registro' : 'Crear registro'"
        :visible="modelValue"
        @update:visible="ceerarModal"
        :breakpoints="{ '960px': '75vw' }"
        :style="{ width: '50vw' }"
      >
        <form @submit.prevent="validar">
          <div class="p-fluid">
            <div class="p-field">
              <label for="Codigo">Codigo</label>
              <InputText
                id="Codigo"
                type="text"
                v-model="form.IdT"
                :class="{ 'p-invalid': v$.form.IdT.$error }"
              />
              <div v-if="v$.form.IdT.$error" class="p-error">
                El Codigo es requerido.
              </div>
            </div>
            <div class="p-field">
              <label for="Descripcion">Descripcion</label>
              <InputText
                id="Descripcion"
                type="text"
                v-model="form.Descripcion"
                :class="{ 'p-invalid': v$.form.Descripcion.$error }"
              />
              <div v-if="v$.form.Descripcion.$error" class="p-error">
                La Descripcion es requerida.
              </div>
            </div>
            <div class="p-field">
              <label for="Peso">Peso</label>
              <InputNumber
                v-model="form.Peso"
                :class="{ 'p-invalid': v$.form.Peso.$error }"
              />
              <div v-if="v$.form.Peso.$error" class="p-error">
                El Peso es requerido.
              </div>
            </div>
            <div class="p-field">
              <label for="Estado">Estado</label>
              <Dropdown
                v-model="form.IdEstado"
                :options="estados"
                optionLabel="name"
                optionValue="code"
                placeholder="Seleccione un Estado"
                :class="{ 'p-invalid': v$.form.IdEstado.$error }"
              />
              <div v-if="v$.form.IdEstado.$error" class="p-error">
                El Estado es requerido.
              </div>
            </div>
          </div>

          <Button type="submit" class="p-button-outlined p-button-success">
            <span class="p-ml-2 p-text-bold">{{
              esEditar ? "Editar registro" : "Crear registro"
            }}</span>
          </Button>
        </form>
      </Dialog>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
//Vuelidate
import useVuelidate from "@vuelidate/core";
import { required, numeric } from "@vuelidate/validators";

export default {
  props: {
    modelValue: Boolean,
    editarProducto: Object,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      selectedCity1: null,
      form: {
        IdT: "",
        Descripcion: "",
        Peso: "",
        IdEstado: "",
      },
      estados: [
        { name: "Inhabilitado", code: "0" },
        { name: "Habilitado", code: "1" },
      ],
    };
  },
  validations() {
    return {
      form: {
        IdT: { required },
        Descripcion: { required },
        Peso: { required, numeric },
        IdEstado: { required },
      },
    };
  },
  computed: {
    esEditar() {
      return Object.values(this.editarProducto || {}).length > 0;
    },
  },
  methods: {
    ...mapActions({ eviarData: "embalaje/enviarEmbalaje" }),
    ceerarModal() {
      this.$emit("update:modelValue", false);
      this.$emit("update:editarProducto", {});
      this.v$.$reset();
    },
    async validar() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;
      this.esEditar ? this.editar() : this.enviar();
    },
    async enviar() {
      this.eviarData(this.form).then((response) => {
        if (response) {
          this.ceerarModal();
          this.form = {};
        }
      });
    },
    ...mapActions({ editarData: "embalaje/editarEmbalaje" }),
    editar() {
      this.editarData(this.form).then(() => {
        this.ceerarModal();
      });
    },
  },
  watch: {
    editarProducto: function () {
      this.form = { ...this.editarProducto };
    },
  },
};
</script>
