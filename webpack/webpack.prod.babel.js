import merge from 'webpack-merge';
import common from './webpack.common.babel';

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
    }
  }
);
