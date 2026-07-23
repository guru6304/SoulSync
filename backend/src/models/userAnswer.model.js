// src/models/userAnswer.model.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class UserAnswer extends Model {}

UserAnswer.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    question_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    answer_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    cycle_number: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: 'UserAnswer',
    tableName: 'user_answers',
    timestamps: true,
    underscored: true,
    indexes: [
      { fields: ['user_id'] },
      { fields: ['question_id'] },
    ],
  }
);

module.exports = UserAnswer;