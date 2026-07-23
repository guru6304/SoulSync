const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const validateOrThrow = require('../utils/validateOrThrow');

const profileService = require('../services/profile.service');

const {
    validateUpdateProfile,
    validateChangePassword,
} = require('../validations/profile.validation');

exports.getProfile = asyncHandler(async (req, res) => {

    const profile =
        await profileService.getProfile(
            req.user.id
        );

    res.json(
        new ApiResponse(
            200,
            profile,
            'Profile fetched successfully'
        )
    );
});

exports.updateProfile = asyncHandler(async (req, res) => {

    validateOrThrow(
        validateUpdateProfile(req.body)
    );

    const profile =
        await profileService.updateProfile(
            req.user.id,
            req.body
        );

    res.json(
        new ApiResponse(
            200,
            profile,
            'Profile updated successfully'
        )
    );
});

exports.changePassword = asyncHandler(async (req, res) => {

    validateOrThrow(
        validateChangePassword(req.body)
    );

    await profileService.changePassword(
        req.user.id,
        req.body.current_password,
        req.body.new_password
    );

    res.json(
        new ApiResponse(
            200,
            null,
            'Password updated successfully'
        )
    );
});