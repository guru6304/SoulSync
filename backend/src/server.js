require('dotenv').config();

const app = require('./app');
const connectDatabase = require('./config/database');
const logger = require('./utils/logger');

const port = Number.parseInt(process.env.PORT, 10) || 5000;

let server;

const shutdown = (signal) => {
  logger.info(`${signal} received. Closing HTTP server.`);
  server.close((error) => {
    if (error) {
      logger.error('Error while closing HTTP server', error);
      process.exit(1);
    }

    process.exit(0);
  });
};

const startServer = async () => {
  await connectDatabase();

  server = app.listen(port, () => {
    logger.info(`Soul Sync API listening on port ${port}`);
  });

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
};

startServer();
