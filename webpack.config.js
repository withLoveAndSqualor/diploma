const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    main: './src/scripts/index.js',
    about: './src/scripts/about.js',
    paper: './src/scripts/paper.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './scripts/[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-proposal-class-properties"],
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            },
          },
          'postcss-loader'

          /*(isDev ? 'style-loader' : MiniCssExtractPlugin.loader),
          {loader: 'css-loader',
          options: {
            importLoaders: 2
            }
          },
          'postcss-loader'*/
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico|svg)$/i,
        use: [
          //'file-loader?name=./images/[name].[ext]',
          {
            loader: 'file-loader',
            options: {
              esModule: false,
              name: './images/[name].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              esModule: false,
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75
              }
            }
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=./vendor/[name].[ext]&esModule=false',
        /*options: {
          esModule: false
        }*/
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: './styles/[name].[contenthash].css'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default'],
      },
      canPrint: true
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      chunks: ['main'],
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/about.html',
      chunks: ['about'],
      filename: 'about.html'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/paper.html',
      chunks: ['paper'],
      filename: 'paper.html'
    }),
    new webpack.DefinePlugin({
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new WebpackMd5Hash(),
  ]
}
