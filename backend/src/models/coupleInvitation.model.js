const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class CoupleInvitation extends Model {}

CoupleInvitation.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        sender_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },

        receiver_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },

        message: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },

        status: {
            type: DataTypes.ENUM(
                'pending',
                'accepted',
                'rejected',
                'cancelled',
                'expired'
            ),
            allowNull: false,
            defaultValue: 'pending',
        },

        expires_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },

        accepted_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        rejected_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        cancelled_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'CoupleInvitation',
        tableName: 'couple_invitations',
        timestamps: true,
        underscored: true,
        freezeTableName: true,

        indexes: [
            {
                fields: ['sender_id'],
            },
            {
                fields: ['receiver_id'],
            },
            {
                fields: ['status'],
            },
        ],
    }
);

module.exports = CoupleInvitation;