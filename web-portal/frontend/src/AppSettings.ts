export const server =
  process.env.REACT_APP_ENV === 'production'
    ? 'http://localhost:8080'
    : process.env.REACT_APP_ENV === 'staging'
    ? 'http://localhost:8080'
    : 'http://localhost:8080';

//export const webAPIUrl = `${server}/api`;
export const webAPIUrl = 'http://localhost:8080';

export const authSettings = {
  domain: '[DOMAIN GOES HERE]',
  client_id: '[CLIENT ID GOES HERE]',
  redirect_uri: window.location.origin + '/signin-callback',
  scope: 'read:datasets',
  audience: '[AUDIENCE GOES HERE]',
};
