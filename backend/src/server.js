require('dotenv').config();
const http = require('http');
const app = require('./app');
const sequelize = require('./config/database');
const logger = require('./utils/logger');

const server = http.createServer(app);

const startServer = async () => {
    try {
        await sequelize.authenticate();
        logger.info('Database connected successfully.');
        await sequelize.sync({ alter: true });
        logger.info('Database synchronized successfully (alter mode).');
        server.listen(process.env.PORT || 5000, () => {
            logger.info(`Server running on port ${process.env.PORT || 5000}`);
        });
    } catch (error) {
        logger.error('Unable to connect to database:', error);
        process.exit(1);
    }
};

startServer();