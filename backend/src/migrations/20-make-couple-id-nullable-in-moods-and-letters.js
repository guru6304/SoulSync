'use strict';

/**
 * Migration to make couple_id nullable in both `moods` and `letters` tables
 * so users can create personal moods and letters without requiring an active couple.
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
  },
};
