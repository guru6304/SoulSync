const { Sequelize } = require('sequelize');
const sequelize = require('../config/sequelize');
const { User, initializeUserModel } = require('./user.model');
const { Couple, initializeCoupleModel } = require('./couple.model');
const { CoupleMember, initializeCoupleMemberModel } = require('./coupleMember.model');
const { RefreshToken, initializeRefreshTokenModel } = require('./refreshToken.model');
const { CoupleInvitation, initializeCoupleInvitationModel } = require('./coupleInvitation.model');

let modelsInitialized = false;

const initializeModels = () => {
  if (modelsInitialized) {
    return { User, Couple, CoupleMember, RefreshToken, CoupleInvitation };
  }

  initializeUserModel(sequelize);
  initializeCoupleModel(sequelize);
  initializeCoupleMemberModel(sequelize);
  initializeRefreshTokenModel(sequelize);
  initializeCoupleInvitationModel(sequelize);

  User.hasMany(Couple, {
    foreignKey: 'created_by',
    as: 'createdCouples',
  });
  User.belongsToMany(Couple, {
    through: CoupleMember,
    foreignKey: 'user_id',
    otherKey: 'couple_id',
    as: 'couples',
  });

  Couple.belongsTo(User, {
    foreignKey: 'created_by',
    as: 'creator',
  });
  Couple.belongsToMany(User, {
    through: CoupleMember,
    foreignKey: 'couple_id',
    otherKey: 'user_id',
    as: 'members',
  });
  Couple.hasMany(CoupleMember, {
    foreignKey: 'couple_id',
    as: 'coupleMembers',
  });

  CoupleMember.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user',
  });
  CoupleMember.belongsTo(Couple, {
    foreignKey: 'couple_id',
    as: 'couple',
  });

  User.hasMany(RefreshToken, {
    foreignKey: 'user_id',
    as: 'refreshTokens',
  });
  RefreshToken.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user',
  });

  User.hasMany(CoupleInvitation, {
    foreignKey: 'sender_id',
    as: 'sentInvitations',
  });
  User.hasMany(CoupleInvitation, {
    foreignKey: 'receiver_id',
    as: 'receivedInvitations',
  });
  CoupleInvitation.belongsTo(User, {
    foreignKey: 'sender_id',
    as: 'sender',
  });
  CoupleInvitation.belongsTo(User, {
    foreignKey: 'receiver_id',
    as: 'receiver',
  });

  modelsInitialized = true;

  return { User, Couple, CoupleMember, RefreshToken, CoupleInvitation };
};

initializeModels();

module.exports = {
  sequelize,
  Sequelize,
  initializeModels,
  User,
  Couple,
  CoupleMember,
  RefreshToken,
  CoupleInvitation,
};
