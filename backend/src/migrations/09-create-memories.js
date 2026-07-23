'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('memories', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },

            couple_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'couples',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },

            creator_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },

            title: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },

            description: {
                type: Sequelize.TEXT,
                allowNull: true,
            },

            visibility: {
                type: Sequelize.ENUM(
                    'private',
                    'shared',
                    'public'
                ),
                allowNull: false,
                defaultValue: 'private',
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

        await queryInterface.addIndex('memories', ['couple_id']);
        await queryInterface.addIndex('memories', ['creator_id']);
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('memories');
    },
};