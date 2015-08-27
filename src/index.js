import * as moduleMessages from './messages';
import tokens from './tokens';

import favorite from './commands/favorite';

export function setup(params, config, imports) {
  const messages = imports.messages;
  const request = imports.request;

  const [consumerKey] = params;

  if (!consumerKey) {
    moduleMessages.noConsumerKey(messages);
    return;
  }

  if (!config.accessToken || !config.consumerKey) {
    moduleMessages.start(messages);

    tokens(request, messages, consumerKey)
      .then(accessToken => moduleMessages.accessToken(messages, accessToken, consumerKey))
      .catch(err => messages.error(err.message));
  } else {
    moduleMessages.noNeedSetup(messages);
  }
}

export function run(params, config, imports) {
  const messages = imports.messages;

  const [command, ...options] = params;

  if (!config.accessToken || !config.consumerKey) {
    moduleMessages.needSetup(messages, config.accessToken, config.consumerKey);
    return null;
  }

  switch (command) {
  case 'fav':
    return favorite(options, config, imports);
  default:
    moduleMessages.commandNotFound(messages, command);
    return Promise.reject('Command not found');
  }
}
