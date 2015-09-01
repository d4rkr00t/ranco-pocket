import moduleMessagesCreator from './messages';
import tokens from './tokens';

import execCommand from './commands';

export function help() {
  return [
    'any -c <count> — random entry from pocket',
    'fav -c <count> — random favorite entry from pocket',
    'archive -c <count> -f — random favorite entry from pocket if -f search in favorites.',
    'article -c <count> -f — random article from pocket if -f search in favorites',
    'image -c <count> -f — random image from pocket if -f search in favorites',
    'video -c <count> -f — random video from pocket if -f search in favorites'
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
      .catch(err => messages.error(err.stack));
  } else {
    moduleMessages.noNeedSetup();
  }
}

export function run(args, flags, config, imports) {
  const moduleMessages = moduleMessagesCreator(imports);

  const command = args.shift();

  if (!config.accessToken || !config.consumerKey) {
    moduleMessages.needSetup(config.accessToken, config.consumerKey);
    return null;
  }

  execCommand(command, args, flags, config, imports);
}
