#!/usr/bin/env node
let program = require('commander');
let express = require('express');
let open = require('open');
let app = express();
let port = '';

//设置当前路径为资源路径
app.use(express.static(process.cwd()));

program
  .version('1.0.0')
  .option('start, --port [type]', 'server port')
  .parse(process.argv);

//端口只能为数字

if (program.port != true) {
  port = parseInt(program.port);
  if (!port) {
    console.log('错误-> 端口号只能是数字(数字-懂么?)');
    return;
  };
};

//设置默认端口
port = program.port === true ? 3030 : port;
//端口监听
let server = app.listen(port, (error) => {
  //错误
  if (error) return console.error(error);
  let host = server.address().address;
  let port = server.address().port;
  let url = `http://localhost:${port}/`;
  open(url);
});