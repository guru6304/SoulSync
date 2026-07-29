const dashboardRepository = require("../repositories/dashboard.repository");
const coupleService = require("./couple.service");

class DashboardService {
  async getDashboard(userId) {
    const user = await dashboardRepository.findUser(userId);

    const membership = user?.couples?.[0] ?? null;

    if (!membership) {
      return {
        user,

        partner: null,

        hasCouple: false,

        todayMood: null,

        pendingInvitation: null,

        recentMemories: [],

        stats: {
          memoryCount: 0,

          photoCount: 0,

          videoCount: 0,

          questionAnswered: 0,
        },

        activity: {
          memories: [],

          answers: [],

          moods: [],
        },
      };
    }

    const coupleId = membership.id;

    await coupleService.findMembership(userId, coupleId);

    const today = new Date().toISOString().split("T")[0];

    const [
      partner,
      todayMood,
      recentMemories,
      pendingInvitation,
      memoryCount,
      photoCount,
      videoCount,
      questionAnswered,
      activities,
    ] = await Promise.all([
      coupleService.getPartner(userId, coupleId),

      dashboardRepository.findTodayMood(userId, today),

      dashboardRepository.findRecentMemories(coupleId),

      dashboardRepository.findPendingInvitation(userId),

      dashboardRepository.getMemoryCount(coupleId),

      dashboardRepository.getMediaCount(coupleId, "image"),

      dashboardRepository.getMediaCount(coupleId, "video"),

      dashboardRepository.getAnswerCount(coupleId),

      dashboardRepository.getDashboardActivity(coupleId),
    ]);

    return {
      user,

      partner,

      hasCouple: true,

      todayMood,

      recentMemories,

      pendingInvitation,

      stats: {
        memoryCount,
        photoCount,
        videoCount,
        questionAnswered,
      },

      activity: activities,
    };
  }

  async getStats(userId) {
    const user = await dashboardRepository.findUser(userId);

    const membership = user?.couples?.[0];

    if (!membership) {
      return {
        memoryCount: 0,
        photoCount: 0,
        videoCount: 0,
        questionAnswered: 0,
      };
    }

    const coupleId = membership.id;

    const [memoryCount, photoCount, videoCount, questionAnswered] =
      await Promise.all([
        dashboardRepository.getMemoryCount(coupleId),
        dashboardRepository.getMediaCount(coupleId, "image"),
        dashboardRepository.getMediaCount(coupleId, "video"),
        dashboardRepository.getAnswerCount(coupleId),
      ]);

    return {
      memoryCount,
      photoCount,
      videoCount,
      questionAnswered,
    };
  }

  async getActivity(userId) {
    const user = await dashboardRepository.findUser(userId);

    const membership = user?.couples?.[0];

    if (!membership) {
      return {
        memories: [],
        answers: [],
        moods: [],
      };
    }

    const coupleId = membership.id;

    const [memories, answers, moods] = await Promise.all([
      dashboardRepository.findRecentMemories(coupleId),
      dashboardRepository.getRecentAnswers(coupleId),
      dashboardRepository.getRecentMoodActivities(coupleId),
    ]);

    return {
      memories,
      answers,
      moods,
    };
  }
}

module.exports = new DashboardService();
