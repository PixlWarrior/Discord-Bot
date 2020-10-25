var http = require("http");

const createServer = (port = 8080) => {
  http
    .createServer(function (req, res) {
      res.write("Server is online, That is good.");
      res.end();
    })
    .listen(port);
};

module.exports = { createServer: createServer };
