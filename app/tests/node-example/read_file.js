const fs = require('fs');

// eslint-disable-next-line no-unused-vars
// writefile('写入文件名', '写入内容')
// fs.writeFile('./app/tests/data/hello.md', '大家好，我是Node.js', (error) => {
//   console.log('写入文件成功。');
// });

// eslint-disable-next-line no-unused-vars
fs.readFile('./app/tests/data/hello.md', (error, data) => {
  console.log(error);// 处理错误
  console.log(data);// 没有数据就是 undefined 无转换直接转换为16进制<Buffer e5 a4 a7 e5 ae b6 e5 a5 bd ef bc 8c e6 88 91 e6 98 af 4e 6f 64 65 2e 6a 73>
  if (error) {
    console.log('读取文件失败');
  } else {
    console.log(data.toString());
  }
});
