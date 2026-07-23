const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

const answerService = require('../services/answer.service');

const answerQuestion = asyncHandler(async (req, res) => {
  const { questionId } = req.params;

  const answer = await answerService.answerQuestion({
    userId: req.user.id,
    questionId,
    content: req.body.content,
    media: req.body.media,
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      answer,
      'Answer submitted successfully'
    )
  );
});

const getAnswerById = asyncHandler(async (req, res) => {
  const answer = await answerService.getAnswerById(
    req.params.id
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      answer,
      'Answer fetched successfully'
    )
  );
});

const getMyAnswer = asyncHandler(async (req, res) => {

    const answer =
        await answerService.getMyAnswer(
            req.user.id,
            req.params.questionId
        );

    return res.status(200).json(
        new ApiResponse(
            200,
            answer,
            'Answer fetched successfully'
        )
    );

});

const updateAnswer = asyncHandler(async (req, res) => {
  const answer = await answerService.updateAnswer(
    req.params.id,
    req.user.id,
    req.body.content
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      answer,
      'Answer updated successfully'
    )
  );
});

const deleteAnswer = asyncHandler(async (req, res) => {
  await answerService.deleteAnswer(
    req.params.id,
    req.user.id
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      null,
      'Answer deleted successfully'
    )
  );
});

module.exports = {
    answerQuestion,
    getAnswerById,
    getMyAnswer,
    updateAnswer,
    deleteAnswer,
};