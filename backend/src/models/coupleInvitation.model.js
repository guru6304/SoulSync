const { DataTypes, Model } = require('sequelize');

class CoupleInvitation extends Model {}

const initializeCoupleInvitationModel = (sequelize) => {
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
        references: {
          model: 'users',
          key: 'id',
        },
      },
      receiver_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      status: {
        type: DataTypes.ENUM('pending', 'accepted', 'rejected', 'expired', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending',
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      accepted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      rejected_at: {
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
        { fields: ['sender_id'] },
        { fields: ['receiver_id'] },
        { fields: ['status'] },
      ],
    },
  );

  return CoupleInvitation;
};

module.exports = { CoupleInvitation, initializeCoupleInvitationModel };
