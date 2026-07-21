const { RefreshToken } = require('../models');

const createToken = (data) => RefreshToken.create(data);

const findByHash = (hash) => RefreshToken.findOne({ where: { token_hash: hash } });

const deleteToken = (id) => RefreshToken.destroy({ where: { id } });

const deleteAllForUser = (userId) => RefreshToken.destroy({ where: { user_id: userId } });

const updateLastUsed = (id) => RefreshToken.update(
  { last_used_at: new Date() },
  { where: { id } },
);

module.exports = { createToken, findByHash, deleteToken, deleteAllForUser, updateLastUsed };
