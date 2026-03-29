export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "body-max-line-length": [2, "always", 72],
    "footer-max-line-length": [2, "always", 72],
    "header-max-length": [2, "always", 72],
    "type-enum": [0],
    "type-case": [0],
    "type-empty": [0],
    "subject-empty": [0],
  },
};
