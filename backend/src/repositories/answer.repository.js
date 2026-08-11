const { Op } = require('sequelize');
const { Answer, Question, User, AnswerMedia } = require('../models');

const create = (answerData, transaction = null) =>
  Answer.create(answerData, { transaction });

const findById = (id) =>
  Answer.findByPk(id, {
    include: [
      { model: Question, as: 'question' },
      { model: AnswerMedia, as: 'media' },
      { model: User, as: 'user', attributes: ['id', 'first_name', 'last_name', 'username', 'profile_picture'] },
    ],
  });

const findByQuestion = (questionId) =>
  Answer.findAll({
    where: { question_id: questionId },
    include: [{ model: Question, as: 'question' }],
  });

const findByCouple = (coupleId) =>
  Answer.findAll({
    where: { couple_id: coupleId },
    include: [
      { model: Question, as: 'question' },
      { model: User, as: 'user', attributes: ['id', 'first_name', 'last_name', 'username', 'profile_picture'] },
    ],
  });

const findByUser = (userId) =>
  Answer.findAll({
    where: { answered_by: userId },
    include: [{ model: Question, as: 'question' }],
    order: [['createdAt', 'DESC']],
  });

const findAllMyAnswers = async (userId, moodType = null) => {
  const questionWhere = {};
  if (moodType) {
    questionWhere.mood_type = moodType;
  }

  return Answer.findAll({
    where: { answered_by: userId },
    include: [
      {
        model: Question,
        as: 'question',
        where: Object.keys(questionWhere).length ? questionWhere : undefined,
        required: true,
      },
      { model: AnswerMedia, as: 'media' },
    ],
    order: [['createdAt', 'DESC']],
  });
};

const findAllPartnerAnswers = async (coupleId, userId, moodType = null) => {
  const questionWhere = {};
  if (moodType) {
    questionWhere.mood_type = moodType;
  }

  return Answer.findAll({
    where: {
      couple_id: coupleId,
      answered_by: { [Op.ne]: userId },
    },
    include: [
      {
        model: Question,
        as: 'question',
        where: Object.keys(questionWhere).length ? questionWhere : undefined,
        required: true,
      },
      { model: AnswerMedia, as: 'media' },
      { model: User, as: 'user', attributes: ['id', 'first_name', 'last_name', 'username', 'profile_picture'] },
    ],
    order: [['createdAt', 'DESC']],
  });
};

const findByUserAndQuestion = (userId, questionId) =>
  Answer.findOne({
    where: {
      answered_by: userId,
      question_id: questionId,
    },
    include: [{ model: Question, as: 'question' }],
  });

const findOne = (filters) =>
  Answer.findOne({
    where: filters,
    include: [{ model: Question, as: 'question' }],
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
    findAllMyAnswers,
    findAllPartnerAnswers,
    findByUserAndQuestion,
    findOne,
    update,
    deleteById,
    transaction,
};