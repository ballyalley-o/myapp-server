import { Request, Response, NextFunction } from 'express'
import { filterXSS } from 'xss'
import { TYPE, KEY } from 'constant'

export const xssHandler: RequestHandler = (req, res, next) => {
    if (req.body && typeof req.body === TYPE.OBJECT) {
        const sanitizedBody = filterXSS(JSON.stringify(req.body), {
          whiteList         : {},
          stripIgnoreTag    : true,
          stripIgnoreTagBody: [KEY.SCRIPT],
        })
        req.body = JSON.parse(sanitizedBody)
    }
    next()
}