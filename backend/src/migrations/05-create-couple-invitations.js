'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable(
            'couple_invitations',
            {
                id: {
                    type: Sequelize.UUID,
                    defaultValue: Sequelize.UUIDV4,
                    primaryKey: true,
                    allowNull: false,
                },

                sender_id: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    references: {
                        model: 'users',
                        key: 'id',
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },

                receiver_id: {
                    type: Sequelize.UUID,
                    allowNull: false,
                    references: {
                        model: 'users',
                        key: 'id',
                    },
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE',
                },

                message: {
                    type: Sequelize.STRING(500),
                    allowNull: true,
                },

                status: {
                    type: Sequelize.ENUM(
                        'pending',
                        'accepted',
                        'rejected',
                        'cancelled',
                        'expired'
                    ),
                    allowNull: false,
                    defaultValue: 'pending',
                },

                expires_at: {
                    type: Sequelize.DATE,
                    allowNull: false,
                },

                accepted_at: {
                    type: Sequelize.DATE,
                    allowNull: true,
                },

                rejected_at: {
                    type: Sequelize.DATE,
                    allowNull: true,
                },

                cancelled_at: {
                    type: Sequelize.DATE,
                    allowNull: true,
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
            }
        );

        await queryInterface.addIndex(
            'couple_invitations',
            ['sender_id']
        );

        await queryInterface.addIndex(
            'couple_invitations',
            ['receiver_id']
        );

        await queryInterface.addIndex(
            'couple_invitations',
            ['status']
        );
    },

    async down(queryInterface) {
        await queryInterface.dropTable(
            'couple_invitations'
        );

        await queryInterface.sequelize.query(
            'DROP TYPE IF EXISTS "enum_couple_invitations_status";'
        );
    },
};