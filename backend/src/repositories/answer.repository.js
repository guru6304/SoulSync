const { Answer } = require('../models');

const create = (answerData, transaction = null) =>
  Answer.create(answerData, { transaction });

const findById = (id) =>
  Answer.findByPk(id);

const findByQuestion = (questionId) =>
  Answer.findAll({
    where: { question_id: questionId },
  });

const findByCouple = (coupleId) =>
  Answer.findAll({
    where: { couple_id: coupleId },
  });

const findByUser = (userId) =>
  Answer.findAll({
    where: { answered_by: userId },
  });

const findByUserAndQuestion = (userId, questionId) =>
  Answer.findOne({
    where: {
      answered_by: userId,
      question_id: questionId,
    },
  });

const findOne = (filters) =>
  Answer.findOne({
    where: filters,
  });

const update = async (
    id,
    updateData,
    transaction = null
) => {

    await Answer.update(
        updateData,
        {
            where: { id },
            transaction,
        }
    );

    return findById(id);

};

const deleteById = (id, transaction = null) =>
  Answer.destroy({
    where: { id },
    transaction,
  });

const transaction = (callback) =>
  Answer.sequelize.transaction(callback);

module.exports = {
    create,
    findById,
    findByQuestion,
    findByCouple,
    findByUser,
    findByUserAndQuestion,
    findOne,
    update,
    deleteById,
    transaction,
};