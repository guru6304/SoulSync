'use strict';

const { v4: uuidv4 } = require('uuid');
const { Question } = require('../models');

const romanticQuestions = require('../seeders/questions/romantic.questions');
const happyQuestions = require('../seeders/questions/happy.questions');
const funnyQuestions = require('../seeders/questions/funny.questions');
const sadQuestions = require('../seeders/questions/sad.questions');
const angryQuestions = require('../seeders/questions/angry.questions');
const missingYouQuestions = require('../seeders/questions/missingYou.questions');
const celebrationQuestions = require('../seeders/questions/celebration.questions');
const sleepyQuestions = require('../seeders/questions/sleepy.questions');
const needHugQuestions = require('../seeders/questions/needHug.questions');

const logger = require('./logger');

/**
 * Seeds the questions table if it is empty.
 * Called once during server startup (after sequelize.sync).
 */
const seedQuestionsIfEmpty = async () => {
  try {
    const count = await Question.count();
    if (count > 0) {
      logger.info(`Questions table already seeded (${count} records). Skipping.`);
      return;
    }

    const now = new Date();
    const allQuestions = [
      ...romanticQuestions,
      ...happyQuestions,
      ...funnyQuestions,
      ...sadQuestions,
      ...angryQuestions,
      ...missingYouQuestions,
      ...celebrationQuestions,
      ...sleepyQuestions,
      ...needHugQuestions,
    ].map((q) => ({
      id: uuidv4(),
      title: q.title,
      description: q.description || null,
      mood_type: q.mood_type,
      answer_type: q.answer_type || 'text',
      display_order: q.display_order || 0,
      options: q.options || null,
      priority: q.priority || 1,
      estimated_seconds: q.estimated_seconds || 30,
      is_active: true,
      created_at: now,
      updated_at: now,
    }));

    await Question.bulkCreate(allQuestions, { ignoreDuplicates: true });
    logger.info(`Seeded ${allQuestions.length} questions successfully.`);
  } catch (err) {
    logger.error('Question seeding failed (non-blocking):', err.message);
  }
};

module.exports = { seedQuestionsIfEmpty };
