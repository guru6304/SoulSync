"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.createTable("say_somethings", {

            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },

            couple_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: "couples",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },

            creator_id: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },

            message: {
                type: Sequelize.TEXT,
                allowNull: false,
            },

            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal(
                    "CURRENT_TIMESTAMP"
                ),
            },

            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal(
                    "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
                ),
            },

        });

        await queryInterface.addIndex(
            "say_somethings",
            ["couple_id"]
        );

        await queryInterface.addIndex(
            "say_somethings",
            ["creator_id"]
        );

    },

    async down(queryInterface) {

        await queryInterface.dropTable(
            "say_somethings"
        );

    },
};