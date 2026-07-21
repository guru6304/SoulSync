const { Sequelize } = require('sequelize');
const sequelize = require('../config/sequelize');
const { User, initializeUserModel } = require('./user.model');
const { Couple, initializeCoupleModel } = require('./couple.model');
const { CoupleMember, initializeCoupleMemberModel } = require('./coupleMember.model');

let modelsInitialized = false;

const initializeModels = () => {
  if (modelsInitialized) {
    return { User, Couple, CoupleMember };
  }

  initializeUserModel(sequelize);
  initializeCoupleModel(sequelize);
  initializeCoupleMemberModel(sequelize);

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

  modelsInitialized = true;

  return { User, Couple, CoupleMember };
};

initializeModels();

module.exports = {
  sequelize,
  Sequelize,
  initializeModels,
  User,
  Couple,
  CoupleMember,
};
