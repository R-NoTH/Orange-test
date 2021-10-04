<template>
  <div class="flexgrid-demo p-p-2">
    <div class="p-grid p-jc-center">
      <div class="p-col-12 p-lg-8" style="max-width: 816px !important">
        <Card class="p-shadow-3">
          <template #header> </template>
          <template #title>
            Embalaje
            <div align="right">
              <Button
                label="Crear"
                class="p-button p-component p-button-outlined"
                @click="abrirModal = true"
              />
            </div>
          </template>
          <template #content>
            <DataTable
              :value="getEmbalajes"
              :paginator="true"
              :rows="10"
              responsiveLayout="stack"
              breakpoint="600px"
              class="p-datatable-sm"
            >
              <Column field="IdT" header="IdT"></Column>
              <Column field="Descripcion" header="Descripcion"></Column>
              <Column field="Peso" header="Peso"></Column>
              <Column field="IdEstado" header="IdEstado">
                <template #body="{ data }"
                  ><span>{{
                    hashEstados?.[data.IdEstado]?.descripcion
                  }}</span></template
                >
              </Column>
              <Column
                :exportable="false"
                headerStyle="width: 55px"
                bodyClass="p-text-center"
              >
                <template #body="{ data }">
                  <Button
                    icon="pi pi-pencil"
                    class="p-button-rounded p-button-success p-mr-2"
                    @click="editProduct(data)"
                  />
                </template>
              </Column>
            </DataTable>
          </template>
        </Card>
      </div>
    </div>
    <create-edit-modal
      v-model="abrirModal"
      v-model:editarProducto="dataEmbalaje"
      @refrescar="ceerarModal"
    />
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import CreateEditModal from "./CreateEditModal.vue";
export default {
  components: { CreateEditModal },
  data() {
    return {
      abrirModal: false,
      dataEmbalaje: {},
    };
  },
  methods: {
    editProduct(data) {
      this.dataEmbalaje = data;
      this.abrirModal = true;
    },
    ceerarModal() {
      this.abrirModal = false;
    },
  },
  computed: {
    ...mapState(["embalaje"]),
    ...mapGetters(["hashEstados"]),
    getEmbalajes() {
      return this.embalaje.embalajes;
    },
  },
};
</script>
