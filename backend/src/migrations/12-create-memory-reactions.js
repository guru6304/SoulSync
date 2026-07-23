'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('memory_reactions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      memory_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'memories', 
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      type: {
        type: Sequelize.ENUM('LIKE', 'LOVE', 'LAUGH', 'WOW', 'SAD', 'ANGRY'),
        allowNull: false
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

    await queryInterface.addConstraint('memory_reactions', {
      fields: ['memory_id', 'user_id'],
      type: 'unique',
      name: 'unique_memory_user_reaction'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('memory_reactions', 'unique_memory_user_reaction');
    await queryInterface.dropTable('memory_reactions');
  }
};