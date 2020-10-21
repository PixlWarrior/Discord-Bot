var http = require('http');

http.createServer(function (req, res) {
  res.write('Server is online, That is good.')
  res.end()
}).listen(8080);