const path = require('path');
const PugPlugin = require('pug-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    'index': './src/pages/index.pug',
    'colors-type': './src/pages/colors-type/colors-type.pug',
    'form-elements': './src/pages/form-elements/form-elements.pug'
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/'
  },

  mode: 'development',

  resolve: {
    alias: {
      Img: path.join(__dirname, 'src/assets/img/'),
      Fonts: path.join(__dirname, 'src/assets/fonts/'),
      Svg: path.join(__dirname, 'src/assets/svg/'),
      Components: path.join(__dirname, 'src/components/'),
      Scss: path.join(__dirname, 'src/scss/'),
      Layout: path.join(__dirname, 'src/layout/'),
      Includes: path.join(__dirname, 'src/includes/'),
      Mixins: path.join(__dirname, 'src/mixins/'),
      Pages: path.join(__dirname, 'src/pages/'),
    },
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new PugPlugin({
      pretty: true,
      js: {
        filename: 'js/[name].[contenthash:8].js',
      },
      css: {
        filename: 'css/[name].[contenthash:8].css',
      }
    }),
  ],

  module: {
    rules: [{
      test: /\.pug$/,
      loader: PugPlugin.loader, // Pug loader
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader'],
    },
    {
      test: /\.(css|sass|scss)$/,
      use: ['css-loader', 'sass-loader', 'postcss-loader'],
    },
    {
      test: /\.(woff2|woff|ttf|svg|eot)/,
      type: 'asset/resource',
      generator: {
        filename: 'assets/fonts/[name][ext]',
      },
    },
    {
      test: /\.(png|jpg|jpeg)/,
      type: 'asset/resource',
      generator: {
        filename: 'assets/images/[name].[hash:8][ext]',
      },
    },
    {
      test: /\.(svg)/,
      type: 'asset/resource',
      generator: {
        filename: 'assets/svg/[name].[hash:8][ext]',
      },
    },
    {
      test: /\.(ico)/,
      type: 'asset/resource',
      generator: {
        filename: 'assets/favicons/[name].[hash:8][ext]',
      },
    }]
  },

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    watchFiles: {
      paths: ['src/**/*.*'],
      options: {
        usePolling: true,
      },
    },
  },
};