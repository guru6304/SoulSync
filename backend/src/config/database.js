require('dotenv').config();
const { Sequelize } = require('sequelize');

let sequelize;

const sslConfig = process.env.DB_SSL === 'true' ? {
    ssl: {
        require: true,
        rejectUnauthorized: false
    }
} : {};

if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: process.env.DB_DIALECT || 'mysql',
        logging: false,
        dialectOptions: sslConfig
    });
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT || 3306),
            dialect: process.env.DB_DIALECT || 'mysql',
            logging: false,
            dialectOptions: sslConfig
        }
    );
}

module.exports = sequelize;