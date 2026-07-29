const {
    Model,
    DataTypes,
} = require("sequelize");

const sequelize = require("../config/database");

class SaySomething extends Model {}

SaySomething.init(

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

        creator_id: {

            type: DataTypes.UUID,

            allowNull: false,

        },

        message: {

            type: DataTypes.TEXT,

            allowNull: false,

        },

    },

    {

        sequelize,

        modelName: "SaySomething",

        tableName: "say_somethings",

        timestamps: true,

        underscored: true,

        indexes: [

            {

                fields: ["couple_id"],

            },

            {

                fields: ["creator_id"],

            },

        ],

    }

);

module.exports = SaySomething;