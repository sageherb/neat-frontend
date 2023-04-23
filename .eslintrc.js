module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:prettier/recommended",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    quotes: ["error", "double"],
    "no-unused-vars": "warn",
    "react/react-in-jsx-scope": "off",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react/style-prop-object": "off",
    "react/prop-types": "warn",
    "react/no-unstable-nested-components": "off",
    "react/jsx-props-no-spreading": "off",
    "no-underscore-dangle": "off",
    "import/no-extraneous-dependencies": "off",
    "no-use-before-define": "warn",
    "import/no-unresolved": "off",
  },
};
