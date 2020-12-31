<template>
  <!-- vscode 链接 远程服务器 （sftp） -->
  <div class="vscode-container">
      <h3>vscode 连接远程服务器 sftp</h3>
      <p>1.在vscode 应用商店搜索 sftp 下载安装 Ctrl + Shift + P ----&gt; 安装扩展 搜索SFTP</p>
      <p>2.ctrl+shift+p 搜索sftp：config 生成sftp.json</p>
      <p>3.配置你的服务器信息</p>
      <pre>
          <code>
              {
                    "name": "My Server",
                    "host": "localhost",
                    "protocol": "sftp",
                    "port": 22,
                    "username": "username",
                    "remotePath": "/",
                    "uploadOnSave": true
                }
          </code>
      </pre>
      <p>4.点击左边生成的远程按钮 可以upload 远程服务器代码 下来</p>
      <p>5.映射名 C/Windows/System32/drivers/etc 服务器主机ip 映射名 保存就可以了 这样就可以直接访问映射名 首先对对应目录采用 Revealin explorer</p>
      <p>6.下次进来更新代码 SFTP > sync remote->local</p>
      <p>
          来源：
          <a href="https://juejin.im/post/5c9d93cde51d45468f3fe617" target="_blank">https://juejin.im/post/5c9d93cde51d45468f3fe617</a>
      </p>
      <h3>使用pm2部署node koa2项目并实现自动重启</h3>
      <p>首先安装pm2   npm install pm2 -g</p>
      <p>然后使用pm2启动项目。这里要特别注意：</p>
      <p>启动单文件时用（app.js是你的文件名）</p>
      <pre>pm2 start app.js</pre>
      <p><span style="color:#f00">但是在koa2中需要这样启动：</span> </p>
      <pre>pm2 start ./bin/www</pre>
      <p>pm2自动重启。把pm2的服务先停下,然后起来的时候带上--watch就可以了</p>
      <pre>pm2 start ./bin/www --watch</pre>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.vscode-container{padding:20px;}
p{padding:10px 0;}
</style>