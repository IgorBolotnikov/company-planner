import { mergeConfig, defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      include: ["src/**/*.test.{ts,tsx}"],
      globals: true,
      environmentMatchGlobs: [
        ["src/client/**", "jsdom"],
        ["src/server/**", "node"],
      ],
      coverage: {
        skipFull: true,
        reporter: ["text", "json", "html"],
        include: ["src/**/*.{ts,tsx}"],
        exclude: [
          "src/**/__mocks__/**",
          "src/**/__tests__/**",
          "src/**/index.ts",
          "src/**/types.ts",
          "src/**/cmd/**",
          "src/client/app/entry.client.tsx",
          "src/client/app/entry.server.tsx",
          "src/client/components/ui",
          "src/client/lib/utils.ts",
          "src/server/adapters/db",
          "src/config.ts",
        ],
        // thresholds: {
        //   global: {
        //     statements: 100,
        //     branches: 100,
        //     functions: 100,
        //     lines: 100,
        //   },
        // },
      },
    },
  })
);
