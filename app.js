CONSUMER_KEY = "64614-1a557559fbd5ba7f0c1f79e5";
REDIRECT = "http://localhost:8080/"

const util = require('util');
const request = require('request');

var makeRequest = function(type, url, callback, params) {
  options = {
    url: url,
    method: type,
    headers: {
      'Content-Type': 'application/json; charset=UTF8',
      'X-Accept': 'application/json'
    },
    body: JSON.stringify(params)
  }

  request(options, function(err, response, body) {
    if (err) {
      console.log("error: ", err)
    } else {
      callback(JSON.parse(body));
    }
  });
}

// init auth here -- see https://getpocket.com/developer/docs/authentication

function step1() {
  console.log('* Step 1:');
  makeRequest('POST', 'https://getpocket.com/v3/oauth/request', step2, {
    'consumer_key': CONSUMER_KEY,
    'redirect_uri': REDIRECT
  });
}

function step2(data) {
  var token = data.code;
  console.log('Received code/token: ' + token);

  console.log('* Step 2:');
  var url = util.format("https://getpocket.com/auth/authorize?request_token=\
%s&redirect_uri=%s",
    token, REDIRECT);
  console.log('Go to this url in your browser:\n' + url);

  // SERVER PART listening for callback from pocket
  const http = require('http');
  const server = http.createServer(function(req, res) {
    res.writeHead(200);
    res.end('Go back to the app!');
    step3(token);
    server.close();
  });
  server.listen(8080);
}

function step3(token) {
  console.log('* Step 3:');
  console.log('Received callback from pocket - app is authorized.');
  makeRequest('POST', 'https://getpocket.com/v3/oauth/authorize', step4, {
    'consumer_key': CONSUMER_KEY,
    'code': token
  });
}

function step4(data) {
  console.log('* Step 4:');
  var access_token = data.access_token;
  var username = data.username;
  console.log('Retrieved access token for user ' + username);
}



// TODO break this up into utils (makeRequest), auth part, and query part
