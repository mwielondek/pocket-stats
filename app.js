CONSUMER_KEY = "64614-1a557559fbd5ba7f0c1f79e5";
REDIRECT = "http://local123host:8080/"

var makeRequest = function(type, url, callback, params) {
  function reqListener() {
    console.log(this.getAllResponseHeaders());
    var data = JSON.parse(this.responseText);
    callback(data);
  }

  function reqError(err) {
    console.log('Fetch Error :-S', err);
    console.log(this.getAllResponseHeaders());
  }

  var oReq = new XMLHttpRequest();
  oReq.onload = reqListener;
  oReq.onerror = reqError;

  oReq.open(type, url, true);
  oReq.setRequestHeader('Content-Type', 'application/json; charset=UTF8');
  oReq.setRequestHeader('X-Accept', 'application/json');
  oReq.send(JSON.stringify(params));
}

window.onload = function() {
  document.getElementById('auth-init').onclick = function() {
    // init auth here -- see https://getpocket.com/developer/docs/authentication
    makeRequest('POST', 'https://getpocket.com/v3/oauth/request', function(data) {
      console.log(data);
    }, {
      'consumer_key': CONSUMER_KEY,
      'redirect_uri': REDIRECT
    });
  }
}
