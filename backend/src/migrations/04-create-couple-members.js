'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('couple_members', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                primaryKey: true,
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

            role: {
                type: Sequelize.ENUM(
                    'initiator',
                    'partner'
                ),
                allowNull: false,
                defaultValue: 'partner',
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

        await queryInterface.addConstraint(
            'couple_members',
            {
                fields: [
                    'couple_id',
                    'user_id',
                ],
                type: 'unique',
                name: 'unique_couple_member',
            }
        );
    },

    async down(queryInterface) {
        await queryInterface.removeConstraint(
            'couple_members',
            'unique_couple_member'
        );

        await queryInterface.dropTable(
            'couple_members'
        );

        await queryInterface.sequelize.query(
            'DROP TYPE IF EXISTS "enum_couple_members_role";'
        );
    },
};