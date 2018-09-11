import webpack from 'webpack';
import merge from 'webpack-merge';
import DashboardPlugin from 'webpack-dashboard/plugin';
import common from './webpack.common.babel';
import opts from '../variables';

export default merge.smartStrategy({ 'module.rules.use' : 'prepend' })(
  common,
  {
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.s(a|c)ss$/i,
          use: ['css-hot-loader']
        }
      ]
    },
    devServer: {
      clientLogLevel: 'error',
      hot: true,
      hotOnly: true,
      open: true,
      port: 3000,
      proxy: {
        "/": {
          target: opts.proxyHost
        },
        changeOrigin: true,
        ws: true
      }
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new DashboardPlugin()
    ]
  }
);
