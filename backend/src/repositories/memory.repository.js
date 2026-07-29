const { Memory, User, Couple } = require("../models");

class MemoryRepository {
  async create(data) {
    return await Memory.create(data);
  }

  async findById(id) {
    return await Memory.findByPk(id, {
      include: [
        {
          model: User,
          as: "creator",
          attributes: ["id", "first_name", "last_name", "profile_picture"],
        },
        {
          model: Couple,
          as: "couple",
        },
      ],
    });
  }

  async update(id, data) {
    const memory = await Memory.findByPk(id);

    if (!memory) {
      return null;
    }

    return await memory.update(data);
  }

  async remove(id) {
    const memory = await Memory.findByPk(id);

    if (!memory) {
      return false;
    }

    await memory.destroy();

    return true;
  }

  async findAllByCouple(coupleId) {
    return await Memory.findAll({
      where: {
        couple_id: coupleId,
      },
      include: [
        {
          model: User,
          as: "creator",
          attributes: ["id", "first_name", "last_name", "profile_picture"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
  }
}

module.exports = new MemoryRepository();
