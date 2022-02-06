// module.exports = {
//   outputDir: 'dist',
//   assetsDir: 'assets',
//   lintOneSave: false,
//   devServer: {
//     historyApiFallback: true,
//     noInfo: true,
//     proxy: {
//       '/api': {
//         // 是否允许跨域
//         changeOrigin: true,
//         target: 'http://121.36.216.191:8000',
//         pathRewrite: {
//           '^/api': '/'
//         }
//       }
//     }
//   }
// }

module.exports = {

  devServer: {
    host: '0.0.0.0',
    port: 8080,
    disableHostCheck: true,
    proxyTable: {
      '/api': {
        target: '192.168.1.104:8081',
        changeOrigin: true,
        secure: true,
        pathRewrite:
          {
            '^/api': ''
          }
      }
    }
  },
  host: 'localhost',
  port: 8080
}
