const { DataTypes, Model } = require('sequelize');

class RefreshToken extends Model {}

const initializeRefreshTokenModel = (sequelize) => {
  RefreshToken.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      token_hash: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      device_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      ip_address: {
        type: DataTypes.STRING(45),
        allowNull: true,
      },
      user_agent: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      last_used_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'RefreshToken',
      tableName: 'refresh_tokens',
      timestamps: true,
      underscored: true,
      paranoid: false,
      freezeTableName: true,
      indexes: [
        { fields: ['user_id'] },
        { fields: ['expires_at'] },
      ],
    },
  );

  return RefreshToken;
};

module.exports = { RefreshToken, initializeRefreshTokenModel };
