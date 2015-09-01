import http from 'http';

const requestUrl = 'https://getpocket.com/v3/oauth/request';
const authorizeUrl = 'https://getpocket.com/auth/authorize';
const authorizeApiUrl = 'https://getpocket.com/v3/oauth/authorize';
const port = 2808;
const returnUrl = `http://localhost:${port}/auth`;
const appUrl = `http://localhost:${port}`;

const headers = {
  'content-type': 'application/x-www-form-urlencoded',
  'X-Accept': 'application/json'
};

function getRequestToken(request, key) {
  const options = {
    headers,
    body: 'consumer_key=' + key + '&redirect_uri=' + returnUrl
  };

  return request.post(requestUrl, options).then(res => {
    return JSON.parse(res.body).code;
  });
}

function getAccessToken(request, key, requestToken) {
  const options = {
    headers,
    body: 'consumer_key=' + key + '&code=' + requestToken + '&redirect_uri=pocketapp1234:authorizationFinished'
  };

  return request.post(authorizeApiUrl, options).then(res => {
    return JSON.parse(res.body).access_token;
  });
}

function authorize(messages, requestToken) {
  messages.serverStarted(appUrl);

  return new Promise(resolve => {
    const server = http.createServer((req, res) => {
      if (req.url === '/') {
        res.writeHead(301, {
          Location: `${authorizeUrl}?request_token=${requestToken}&redirect_uri=${returnUrl}`
        });
        res.end();
      }

      if (req.url === '/auth') {
        resolve(requestToken);
        res.end('Complete. You can now close this window.');

        req.connection.end();
        server.close();
      }
    });

    server.listen(port);
  });
}

export default function tokens(request, messages, consumerKey) {
  return getRequestToken(request, consumerKey)
    .then(requestToken => authorize(messages, requestToken))
    .then(requestToken => getAccessToken(request, consumerKey, requestToken));
}
