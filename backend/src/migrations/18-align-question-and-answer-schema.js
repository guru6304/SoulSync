"use strict";

const moodValues = [
  "romantic", "happy", "sad", "angry", "funny",
  "missing_you", "sleepy", "celebration", "need_hug",
];

module.exports = {
  async up(queryInterface, Sequelize) {
    const questions = await queryInterface.describeTable("questions");

    // `category` belongs to the retired question taxonomy.  The current
    // model/seed data uses mood_type, so permit existing and new records to
    // omit it without rewriting or discarding any old questions.
    if (questions.category) {
      await queryInterface.changeColumn("questions", "category", {
        type: Sequelize.ENUM("romantic", "funny", "deep", "daily", "future", "memories", "celebration", "games"),
        allowNull: true,
      });
    }
    if (!questions.mood_type) {
      await queryInterface.addColumn("questions", "mood_type", {
        type: Sequelize.ENUM(...moodValues), allowNull: true,
      });
      await queryInterface.addIndex("questions", ["mood_type"]);
    }
    if (!questions.options) await queryInterface.addColumn("questions", "options", { type: Sequelize.JSON, allowNull: true });
    if (!questions.priority) await queryInterface.addColumn("questions", "priority", { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 });
    if (!questions.estimated_seconds) await queryInterface.addColumn("questions", "estimated_seconds", { type: Sequelize.INTEGER, allowNull: false, defaultValue: 30 });

    const answers = await queryInterface.describeTable("question_answers");
    if (!answers.answered_for_date) await queryInterface.addColumn("question_answers", "answered_for_date", { type: Sequelize.DATEONLY, allowNull: true });
    if (!answers.is_viewed) await queryInterface.addColumn("question_answers", "is_viewed", { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false });
    if (!answers.viewed_at) await queryInterface.addColumn("question_answers", "viewed_at", { type: Sequelize.DATE, allowNull: true });
  },

  async down(queryInterface) {
    // Down is intentionally conservative: these columns carry live answer
    // history once deployed, so schema rollback must be an explicit decision.
    return queryInterface.sequelize.query("SELECT 1");
  },
};
