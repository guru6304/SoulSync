const { AnswerMedia } = require('../models');

const create = (mediaData, transaction = null) =>
  AnswerMedia.create(mediaData, { transaction });

const bulkCreate = (mediaList, transaction = null) =>
  AnswerMedia.bulkCreate(mediaList, { transaction });

const findById = (id) =>
  AnswerMedia.findByPk(id);

const findByAnswer = (answerId) =>
  AnswerMedia.findAll({
    where: { answer_id: answerId },
  });

const update = (id, updateData, transaction = null) =>
  AnswerMedia.update(updateData, {
    where: { id },
    transaction,
  });

const deleteById = (id, transaction = null) =>
  AnswerMedia.destroy({
    where: { id },
    transaction,
  });

const deleteByAnswer = (answerId, transaction = null) =>
  AnswerMedia.destroy({
    where: { answer_id: answerId },
    transaction,
  });

const transaction = (callback) =>
  AnswerMedia.sequelize.transaction(callback);

module.exports = {
  create,
  bulkCreate,
  findById,
  findByAnswer,
  update,
  deleteById,
  deleteByAnswer,
  transaction,
};