// src/models/memoryComment.model.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class MemoryComment extends Model {}

MemoryComment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    memory_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'MemoryComment',
    tableName: 'memory_comments',
    timestamps: true,
underscored: true,
freezeTableName: true,
    indexes: [
      { fields: ['memory_id'] },
      { fields: ['user_id'] },
    ],
  }
);

module.exports = MemoryComment;