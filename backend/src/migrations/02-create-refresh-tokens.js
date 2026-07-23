'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('refresh_tokens', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },

            user_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },

            token_hash: {
                type: Sequelize.STRING(255),
                allowNull: false,
                unique: true,
            },

            expires_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },

            last_used_at: {
                type: Sequelize.DATE,
                allowNull: true,
            },

            revoked_at: {
                type: Sequelize.DATE,
                allowNull: true,
            },

            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },

            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });

        await queryInterface.addIndex(
            'refresh_tokens',
            ['user_id']
        );

        await queryInterface.addIndex(
            'refresh_tokens',
            ['expires_at']
        );

        await queryInterface.addIndex(
            'refresh_tokens',
            ['revoked_at']
        );
    },

    async down(queryInterface) {
        await queryInterface.dropTable('refresh_tokens');
    },
};