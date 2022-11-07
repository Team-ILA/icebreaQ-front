const { config } = require('dotenv');

config();

module.exports = {
  API_HOST: process.env.API_HOST || 'localhost',
};
