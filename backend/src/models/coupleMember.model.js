const { DataTypes, Model } = require('sequelize');

class CoupleMember extends Model {}

const initializeCoupleMemberModel = (sequelize) => {
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
        references: {
          model: 'couples',
          key: 'id',
        },
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      role: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'member',
      },
      joined_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'CoupleMember',
      tableName: 'couple_members',
      timestamps: true,
      underscored: true,
      paranoid: false,
      freezeTableName: false,
      indexes: [
        { fields: ['couple_id'] },
        { fields: ['user_id'] },
        { unique: true, fields: ['couple_id', 'user_id'] },
      ],
    },
  );

  return CoupleMember;
};

module.exports = { CoupleMember, initializeCoupleMemberModel };
