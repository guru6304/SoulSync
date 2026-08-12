const ApiError = require("../utils/ApiError");

const answerRepository = require("../repositories/answer.repository");
const answerMediaRepository = require("../repositories/answerMedia.repository");
const questionRepository = require("../repositories/question.repository");
const coupleRepository = require("../repositories/couple.repository");

const answerQuestion = async ({
  userId,
  questionId,
  content,
  media = [],
  cycleNumber = 1,
}) => {
  media = Array.isArray(media) ? media : [];
  const question = await questionRepository.findById(questionId);

  if (!question) {
    throw new ApiError(404, "Question not found");
  }

  if (!content?.trim() && media.length === 0) {
    throw new ApiError(400, "Answer content or media is required");
  }

  if (question.answer_type === "text" && media.length > 0) {
    throw new ApiError(400, "This question accepts text answers only");
  }

  const couple = await coupleRepository.findActiveCoupleByUserId(userId);
  const coupleId = couple?.id || null;

  const today = new Date().toISOString().split('T')[0];

  const existingAnswer = await answerRepository.findOne({
    answered_by: userId,
    question_id: questionId,
    answered_for_date: today,
  });

  if (existingAnswer) {
    throw new ApiError(409, "Question already answered for this cycle");
  }

  return answerRepository.transaction(async (transaction) => {
    const answer = await answerRepository.create(
      {
        couple_id: coupleId,
        question_id: questionId,
        answered_by: userId,
        content: content?.trim() || '',
        cycle_number: cycleNumber,
        answered_for_date: today,
      },
      transaction
    );

    if (media.length) {
      await answerMediaRepository.bulkCreate(
        media.map((item) => ({
          ...item,
          answer_id: answer.id,
          uploaded_by: userId,
        })),
        transaction,
      );
    }

    return answer;
  });
};

const getAnswerById = async (answerId, userId) => {
  const answer = await answerRepository.findById(answerId);

  if (!answer) {
    throw new ApiError(404, "Answer not found");
  }

  if (answer.answered_by !== userId) {
    throw new ApiError(403, "Permission denied");
  }

  return answer;
};

const getMyAnswer = async (userId, questionId) => {
  const answer = await answerRepository.findByUserAndQuestion(
    userId,
    questionId,
  );

  if (!answer) {
    throw new ApiError(404, "Answer not found");
  }

  return answer;
};

const getMyAnswers = async (userId, moodType = null) => {
  return answerRepository.findAllMyAnswers(userId, moodType);
};

const getPartnerAnswers = async (userId, moodType = null) => {
  const couple = await coupleRepository.findActiveCoupleByUserId(userId);
  if (!couple) {
    return [];
  }

  return answerRepository.findAllPartnerAnswers(couple.id, userId, moodType);
};

const updateAnswer = async (answerId, userId, content) => {
  const answer = await answerRepository.findById(answerId);

  if (!answer) {
    throw new ApiError(404, "Answer not found");
  }

  if (answer.answered_by !== userId) {
    throw new ApiError(403, "You are not authorized to update this answer");
  }

  await answerRepository.update(answerId, {
    content: content?.trim() || null,
  });

  return answerRepository.findById(answerId);
};

const deleteAnswer = async (answerId, userId) => {
  const answer = await answerRepository.findById(answerId);

  if (!answer) {
    throw new ApiError(404, "Answer not found");
  }

  if (answer.answered_by !== userId) {
    throw new ApiError(403, "You are not authorized to delete this answer");
  }

  await answerRepository.deleteById(answerId);
};

module.exports = {
  answerQuestion,
  getAnswerById,
  getMyAnswer,
  getMyAnswers,
  getPartnerAnswers,
  updateAnswer,
  deleteAnswer,
};
