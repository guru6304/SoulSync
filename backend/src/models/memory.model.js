// src/models/memory.model.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Memory extends Model {}

Memory.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    couple_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    creator_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    visibility: {
      type: DataTypes.ENUM('private', 'shared', 'public'),
      defaultValue: 'private',
    },
  },
  {
    sequelize,
    modelName: 'Memory',
    tableName: 'memories',
    timestamps: true,
    underscored: true,
    indexes: [
      { fields: ['couple_id'] },
      { fields: ['creator_id'] },
    ],
  }
);

module.exports = Memory;