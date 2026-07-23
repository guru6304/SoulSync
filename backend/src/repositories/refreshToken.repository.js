const { Op } = require('sequelize');
const { RefreshToken } = require('../models');

class RefreshTokenRepository {

    async create(data, transaction = null) {
        return RefreshToken.create(data, {
            transaction,
        });
    }

    async findById(id) {
        return RefreshToken.findByPk(id);
    }

    async findByHash(tokenHash) {
        return RefreshToken.findOne({
            where: {
                token_hash: tokenHash,
            },
        });
    }

    async findActiveByHash(tokenHash) {
        return RefreshToken.findOne({
            where: {
                token_hash: tokenHash,
                revoked_at: null,
                expires_at: {
                    [Op.gt]: new Date(),
                },
            },
        });
    }

    async findByUser(userId) {
        return RefreshToken.findAll({
            where: {
                user_id: userId,
                revoked_at: null,
            },
            order: [
                ['created_at', 'DESC'],
            ],
        });
    }

    async update(id, data, transaction = null) {

        await RefreshToken.update(
            data,
            {
                where: { id },
                transaction,
            }
        );

        return this.findById(id);
    }

    async updateLastUsed(id, transaction = null) {
        return this.update(
            id,
            {
                last_used_at: new Date(),
            },
            transaction
        );
    }

    async revoke(id, transaction = null) {
        return this.update(
            id,
            {
                revoked_at: new Date(),
            },
            transaction
        );
    }

    async revokeAll(userId, transaction = null) {
        return RefreshToken.update(
            {
                revoked_at: new Date(),
            },
            {
                where: {
                    user_id: userId,
                    revoked_at: null,
                },
                transaction,
            }
        );
    }

    async delete(id, transaction = null) {
        return RefreshToken.destroy({
            where: { id },
            transaction,
        });
    }

    async deleteExpired(transaction = null) {
        return RefreshToken.destroy({
            where: {
                [Op.or]: [
                    {
                        expires_at: {
                            [Op.lte]: new Date(),
                        },
                    },
                    {
                        revoked_at: {
                            [Op.ne]: null,
                        },
                    },
                ],
            },
            transaction,
        });
    }
}

module.exports = new RefreshTokenRepository();