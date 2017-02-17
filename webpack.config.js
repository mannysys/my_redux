var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    "webpack-dev-server/client?http://localhost:8080",//指定webpack-dev-server客户端入口地址
    "webpack/hot/only-dev-server",// for hot loader: "only" prevents reload on syntax errors
    "./src/index.js"// our app's entry point 主入口文件
  ],
  module:{  //匹配的文件做预处理
    loaders:[{
      test:/\.jsx?$/,
      include: path.join(__dirname,"src"),
      loaders: ["react-hot-loader","babel-loader"],
    }]
  },
  resolve:{ //解析模块文件
    extensions:[".js",".jsx"]
  },
  output:{
    path: __dirname + "/public/build", //转换后的文件输出到该文件下指定文件里
    filename:"boundle.js", //定义输出文件名
    publicPath:"http://localhost:8080/build", //指定浏览器加载的url地址
  },
  /* webpack-dev-server设置
   * contentBase 指定“public"目录下文件提供本地服务器（默认webpack-dev-server会为根文件夹提供本地服务器）
   * port	设置默认监听端口，如果省略，默认为”8080“   host 指定绑定主机名
   */
  devServer: {
    contentBase: "./public",
    hot: true,
    host:"localhost",
    proxy:{  //将前端所有请求通过代理发送到后端 3000端口地址
      "*": "http://localhost:"+3000
    }
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin()  //启用热模块更换
  ]


}