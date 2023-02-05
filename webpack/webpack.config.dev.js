const path = require("path");
const Webpack = require("webpack");
const { merge } = require("webpack-merge");
const StylelintPlugin = require("stylelint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleTracker = require("webpack-bundle-tracker");

const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-cheap-source-map",
  output: {
    chunkFilename: "js/[name].chunk.js",
    publicPath: "http://localhost:9000/",
  },
  devServer: {
    hot: true,
    port: 9000,
    devMiddleware: {
      publicPath: "http://localhost:9000/",
      writeToDisk: true,
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },

  plugins: [
    new Webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
    }),
    new StylelintPlugin({
      files: path.join("src", "**/*.s?(a|c)ss"),
    }),
    new MiniCssExtractPlugin({ filename: "css/[name].[contenthash].css" }),
    new BundleTracker({ filename: "./webpack-stats.json" }),
  ],
  module: {
    rules: [
      // we pass the output from babel loader to react-hot loader
      {
        test: /\.js|.jsx$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
    ],
  },
});
