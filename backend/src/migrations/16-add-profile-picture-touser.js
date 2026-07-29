"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.addColumn(
            "users",
            "profile_picture",
            {
                type: Sequelize.STRING(500),
                allowNull: true,
                after: "last_login_at",
            }
        );

    },

    async down(queryInterface) {

        await queryInterface.removeColumn(
            "users",
            "profile_picture"
        );

    },
};