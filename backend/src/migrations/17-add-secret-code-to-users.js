"use strict";

/**
 * The User model has exposed `secret_code` since the login flow was added,
 * but existing databases were never migrated to include it.  Sequelize then
 * selected a non-existent column during `User.findOne`, preventing login
 * before password validation or token generation.
 */
module.exports = {
  async up(queryInterface, Sequelize) {
    const columns = await queryInterface.describeTable("users");

    if (!columns.secret_code) {
      await queryInterface.addColumn("users", "secret_code", {
        type: Sequelize.STRING(100),
        allowNull: true,
      });
    }
  },

  async down(queryInterface) {
    const columns = await queryInterface.describeTable("users");

    if (columns.secret_code) {
      await queryInterface.removeColumn("users", "secret_code");
    }
  },
};
