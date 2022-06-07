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
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
          loader: 'url-loader',
          options: {
            limit: 8000,
            sourceMap: true
          }
          }
        ]
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
         loader: 'file-loader',
         options: {
          name: 'fonts/[name].[ext]'
          // sourceMap: true
         }
        }
       },
      // // GLTF configuration: add this to rules
      // {
      //   // match all .gltf files
      //   test: /\.(gltf)$/,
      //   loader: 'gltf-loader-2'
      // },
      {
        test: /\.(glb|gltf)$/,
        use:
        [
            {
                loader: 'file-loader',
            }
        ]
      },
    ]
    }
  }