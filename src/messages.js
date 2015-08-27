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

export function accessToken(messages, token) {
  messages.info(
    `Add access_token to your ~/.randerrc:

{
  "pocket": { "accessToken": "${token}" }
}`);
}

export default function serverStarted(messages, appUrl) {
  messages.info(`Open ${appUrl} in your browser to complete setup.`);
}
