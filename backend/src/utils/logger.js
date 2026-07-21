const format = (level, message) => `${new Date().toISOString()} [${level}] ${message}`;

const logger = {
  info: (message) => console.info(format('INFO', message)),
  warn: (message) => console.warn(format('WARN', message)),
  error: (message, error) => {
    console.error(format('ERROR', message));
    if (error?.stack) console.error(error.stack);
  },
};

module.exports = logger;
