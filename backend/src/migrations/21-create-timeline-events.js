'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('timeline_events', {
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
      created_by: {
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
      event_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      event_type: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'custom',
      },
      emoji: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: '❤️',
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

    await queryInterface.addIndex('timeline_events', ['couple_id']);
    await queryInterface.addIndex('timeline_events', ['created_by']);
    await queryInterface.addIndex('timeline_events', ['event_date']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('timeline_events');
  },
};
