const IS_PROD = ['production', 'test'].includes(process.env.NODE_ENV)
module.exports = {
    chainWebpack: config => {
      // 修复HMR
      config.resolve.symlinks(true);
    },
    css: { 
      // 是否使用css分离插件 ExtractTextPlugin 
      extract: IS_PROD, 
      // 开启 CSS source maps? 
      sourceMap: false, 
      // css预设器配置项 
      loaderOptions: { 
      }, 
      // 启用 CSS modules for all css / pre-processor files. 
      modules: false, 
    }, 
    publicPath: process.env.NODE_ENV === 'production'
    ? '/dist/'
    : '/',
    devServer: {
      proxy: {
        '/api': {
          target: 'http://123.57.229.111:3000',
          ws: true,
          changeOrigin: true,
          pathRewrite:{  // 路径重写，
            '^/api': ''  // 替换target中的请求地址，也就是说以后你在请求http://api.douban.com/v2/XXXXX这个地址的时候直接写成/api即可。
          }
        }
      }
    }   
} 