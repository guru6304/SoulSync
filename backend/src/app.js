const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { notFound, errorHandler } = require('./middlewares/error.middleware');

const authRoutes = require('./routes/auth.routes');
const coupleInvitationRoutes = require('./routes/coupleInvitation.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const memoryRoutes = require('./routes/memory.routes');
const moodRoutes = require('./routes/mood.routes');
const profileRoutes = require('./routes/profile.routes');
const notificationRoutes = require('./routes/notification.routes');
const timelineRoutes = require('./routes/timeline.routes');
const healthRoutes = require('./routes/health.routes');
const questionRoutes = require('./routes/question.routes');
const uploadRoutes = require('./routes/upload.routes');
const answerRoutes = require('./routes/answer.routes');
const saySomethingRoutes =
    require("./routes/saySomething.routes");

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,
    message: { status: 429, message: 'Too many requests' }
});

app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({
    origin: process.env.CORS_ORIGIN || true,
    credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use('/api/', limiter);

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/memories', memoryRoutes);
app.use('/api/v1/moods', moodRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/timeline', timelineRoutes);
app.use('/api/v1/questions', questionRoutes);
app.use('/api/v1/answers', answerRoutes);
app.use(
    '/api/v1/dashboard',
    dashboardRoutes
);
app.use(
    '/api/v1/profile',
    profileRoutes
);
app.use(
    '/api/v1/couple-invitations',
    coupleInvitationRoutes
);
app.use(
    "/api/v1/say-somethings",
    saySomethingRoutes
);
app.use('/api/v1/uploads', uploadRoutes);
app.use('/api/v1/health', healthRoutes);


// Error handlers
app.use(notFound);
app.use(errorHandler);

module.exports = app;