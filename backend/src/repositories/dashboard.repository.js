const {
    User,
    Couple,
    Mood,
    Memory,
    MemoryMedia,
    Answer,
    CoupleInvitation,
} = require('../models');


class DashboardRepository {

    async findUser(userId) {

    return User.findByPk(userId, {

        attributes: [
            "id",
            "first_name",
            "last_name",
            "email",
            "profile_picture",
        ],

        include: [

            {

                model: Couple,

                as: "couples",

                through: {

                    attributes: [],

                },

            },

        ],

    });

}
    async findCouple(coupleId) {
        return Couple.findByPk(coupleId);
    }

    async findTodayMood(userId, moodDate) {
        return Mood.findOne({
            where: {
                user_id: userId,
                mood_date: moodDate,
            },
        });
    }

    async findRecentMemories(coupleId, limit = 5) {
        return Memory.findAll({
            where: {
                couple_id: coupleId,
            },
            include: [
                {
                    model: User,
                    as: 'creator',
                    attributes: [
                        'id',
                        'first_name',
                        'last_name',
                        'profile_picture',
                    ],
                },
                {
                    model: MemoryMedia,
                    as: 'media',
                },
            ],
            order: [['created_at', 'DESC']],
            limit,
        });
    }

    async findPendingInvitation(userId) {
        return CoupleInvitation.findOne({

    attributes: [

        "id",

        "sender_id",

        "receiver_id",

        "status",

        "created_at",

    ],

    where: {

        receiver_id: userId,

        status: "pending",

    },

});
    }

    async getMemoryCount(coupleId) {
        return Memory.count({
            where: {
                couple_id: coupleId,
            },
        });
    }

    async getMediaCount(coupleId, mediaType) {
        return MemoryMedia.count({
            include: [
                {
                    model: Memory,
                    as: 'memory',
                    where: {
                        couple_id: coupleId,
                    },
                    attributes: [],
                },
            ],
            where: {
                media_type: mediaType,
            },
        });
    }

    async getAnswerCount(coupleId) {
        return Answer.count({
            where: {
                couple_id: coupleId,
            },
        });
    }

    async getRecentAnswers(coupleId, limit = 5) {
        return Answer.findAll({
            where: {
                couple_id: coupleId,
            },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: [
                        'id',
                        'first_name',
                        'last_name',
                    ],
                },
            ],
            order: [['created_at', 'DESC']],
            limit,
        });
    }

    async getRecentMoodActivities(coupleId, limit = 5) {
        return Mood.findAll({
            where: {
                couple_id: coupleId,
            },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: [
                        'id',
                        'first_name',
                        'last_name',
                    ],
                    required: false,
                },
            ],
            order: [['created_at', 'DESC']],
            limit,
        });
    }

    async getDashboardActivity(coupleId) {

    const [

        memories,

        answers,

        moods,

    ] = await Promise.all([

        this.findRecentMemories(coupleId),

        this.getRecentAnswers(coupleId),

        this.getRecentMoodActivities(coupleId),

    ]);

    return {

        memories,

        answers,

        moods,

    };

}

}

module.exports = new DashboardRepository();