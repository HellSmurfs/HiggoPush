http = require('http');
request = require('request');

function logResult(data, error, response, body) {
  console.log('data:', data)
  console.log('error:', error);
  console.log('statusCode:', response && response.statusCode);
  console.log('body:', body);
}

function sendCmd(data) {
  var post_data = {
    name: "higgo",
    meta: {
      messages: [data]
    }
  };

  var open_data = {
    name: "app",
    meta: {
      appId: "com.irdeto.app.Higgo"
    }
  };

  request.post({
    url: cmdUrl,
    body: open_data,
    json: true
  },
    function (error, response, body) {
      logResult(open_data, error, response, body);
    }
  );

  setTimeout(function () {
    request.post({
      url: cmdUrl,
      body: open_data,
      json: true
    },
      function (error, response, body) {
        logResult(open_data, error, response, body);
      }
    );
  }, 7000)

  setTimeout(function () {
    request.post({
      url: cmdUrl,
      body: post_data,
      json: true
    },
      function (error, response, body) {
        logResult(open_data, error, response, body);
      }
    );
  }, 8000)
}

server = http.createServer(function (req, res) {
  if (req.method == 'POST') {
    var body = '';
    req.on('data', function (data) {
      body += data;
    });
    req.on('end', function () {
      sendCmd(body)
    });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 'message': 'pushed' }));
  }
  else {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 'status': 'ok' }));
  }
});

cmdUrl = "http://52.59.237.209/iot13/commands"
port = 3000;
host = 'localhost';
server.listen(port, host);
console.log('Listening at http://' + host + ':' + port);