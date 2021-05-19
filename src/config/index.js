const SERVER_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : 'https://subtalkapi.devhak.xyz';

module.exports = { SERVER_URL };
