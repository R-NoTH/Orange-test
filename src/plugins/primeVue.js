import PrimeVue from "primevue/config";
//importacion de componentes
import InputText from "primevue/inputtext";
import Card from "primevue/card";
import Password from "primevue/password";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import InputNumber from "primevue/inputnumber";
import Dropdown from "primevue/dropdown";
import Menubar from "primevue/menubar";
import Dialog from "primevue/dialog";
import Message from "primevue/message";

//Declaracion de componentes

export default {
  install(app) {
    app.use(PrimeVue);
    app.component("InputText", InputText);
    app.component("Card", Card);
    app.component("Password", Password);
    app.component("Button", Button);
    app.component("DataTable", DataTable);
    app.component("Column", Column);
    app.component("ColumnGroup", ColumnGroup);
    app.component("InputNumber", InputNumber);
    app.component("Dropdown", Dropdown);
    app.component("Menubar", Menubar);
    app.component("Dialog", Dialog);
    app.component("Message", Message);
  },
};
