const {
    SaySomething,
    User,
    Couple,
} = require("../models");

class SaySomethingRepository {

    async create(data) {

        return await SaySomething.create(data);

    }

    async findById(id) {

        return await SaySomething.findByPk(id, {

            include: [

                {

                    model: User,

                    as: "creator",

                    attributes: [

                        "id",

                        "first_name",

                        "last_name",

                        "profile_picture",

                    ],

                },

                {

                    model: Couple,

                    as: "couple",

                },

            ],

        });

    }

    async findAllByCouple(coupleId) {

        return await SaySomething.findAll({

            where: {

                couple_id: coupleId,

            },

            include: [

                {

                    model: User,

                    as: "creator",

                    attributes: [

                        "id",

                        "first_name",

                        "last_name",

                        "profile_picture",

                    ],

                },

            ],

            order: [

                ["createdAt", "DESC"],

            ],

        });

    }

}

module.exports = new SaySomethingRepository();