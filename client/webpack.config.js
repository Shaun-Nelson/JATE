const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// Add a plugin for a service worker and manifest file.
const serviceWorkerPlugin = new InjectManifest({
  swSrc: "./src-sw.js",
  swDest: "sw.js",
});

const manifestPlugin = new WebpackPwaManifest({
  name: "PWA Text Editor",
  short_name: "PWA Text Editor",
  description: "A simple text editor that works offline.",
  publicPath: "/",
  icons: [
    {
      src: path.resolve("./src/images/logo.png"),
      sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
      destination: path.join("assets", "icons"),
    },
  ],
});

// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "PWA Text Editor",
      }),
      new MiniCssExtractPlugin(),
      serviceWorkerPlugin,
      manifestPlugin,
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
  };
};
