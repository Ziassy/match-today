/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: {
    main: './src/app.js',
    team: './src/team.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    writeToDisk: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunks: ['main'],
      filename: 'index.html',
      meta: {
        author: 'Pauziah',
        description: 'Football',
      },
    }),
    new HtmlWebpackPlugin({
      template: './src/detail-teams.html',
      chunks: ['team'],
      filename: 'detail-teams.html',
    }),
    new WorkboxWebpackPlugin.InjectManifest({
      swSrc: './src/service-worker.js',
      swDest: 'service-worker.js',
    }),
    new WebpackPwaManifest({
      name: 'FootBall',
      short_name: 'Football',
      description: 'Football App',
      start_url: '/index.html',
      display: 'standalone',
      background_color: '#FF1C1C',
      theme_color: '#FF1C1C',
      fingerprints: false,
      ios: true,
      crossorigin: 'anonymous',
      icons: [
        {
          src: path.resolve('src/icons/icon.png'),
          destination: path.join('icons', 'android'),
          sizes: [192, 256, 384, 512],
          purpose: 'any maskable',
        },
        {
          src: path.resolve('src/icons/icon.png'),
          destination: path.join('icons', 'ios'),
          sizes: [192, 256, 384, 512],
          purpose: 'any maskable',
          ios: true,
        },
      ],
      gcm_sender_id: '743411083136',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/pages',
          to: 'pages',
        },
        {
          from: 'src/component',
          to: 'component',
        },
        {
          from: 'src/images',
          to: 'images',
        },
        {
          from: 'src/icons',
          to: 'icons',
        },
        {
          from: 'src/favicon.ico',
          to: 'favicon.ico',
        },
      ],
    }),

  ],
};
