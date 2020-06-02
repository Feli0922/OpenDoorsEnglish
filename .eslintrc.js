module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "linebreak-style": 0,
    // enforcing double quotes, semicolons, and trailing commas
    quotes: [
      "warn",
      "double",
      {
        avoidEscape: true,
      },
    ],
    semi: 2,
    "comma-dangle": ["warn", "always-multiline"],
  },
};
