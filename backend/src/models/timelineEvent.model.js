// src/models/timelineEvent.model.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class TimelineEvent extends Model {}

TimelineEvent.init(
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
    created_by: {
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
    event_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    event_type: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'custom',
    },
    emoji: {
      type: DataTypes.STRING(20),
      allowNull: true,
      defaultValue: '❤️',
    },
  },
  {
    sequelize,
    modelName: 'TimelineEvent',
    tableName: 'timeline_events',
    timestamps: true,
    underscored: true,
    indexes: [
      { fields: ['couple_id'] },
      { fields: ['created_by'] },
      { fields: ['event_date'] },
    ],
  }
);

module.exports = TimelineEvent;
