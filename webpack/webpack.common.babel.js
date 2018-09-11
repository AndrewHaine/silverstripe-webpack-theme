import path from 'path';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import NotifierPlugin from 'webpack-notifier';
import StylelintPlugin from 'stylelint-webpack-plugin';

const THEME_DIRNAME = path.basename(path.join(__dirname, '/../'));

/**
 * Common rules
 * --------------------------------------------------------
 */

/**
 * JS rules
 * Checks imported files for eslint errors then uses babel to transpile
 */
const eslint = {
  enforce: 'pre',
  test: /\.js$/i,
  exclude: /node_modules/,
  use: {
    loader: 'eslint-loader',
    options: {
      configFile: './.eslintrc.yml'
    }
  }
};

const javascript = {
  test: /\.js$/i,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader'
  }
};


/**
 * CSS rule
 * Takes .css files and loads them into the bundle using the style loader
 */
const css = {
  test: /\.css/i,
  use: ['style-loader', 'css-loader']
};


/**
 * SASS rules
 * Handles all things to do with compiling and linting sass
 */
const CSSExtractPlugin = new MiniCSSExtractPlugin({
  filename: "css/[name].css"
});

const sass = {
  test: /\.s(a|c)ss$/i,
  use: [
    MiniCSSExtractPlugin.loader,
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
    }
  ]
};


/**
 * Images rule
 * Compresses images - images under 10kb will be inlined using a base64 data-uri
 */
const images = {
  test: /\.(png|gif|jpe?g)$/i,
  include: /images/,
  use: [
    {
      loader: 'url-loader',
      options: {
        limit: 10000,
        publicPath: `/themes/${THEME_DIRNAME}/`,
        name: '[path][name].[ext]'
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
};


/**
 * SVG rule
 * Compresses / inlines any svg images
 */
const svg = {
  test: /\.svg$/i,
  include: /images/,
  use: [
    {
      loader: 'svg-url-loader',
      options: {
        limit: 100,
        publicPath: `/themes/${THEME_DIRNAME}/`,
        name: '[path][name].[ext]',
        stripdeclarations: true
      }
    },
    'image-webpack-loader'
  ]
};


/**
 * Webfonts rule
 * Imports any webfonts through the file loader
 */
const webfonts = {
  test: /\.(ttf|eot|woff|woff2)$/i,
  include: /webfonts/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: 'webfonts/[name].[ext]'
      }
    }
  ]
};


/**
 * Plugins
 * --------------------------------------------------------
 */

/**
 * CleanWebpackPlugin
 * Removes old builds of bundles to avoid stale assets and conflicts
 */
const cleanWebpack = new CleanWebpackPlugin(['css', 'javascript/dist', 'javascript/vendors'], {
  root: path.resolve(__dirname, '../'),
  verbose: true
});

/**
 * StylelintPlugin
 * Config for linting all sass files
 */
const stylelintPlugin = new StylelintPlugin({
  configFile: './.stylelintrc.yml',
  emitErrors: false
});

/**
 * NotifierPlugin
 * Uses system notifications to track build completions
 */
const notifierPlugin = new NotifierPlugin({
  alwaysNotify: true
});


/**
 * Webpack common export
 * --------------------------------------------------------
 */

export default {
  entry: {
    main: path.resolve(__dirname, '../bundles/main.js'),
    editor: path.resolve(__dirname, '../bundles/editor.js')
  },
  output: {
    path: path.join(__dirname, '/../'),
    publicPath: `/themes/${THEME_DIRNAME}`,
    filename: 'javascript/dist/[name].bundle.js'
  },
  module: {
    rules: [
      css,
      sass,
      eslint,
      javascript,
      images,
      svg,
      webfonts
    ]
  },
  plugins: [
    CSSExtractPlugin,
    cleanWebpack,
    stylelintPlugin,
    notifierPlugin
  ]
};
