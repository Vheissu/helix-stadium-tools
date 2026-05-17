// Flat ESLint config for the mobile app.
//
// Scope mirrors the Python side: real-bug rules on, stylistic/strictness
// nits relaxed for now so CI is not blocked by a large pre-existing backlog.
// Tighten (e.g. re-enable no-explicit-any, add type-aware linting) over time.
import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "node_modules/**",
      ".expo/**",
      "dist/**",
      "android/**",
      "ios/**",
      "expo-env.d.ts",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    plugins: { "react-hooks": reactHooks },
    rules: {
      // Rules of Hooks catch real, hard-to-spot bugs — keep as errors.
      "react-hooks/rules-of-hooks": "error",
      // Dependency completeness is advisory; warn so it does not block CI
      // but still surfaces in output.
      "react-hooks/exhaustive-deps": "warn",
      // Protocol decoding genuinely deals in dynamic msgpack shapes.
      "@typescript-eslint/no-explicit-any": "off",
      // require() is the only way to reference static assets (PNG/TTF) under
      // the React Native / Metro bundler — it is idiomatic here, not a smell.
      "@typescript-eslint/no-require-imports": "off",
      // Keep unused-symbol detection (real-bug signal) but allow the
      // conventional underscore opt-out for intentionally unused names.
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },
);
