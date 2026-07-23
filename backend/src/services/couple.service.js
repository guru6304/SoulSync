const ApiError = require('../utils/ApiError');
const logger = require('../utils/logger');

const coupleRepository = require('../repositories/couple.repository');

class CoupleService {

    async ensureCoupleExists(coupleId) {

        const couple = await coupleRepository.findById(coupleId);

        if (!couple) {
            throw new ApiError(
                404,
                'Couple not found'
            );
        }

        return couple;
    }

    async findMembership(userId, coupleId) {

        await this.ensureCoupleExists(coupleId);

        const membership =
            await coupleRepository.findMembership(
                userId,
                coupleId
            );

        if (!membership) {

            logger.warn(
                `Unauthorized couple access. User=${userId}, Couple=${coupleId}`
            );

            throw new ApiError(
                403,
                'Permission denied'
            );
        }

        return membership;
    }

    async isMember(userId, coupleId) {

        const membership =
            await coupleRepository.findMembership(
                userId,
                coupleId
            );

        return !!membership;
    }

    async getPartner(userId, coupleId) {

        await this.findMembership(
            userId,
            coupleId
        );

        const partner =
            await coupleRepository.getPartner(
                userId,
                coupleId
            );

        return partner;
    }

    async getMembers(coupleId) {

        await this.ensureCoupleExists(
            coupleId
        );

        return coupleRepository.findMembers(
            coupleId
        );
    }

    async getCoupleDetails(coupleId) {

        return this.ensureCoupleExists(
            coupleId
        );
    }
    async findMembershipByUserId(userId) {

    const membership =
        await coupleRepository.findMembershipByUserId(
            userId
        );

    if (!membership) {
        throw new ApiError(
            404,
            'User is not a member of any couple.'
        );
    }

    return membership;
}

}

module.exports = new CoupleService();