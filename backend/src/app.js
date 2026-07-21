const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const healthRoutes = require('./routes/health.routes');
const { notFound, errorHandler } = require('./middlewares/error.middleware');

const app = express();

app.disable('x-powered-by');

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.use('/health', healthRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
