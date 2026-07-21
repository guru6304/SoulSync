const { DataTypes, Model } = require('sequelize');

class User extends Model {}

const initializeUserModel = (sequelize) => {
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
        validate: { len: [2, 100] },
      },
      last_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: { len: [1, 100] },
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        set(value) {
          this.setDataValue('username', value.toLowerCase().trim());
        },
        validate: {
          len: [3, 30],
          is: /^[a-z0-9_]+$/i,
        },
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        set(value) {
          this.setDataValue('email', value.toLowerCase().trim());
        },
        validate: { isEmail: true },
      },
      password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      profile_picture: {
        type: DataTypes.STRING(2048),
        allowNull: true,
        validate: { isUrl: true },
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: { len: [0, 500] },
      },
      date_of_birth: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      gender: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      is_email_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
      underscored: true,
      paranoid: false,
      freezeTableName: true,
      defaultScope: {
        attributes: {
          exclude: ['password_hash'],
        },
      },
      indexes: [
        { unique: true, fields: ['email'] },
        { unique: true, fields: ['username'] },
      ],
    },
  );

  return User;
};

module.exports = { User, initializeUserModel };
