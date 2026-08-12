const ApiError = require("../utils/ApiError");
const validateOrThrow = require("../utils/validateOrThrow");

const {
  validateCreateMood,
  validateUpdateMood,
} = require("../validations/mood.validation");

const moodRepository = require("../repositories/mood.repository");
const coupleRepository = require("../repositories/couple.repository");

const { v4: uuidv4 } = require('uuid');

class MoodService {
  async createMood(user, data) {
    validateOrThrow(validateCreateMood(data));

    // Couple membership is optional — users can log moods solo
    const membership = await coupleRepository.findMembershipByUserId(user.id);
    const coupleId = membership?.couple_id || null;

    const today = new Date().toISOString().split('T')[0];

    const existingMood = await moodRepository.findTodayMood(user.id, today);
    if (existingMood) {
      return moodRepository.update(existingMood.id, {
        mood_type: data.mood_type,
        note: data.note,
      });
    }

    return moodRepository.create({
      id: uuidv4(),
      user_id: user.id,
      couple_id: coupleId,
      mood_type: data.mood_type,
      note: data.note,
      mood_date: today,
    });
  }


  async getMoodHistory(userId) {
    return moodRepository.findMoodHistory(userId);
  }
}

module.exports = new MoodService();
