import moduleMessagesCreator from './messages';
import tokens from './tokens';

import execCommand from './commands';

export function help() {
  return [
    'Usage',
    '  any      random entry from pocket',
    '  fav      random favorite entry from pocket',
    '  archive  random archive entry from pocket',
    '  article  random article from pocket',
    '  image    random image from pocket',
    '  video    random video from pocket',
    '',
    'Transport specific options',
    '  -f  turn on only favorite mode for archive, article, image and video commands [Default: false]',
    '',
    'Examples',
    '  rander pocket fav -c 3         show 3 random favorite entry from pocket',
    '  rander pocket article -c 3 -f  show 3 random favorite article from pocket'
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
