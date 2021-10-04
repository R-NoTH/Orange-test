export default {
  install(app) {
    app.config.globalProperties.$router.beforeEach((to, from, next) => {
      const { user } = app.config.globalProperties.$store.state;
      const { auth } = to.meta;
      if (user && auth) next();
      else if (!user && auth) next("/");
      else if (user && !auth) next("embalajes");
      else next();
    });
  },
};
