// src/models/index.js
const sequelize = require('../config/database');

// Require all models
const User = require('./user.model');
const Couple = require('./couple.model');
const CoupleMember = require('./coupleMember.model');
const Mood = require('./mood.model');
const SaySomething = require('./saySomething.model');
const Memory = require('./memory.model');
const MemoryComment = require('./memoryComment.model');
const MemoryMedia = require('./memoryMedia.model');
const MemoryReaction = require('./memoryReaction.model');
const Notification = require('./notification.model');
const RefreshToken = require('./refreshToken.model');
const Question = require('./question.model');
const Answer = require('./answer.model');
const AnswerMedia = require('./answerMedia.model');
const CoupleInvitation = require('./coupleInvitation.model');

// Associations
User.belongsToMany(Couple, { through: CoupleMember, foreignKey: 'user_id', as: 'couples' });
Couple.belongsToMany(User, { through: CoupleMember, foreignKey: 'couple_id', as: 'members' });

/*
|--------------------------------------------------------------------------
| Couple Members
|--------------------------------------------------------------------------
*/

Couple.hasMany(CoupleMember, {
    foreignKey: "couple_id",
    as: "coupleMembers",
});

CoupleMember.belongsTo(Couple, {
    foreignKey: "couple_id",
    as: "couple",
});

User.hasMany(CoupleMember, {
    foreignKey: "user_id",
    as: "coupleMemberships",
});

CoupleMember.belongsTo(User, {
    foreignKey: "user_id",
    as: "user",
});

User.hasMany(Memory, { foreignKey: 'creator_id', as: 'memories' });
Memory.belongsTo(User, { foreignKey: 'creator_id', as: 'creator' });

Couple.hasMany(Memory, { foreignKey: 'couple_id', as: 'coupleMemories' });
Memory.belongsTo(Couple, { foreignKey: 'couple_id', as: 'couple' });

Memory.hasMany(MemoryComment, { foreignKey: 'memory_id', as: 'comments' });
MemoryComment.belongsTo(Memory, { foreignKey: 'memory_id', as: 'memory' });

User.hasMany(MemoryComment, { foreignKey: 'user_id', as: 'comments' });
MemoryComment.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

Memory.hasMany(MemoryMedia, { foreignKey: 'memory_id', as: 'media' });
MemoryMedia.belongsTo(Memory, { foreignKey: 'memory_id', as: 'memory' });

Memory.hasMany(MemoryReaction, { foreignKey: 'memory_id', as: 'reactions' });
MemoryReaction.belongsTo(Memory, { foreignKey: 'memory_id', as: 'memory' });

User.hasMany(MemoryReaction, { foreignKey: 'user_id', as: 'reactions' });
MemoryReaction.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasMany(Notification, { foreignKey: 'user_id', as: 'notifications' });
Notification.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(Notification, {
    foreignKey: 'actor_id',
    as: 'sentNotifications',
});

Notification.belongsTo(User, {
    foreignKey: 'actor_id',
    as: 'actor',
});

User.hasMany(RefreshToken, { foreignKey: 'user_id', as: 'refreshTokens' });
RefreshToken.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

/*
|--------------------------------------------------------------------------
| Say Something
|--------------------------------------------------------------------------
*/

User.hasMany(SaySomething, {
    foreignKey: 'creator_id',
    as: 'saySomethings',
});

SaySomething.belongsTo(User, {
    foreignKey: 'creator_id',
    as: 'creator',
});

Couple.hasMany(SaySomething, {
    foreignKey: 'couple_id',
    as: 'saySomethings',
});

SaySomething.belongsTo(Couple, {
    foreignKey: 'couple_id',
    as: 'couple',
});

/*
|--------------------------------------------------------------------------
| Questions
|--------------------------------------------------------------------------
*/

Question.hasMany(Answer, {
    foreignKey: 'question_id',
    as: 'answers',
});

Answer.belongsTo(Question, {
    foreignKey: 'question_id',
    as: 'question',
});

Couple.hasMany(Answer, {
    foreignKey: 'couple_id',
    as: 'answers',
});

Answer.belongsTo(Couple, {
    foreignKey: 'couple_id',
    as: 'couple',
});

User.hasMany(Answer, {
    foreignKey: 'answered_by',
    as: 'answers',
});

Answer.belongsTo(User, {
    foreignKey: 'answered_by',
    as: 'user',
});

Answer.hasMany(AnswerMedia, {
    foreignKey: 'answer_id',
    as: 'media',
});

AnswerMedia.belongsTo(Answer, {
    foreignKey: 'answer_id',
    as: 'answer',
});

User.hasMany(AnswerMedia, {
    foreignKey: 'uploaded_by',
    as: 'uploadedAnswerMedia',
});

AnswerMedia.belongsTo(User, {
    foreignKey: 'uploaded_by',
    as: 'uploadedBy',
});
/*
|--------------------------------------------------------------------------
| Couple Invitations
|--------------------------------------------------------------------------
*/

// Sender
User.hasMany(CoupleInvitation, {
    foreignKey: "sender_id",
    as: "sentInvitations",
});

CoupleInvitation.belongsTo(User, {
    foreignKey: "sender_id",
    as: "sender",
});

// Receiver
User.hasMany(CoupleInvitation, {
    foreignKey: "receiver_id",
    as: "receivedInvitations",
});

CoupleInvitation.belongsTo(User, {
    foreignKey: "receiver_id",
    as: "receiver",
});

User.hasMany(Mood, {
    foreignKey: 'user_id',
    as: 'moods',
});

Mood.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user',
});

Couple.hasMany(Mood, {
    foreignKey: 'couple_id',
    as: 'moods',
});

Mood.belongsTo(Couple, {
    foreignKey: 'couple_id',
    as: 'couple',
});

const Letter = require('./letter.model');
const TimelineEvent = require('./timelineEvent.model');

// Associations for Letter
User.hasMany(Letter, { foreignKey: 'sender_id', as: 'sentLetters' });
Letter.belongsTo(User, { foreignKey: 'sender_id', as: 'sender' });
Couple.hasMany(Letter, { foreignKey: 'couple_id', as: 'letters' });
Letter.belongsTo(Couple, { foreignKey: 'couple_id', as: 'couple' });

// Associations for TimelineEvent
User.hasMany(TimelineEvent, { foreignKey: 'created_by', as: 'timelineEvents' });
TimelineEvent.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });
Couple.hasMany(TimelineEvent, { foreignKey: 'couple_id', as: 'timelineEvents' });
TimelineEvent.belongsTo(Couple, { foreignKey: 'couple_id', as: 'couple' });

module.exports = {
    sequelize,
    User,
    Couple,
    CoupleMember,
    Memory,
    MemoryComment,
    MemoryMedia,
    MemoryReaction,
    Notification,
    RefreshToken,
    CoupleInvitation,
    Question,
    Answer,
    AnswerMedia,
    Mood,
    SaySomething,
    Letter,
    TimelineEvent,
};