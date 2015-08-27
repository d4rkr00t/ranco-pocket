'use strict';

exports.__esModule = true;
exports.needSetup = needSetup;
exports.noConsumerKey = noConsumerKey;
exports.start = start;
exports.noNeedSetup = noNeedSetup;
exports.accessToken = accessToken;
exports.serverStarted = serverStarted;
exports.commandNotFound = commandNotFound;
exports.results = results;

function needSetup(messages, token, consumerKey) {
  var msg = [];

  if (!token) {
    msg.push('no access token');
  }

  if (!consumerKey) {
    msg.push('no consumer key');
  }

  messages.warning('There is ' + msg.join(' and ') + ' in .randerrc. Please try to run -> rander pocket setup');
}

function noConsumerKey(messages) {
  messages.warning('You should pass consumer key as argument -> rander setup pocket consumer_key.\nTo generate consumer key go to https://getpocket.com/developer/ and create app.\n');
}

function start(messages) {
  messages.info('Pocket setup started.');
}

function noNeedSetup(messages) {
  messages.info('Access token exists. No need to setup again.');
}

function accessToken(messages, token, consumerKey) {
  messages.info('Add access_token to your ~/.randerrc:\n\n{\n  "pocket": {\n    "consumerKey": "' + consumerKey + '",\n    "accessToken": "' + token + '"\n  }\n}');
}

function serverStarted(messages, appUrl) {
  messages.info('Open ' + appUrl + ' in your browser to complete setup.');
}

function commandNotFound(messages, command) {
  messages.error('Command ' + command + ' not found in rander-pocket transport.');
}

function results(messages, list) {
  list.forEach(function (item) {
    var title = item.resolved_title || item.given_title;
    var url = item.resolved_url || item.given_url;
    var pocketUrl = 'https://getpocket.com/a/read/' + item.item_id;

    messages.result(title, url + ' — ' + pocketUrl);
  });
}