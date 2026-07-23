const bcrypt = require('bcrypt');

const ApiError = require('../utils/ApiError');

const profileRepository = require('../repositories/profile.repository');

class ProfileService {

    async getProfile(userId) {

        const user =
            await profileRepository.findById(userId);

        if (!user) {
            throw new ApiError(
                404,
                'User not found'
            );
        }

        return user;
    }

    async updateProfile(userId, body) {

        if (body.username) {

            const existing =
                await profileRepository.findByUsername(
                    body.username
                );

            if (
                existing &&
                existing.id !== userId
            ) {
                throw new ApiError(
                    409,
                    'Username already exists'
                );
            }
        }

        return profileRepository.update(
            userId,
            body
        );
    }

    async changePassword(
        userId,
        currentPassword,
        newPassword
    ) {

        const user =
    await profileRepository.findUserWithPassword(
        userId
    );

        const valid =
            await bcrypt.compare(
                currentPassword,
                user.password_hash
            );

        if (!valid) {
            throw new ApiError(
                400,
                'Current password is incorrect'
            );
        }

        const passwordHash =
            await bcrypt.hash(
                newPassword,
                10
            );

        await profileRepository.updatePassword(
            userId,
            passwordHash
        );
    }

}

module.exports = new ProfileService();