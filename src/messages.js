export function needSetup(messages, token, consumerKey) {
  const msg = [];

  if (!token) {
    msg.push('no access token');
  }

  if (!consumerKey) {
    msg.push('no consumer key');
  }

  messages.warning(`There is ${msg.join(' and ')} in .randerrc. Please try to run -> rander pocket setup`);
}

export function noConsumerKey(messages) {
  messages.warning(
    `You should pass consumer key as argument -> rander setup pocket consumer_key.
To generate consumer key go to https://getpocket.com/developer/ and create app.
`
  );
}

export function start(messages) {
  messages.info('Pocket setup started.');
}

export function noNeedSetup(messages) {
  messages.info('Access token exists. No need to setup again.');
}

export function accessToken(messages, token, consumerKey) {
  messages.info(
    `Add access_token to your ~/.randerrc:

{
  "pocket": {
    "consumerKey": "${consumerKey}",
    "accessToken": "${token}"
  }
}`);
}

export function serverStarted(messages, appUrl) {
  messages.info(`Open ${appUrl} in your browser to complete setup.`);
}

export function commandNotFound(messages, command) {
  messages.error(`Command ${command} not found in rander-pocket transport.`);
}

export function results(messages, list) {
  list.forEach(item => {
    const title = item.resolved_title || item.given_title;
    const url = item.resolved_url || item.given_url;

    messages.result(title, url);
  });
}
