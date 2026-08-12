'use strict';

/**
 * Migration to make couple_id nullable in `moods`, `letters`, and `question_answers` tables
 * so users can log moods, write letters, and submit question answers without requiring an active couple.
 */
module.exports = {
  async up(queryInterface, Sequelize) {
    const moodsColumns = await queryInterface.describeTable('moods');
    if (moodsColumns.couple_id && !moodsColumns.couple_id.allowNull) {
      await queryInterface.changeColumn('moods', 'couple_id', {
        type: Sequelize.UUID,
        allowNull: true,
      });
    }

    const lettersColumns = await queryInterface.describeTable('letters');
    if (lettersColumns.couple_id && !lettersColumns.couple_id.allowNull) {
      await queryInterface.changeColumn('letters', 'couple_id', {
        type: Sequelize.UUID,
        allowNull: true,
      });
    }

    const answersColumns = await queryInterface.describeTable('question_answers');
    if (answersColumns.couple_id && !answersColumns.couple_id.allowNull) {
      await queryInterface.changeColumn('question_answers', 'couple_id', {
        type: Sequelize.UUID,
        allowNull: true,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const moodsColumns = await queryInterface.describeTable('moods');
    if (moodsColumns.couple_id) {
      await queryInterface.changeColumn('moods', 'couple_id', {
        type: Sequelize.UUID,
        allowNull: false,
      });
    }

    const lettersColumns = await queryInterface.describeTable('letters');
    if (lettersColumns.couple_id) {
      await queryInterface.changeColumn('letters', 'couple_id', {
        type: Sequelize.UUID,
        allowNull: false,
      });
    }

    const answersColumns = await queryInterface.describeTable('question_answers');
    if (answersColumns.couple_id) {
      await queryInterface.changeColumn('question_answers', 'couple_id', {
        type: Sequelize.UUID,
        allowNull: false,
      });
    }
  },
};
