const {winston,format,transports,createLogger} = require('winston');

const logger = createLogger({
  level: 'info',
  format:format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.Console({
        format:formet.combine(format.colorize(),format.simple(),)
    })
  ],
});
module.exports =logger;