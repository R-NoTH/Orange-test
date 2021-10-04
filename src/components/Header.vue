<template>
  <Menubar>
    <template #start>
      <span class="pi pi-user"></span> {{ NombreCompleto }}</template
    >
    <template #end>
      <Button
        v-on:click="logout()"
        label="Sign Out"
        class="
          p-button
          p-component
          p-button-outlined
          p-button-dangerp-button
          p-component
          p-button-outlined
          p-button-warning
        "
      />
    </template>
  </Menubar>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  methods: {
    ...mapActions({ cerrarSesion: "logout" }),
    logout() {
      this.cerrarSesion().then(() => {
        localStorage.clear();
        this.$router.push("/");
      });
    },
  },
  computed: {
    ...mapState(["user"]),
    NombreCompleto() {
      return this.user?.NombreCompleto;
    },
  },
};
</script>
