import webpack from 'webpack';
import merge from 'webpack-merge';
import common from './webpack.common.babel';
import signature from './_signature';

export default merge(
  common,
  {
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
      new webpack.BannerPlugin({
        banner: signature,
        test: [ /[^vendors*].\.js$/, /\.css$/ ]
      })
    ]
  }
);
