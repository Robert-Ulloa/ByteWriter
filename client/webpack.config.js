const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      //create the intex.html in the dist forlder
      new HtmlWebpackPlugin({
        template: './intex.html',
        title: ' J.A.T.E',
      }),
      // Injects the custom service worker with workbox
      new InjectManifest({
        swSrc: ' ./src-sw.js',
        swDest: 'service-worker.js',
      }),
      // creaate a manifest.json  file for rwa
      new WebpackPwaManifest({
        name: 'Just another Text Edithor',
        short_name: 'JATE',
        descriptioni: 'Text editor that works offline!',
        backgrounf_color:'#ffffff',
        theme_color: '#31a9e1',
        start_url: '/',
        publicPath: '/',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512], // Multiple sizes
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_module/,
          use: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
          },
        },
      ],
    },
  };
};
