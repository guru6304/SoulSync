// src/models/question.model.js

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Question extends Model {}

Question.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    mood_type: {
      type: DataTypes.ENUM(
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

    answer_type: {
      type: DataTypes.ENUM("text", "image", "video", "audio", "music", "mixed"),
      allowNull: false,
    },

    display_order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "Question",
    tableName: "questions",
    freezeTableName: true,
    timestamps: true,
    underscored: true,

    indexes: [
      { fields: ["mood_type"] },
      { fields: ["is_active"] },
      { fields: ["display_order"] },
    ],
  },
);

module.exports = Question;
