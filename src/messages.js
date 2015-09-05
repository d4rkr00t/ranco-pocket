export default function setupModuleMessages(imports) {
  const messages = imports.messages;

  return {
    needSetup(token, consumerKey) {
      const msg = [];

      if (!token) {
        msg.push('no access token');
      }

      if (!consumerKey) {
        msg.push('no consumer key');
      }

      messages.warning(`There is ${msg.join(' and ')} in .rancorc. Please try to run -> ranco setup pocket`);
    },

    noConsumerKey() {
      messages.warning(
        `You should pass consumer key as argument -> ranco setup pocket consumer_key.
To generate consumer key go to https://getpocket.com/developer/ and create app.`
      );
    },

    start() {
      messages.info('Pocket setup started.');
    },

    noNeedSetup() {
      messages.info('Access token and consumer key exists. No need to setup again.');
    },

    accessToken(token, consumerKey) {
      messages.info(
        `Add access_token to your ~/.rancorc:

{
  "pocket": {
    "consumerKey": "${consumerKey}",
    "accessToken": "${token}"
  }
}`
      );
    },

    serverStarted(appUrl) {
      messages.info(`Open ${appUrl} in your browser to complete setup.`);
    },

    results(list) {
      const chalk = imports.chalk;

      messages.results(list.map(item => {
        const title = item.resolved_title || item.given_title;
        const url = item.resolved_url || item.given_url;
        const pocketUrl = `https://getpocket.com/a/read/${item.item_id}`;

        return `${title} — [ ${chalk.cyan(url)} ] [ ${chalk.gray(pocketUrl)} ]`;
      }));
    }
  };
}
