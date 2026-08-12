const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Letter extends Model {}

Letter.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    couple_id: {
      type: DataTypes.UUID,
      allowNull: true,   // null = personal draft (no couple yet)
    },
    sender_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mood: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'Romantic ❤️',
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    read_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Letter',
    tableName: 'letters',
    freezeTableName: true,
    timestamps: true,
    underscored: true,
    indexes: [
      {
        fields: ['couple_id'],
      },
      {
        fields: ['sender_id'],
      },
    ],
  }
);

module.exports = Letter;
