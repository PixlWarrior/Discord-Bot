var http = require('http');

http.createServer(function (req, res) {
  res.write("Server is up, and in good condition")
  res.end()
}).listen(8080);