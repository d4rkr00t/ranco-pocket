'use strict';

exports.__esModule = true;
exports['default'] = setupModuleMessages;

function setupModuleMessages(imports) {
  var messages = imports.messages;

  return {
    needSetup: function needSetup(token, consumerKey) {
      var msg = [];

      if (!token) {
        msg.push('no access token');
      }

      if (!consumerKey) {
        msg.push('no consumer key');
      }

      messages.warning('There is ' + msg.join(' and ') + ' in .randerrc. Please try to run -> rander setup pocket');
    },

    noConsumerKey: function noConsumerKey() {
      messages.warning('You should pass consumer key as argument -> rander setup pocket consumer_key.\nTo generate consumer key go to https://getpocket.com/developer/ and create app.');
    },

    start: function start() {
      messages.info('Pocket setup started.');
    },

    noNeedSetup: function noNeedSetup() {
      messages.info('Access token and consumer key exists. No need to setup again.');
    },

    accessToken: function accessToken(token, consumerKey) {
      messages.info('Add access_token to your ~/.randerrc:\n\n{\n  "pocket": {\n    "consumerKey": "' + consumerKey + '",\n    "accessToken": "' + token + '"\n  }\n}');
    },

    serverStarted: function serverStarted(appUrl) {
      messages.info('Open ' + appUrl + ' in your browser to complete setup.');
    },

    results: function results(list) {
      var chalk = imports.chalk;

      messages.results(list.map(function (item) {
        var title = item.resolved_title || item.given_title;
        var url = item.resolved_url || item.given_url;
        var pocketUrl = 'https://getpocket.com/a/read/' + item.item_id;

        return title + ' — [ ' + chalk.cyan(url) + ' ] [ ' + chalk.gray(pocketUrl) + ' ]';
      }));
    }
  };
}

module.exports = exports['default'];