const ApiError = require("../utils/ApiError");
const { v4: uuidv4 } = require("uuid");

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

    let coupleId = data.couple_id || null;
    if (coupleId) {
      try {
        await coupleService.findMembership(userId, coupleId);
      } catch (_err) {
        coupleId = null;
      }
    } else {
      try {
        const membership = await coupleService.findMembershipByUserId(userId);
        coupleId = membership?.couple_id || null;
      } catch (_err) {
        coupleId = null;
      }
    }

    const memory = await memoryRepository.create({
      id: uuidv4(),
      ...data,
      couple_id: coupleId,
      creator_id: userId,
    });

    if (memory.visibility !== "private") {
      const partner = await coupleService.getPartner(userId, data.couple_id);

      const partnerId = partner?.id;

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
