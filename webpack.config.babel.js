/*
 Webpack Config!
*/

/*
  Imports
*/

import webpack from 'webpack';
import path from 'path';
import DashboardPlugin from 'webpack-dashboard/plugin';
import StylelintPlugin from 'stylelint-webpack-plugin';
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

// Sass plugins
const stylelintPlugin = new StylelintPlugin({
  configFile: './.stylelintrc.yml',
  emitErrors: false
});

// CSS plugins
const extractEditor = new ExtractTextPlugin({
  filename: 'css/editor.css',
});
const extractMain = new ExtractTextPlugin({
  filename: 'css/style.css',
});

// Javascript plugins
const vendorChunksPlugin = new webpack.optimize.CommonsChunkPlugin({
  name: 'vendors',
  minChunks: function(module) {
    return module.context && module.context.includes('node_modules');
  }
});

// Development plugins
const notifierPlugin = new NotifierPlugin({ alwaysNotify: true });
const namedModulesPlugin = new webpack.NamedModulesPlugin();
const hotReplacementPlugin = new webpack.HotModuleReplacementPlugin();
const dashboardPlugin = new DashboardPlugin();

// General bundle plugins
const bannerPlugin = new webpack.BannerPlugin({
  banner: signature,
  test: [ /[^vendors].\.js$/, /\.css$/ ]
});

// Plugin storage
const plugins = {
  production: [
    extractMain,
    extractEditor,
    vendorChunksPlugin
  ],
  development: [
    dashboardPlugin,
    extractEditor,
    hotReplacementPlugin,
    namedModulesPlugin,
    notifierPlugin,
    stylelintPlugin
  ]
};

// Add a banner if desired
if (v.useSignature) plugins.production.push(bannerPlugin);

/*
 Rules
*/

/**
 * CSS Rule
 * takes .css files and loads them into the bundle using the style loader
 */
const css = {
  test: /\.css/i,
  use: [ 'style-loader', 'css-loader' ]
};

/**
 * This series of loaders is used for both the standard
 * sass and editor rules
 */
const sassLoaders = [
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
];

/**
 * Sass Rule
 * Takes all Sass/SCSS files (except for editor.sass)
 */
const sass = {
  test: /[^editor].\.s(a|c)ss$/i,
  include: /s(a|c)ss/,
  exclude: /node_modules/,
  use: extractMain.extract({
    fallback: 'style-loader',
    use: sassLoaders
  })
};

/**
 * Editor Rule
 * Creates an editor.css file (for TinyMCE in the CMS)
 */
const editor = {
  test: /editor\.s(a|c)ss/i,
  include: /s(a|c)ss/,
  use: extractEditor.extract({
    fallback: 'style-loader',
    use: sassLoaders
  })
};

/**
 * Eslint Rule
 * Enforces rules from .eslintrc.yml upon all .js files
 */
const eslint = {
  enforce: 'pre',
  test: /\.js$/i,
  exclude: /node_modules/,
  use: {
    loader: 'eslint-loader'
  }
};

/**
 * Javascript Rule
 * Transpiles all .js files
 */
const javascript = {
  test: /\.js$/i,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [ 'env' ]
    }
  }
};

/**
 * Images Rule
 * Compresses / inlines any images in the bundle
 */
const images = {
  test: /\.(png|jpg|gif)$/i,
  include: /images/,
  use: [
    {
      loader: 'url-loader',
      options: {
        fallback: 'image-webpack-loader',
        limit: 10000,
        publicPath: `/themes/${THEME_NAME}/`,
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
 * SVG Rule
 * Compresses / inlines any svg images
 */
const svg = {
  test: /\.svg$/i,
  include: /images/,
  use: [
    {
      loader: 'svg-url-loader',
      options: {
        limit: 1000,
        publicPath: `/themes/${THEME_NAME}/`,
        name: '[path][name].[ext]',
        stripdeclarations: true
      }
    },
    {
      loader: 'image-webpack-loader',
      options: {
        publicPath: `/themes/${THEME_NAME}/`,
        name: '[path][name].[ext]',
      }
    },
  ]
};

/*
  Main Config Object
*/

export default {
  context: path.resolve(__dirname),
  entry: {
    bundle: './index.js'
  },
  output: {
    path: path.resolve(__dirname),
    publicPath: `/themes/${THEME_NAME}`,
    filename: 'javascript/dist/[name].js'
  },
  module: {
    rules: [
      css,
      sass,
      editor,
      eslint,
      javascript,
      images,
      svg
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
  plugins: plugins[process.env.NODE_ENV === 'production' ? 'production' : 'development'],
};
