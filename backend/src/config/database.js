const sequelize = require('./sequelize');
const logger = require('../utils/logger');

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database Connected Successfully');
  } catch (error) {
    logger.error('Database connection failed', error);
    process.exit(1);
  }
};

module.exports = connectDatabase;
