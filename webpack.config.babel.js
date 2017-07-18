/*
 Webpack Config!
 Andrew Haine // hello@andrewhaine.co.uk
*/

// Imports
import webpack from 'webpack';
import path from 'path';

// Plugins
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
import DashboardPlugin from 'webpack-dashboard/plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

// Useful directory names
const SITE_NAME = path.basename(path.join(__dirname, '/../../'));
const THEME_NAME = path.basename(__dirname);

// Plugin options
const pluginOpt = {
  browserSync: {
    port: 3000,
    proxy: 'http://localhost:3100',
  },
  devServer: {
    hot: true,
    port: 3100,
    proxy: {
      '*': {
        'target': {
          'host': `${SITE_NAME}.dev`,
          'protocol': 'http',
          'port': 80
        },
        ignorePath: true,
        changeOrigin: true,
        secure: false
      }
    }
  }
};

const extractEditor = new ExtractTextPlugin({
  filename: 'css/editor.css',
});
const extractMain = new ExtractTextPlugin({
  filename: 'css/style.css',
});

let sassUse;
if(process.env.NODE_ENV === 'development') {
  sassUse = [
    'style-loader',
    'css-loader',
    {
      loader: 'postcss-loader',
      options: {
        sourceMap: 'inline'
      }
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true
      }
    },
    'import-glob-loader'
  ];
} else {
  sassUse = extractMain.extract({
    fallback: 'style-loader',
    use: ['css-loader','postcss-loader','sass-loader','import-glob-loader']
  });
}

// Main config
export default {
  entry: './src/bundle.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: `themes/${THEME_NAME}/dist/`,
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
        use: sassUse
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
        use: 'svg-inline-loader'
      }
    ]
  },

  devServer: pluginOpt.devServer,

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new BrowserSyncPlugin(pluginOpt.browserSync, {reload: false}),
    new DashboardPlugin(),
    extractEditor,
    extractMain
  ]
};
