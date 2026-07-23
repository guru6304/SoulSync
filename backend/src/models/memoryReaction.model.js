const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class MemoryReaction extends Model {}

MemoryReaction.init(
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

        type: {
            type: DataTypes.ENUM(
                'LIKE',
                'LOVE',
                'LAUGH',
                'WOW',
                'SAD',
                'ANGRY'
            ),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'MemoryReaction',
        tableName: 'memory_reactions',
        timestamps: true,
underscored: true,
freezeTableName: true,

        indexes: [
            {
                fields: ['memory_id'],
            },
            {
                fields: ['user_id'],
            },
            {
                unique: true,
                fields: ['memory_id', 'user_id'],
            },
        ],
    }
);

module.exports = MemoryReaction;