const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Couple extends Model {}

Couple.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },

        anniversary_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },

        status: {
            type: DataTypes.ENUM(
                'active',
                'paused',
                'ended'
            ),
            allowNull: false,
            defaultValue: 'active',
        },
    },
    {
        sequelize,
        modelName: 'Couple',
        tableName: 'couples',
        timestamps: true,
        underscored: true,
        freezeTableName: true,
    }
);

module.exports = Couple;