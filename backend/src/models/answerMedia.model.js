// src/models/answerMedia.model.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class AnswerMedia extends Model {}

AnswerMedia.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    answer_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    uploaded_by: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    media_type: {
      type: DataTypes.ENUM(
        'image',
        'video',
        'audio',
        'music'
      ),
      allowNull: false,
    },

    file_url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    public_id: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    display_order: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
},

    thumbnail_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    mime_type: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },

    original_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    file_size: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },

    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: 'Duration in seconds',
    },
  },
  {
    sequelize,
    modelName: 'AnswerMedia',
    tableName: 'question_answer_media',
    freezeTableName: true,
    timestamps: true,
    underscored: true,

    indexes: [
      { fields: ['answer_id'] },
      { fields: ['uploaded_by'] },
      { fields: ['media_type'] },
    ],
  }
);

module.exports = AnswerMedia;