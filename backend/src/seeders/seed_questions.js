"use strict";

const romanticQuestions = require("./questions/romantic.questions");
const happyQuestions = require("./questions/happy.questions");
const funnyQuestions = require("./questions/funny.questions");
const sadQuestions = require("./questions/sad.questions");
const angryQuestions = require("./questions/angry.questions");
const missingYouQuestions = require("./questions/missingYou.questions");
const celebrationQuestions = require("./questions/celebration.questions");
const sleepyQuestions = require("./questions/sleepy.questions");
const needHugQuestions = require("./questions/needHug.questions");

module.exports = {
  async up(queryInterface) {
    const now = new Date();

    const questions = [
      ...romanticQuestions,
      ...happyQuestions,
      ...funnyQuestions,
      ...sadQuestions,
      ...angryQuestions,
      ...missingYouQuestions,
      ...celebrationQuestions,
      ...sleepyQuestions,
      ...needHugQuestions,
    ].map((question) => ({
      ...question,
      is_active: true,
      created_at: now,
      updated_at: now,
    }));

    await queryInterface.bulkInsert("questions", questions);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("questions", null, {});
  },
};
