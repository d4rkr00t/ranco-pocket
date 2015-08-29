'use strict';

exports.__esModule = true;

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

exports.help = help;
exports.setup = setup;
exports.run = run;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _messages = require('./messages');

var _messages2 = _interopRequireDefault(_messages);

var _tokens = require('./tokens');

var _tokens2 = _interopRequireDefault(_tokens);

var _commandsFavorite = require('./commands/favorite');

var _commandsFavorite2 = _interopRequireDefault(_commandsFavorite);

var NAME = 'pocket';

function help() {
  return ['fav -c <count> — show count | 1 random favorite entry from pocket.'];
}

function setup(args, flags, config, imports) {
  var moduleMessages = _messages2['default'](imports);
  var messages = imports.messages;
  var request = imports.request;

  var _args = _slicedToArray(args, 1);

  var consumerKey = _args[0];

  if (!consumerKey) {
    moduleMessages.noConsumerKey();
    return;
  }

  if (!config.accessToken || !config.consumerKey) {
    moduleMessages.start();

    _tokens2['default'](request, moduleMessages, consumerKey).then(function (accessToken) {
      return moduleMessages.accessToken(accessToken, consumerKey);
    })['catch'](function (err) {
      return messages.error(err.message);
    });
  } else {
    messages.noNeedSetup();
  }
}

function run(args, flags, config, imports) {
  var commonMessages = imports.messages;
  var moduleMessages = _messages2['default'](imports);

  var _args2 = _slicedToArray(args, 1);

  var command = _args2[0];
  var count = flags.c;

  if (!config.accessToken || !config.consumerKey) {
    moduleMessages.needSetup(config.accessToken, config.consumerKey);
    return null;
  }

  switch (command) {
    case 'fav':
      return _commandsFavorite2['default']({ count: count }, config, imports);
    default:
      commonMessages.commandNotFound(NAME, command);
      commonMessages.help(NAME, help());

      return Promise.reject('Command not found');
  }
}