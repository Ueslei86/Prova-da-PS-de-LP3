import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // aqui você pode implementar os listeners de eventos do Node
    },
  },
});
