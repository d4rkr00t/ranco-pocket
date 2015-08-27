import * as moduleMessages from '../messages';

const url = 'https://getpocket.com/v3/get';

export default function (params, config, imports) {
  const { request, messages, random } = imports;
  const { accessToken, consumerKey } = config;
  const [count = 1] = params;

  return request.post(url, {
    body: {
      consumer_key: consumerKey,
      access_token: accessToken,
      detailType: 'simple'
    }
  }).then(res => {
    const list = JSON.parse(res.body).list;

    moduleMessages.results(messages, random(list, count));
  }).catch(err => messages.error(err.stack));
}
