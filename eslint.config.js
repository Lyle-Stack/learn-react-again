import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    /**
     * In React v17.0, a new JSX transform introduced, no need these two rule in eslint.
     * Please see https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html
     */
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "prettier/prettier": "error",
    },
    extends: ["prettier"],
  },
];
