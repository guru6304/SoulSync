const { DataTypes, Model } = require("sequelize");

class Memory extends Model {}

const initializeMemoryModel = (sequelize) => {
  Memory.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      couple_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "couples",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      created_by: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      title: {
        type: DataTypes.STRING(200),
        allowNull: false,
        validate: {
          len: [1, 200],
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
        validate: {
          len: [0, 5000],
        },
      },
      memory_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      visibility: {
        type: DataTypes.ENUM("shared", "private"),
        allowNull: false,
        defaultValue: "shared",
      },
      is_favorite: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Memory",
      tableName: "memories",
      timestamps: true,
      underscored: true,
      freezeTableName: true,
      indexes: [
        { fields: ["couple_id"] },
        { fields: ["created_by"] },
        { fields: ["memory_date"] },
      ],
    },
  );

  return Memory;
};

module.exports = { Memory, initializeMemoryModel };
