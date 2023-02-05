const path = require("path");
module.exports = {
  entry: {
    app: path.resolve(__dirname, "../app_django/src/index.js"),
  },
  output: {
    path: path.join(__dirname, "../build"),
    chunkFilename: "js/[name].js",
  },
  // optimization: {
  //   splitChunks: {
  //     chunks: "all",
  //     name: "vendors",
  //   },
  // },
};
