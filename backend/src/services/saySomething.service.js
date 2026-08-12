const ApiError = require("../utils/ApiError");

const saySomethingRepository = require("../repositories/saySomething.repository");

const coupleService = require("./couple.service");

const notificationService = require("./notification.service");

const {
    validateCreateSaySomething,
} = require("../validations/saySomething.validation");

class SaySomethingService {

    async createSaySomething(userId, data) {

    const validation =
        validateCreateSaySomething(data);

    if (!validation.isValid) {

        throw new ApiError(
            400,
            "Validation failed",
            validation.errors
        );

    }

    await coupleService.findMembership(
        userId,
        data.couple_id
    );

    const saySomething =
        await saySomethingRepository.create({

            ...data,

            creator_id: userId,

        });

    const partner =
        await coupleService.getPartner(

            userId,

            data.couple_id

        );

    const partnerId = partner?.id;

    if (partnerId) {

        await notificationService.createSystemNotification(

            partnerId,

            userId,

            "SAY_SOMETHING_CREATED",

            saySomething.id,

            "Your partner sent you a new message."

        );

    }

    return saySomething;

}

    async getSaySomething(userId, saySomethingId) {

        const saySomething =
            await saySomethingRepository.findById(
                saySomethingId
            );

        if (!saySomething) {

            throw new ApiError(
                404,
                "Message not found"
            );

        }

        await coupleService.findMembership(
            userId,
            saySomething.couple_id
        );

        return saySomething;

    }

    async listSaySomethings(
        userId,
        coupleId
    ) {

        await coupleService.findMembership(
            userId,
            coupleId
        );

        return await saySomethingRepository.findAllByCouple(
            coupleId
        );

    }

}

module.exports = new SaySomethingService();