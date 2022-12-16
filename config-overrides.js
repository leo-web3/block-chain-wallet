const {
  override,
  addWebpackAlias,
  useBabelRc,
  addWebpackPlugin,
  removeModuleScopePlugin,
} = require("customize-cra");
const path = require("path");
const webpack = require("webpack");

const webEnv = {};

// List of all aliases for canisters. This creates the module alias for
// the `import ... from "@dfinity/ic/canisters/xyz"` where xyz is the name of a
// canister.

module.exports = override(
  removeModuleScopePlugin(),
  useBabelRc(),
  addWebpackPlugin(
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: "process/browser.js",
    }),
    new webpack.DefinePlugin({
      ...webEnv,
    })
  )
);
