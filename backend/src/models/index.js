const { Sequelize } = require('sequelize');
const sequelize = require('../config/sequelize');
const { User, initializeUserModel } = require('./user.model');
const { Couple, initializeCoupleModel } = require('./couple.model');
const { CoupleMember, initializeCoupleMemberModel } = require('./coupleMember.model');
const { RefreshToken, initializeRefreshTokenModel } = require('./refreshToken.model');
const { CoupleInvitation, initializeCoupleInvitationModel } = require('./coupleInvitation.model');
const { Memory, initializeMemoryModel } = require('./memory.model');

let modelsInitialized = false;

const initializeModels = () => {
  if (modelsInitialized) {
    return { User, Couple, CoupleMember, RefreshToken, CoupleInvitation, Memory };
  }

  initializeUserModel(sequelize);
  initializeCoupleModel(sequelize);
  initializeCoupleMemberModel(sequelize);
  initializeRefreshTokenModel(sequelize);
  initializeCoupleInvitationModel(sequelize);
  initializeMemoryModel(sequelize);

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

  User.hasMany(Memory, {
    foreignKey: 'created_by',
    as: 'memories',
  });
  Memory.belongsTo(User, {
    foreignKey: 'created_by',
    as: 'user',
  });
  Couple.hasMany(Memory, {
    foreignKey: 'couple_id',
    as: 'memories',
  });
  Memory.belongsTo(Couple, {
    foreignKey: 'couple_id',
    as: 'couple',
  });
  CoupleInvitation.belongsTo(User, {
    foreignKey: 'receiver_id',
    as: 'receiver',
  });

  modelsInitialized = true;

  return { User, Couple, CoupleMember, RefreshToken, CoupleInvitation, Memory };
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
  Memory,
};
