CONSUMER_KEY = "64614-1a557559fbd5ba7f0c1f79e5";
REDIRECT = "http://localhost:8080/"

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

makeRequest('POST', 'https://getpocket.com/v3/oauth/request', function(data) {
  console.log(data);
}, {
  'consumer_key': CONSUMER_KEY,
  'redirect_uri': REDIRECT
});
