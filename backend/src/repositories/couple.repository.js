const { Couple, CoupleMember, User } = require("../models");

class CoupleRepository {
  async create(data = {}, transaction = null) {
    return Couple.create(data, { transaction });
  }

  async findById(id) {
    return Couple.findByPk(id, {
      include: [
        {
          model: CoupleMember,

          as: "members",

          include: [
            {
              model: User,

              as: "user",
            },
          ],
        },
      ],
    });
  }

  async delete(id, transaction = null) {
    return Couple.destroy({
      where: { id },
      transaction,
    });
  }

  async findMembership(userId, coupleId) {
    return CoupleMember.findOne({
      where: {
        user_id: userId,
        couple_id: coupleId,
      },
    });
  }

  async findMembershipByUserId(userId) {
    return CoupleMember.findOne({
      where: {
        user_id: userId,
      },
    });
  }
  async findActiveCoupleByUserId(userId) {
    return Couple.findOne({
        attributes: ["id", "status"],
        include: [
            {
                model: CoupleMember,
                as: "coupleMembers",
                where: {
                    user_id: userId,
                },
                attributes: [],
            },
        ],
        where: {
            status: "active",
        },
    });
}

  async addMembers(members, transaction = null) {
    return CoupleMember.bulkCreate(members, { transaction });
  }

  async findMembers(coupleId) {
    return CoupleMember.findAll({
      where: {
        couple_id: coupleId,
      },
      include: [
        {
          model: User,
          as: "user",
        },
      ],
    order: [["createdAt", "ASC"]],
    });
  }

  async getPartner(userId, coupleId) {
    const { Op } = require("sequelize");

    const partner = await CoupleMember.findOne({
      where: {
        couple_id: coupleId,

        user_id: {
          [Op.ne]: userId,
        },
      },

      include: [
        {
          model: User,

          as: "user",
        },
      ],
    });

    return partner?.user ?? null;
  }
}

module.exports = new CoupleRepository();
