var webpack = require('webpack');
var path = require('path');

const CopyPlugin = require('copy-webpack-plugin')
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',

  target: 'node',

  entry: {
    bundle: './src/index.ts',
  },
  
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ]
  },

  externals: [nodeExternals()],

  resolve: {
    extensions: ['.ts', '.js'],
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./node_modules/.prisma/client/libquery_engine-debian-openssl-1.1.x.so.node" },
      ],
    }),
  ],
  
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
};
