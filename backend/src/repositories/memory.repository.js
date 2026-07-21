const { Memory, CoupleMember } = require('../models');

const findById = (id) => Memory.findByPk(id);

const findAllByCouple = (coupleId) => Memory.findAll({
  where: { couple_id: coupleId },
  order: [['memory_date', 'DESC'], ['created_at', 'DESC']],
});

const create = (data) => Memory.create(data);

const update = (id, data) => Memory.update(data, { where: { id } });

const deleteMemory = (id) => Memory.destroy({ where: { id } });

const toggleFavorite = (id, value) => Memory.update(
  { is_favorite: value },
  { where: { id } },
);

const findMembership = (coupleId, userId) => CoupleMember.findOne({
  where: {
    couple_id: coupleId,
    user_id: userId,
  },
});

module.exports = {
  findById,
  findAllByCouple,
  create,
  update,
  deleteMemory,
  toggleFavorite,
  findMembership,
};
