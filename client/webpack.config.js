module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './client/src/js/index.js',  // update the path
      install: './client/src/js/install.js'  // update the path
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'client/dist'),  // Update output to client/dist
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './client/index.html',  // update path to client folder
        title: 'JATE',
      }),
      new WebpackPwaManifest({
        name: 'JATE - Just Another Text Editor',
        short_name: 'JATE',
        description: 'A simple text editor',
        background_color: '#ffffff',
        theme_color: '#ffffff', 
        start_url: './',  
        display: 'standalone',
        crossorigin: 'use-credentials', 
        icons: [
          {
            src: path.resolve('client/src/images/logo.png'),  // update the icon path
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
      new InjectManifest({
        swSrc: './client/src-sw.js',  // fix path to client/src-sw.js
        swDest: 'service-worker.js',
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
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};