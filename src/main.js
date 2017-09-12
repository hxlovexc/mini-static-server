#!/usr/bin/env node
let koa = require('koa');
let static = require('koa-static');
let program = require('commander');
let package = require('../package.json');
let open = require('open');
// 默认端口
let defaultPort = 3030;

// 启动服务方法
function startServer (port) {
  let app = new koa();
  // 路径
  app
    .use(static(process.cwd()))
    .listen(port, () => {
      let serverPath = `http://localhost:${port}`;
      console.log(`服务启动成功 => ${serverPath}`);
      open(serverPath);
    });
}

program
  .version(package.version);

program
  .command('start')
  .description('启动服务')
  .action(function (port) {
    if (typeof port === 'object') {
      port = defaultPort;
    } else if (isNaN(+port)) {
      throw Error('启动失败 => 端口只能为数字');
    }
    startServer(port);
  });
  
program.parse(process.argv);
