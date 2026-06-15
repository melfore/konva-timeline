import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import prettier from "eslint-plugin-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [
      "node_modules/**",
      ".pnp/**",
      ".pnp.js",
      "tsconfig.json",
      "coverage/**",
      "build/**",
      "dist/**",
      "docs/**",
      ".DS_Store",
      ".env.local",
      ".env.development.local",
      ".env.test.local",
      ".env.production.local",
      "report.*.json",
      "CHANGELOG.md",
      "npm-debug.log*",
      "yarn-debug.log*",
      "yarn-error.log*",
      ".yalc/**",
      "yalc.lock",
    ],
  },

  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ["**/*.{js,jsx,ts,tsx}"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
      prettier,
      "simple-import-sort": simpleImportSort,
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      "prettier/prettier": "error",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // remove & fix
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-unused-expressions": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
      "react-hooks/set-state-in-effect": "warn",
    },
  },

  eslintConfigPrettier,
];
