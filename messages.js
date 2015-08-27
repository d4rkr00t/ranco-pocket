'use strict';

exports.__esModule = true;
exports.noConsumerKey = noConsumerKey;
exports.start = start;
exports.noNeedSetup = noNeedSetup;
exports.accessToken = accessToken;
exports['default'] = serverStarted;

function noConsumerKey(messages) {
  messages.warning('You should pass consumer key as argument -> rander setup pocket consumer_key.\nTo generate consumer key go to https://getpocket.com/developer/ and create app.\n');
}

function start(messages) {
  messages.info('Pocket setup started.');
}

function noNeedSetup(messages) {
  messages.info('Access token exists. No need to setup again.');
}

function accessToken(messages, token) {
  messages.info('Add access_token to your ~/.randerrc:\n\n{\n  "pocket": { "accessToken": "' + token + '" }\n}');
}

function serverStarted(messages, appUrl) {
  messages.info('Open ' + appUrl + ' in your browser to complete setup.');
}