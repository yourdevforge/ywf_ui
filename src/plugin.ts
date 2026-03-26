import type { App, Plugin } from "vue";
import YButton from "./components/YButton.vue";
import YCard from "./components/YCard.vue";

export const YwfUIPlugin: Plugin = {
  install(app: App) {
    app.component("YButton", YButton);
    app.component("YCard", YCard);
  },
};
