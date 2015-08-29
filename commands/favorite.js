'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _messages = require('../messages');

var _messages2 = _interopRequireDefault(_messages);

var url = 'https://getpocket.com/v3/get';

exports['default'] = function (params, config, imports) {
  var moduleMessages = _messages2['default'](imports);

  var request = imports.request;
  var messages = imports.messages;
  var random = imports.random;
  var accessToken = config.accessToken;
  var consumerKey = config.consumerKey;
  var _params$count = params.count;
  var count = _params$count === undefined ? 1 : _params$count;

  return request.post(url, {
    body: {
      consumer_key: consumerKey,
      access_token: accessToken,
      detailType: 'simple'
    }
  }).then(function (res) {
    var list = JSON.parse(res.body).list;

    moduleMessages.results(random(list, count));
  })['catch'](function (err) {
    return messages.error(err.stack);
  });
};

module.exports = exports['default'];