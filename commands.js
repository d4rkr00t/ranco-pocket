'use strict';

exports.__esModule = true;
exports['default'] = pocketCommands;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

var url = 'https://getpocket.com/v3/get';

function pocketCommands(command, args, flags, config, imports) {
  var moduleMessages = _messages2['default'](imports);

  var request = imports.request;
  var messages = imports.messages;
  var random = imports.random;
  var accessToken = config.accessToken;
  var consumerKey = config.consumerKey;
  var _flags$c = flags.c;
  var count = _flags$c === undefined ? 1 : _flags$c;
  var fav = flags.f;

  var body = {
    consumer_key: consumerKey,
    access_token: accessToken,
    detailType: 'simple'
  };

  switch (command) {
    case 'fav':
      body.favorite = 1;
      break;
    case 'archive':
      body.state = 'archive';
      body.favorite = fav ? 1 : 0;
      break;
    case 'video':
      body.contentType = 'video';
      body.favorite = fav ? 1 : 0;
      break;
    case 'article':
      body.contentType = 'article';
      body.favorite = fav ? 1 : 0;
      break;
    case 'image':
      body.contentType = 'image';
      body.favorite = fav ? 1 : 0;
      break;
    default:
      break;
  }

  return request.post(url, { body: body }).then(function (res) {
    var list = JSON.parse(res.body).list;

    moduleMessages.results(random(list, count));
  })['catch'](function (err) {
    return messages.error(err.stack);
  });
}

module.exports = exports['default'];