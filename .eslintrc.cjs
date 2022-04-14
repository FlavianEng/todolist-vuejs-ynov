/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
  ],
  env: {
    "vue/setup-compiler-macros": true,
  },
  rules: [
    {
      "no-console": 1,
      "max-len": [
        "error",
        {
          code: 200,
          ignoreStrings: true,
          ignoreComments: true,
        },
      ],
      "array-element-newline": [
        "error",
        {
          ArrayExpression: "consistent",
          ArrayPattern: {
            minItems: 3,
          },
        },
      ],
      "object-curly-newline": "off",
      "@typescript-eslint/explicit-function-return-type": ["error"],
      "no-empty-function": "off",
      "@typescript-eslint/no-empty-function": ["error"],
      "@typescript-eslint/no-empty-interface": ["error"],
      "@typescript-eslint/no-explicit-any": ["error"],
      "@typescript-eslint/default-param-last": ["error"],
      "prefer-destructuring": [
        "error",
        {
          object: true,
          array: true,
        },
      ],
    },
  ],
};
