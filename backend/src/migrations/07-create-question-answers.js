'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('question_answers', {
      id: {
        type: Sequelize.UUID,
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

      question_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'questions',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      answered_by: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },

      content: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      cycle_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
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

    await queryInterface.addIndex('question_answers', ['couple_id']);
    await queryInterface.addIndex('question_answers', ['question_id']);
    await queryInterface.addIndex('question_answers', ['answered_by']);

    await queryInterface.addConstraint('question_answers', {
      fields: ['answered_by', 'question_id', 'cycle_number'],
      type: 'unique',
      name: 'uq_question_answers_user_question_cycle',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('question_answers');
  },
};