export const server =
  process.env.REACT_APP_ENV === 'production'
    ? 'http://localhost:8080'
    : process.env.REACT_APP_ENV === 'staging'
    ? 'http://localhost:8080'
    : 'http://localhost:8080';

//export const webAPIUrl = `${server}/api`;
export const webAPIUrl = 'http://localhost:8080';

export const authSettings = {
  domain: 'bobjac.auth0.com',
  client_id: 'UDEH8J0xr0DzraJtnwcjyB0Wj5hfIYPS',
  redirect_uri: window.location.origin + '/signin-callback',
  scope: 'read:datasets',
  audience: 'https://appownsdataapi',
};