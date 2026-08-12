'use strict';
/**
 * Fix: Migration 06 used `category` column, but the Question model uses `mood_type`.
 * Also adds the missing columns: options, priority, estimated_seconds.
 * Uses describeTable guards so it's safe to run against any DB state.
 */
module.exports = {
  async up(queryInterface, Sequelize) {
    const columns = await queryInterface.describeTable('questions');

    // Rename category -> mood_type if old schema exists
    if (columns.category && !columns.mood_type) {
      await queryInterface.renameColumn('questions', 'category', 'mood_type');
    }

    // Add mood_type if neither exists (fresh schema not yet created)
    if (!columns.category && !columns.mood_type) {
      await queryInterface.addColumn('questions', 'mood_type', {
        type: Sequelize.ENUM(
          'romantic', 'happy', 'funny', 'sad', 'angry',
          'missing_you', 'celebration', 'sleepy', 'need_hug'
        ),
        allowNull: false,
        defaultValue: 'romantic',
      });
    }

    if (!columns.options) {
      await queryInterface.addColumn('questions', 'options', {
        type: Sequelize.JSON,
        allowNull: true,
      });
    }

    if (!columns.priority) {
      await queryInterface.addColumn('questions', 'priority', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      });
    }

    if (!columns.estimated_seconds) {
      await queryInterface.addColumn('questions', 'estimated_seconds', {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 30,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const columns = await queryInterface.describeTable('questions');
    if (columns.mood_type) {
      await queryInterface.renameColumn('questions', 'mood_type', 'category');
    }
    if (columns.options) await queryInterface.removeColumn('questions', 'options');
    if (columns.priority) await queryInterface.removeColumn('questions', 'priority');
    if (columns.estimated_seconds) await queryInterface.removeColumn('questions', 'estimated_seconds');
  },
};
