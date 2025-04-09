import winston from 'winston'
import { GLOBAL } from 'myapp'
import { KEY } from 'constant'

export const logger = winston.createLogger({
    level: GLOBAL.LOG_LEVEL,
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    ]
})

if (GLOBAL.ENV === KEY.PRODUCTION) {
    logger.add(
        new winston.transports.File({ filename: 'log/error.log', level: 'error' })
    )
    logger.add(
        new winston.transports.File({ filename: 'log/combined.log' })
    )
}