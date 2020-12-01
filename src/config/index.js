const SERVER_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'PRODUCT';

module.exports = { SERVER_URL };
