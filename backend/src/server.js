require('dotenv').config();
const http = require('http');
const app = require('./app');
const sequelize = require('./config/database');
const logger = require('./utils/logger');
const { seedQuestionsIfEmpty } = require('./utils/seeder');

const server = http.createServer(app);

const fixNullableCoupleIdColumns = async () => {
    const tables = ['question_answers', 'letters', 'moods', 'memories', 'say_somethings'];
    for (const table of tables) {
        try {
            await sequelize.query(`ALTER TABLE \`${table}\` MODIFY \`couple_id\` CHAR(36) NULL;`);
            logger.info(`Successfully set ${table}.couple_id to ALLOW NULL.`);
        } catch (err) {
            // Non-fatal if already allows NULL or table doesn't exist yet
        }
    }
};

const startServer = async () => {
    try {
        await sequelize.authenticate();
        logger.info('Database connected successfully.');

        try {
            await sequelize.sync();
            logger.info('Database synchronized successfully.');
        } catch (syncError) {
            logger.warn('Sequelize sync warning (non-fatal):', syncError.message);
        }

        // Alter existing MySQL tables to allow NULL couple_id
        await fixNullableCoupleIdColumns();

        // Auto-seed questions if table is empty (safe to run every startup)
        await seedQuestionsIfEmpty();

        server.listen(process.env.PORT || 5000, () => {
            logger.info(`Server running on port ${process.env.PORT || 5000}`);
        });
    } catch (error) {
        logger.error('Unable to connect to database:', error);
        process.exit(1);
    }
};

startServer();