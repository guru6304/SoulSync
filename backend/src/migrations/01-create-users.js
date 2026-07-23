'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },

            first_name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            last_name: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },

            username: {
                type: Sequelize.STRING(50),
                allowNull: false,
                unique: true,
            },

            email: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: true,
            },

            password_hash: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },

            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },

            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal(
                    'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
                ),
            },
        });

        await queryInterface.addIndex('users', ['username']);
        await queryInterface.addIndex('users', ['email']);
    },

    async down(queryInterface) {
        await queryInterface.dropTable('users');
    },
};