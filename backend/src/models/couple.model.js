const { DataTypes, Model } = require('sequelize');

class Couple extends Model {}

const initializeCoupleModel = (sequelize) => {
  Couple.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      created_by: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      anniversary_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      relationship_start_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(50),
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
      paranoid: false,
      freezeTableName: false,
      indexes: [{ fields: ['created_by'] }],
    },
  );

  return Couple;
};

module.exports = { Couple, initializeCoupleModel };
