const webpack = require("webpack");
const { AutoWebPlugin } = require("web-webpack-plugin");
const path = require("path");
const fs = require("fs");
const extractTextWebpackPlugin = require("extract-text-webpack-plugin");
const manifestPlugin = require("webpack-manifest-plugin");
const cleanWebpackPlugin = require("clean-webpack-plugin");

const HappyPack = require("happypack");
const os = require("os");
const HappyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length }); // 启动线程池});

const chalk = require("chalk");
let _webpackConfig;

// process.env 判断是生产环境还是开发环境

chalk.yellow(`use webpack.${process.env.MODULE}.config.js!!!`);
if (
  typeof process.env.MODULE != "undefined" &&
  fs.existsSync(`${__dirname}/webpack.${process.env.MODULE}.config.js`)
) {
  _webpackConfig = fs.existsSync(
    `${__dirname}/webpack.${process.env.MODULE}.dev.config.js`
  )
    ? require(`${__dirname}/webpack.${process.env.MODULE}.dev.config.js`)
    : require(`${__dirname}/webpack.${process.env.MODULE}.config.js`);
  chalk.yellow(`use webpack.${process.env.MODULE}.config.js!!!`);
} else {
  _webpackConfig = (webpackConfig, env) => {
    return {
      entry: [
        //   "./src/views/main/index.js"
        "./src/views/chart/index.js"
          ],
      // devtool: "source-map",
      output: {
        filename: "assets/js/[name].[chunkhash:5].js",
        path: path.resolve(__dirname, "dist")
      },
      resolve: {
        extensions: [".js", "jsx", ".json", ".sass", ".scss", ".less"]
      },
      // devServer: {
      //     contentBase: path.join(__dirname, 'dist'),
      //     inline: true,//注意：不写hot: true，否则浏览器无法自动更新；也不要写colors:true，progress:true等，webpack2.x已不支持这些
      // 	port: 8001
      // },
      module: {
        rules: [
          {
            test: /\.js(x?)$/,
            // use: [{ loader: 'babel-loader' }],
            use: "happypack/loader?id=jsx",
            exclude: /node_modules/
          },
          {
            test: /\.(scss|css)$/,
            // use: 'happypack/loader?id=styles',
            use: extractTextWebpackPlugin.extract({
              fallback: "style-loader",
              use: [
                { loader: "css-loader" },
                { loader: "postcss-loader" },
                { loader: "sass-loader" }
              ]
            })
            // exclude: /node_modules/
          },
          {
            test: /\.(jpe?g|png|gif|svg)$/i,
            use: [
              {
                loader: "url-loader",
                options: {
                  limit: 8192,
                  name: "assets/images/[name].[chunkhash:5].[ext]"
                }
              }
            ]
          }
        ]
      },
      plugins: [
        new extractTextWebpackPlugin("assets/css/[name].[chunkhash:5].css"), // 样式分离
        new AutoWebPlugin("./src/views/", { // 入口点检测
          template: pageName => {
            const template = path.resolve("./public", `${pageName}.html`);
            if (fs.existsSync(template)) {
              return template;
            } else {
              return path.resolve("./public", "default.html");
            }
          },
          commonsChunk: {
            name: "common" // 必填属性,输出的文件名称
          }
        }),
        // 模块生成清单
        // new manifestPlugin({
        // 	fileName: path.join(__dirname, 'dist/assets', 'manifest.json')
        // }),
        new cleanWebpackPlugin(["dist/*"]), // 旧文件清理
        new webpack.ProvidePlugin({
          // 全局库
          _: "lodash",
          swal: "sweetalert"
        }),
        new HappyPack({
          id: "jsx", //用id来标识 happypack处理那里类文件
          cache: true,
          threadPool: HappyThreadPool, //共享进程池
          loaders: ["babel-loader"], //如何处理  用法和loader 的配置一样
          verbose: true //允许 HappyPack 输出日志
        })
        // new HappyPack({
        // 	id: 'styles',
        // 	cache: true,
        // 	threadPool: HappyThreadPool,
        // 	loaders: [
        // 		'style-loader',
        // 	    'css-loader',
        // 	    {
        // 	        loader: 'postcss-loader',
        // 	        options: {
        // 	            plugins: () => [ require('autoprefixer')({
        // 	                browsers: [ 'last 3 version', 'ie>=8' ]
        // 	            }) ]
        // 	        }
        // 	    },
        // 	    'sass-loader'
        // 	]
        // })

        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //         pure_funcs: ['console.log', 'window.console.log.apply']
        //     },
        // })
      ]
    };
  };
}

module.exports = _webpackConfig;
