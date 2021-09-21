const { override, babelExclude } = require("customize-cra");
const path = require("path");

module.exports = override(
  babelExclude([path.resolve("node_modules/@georgedoescode")])
);
