import { createApp } from "vue";
import App from "./App.vue";
import "./main.css";
import "bulma/css/bulma.css";
import { createPinia } from "pinia";
import router from "./router";
import { firebaseApp } from "./config/firebaseConfig";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.mount("#app");

console.log("Firebase Initialized:", firebaseApp.name);
