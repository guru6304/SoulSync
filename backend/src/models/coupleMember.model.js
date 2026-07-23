const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class CoupleMember extends Model {}

CoupleMember.init(
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

        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },

        role: {
            type: DataTypes.ENUM(
                'initiator',
                'partner'
            ),
            allowNull: false,
            defaultValue: 'partner',
        },
    },
    {
        sequelize,
        modelName: 'CoupleMember',
        tableName: 'couple_members',
        timestamps: true,
        underscored: true,
        freezeTableName: true,

        indexes: [
            {
                unique: true,
                fields: [
                    'couple_id',
                    'user_id',
                ],
            },
            {
                fields: ['user_id'],
            },
        ],
    }
);

module.exports = CoupleMember;