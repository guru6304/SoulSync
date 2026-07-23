const { User, Couple } = require('../models');

class ProfileRepository {

    async findById(userId) {
        return User.findByPk(userId, {
            attributes: {
                exclude: [
                    'password_hash',
                ],
            },
            include: [
                {
                    model: Couple,
                    as: 'couples',
                    through: {
                        attributes: [],
                    },
                },
            ],
        });
    }

    async findByEmail(email) {
        return User.findOne({
            where: { email },
        });
    }
    async findUserWithPassword(userId) {
    return User.findByPk(userId);
}

    async findByUsername(username) {
        return User.findOne({
            where: { username },
        });
    }

    async update(userId, data) {
        const user = await User.findByPk(userId);

        if (!user) {
            return null;
        }

        await user.update(data);

        return this.findById(userId);
    }

    async updatePassword(userId, passwordHash) {
        await User.update(
            {
                password_hash: passwordHash,
            },
            {
                where: {
                    id: userId,
                },
            }
        );
    }

}

module.exports = new ProfileRepository();