// screen.log()

http = require('http');
request = require('request');

function openApp(data) {
  var post_data = {
    name: "higgo",
    meta: {
      messages: [data]
    }
  };

  request.post({
    url: 'http://52.59.237.209/iot13/commands',
    body: post_data,
    json: true
  },
    function (error, response, body) {
      console.log('data:', post_data)
      console.log('error:', error); // Print the error if one occurred
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML for the Google homepage.
    }
  );
}

server = http.createServer(function (req, res) {
  if (req.method == 'POST') {
    var body = '';
    req.on('data', function (data) {
      body += data;
    });
    req.on('end', function () {
      openApp(body)
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