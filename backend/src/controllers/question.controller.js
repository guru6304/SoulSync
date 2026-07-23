const asyncHandler = require('../utils/asyncHandler');
const questionService = require('../services/question.service');

exports.getQuestions = asyncHandler(async (req, res) => {

    const questions = await questionService.getQuestions(req.query);

    res.json({
        success: true,
        data: questions,
    });

});

exports.getQuestion = asyncHandler(async (req, res) => {

    const question = await questionService.getQuestion(req.params.id);

    res.json({
        success: true,
        data: question,
    });

});

exports.getQuestionsByMood = asyncHandler(async (req, res) => {

    const questions = await questionService.getQuestionsByMood(req.params.mood);

    res.json({
        success: true,
        data: questions,
    });

});
exports.createQuestion = asyncHandler(async (req, res) => {

    const question = await questionService.createQuestion(req.body);

    res.status(201).json({
        success: true,
        message: 'Question created successfully.',
        data: question,
    });

});

exports.updateQuestion = asyncHandler(async (req, res) => {

    const question = await questionService.updateQuestion(
        req.params.id,
        req.body
    );

    res.json({
        success: true,
        message: 'Question updated successfully.',
        data: question,
    });

});

exports.deleteQuestion = asyncHandler(async (req, res) => {

    await questionService.deleteQuestion(req.params.id);

    res.json({
        success: true,
        message: 'Question deleted successfully.',
    });

});
exports.getTodaysQuestion = asyncHandler(async (req, res) => {

    const question =
        await questionService.getTodaysQuestion(
            req.user.id,
            req.params.mood,
            req.query.date
        );

    res.json({
        success: true,
        data: question,
    });

});