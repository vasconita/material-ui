const webpack = require('webpack')

module.exports = {

  output: {
    library: 'MaterialUI',
    libraryTarget: 'umd',
    libraryName: 'MaterialUI'
  },

  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-addons-transition-group': 'var React.addons.TransitionGroup',
    'react-addons-pure-render-mixin': 'var React.addons.PureRenderMixin',
    'react-addons-create-fragment': 'var React.addons.createFragment',
    'react-addons-update': 'var React.addons.update'
  },

  module: {
    loaders: [
      {
        test: /\.js$/, exclude: /node_modules/, loader: 'babel', query: {
        "presets": ["es2015", "stage-1", "react"],
        "plugins": [
          ["transform-replace-object-assign", "simple-assign"],
          "transform-dev-warning"
        ],
        "env": {
          "test": {
            "sourceMaps": "both"
          },
          "docs-production": {
            "plugins": [
              ["transform-replace-object-assign", "simple-assign"],
              "transform-react-remove-prop-types",
              "transform-react-constant-elements",
              "transform-react-inline-elements"
            ]
          },
          "release": {
            "plugins": [
              "transform-runtime",
              ["transform-react-remove-prop-types", {"mode": "wrap"}]
            ]
          }
        }
      }
      }
    ]
  },

  node: {
    Buffer: false
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]

}