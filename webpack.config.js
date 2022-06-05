const path = require('path');

module.exports = {
    entry: './public/app.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [{
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }, 
      {
        test: /\.scss$/,
        use: [
            'style-loader',
            'css-loader',
            'sass-loader',
        ],
      },
      // GLTF configuration: add this to rules
      {
        // match all .gltf files
        test: /\.(gltf)$/,
        loader: 'gltf-loader-2'
      }
    ]
    }
  }