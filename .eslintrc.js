module.exports = {
  env: {
    node: true,
  },
  ignorePatterns: ["dist/*.js", "public/*.js"],
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "prettier",
    "@vue/typescript/recommended",
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  },
};
