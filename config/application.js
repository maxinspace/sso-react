const dotenv = require('dotenv');

dotenv.load();

module.exports = Object.assign(
  {},
  require(`./env/${process.env.NODE_ENV}.js`),
  {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    appDir: 'app',
    distDir: 'dist',
    configDir: 'config',
    apiTarget: process.env.API_TARGET,
    [process.env.NODE_ENV]: true
  }
);
