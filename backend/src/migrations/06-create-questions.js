'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('questions', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },

      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      category: {
        type: Sequelize.ENUM(
          'romantic',
          'funny',
          'deep',
          'daily',
          'future',
          'memories',
          'celebration',
          'games',
        ),
        allowNull: false,
      },

      answer_type: {
        type: Sequelize.ENUM(
          'text',
          'image',
          'video',
          'audio',
          'music',
          'mixed'
        ),
        allowNull: false,
      },

      display_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },

      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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

    await queryInterface.addIndex('questions', ['category']);
    await queryInterface.addIndex('questions', ['is_active']);
    await queryInterface.addIndex('questions', ['display_order']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('questions');

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS enum_questions_category;'
    ).catch(() => {});

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS enum_questions_answer_type;'
    ).catch(() => {});
  },
};