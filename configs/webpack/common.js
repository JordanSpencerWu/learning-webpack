const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  optimization: {
    usedExports: true,
  },
  entry: path.resolve(__dirname, '../../src/index.tsx'),
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Web Client',
      template: path.resolve(__dirname, '../../src/index.html'),
    }),
    new TsconfigPathsPlugin({ configFile: 'tsconfig.json' }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [require.resolve('react-refresh/babel')],
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, '../../src/components'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    modules: [path.resolve(__dirname, '../../src'), path.resolve(__dirname, '../../node_modules')],
  },
  output: {
    publicPath: '/',
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../../dist'),
    clean: true,
  },
};
