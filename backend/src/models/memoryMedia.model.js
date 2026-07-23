const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class MemoryMedia extends Model {}

MemoryMedia.init(
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

        uploaded_by: {
            type: DataTypes.UUID,
            allowNull: false,
        },

        media_type: {
            type: DataTypes.ENUM(
                'image',
                'video',
                'audio'
            ),
            allowNull: false,
        },

        file_url: {
            type: DataTypes.STRING(2048),
            allowNull: false,
            validate: {
                isUrl: true,
            },
        },

        public_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        thumbnail_url: {
            type: DataTypes.STRING(2048),
            allowNull: true,
        },

        mime_type: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },

        original_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        file_size: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },

        duration: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'MemoryMedia',
        tableName: 'memory_media',
        timestamps: true,
        underscored: true,

        indexes: [
            {
                fields: ['memory_id'],
            },
            {
                fields: ['uploaded_by'],
            },
        ],
    }
);

module.exports = MemoryMedia;