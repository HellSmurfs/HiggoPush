http = require('http');
pushCmd = require('./pushCmd.js');

server = http.createServer(function (req, res) {
  if (req.method == 'POST') {
    var body = '';
    req.on('data', function (data) {
      body += data;
    });
    req.on('end', function () {
      console.log(pushCmd);
      pushCmd.send(body)
    });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 'message': 'pushed' }));
  }
  else {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 'status': 'ok' }));
  }
});

port = 3000;
host = 'localhost';
server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);