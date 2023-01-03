exports.createPages = async ({ actions }) => {
  const { createPage } = actions
  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  })
}

exports.onCreateWebpackConfig = ({ actions, loaders, getConfig }) => {
  const config = getConfig()
  const webpack = require('webpack')
  config.plugins[0] = new webpack.IgnorePlugin({
    resourceRegExp: /canvas|jsdom/,
    contextRegExp: /konva/,
  })
  actions.replaceWebpackConfig(config)
}
