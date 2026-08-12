'use strict';

/**
 * Critical fix: The users table was created without is_active and last_login_at
 * columns. The auth flow checks is_active on every login and updates last_login_at,
 * causing a 500 Internal Server Error on production databases that ran the
 * original 01-create-users.js migration before these fields were added to the model.
 */
module.exports = {
  async up(queryInterface, Sequelize) {
    const columns = await queryInterface.describeTable('users');

    if (!columns.is_active) {
      await queryInterface.addColumn('users', 'is_active', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      });
    }

    if (!columns.last_login_at) {
      await queryInterface.addColumn('users', 'last_login_at', {
        type: Sequelize.DATE,
        allowNull: true,
      });
    }

    if (!columns.profile_picture) {
      await queryInterface.addColumn('users', 'profile_picture', {
        type: Sequelize.STRING(500),
        allowNull: true,
      });
    }
  },

  async down(queryInterface) {
    const columns = await queryInterface.describeTable('users');

    if (columns.is_active) {
      await queryInterface.removeColumn('users', 'is_active');
    }
    if (columns.last_login_at) {
      await queryInterface.removeColumn('users', 'last_login_at');
    }
    if (columns.profile_picture) {
      await queryInterface.removeColumn('users', 'profile_picture');
    }
  },
};
