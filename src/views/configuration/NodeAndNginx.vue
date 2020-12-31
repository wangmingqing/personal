<template>
  <div class="nginx-container">
    <!-- 阿里云服务器 + node + nginx + mongodb -->
    <section>
      <h2>安装mongodb</h2>
      <ul>
        <li>软件安装位置：/usr/local/mongodb</li>
        <li>数据存放位置：/var/mongodb/data</li>
        <li>日志存放位置：/var/mongodb/logs</li>
      </ul>
      <h4>1. 首先下载安装包</h4>
      <pre>
        <code>
          cd /usr/local
          wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.4.6.tgz
        </code>
      </pre>
      <h4>2. 解压安装包，重命名文件夹为mongodb</h4>
      <pre>
        <code>
          tar zxvf mongodb-linux-x86_64-2.6.0.tgz
          mv mongodb-linux-x86_64-2.6.0 mongodb
        </code>
      </pre>
      <h4>3. 创建数据和日志存放目录</h4>
      <pre>
        <code>
          mkdir /var/mongodb
          mkdir /var/mongodb/data
          mkdir /var/mongodb/logs
        </code>
      </pre>
      <h4>4. 打开rc.local文件，添加CentOS开机启动项：</h4>
      <pre>
        <code>
          vim /etc/rc.d/rc.local
        </code>
      </pre>
      <h4>5. 将mongodb启动命令追加到本文件中，让mongodb开机自启动</h4>
      <pre>
        <code>
          /usr/local/mongodb/bin/mongod --dbpath=/var/mongodb/data --logpath /var/mongodb/logs/log.log --logappend --auth --port 27017 --fork
        </code>
      </pre>
      <h4>6. mongo权限设置</h4>
      <p>sudo vi /etc/mongod.conf</p>
      <p>较新版本的增加安全校验的方法是配置文件最后面加上（网上很多旧版写法都是无效的）</p>
      <p>security: authorization: enabled</p>
      <p>如下所示</p>
      <pre>
        <code>
          systemLog:
          destination: file
          path: /var/mongodb/logs/log.log
          logAppend: true
          storage:
          dbPath: /var/mongodb/data
          net:
          bindIp: 127.0.0.1
          security:
          authorization: enabled
        </code>
      </pre>
      <p>然后重启mongodb即可，这里说明下，初学也可以不设这个选项，这样操作数据库就不需要用户名密码了，从安全的角度看还是设了比较好，后面都是以设了安全校验来讲解。</p>
      <h4>7. 关闭 vim 后，直接手动启动mongodb</h4>
      <pre>
        <code>
          /usr/local/mongodb/bin/mongod --dbpath=/var/mongodb/data --logpath /var/mongodb/logs/log.log --logappend --auth --port 27017 --fork
        </code>
      </pre>
      <h4>8. 启动mongo shell</h4>
      <pre>
        <code>
          cd /usr/local/mongodb/bin/
          ./mongo
        </code>
      </pre>
      <h4>9. 在 mongo shell 中创建超级管理员以及相关数据库到管理员及数据库</h4>
      <pre>
        <code>
          use admin //admin database
            db.createUser({
            user: "myAdmin",
            pwd: "******",
            roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
            }
          )
        </code>
      </pre>
      <h4>10. 使用特权进入</h4>
      <pre>
        <code>
          ./mongo -u "mydmin" -p "******" --authenticationDatabase "admin"
        </code>
      </pre>
      <h4>11. 创建新数据库，并设置管理员</h4>
      <pre>
        <code>
          > use mywebsite
          switched to db mywebsite
          > db.createUser(
          ... {
          ... user: "mywebsiteAdmin",
          ... pwd: "******",
          ... roles: [ { role: "readWrite", db: "mywebsite" }]
          ... }
          ... )
        </code>
      </pre>
      <pre>
        <code>
          > use secondwebsite
            switched to db secondwebsite
            > db.createUser(
            ... {
            ... user: "secondwebsiteAdmin",
            ... pwd: "******",
            ... roles: [ { role: "readWrite", db: "secondwebsite" }]
            ... }
            ... )
        </code>
      </pre>
      <p>以后进入其中的数据库需要权限，如果用超级管理员则不需要</p>
      <pre>
        <code>
          db.auth("mywebsiteAdmin", "******")
        </code>
      </pre>
      <h4>12. mongodb数据迁移(用于从指定地址数据库迁移到云服务器上)</h4>
      <pre>
        <code>
          //存放到某个目录
          ./mongodump -h 127.0.0.1:27017 -d mywebsite -o /home/mywebsite -u "mywebsiteAdmin" -p "******"

          //取出
          ./mongorestore  -h 127.0.0.1:27017 -d mywebsite /home/mywebsite/mywebsite -u "mywebsiteAdmin" -p "******"
        </code>
      </pre>
    </section>
    <p>
      参考资料
      <a href="https://www.jianshu.com/p/2e31fd9eb048" target="_blank">https://www.jianshu.com/p/2e31fd9eb048</a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'NodeAndNginx',
  data() {
    return {
      
    }
  },
  methods: {
    
  }
}
</script>

<style>
ul,li{padding:0;margin:0;padding:10px 0;}
p{padding:10px 0;line-height:1.5em;}
.nginx-container{padding:20px;}
/* p a{color:;} */
</style>