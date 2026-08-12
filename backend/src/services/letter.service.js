const ApiError = require('../utils/ApiError');
const letterRepository = require('../repositories/letter.repository');
const coupleService = require('./couple.service');
const notificationService = require('./notification.service');

class LetterService {
  async createLetter(userId, data) {
    if (!data.content || !data.content.trim()) {
      throw new ApiError(400, 'Letter content is required');
    }

    const membership = await coupleService.findMembershipByUserId(userId);
    if (!membership) {
      throw new ApiError(403, 'You must belong to a couple to write a letter.');
    }

    const letter = await letterRepository.create({
      couple_id: membership.couple_id,
      sender_id: userId,
      title: data.title?.trim() || 'My Forever Love ❤️',
      mood: data.mood || 'Romantic ❤️',
      content: data.content.trim(),
    });

    const partner = await coupleService.getPartner(userId, membership.couple_id);
    const partnerId = partner?.id;

    if (partnerId) {
      await notificationService.createSystemNotification(
        partnerId,
        userId,
        'LETTER_CREATED',
        letter.id,
        'Your partner wrote you a love letter 💌'
      );
    }

    return letter;
  }

  async getLetters(userId) {
    let membership;
    try {
      membership = await coupleService.findMembershipByUserId(userId);
    } catch (_err) {
      return [];
    }

    return letterRepository.findAllByCouple(membership.couple_id);
  }

  async getLetter(userId, letterId) {
    const letter = await letterRepository.findById(letterId);
    if (!letter) {
      throw new ApiError(404, 'Letter not found');
    }

    await coupleService.findMembership(userId, letter.couple_id);

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
