const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Mood extends Model {}

Mood.init(
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

        couple_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },

        mood_type: {
            type: DataTypes.ENUM(
                'romantic',
                'happy',
                'funny',
                'sad',
                'angry',
                'missing_you',
                'celebration',
                'sleepy',
                'need_hug'
            ),
            allowNull: false,
        },

        mood_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },

        note: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Mood',
        tableName: 'moods',
        freezeTableName: true,
        timestamps: true,
        underscored: true,

        indexes: [
            {
                fields: ['user_id'],
            },
            {
                fields: ['couple_id'],
            },
            {
                fields: ['mood_date'],
            },
        ],
    }
);

module.exports = Mood;