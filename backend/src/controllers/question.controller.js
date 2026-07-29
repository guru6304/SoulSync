const asyncHandler = require("../utils/asyncHandler");
const questionService = require("../services/question.service");

const ApiResponse = require("../utils/ApiResponse");

exports.getQuestions = asyncHandler(async (req, res) => {
  const questions = await questionService.getQuestions(req.query);

  return res.status(200).json(
    new ApiResponse(
      200,

      questions,

      "Questions fetched successfully.",
    ),
  );
});

exports.getDailySoulCard = asyncHandler(async (req, res) => {

  const today =
    req.query.date ||
    new Date().toISOString().split("T")[0];

  const data =
    await questionService.getDailySoulCard(
      req.user.id,
      req.params.mood,
      today
    );

  return res.status(200).json(
    new ApiResponse(
      200,
      data,
      "Today's Soul Card fetched successfully."
    )
  );

});

exports.getQuestion = asyncHandler(async (req, res) => {
  const question = await questionService.getQuestion(req.params.id);

  return res.status(200).json(
    new ApiResponse(
      200,

      question,

      "Questions fetched successfully.",
    ),
  );
});

exports.getQuestionsByMood = asyncHandler(async (req, res) => {
  const questions = await questionService.getQuestionsByMood(req.params.mood);

  return res.status(200).json(
    new ApiResponse(
      200,

      questions,

      "Questions fetched successfully.",
    ),
  );
});
exports.createQuestion = asyncHandler(async (req, res) => {
  const question = await questionService.createQuestion(req.body);

  res.status(201).json({
    success: true,
    message: "Question created successfully.",
    data: question,
  });
});

exports.updateQuestion = asyncHandler(async (req, res) => {
  const question = await questionService.updateQuestion(
    req.params.id,
    req.body,
  );

  return res
    .status(200)
    .json(new ApiResponse(200, question, "Question updated successfully."));
});

exports.deleteQuestion = asyncHandler(async (req, res) => {
  await questionService.deleteQuestion(req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Question deleted successfully."));
});
exports.getTodaysQuestion = asyncHandler(async (req, res) => {
  const question = await questionService.getTodaysQuestion(
    req.user.id,
    req.params.mood,
    req.query.date,
  );

  return res.status(200).json(
    new ApiResponse(
      200,

      question,

      "Questions fetched successfully.",
    ),
  );
});
