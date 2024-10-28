// ./steiger.config.ts
import fsd from "@feature-sliced/steiger-plugin";
import { defineConfig } from "steiger";

export default defineConfig([
  ...fsd.configs.recommended,
  {
    // ignore all mock files for all rules
    ignores: ["**/__mocks__/**"],
  },
  {
    files: ["./src/shared/**"],
    rules: {
      // disable public-api rule for files in /shared folder
      "fsd/public-api": "off",
    },
  },
  {
    files: ["./src/widgets/**"],
    ignores: ["**/discount-offers/**"],
    rules: {
      // disable no-segmentless-slices rule for all widgets except /discount-offers
      "fsd/no-segmentless-slices": "off",
    },
  },
]);
