const ApiError = require("../utils/ApiError");

const memoryRepository = require("../repositories/memory.repository");
const coupleService = require("./couple.service");
const notificationService = require("./notification.service");

const {
  validateCreateMemory,
  validateUpdateMemory,
} = require("../validations/memory.validation");

class MemoryService {
  async createMemory(userId, data) {
    const validation = validateCreateMemory(data);

    if (!validation.isValid) {
      throw new ApiError(400, "Validation failed", validation.errors);
    }

    await coupleService.findMembership(userId, data.couple_id);

    const memory = await memoryRepository.create({
      ...data,
      creator_id: userId,
    });

    if (memory.visibility !== "private") {
      const partner = await coupleService.getPartner(userId, data.couple_id);

      const partnerId = partner?.user_id;

      if (partnerId) {
        await notificationService.createSystemNotification(
          partnerId,
          userId,
          "MEMORY_CREATED",
          memory.id,
          "Your partner created a new memory.",
        );
      }
    }

    return memory;
  }

  async updateMemory(userId, memoryId, data) {
    const validation = validateUpdateMemory(data);

    if (!validation.isValid) {
      throw new ApiError(400, "Validation failed", validation.errors);
    }

    const memory = await memoryRepository.findById(memoryId);

    if (!memory) {
      throw new ApiError(404, "Memory not found");
    }

    await coupleService.findMembership(userId, memory.couple_id);

    if (memory.creator_id !== userId) {
      throw new ApiError(403, "Only the creator can update this memory.");
    }

    return await memoryRepository.update(memoryId, data);
  }

  async getMemory(userId, memoryId) {

    const memory = await memoryRepository.findById(memoryId);

    if (!memory) {

        throw new ApiError(
            404,
            "Memory not found"
        );

    }

    await coupleService.findMembership(
        userId,
        memory.couple_id
    );

    return memory;

}

  async deleteMemory(userId, memoryId) {
    const memory = await memoryRepository.findById(memoryId);

    if (!memory) {
      throw new ApiError(404, "Memory not found");
    }

    await coupleService.findMembership(
    userId,
    memory.couple_id
);

if (memory.creator_id !== userId) {
    throw new ApiError(
        403,
        "Only the creator can delete this memory."
    );
}

await memoryRepository.remove(memoryId);

    return {
      deleted: true,
    };
  }

  async listMemories(userId, coupleId) {
    await coupleService.findMembership(userId, coupleId);

    return await memoryRepository.findAllByCouple(coupleId);
  }
}

module.exports = new MemoryService();
