require('dotenv').config();

const sslConfig =
  process.env.DB_SSL === 'true'
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : {};

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false,
    dialectOptions: sslConfig,
  },

  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false,
    dialectOptions: sslConfig,
  },
};