import { mergeConfig, defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ["src/**/*.test.integration.{ts,tsx}"],
      globals: true,
      setupFiles: [
        "vitest-environment-vprisma/setup",
        "./src/testing/server/setup-db.ts",
      ],
      environmentMatchGlobs: [
        ["src/client/**", "jsdom"],
        ["src/server/**", "vprisma"],
      ],
    },
  }),
);
