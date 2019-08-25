const winston = require('winston');
const path = require('path');

const logger = new winston.createLogger();

logger.add(new winston.transports.File({
    filename: path.join(__dirname, './logs/error.log'), level: 'error',
}))

logger.add(new winston.transports.File({
    filename: path.join(__dirname, './logs/combined.log')
}))

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        timestamp: true
    }))
}

logger.error(`ERROR, ERROR!!! 🔥🔥🔥BEWARE🔥🔥🔥`)
logger.info(`I am YOUR GUIDE ✨✨`)

process.on('unhandledRejection', (reason, p) => {
    logger.error(reason, 'unhandledPromiseRejection at', p);
})

module.exports = logger;