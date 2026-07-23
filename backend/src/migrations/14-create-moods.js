"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("moods", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      couple_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "couples",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },

      mood_type: {
        type: Sequelize.ENUM(
          "romantic",
          "happy",
          "funny",
          "sad",
          "angry",
          "missing_you",
          "celebration",
          "sleepy",
          "need_hug",
        ),
        allowNull: false,
      },

      mood_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },

      note: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        ),
      },
    });

    await queryInterface.addIndex("moods", ["user_id"]);
    await queryInterface.addIndex("moods", ["couple_id"]);
    await queryInterface.addIndex("moods", ["mood_date"]);

    await queryInterface.addConstraint("moods", {
      fields: ["user_id", "mood_date"],
      type: "unique",
      name: "unique_user_daily_mood",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("moods");
  },
};
