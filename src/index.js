import moduleMessagesCreator from './messages';
import tokens from './tokens';

import favorite from './commands/favorite';

const NAME = 'pocket';

export function help() {
  return [
    'fav -c <count> — show count | 1 random favorite entry from pocket.'
  ];
}

export function setup(args, flags, config, imports) {
  const moduleMessages = moduleMessagesCreator(imports);
  const { messages, request } = imports;

  const [consumerKey] = args;

  if (!consumerKey) {
    moduleMessages.noConsumerKey();
    return;
  }

  if (!config.accessToken || !config.consumerKey) {
    moduleMessages.start();

    tokens(request, moduleMessages, consumerKey)
      .then(accessToken => moduleMessages.accessToken(accessToken, consumerKey))
      .catch(err => messages.error(err.message));
  } else {
    messages.noNeedSetup();
  }
}

export function run(args, flags, config, imports) {
  const commonMessages = imports.messages;
  const moduleMessages = moduleMessagesCreator(imports);

  const [command] = args;
  const { c: count } = flags;

  if (!config.accessToken || !config.consumerKey) {
    moduleMessages.needSetup(config.accessToken, config.consumerKey);
    return null;
  }

  switch (command) {
  case 'fav':
    return favorite({ count }, config, imports);
  default:
    commonMessages.commandNotFound(NAME, command);
    commonMessages.help(NAME, help());

    return Promise.reject('Command not found');
  }
}
