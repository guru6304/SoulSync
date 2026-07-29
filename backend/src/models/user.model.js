// src/models/user.model.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password_hash: {
  type: DataTypes.STRING(255),
  allowNull: false,
},

is_active: {
  type: DataTypes.BOOLEAN,
  allowNull: false,
  defaultValue: true,
},

last_login_at: {
  type: DataTypes.DATE,
  allowNull: true,
},
last_login_at: {
    type: DataTypes.DATE,
    allowNull: true,
},

profile_picture: {
    type: DataTypes.STRING(500),
    allowNull: true,
},
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    underscored: true,
  }
);

module.exports = User;