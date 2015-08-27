'use strict';

exports.__esModule = true;

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _messages = require('../messages');

var moduleMessages = _interopRequireWildcard(_messages);

var url = 'https://getpocket.com/v3/get';

exports['default'] = function (params, config, imports) {
  var request = imports.request;
  var messages = imports.messages;
  var random = imports.random;
  var accessToken = config.accessToken;
  var consumerKey = config.consumerKey;

  var _params = _slicedToArray(params, 1);

  var _params$0 = _params[0];
  var count = _params$0 === undefined ? 1 : _params$0;

  return request.post(url, {
    body: {
      consumer_key: consumerKey,
      access_token: accessToken,
      detailType: 'simple'
    }
  }).then(function (res) {
    var list = JSON.parse(res.body).list;

    moduleMessages.results(messages, random(list, count));
  })['catch'](function (err) {
    return messages.error(err.stack);
  });
};

module.exports = exports['default'];