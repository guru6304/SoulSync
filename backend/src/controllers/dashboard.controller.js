const dashboardService = require('../services/dashboard.service');

const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

const getDashboard = asyncHandler(async (req, res) => {

    const result =
        await dashboardService.getDashboard(
            req.user.id
        );

    res.status(200).json(
        new ApiResponse(
            200,
            result,
            'Dashboard fetched successfully'
        )
    );
});

const getStats = asyncHandler(async (req, res) => {

    const result =
        await dashboardService.getStats(
            req.user.id
        );

    res.status(200).json(
        new ApiResponse(
            200,
            result,
            'Dashboard stats fetched successfully'
        )
    );
});

const getActivity = asyncHandler(async (req, res) => {

    const result =
        await dashboardService.getActivity(
            req.user.id
        );

    res.status(200).json(
        new ApiResponse(
            200,
            result,
            'Activity fetched successfully'
        )
    );
});

module.exports = {
    getDashboard,
    getStats,
    getActivity,
};