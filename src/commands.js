import moduleMessagesCreator from './messages';

const url = 'https://getpocket.com/v3/get';

export default function pocketCommands(command, args, flags, config, imports) {
  const moduleMessages = moduleMessagesCreator(imports);

  const { request, messages, random } = imports;
  const { accessToken, consumerKey } = config;
  const { c: count = 1, f: fav } = flags;

  const body = {
    consumer_key: consumerKey,
    access_token: accessToken,
    detailType: 'simple'
  };

  switch (command) {
  case 'fav':
    body.favorite = 1;
    break;
  case 'archive':
    body.state = 'archive';
    body.favorite = fav ? 1 : 0;
    break;
  case 'video':
    body.contentType = 'video';
    body.favorite = fav ? 1 : 0;
    break;
  case 'article':
    body.contentType = 'article';
    body.favorite = fav ? 1 : 0;
    break;
  case 'image':
    body.contentType = 'image';
    body.favorite = fav ? 1 : 0;
    break;
  default:
    break;
  }

  return request.post(url, { body }).then(res => {
    const list = JSON.parse(res.body).list;

    moduleMessages.results(random(list, count));
  }).catch(err => messages.error(err.stack));
}
