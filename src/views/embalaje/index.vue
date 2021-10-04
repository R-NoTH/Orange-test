<template>
  <div>
    <Header />
    <Embalaje />
  </div>
</template>
<script>
import Embalaje from "@/components/embalaje/Embalaje.vue";
import Header from "@/components/Header.vue";

import { mapActions } from "vuex";

export default {
  name: "embalaje",
  components: {
    Embalaje,
    Header,
  },
  created() {
    this.getLista();
  },
  methods: {
    ...mapActions({ getLista: "embalaje/getembalajes" }),
  },
};
</script>
