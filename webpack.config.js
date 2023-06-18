const path = require('path');
const webpack = require('webpack');
const PugPlugin = require('pug-plugin');

module.exports = {
  entry: {
    'index': './src/index.pug',
    'colors-type': './src/colors-type.pug',
    'form-elements': './src/form-elements.pug'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/'
  },

  mode: 'development',

  plugins: [
    new PugPlugin({
      pretty: true, // formatting HTML, useful for development mode
      js: {
        // output filename of extracted JS file from source script
        filename: 'js/[name].[contenthash:8].js',
      },
      css: {
        // output filename of extracted CSS file from source style
        filename: 'css/[name].[contenthash:8].css',
      },
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
      use: ['css-loader', 'sass-loader'],
    },
    {
      test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
      type: 'asset/inline',
    },
    {
      test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
      type: 'asset/resource',
    },
    ],
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