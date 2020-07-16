const http = require('http');

const server = http.createServer();
server.on('request', () => {
  console.log('收到客户端的请求');
});
server.listen(3000, () => {
  console.log('服务器启动成功, 通过http://localhost:3000访问');
});
