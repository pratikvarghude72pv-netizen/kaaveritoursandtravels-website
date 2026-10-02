import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "archive/**",
    "qa-evidence/**",
    // Local-only folders that are not part of the site (see .gitignore).
    "brand-kit/**",
    "_handoff/**",
    "logo-trace-proof/**",
    "vtracer-master/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
