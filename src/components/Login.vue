<template>
  <div class="p-grid p-jc-center p-align-center" style="height: 90vh">
    <div class="p-col-12 p-md-4 form-login">
      <Card class="p-shadow-3">
        <template #title> Login </template>
        <template #content>
          <form class="p-fluid" @submit.prevent="enviar">
            <Message
              v-for="(item, i) in msg"
              :severity="item.severity"
              :key="i"
              >{{ item.content }}</Message
            >
            <div class="p-field">
              <label for="email">Email</label>
              <InputText
                v-model.trim="form.email"
                id="email"
                type="email"
                :class="{ 'p-invalid': validacion.email.$invalid && validar }"
              />
            </div>
            <div class="p-field">
              <label for="password">password</label>
              <Password
                v-model.trim="form.password"
                :feedback="false"
                :class="{
                  'p-invalid': validacion.password.$invalid && validar,
                }"
              />
            </div>

            <!-- <div v-if="msg">Credenciales incorectas</div> -->

            <Button type="submit" label="Iniciar sesión" />
          </form>
        </template>
      </Card>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
//Vuelidate
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      validar: false,
      form: {
        email: "",
        password: "",
      },
      msg: [],
    };
  },
  validations() {
    return {
      form: {
        email: { required, email },
        password: { required },
      },
    };
  },
  methods: {
    ...mapActions(["iniciarSesion"]),
    enviar() {
      this.validar = true;
      this.msg = [];
      if (!this.v$.$invalid) {
        this.iniciarSesion(this.form).then((response) => {
          if (response == 401) {
            this.msg.push({
              severity: "error",
              content: "Credenciles Incorrectas",
            });
          }
          if (response != null) this.$router.push("/embalajes");
        });
      }
    },
  },
  computed: {
    validacion() {
      return this.v$.form;
    },
  },
};
</script>
<style lang="scss">
.form-login {
  @media screen and (max-width: 500px) {
    width: 95% !important;
  }
  @media (min-width: 501px) {
    width: 400px !important;
  }
}
</style>
