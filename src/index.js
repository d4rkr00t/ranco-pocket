import * as moduleMessages from './messages';
import tokens from './tokens';

export function setup(params, config, imports) {
  const messages = imports.messages;
  const request = imports.request;

  const [consumerKey] = params;

  if (!consumerKey) {
    moduleMessages.noConsumerKey(messages);
    return;
  }

  if (!config.accessToken) {
    moduleMessages.start(messages);

    tokens(request, messages, consumerKey)
      .then(accessToken => moduleMessages(messages, accessToken))
      .catch(err => messages.error(err.message));
  } else {
    moduleMessages.noNeedSetup(messages);
  }
}
