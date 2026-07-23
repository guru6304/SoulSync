"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("couples", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      anniversary_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },

      status: {
        type: Sequelize.ENUM("active", "paused", "ended"),
        allowNull: false,
        defaultValue: "active",
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        ),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("couples");

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_couples_status";',
    );
  },
};
