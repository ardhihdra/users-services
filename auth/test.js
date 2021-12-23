var axios = require("axios").default;

/** use token */

var options_refresh = {
  method: 'POST',
  url: 'https://YOUR_DOMAIN/oauth/token',
  headers: {'content-type': 'application/x-www-form-urlencoded'},
  data: {
    grant_type: 'refresh_token',
    client_id: 'YOUR_CLIENT_ID',
    client_secret: 'YOUR_CLIENT_SECRET',
    refresh_token: 'YOUR_REFRESH_TOKEN'
  }
};
/**
 *   return somtehing like
 * {
  "access_token": "eyJ...MoQ",
  "expires_in": 86400,
  "scope": "openid offline_access",
  "id_token": "eyJ...0NE",
  "token_type": "Bearer"
}
 */

var options_get_token = {
    method: 'POST',
    url: 'https://YOUR_DOMAIN/oauth/token',
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    data: {
      grant_type: 'authorization_code',
      client_id: 'YOUR_CLIENT_ID',
      client_secret: 'YOUR_CLIENT_SECRET',
      code: 'YOUR_AUTHORIZATION_CODE',
      redirect_uri: 'https://YOUR_APP/callback'
    }
};

/**
 * {
      "access_token": "JWT eyJz93a...k4laUWw",
      "refresh_token": "GEbRxBN...edjnXbL",
      "token_type": "JWT"
    }
 */


var options_revoke = {
    method: 'POST',
    url: 'https://YOUR_DOMAIN/oauth/revoke',
    headers: {'content-type': 'application/json'},
    data: {
        client_id: 'YOUR_CLIENT_ID',
        client_secret: 'YOUR_CLIENT_SECRET', //opt
        token: 'YOUR_REFRESH_TOKEN'
    }
};
axios.request(options).then(function (response) {
  console.log(response.data);
}).catch(function (error) {
  console.error(error);
});

