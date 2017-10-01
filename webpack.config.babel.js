/*
 Webpack Config!
 Andrew Haine // hello@andrewhaine.co.uk
*/

/*
  Imports
*/

import webpack from 'webpack';
import path from 'path';
import DashboardPlugin from 'webpack-dashboard/plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import NotifierPlugin from 'webpack-notifier';
import v from './variables';
import signature from './signature';


/*
  Useful constants
*/

const SITE_NAME = path.basename(path.join(__dirname, '/../../'));
const THEME_NAME = path.basename(__dirname);

/*
  Plugin configuration
*/

const extractEditor = new ExtractTextPlugin({
  filename: 'css/editor.css',
});
const extractMain = new ExtractTextPlugin({
  filename: 'css/style.css',
});

let plugins; // Define a variable to store plugin options

if(process.env.NODE_ENV === 'production') {
  plugins = [
    new webpack.optimize.UglifyJsPlugin(),
    extractEditor,
    extractMain
  ];

  // Signature Settings - disable in signature.js
  if(v.useSignature) {
    plugins.push(new webpack.BannerPlugin({
      banner: signature,
      test: [/\.js$/, /\.css$/]
    }));
  }

} else {
  plugins = [
    new NotifierPlugin({alwaysNotify: true}),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin(),
    extractEditor,
  ];
}


/*
  Main Config Object
*/

export default {
  entry: './src/bundle.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: `/themes/${THEME_NAME}/dist/`,
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.css/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /[^editor].\.s(a|c)ss$/i,
        include: /src\/sass/,
        exclude: /node_modules/,
        use: extractMain.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            },
            'import-glob-loader'
          ]
        })
      },
      {
        test: /editor\.s(a|c)ss/i,
        include: /src\/sass/,
        use: extractEditor.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            },
            'import-glob-loader'
          ]
        })
      },
      {
        enforce: 'pre',
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader'
        }
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015']
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/i,
        include: /src\/images/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 30000,
              name: 'images/[name].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              optipng: {
                optimizationLevel: 5
              },
              mozjpeg: {
                interlaced: true,
              }
            }
          }
        ]
      },
      {
        test: /\.svg$/i,
        use: 'svg-url-loader'
      }
    ]
  },

  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    hot: true,
    port: 3000,
    proxy: {
      '/': {
        'target': {
          'host': `${SITE_NAME}.${v.serverAlias}`,
          'protocol': 'http',
          'port': 80
        },
        changeOrigin: true,
        secure: false
      }
    },
    stats: 'errors-only'
  },

  plugins: plugins,
};
