export const server =
  process.env.REACT_APP_ENV === 'production'
    ? 'https://your-backend.azurewebsites.net'
    : process.env.REACT_APP_ENV === 'staging'
    ? 'https://your-backend-staging.azurewebsites.net'
    : 'http://localhost:17525';

export const webAPIUrl = `${server}/api`;

export const authSettings = {
  domain: 'bobjac.auth0.com',
  client_id: 'bkZ0f24xJYxIQwH9ka3LHmtHUWIqsNzZ',
  redirect_uri: window.location.origin + '/signin-callback',
  scope: 'openid profile QandAAPI email',
  audience: 'https://quickstarts/api',
};