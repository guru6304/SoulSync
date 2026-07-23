// src/models/answer.model.js

const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Answer extends Model {}

Answer.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    couple_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    question_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    answered_by: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    cycle_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },

    answered_for_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Answer",
    tableName: "question_answers",
    freezeTableName: true,
    timestamps: true,
    underscored: true,

    indexes: [
      { fields: ["couple_id"] },
      { fields: ["question_id"] },
      { fields: ["answered_by"] },
      {
        unique: true,
        fields: ["answered_by", "question_id", "answered_for_date"],
      },
    ],
  },
);

module.exports = Answer;
