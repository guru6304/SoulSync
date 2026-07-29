const { User } = require("../models");

const findById = (id) => User.findByPk(id);

const findByEmail = (email) =>
    User.unscoped().findOne({
        where: { email },
    });

const findByUsername = (username) =>
    User.unscoped().findOne({
        where: { username },
    });

const create = (userData) => User.create(userData);

const updateLastLogin = (userId) =>
    User.update(
        {
            last_login_at: new Date(),
        },
        {
            where: { id: userId },
        }
    );

const updateActiveCouple = (
    userId,
    coupleId,
    transaction = null
) =>
    User.update(
        {
            active_couple: coupleId,
        },
        {
            where: {
                id: userId,
            },
            transaction,
        }
    );

module.exports = {
    findById,
    findByEmail,
    findByUsername,
    create,
    updateLastLogin,
    updateActiveCouple,
};