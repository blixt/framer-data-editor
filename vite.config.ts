import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  // This makes the WebSocket for Hot Module Reloading available via Codespaces.
  server: { hmr: { port: 443 } },
  css: { modules: { localsConvention: "camelCaseOnly" } },
});
