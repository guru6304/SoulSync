const moodService = require('../services/mood.service');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

const createMood = asyncHandler(async (req, res) => {

    const mood = await moodService.createMood(
        req.user,
        req.body
    );

    res.status(201).json(
        new ApiResponse(
            201,
            mood,
            'Mood saved successfully'
        )
    );
});

const getTodayMood = asyncHandler(async (req, res) => {

    const mood = await moodService.getTodayMood(
        req.user.id
    );

    res.status(200).json(
        new ApiResponse(
            200,
            mood
        )
    );
});

const updateTodayMood = asyncHandler(async (req, res) => {

    const mood = await moodService.updateTodayMood(
        req.user.id,
        req.body
    );

    res.status(200).json(
        new ApiResponse(
            200,
            mood,
            'Mood updated successfully'
        )
    );
});

const getMoodHistory = asyncHandler(async (req, res) => {

    const moods = await moodService.getMoodHistory(
        req.user.id
    );

    res.status(200).json(
        new ApiResponse(
            200,
            moods
        )
    );
});

module.exports = {
    createMood,
    getTodayMood,
    updateTodayMood,
    getMoodHistory,
};