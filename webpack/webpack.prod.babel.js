import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import common from './webpack.common.babel';
import signature from './_signature';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';

export default merge(
  common,
  {
    entry: {
      editor: path.resolve(__dirname, '../bundles/editor.js')
    },
    mode: 'production',
    optimization: {
      splitChunks: {
        filename: 'javascript/vendors/[name].js',
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },
    plugins: [
      new webpack.PrefetchPlugin('./bundles/editor.js'),
      new webpack.PrefetchPlugin('./sass/editor.sass'),
      new OptimizeCssAssetsPlugin(),
      new webpack.BannerPlugin({
        banner: signature,
        test: [ /[^vendors*].\.js$/, /\.css$/ ]
      })
    ]
  }
);
