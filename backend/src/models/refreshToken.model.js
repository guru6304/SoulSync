const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class RefreshToken extends Model {}

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
        },

        token_hash: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },

        expires_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        last_used_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        revoked_at: {
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
        freezeTableName: true,

        indexes: [
            {
                fields: ['user_id'],
            },
            {
                unique: true,
                fields: ['token_hash'],
            },
            {
                fields: ['expires_at'],
            },
            {
                fields: ['revoked_at'],
            },
        ],
    }
);

module.exports = RefreshToken;