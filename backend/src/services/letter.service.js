const ApiError = require('../utils/ApiError');
const letterRepository = require('../repositories/letter.repository');
const coupleService = require('./couple.service');
const notificationService = require('./notification.service');

const { v4: uuidv4 } = require('uuid');

class LetterService {
  async createLetter(userId, data) {
    if (!data.content || !data.content.trim()) {
      throw new ApiError(400, 'Letter content is required');
    }

    const activeCouple = await coupleService.getRequiredActiveCouple(userId);
    const coupleId = activeCouple.id;

    const letter = await letterRepository.create({
      id: uuidv4(),
      couple_id: coupleId,
      sender_id: userId,
      title: data.title?.trim() || 'My Forever Love ❤️',
      mood: data.mood || 'Romantic ❤️',
      content: data.content.trim(),
    });

    if (coupleId) {
      const partner = await coupleService.getPartner(userId, coupleId);
      const partnerId = partner?.id;
      if (partnerId) {
        await notificationService.createSystemNotification(
          partnerId, userId, 'LETTER_CREATED', letter.id,
          'Your partner wrote you a love letter 💌'
        );
      }
    }

    return letter;
  }

  async getLetters(userId) {
    let membership;
    try {
      membership = await coupleService.findMembershipByUserId(userId);
    } catch (_err) {
      return letterRepository.findAllByUser(userId);
    }

    if (membership?.couple_id) {
      return letterRepository.findAllByCoupleOrUser(membership.couple_id, userId);
    }

    return letterRepository.findAllByUser(userId);
  }

  async getLetter(userId, letterId) {
    const letter = await letterRepository.findById(letterId);
    if (!letter) {
      throw new ApiError(404, 'Letter not found');
    }

    if (letter.couple_id) {
      try {
        await coupleService.findMembership(userId, letter.couple_id);
      } catch (_err) {
        if (letter.sender_id !== userId) {
          throw new ApiError(403, 'Permission denied');
        }
      }
    } else if (letter.sender_id !== userId) {
      throw new ApiError(403, 'Permission denied');
    }

    // Mark as read if user is partner receiving the letter
    if (letter.sender_id !== userId && !letter.is_read) {
      await letterRepository.update(letterId, {
        is_read: true,
        read_at: new Date(),
      });
    }

    return letterRepository.findById(letterId);
  }

  async updateLetter(userId, letterId, data) {
    const letter = await letterRepository.findById(letterId);
    if (!letter) {
      throw new ApiError(404, 'Letter not found');
    }

    if (letter.sender_id !== userId) {
      throw new ApiError(403, 'Only the author can update this letter.');
    }

    return letterRepository.update(letterId, {
      title: data.title?.trim() || letter.title,
      mood: data.mood || letter.mood,
      content: data.content?.trim() || letter.content,
    });
  }

  async deleteLetter(userId, letterId) {
    const letter = await letterRepository.findById(letterId);
    if (!letter) {
      throw new ApiError(404, 'Letter not found');
    }

    if (letter.sender_id !== userId) {
      throw new ApiError(403, 'Only the author can delete this letter.');
    }

    await letterRepository.delete(letterId);
  }
}

module.exports = new LetterService();
