import webpack from 'webpack';
import merge from 'webpack-merge';
import common from './webpack.common.babel';
import opts from '../variables';

export default merge.smartStrategy({ 'module.rules.use' : 'prepend' })(
  common,
  {
    mode: 'development',
    module: {
      rules: [
        {
          test: /.\.s(a|c)ss/i,
          use: ['css-hot-loader']
        }
      ]
    },
    devServer: {
      disableHostCheck: true,
      hot: true,
      port: 3000,
      host: '0.0.0.0',
      proxy: {
        "/": {
          target: opts.proxyHost
        }
      }
    }
  }
);
