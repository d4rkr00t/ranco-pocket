'use strict';

exports.__esModule = true;
exports['default'] = tokens;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _messages = require('./messages');

var moduleMessages = _interopRequireWildcard(_messages);

var requestUrl = 'https://getpocket.com/v3/oauth/request';
var authorizeUrl = 'https://getpocket.com/auth/authorize';
var authorizeApiUrl = 'https://getpocket.com/v3/oauth/authorize';
var port = 2808;
var returnUrl = 'http://localhost:' + port + '/auth';
var appUrl = 'http://localhost:' + port;

var headers = {
  'content-type': 'application/x-www-form-urlencoded',
  'X-Accept': 'application/json'
};

function getRequestToken(request, key) {
  var options = {
    headers: headers,
    body: 'consumer_key=' + key + '&redirect_uri=' + returnUrl
  };

  return request.post(requestUrl, options).then(function (res) {
    return JSON.parse(res.body).code;
  });
}

function getAccessToken(request, key, requestToken) {
  var options = {
    headers: headers,
    body: 'consumer_key=' + key + '&code=' + requestToken + '&redirect_uri=pocketapp1234:authorizationFinished'
  };

  return request.post(authorizeApiUrl, options).then(function (res) {
    return JSON.parse(res.body).access_token;
  });
}

function authorize(messages, requestToken) {
  moduleMessages.serverStarted(messages, appUrl);

  return new Promise(function (resolve) {
    var server = _http2['default'].createServer(function (req, res) {
      if (req.url === '/') {
        res.writeHead(301, {
          Location: authorizeUrl + '?request_token=' + requestToken + '&redirect_uri=' + returnUrl
        });
        res.end();
      }

      if (req.url === '/auth') {
        resolve(requestToken);
        res.end('Complete. You can now close this window.');

        req.connection.end();
        server.close();
      }
    });

    server.listen(port);
  });
}

function tokens(request, messages, consumerKey) {
  return getRequestToken(request, consumerKey).then(function (requestToken) {
    return authorize(messages, requestToken);
  }).then(function (requestToken) {
    return getAccessToken(request, consumerKey, requestToken);
  });
}

module.exports = exports['default'];