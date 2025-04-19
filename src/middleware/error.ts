import { Request, Response, NextFunction } from "express"
import { GLOBAL } from 'myapp'
import { KEY, RESPONSE, CODE } from "constant"


class ErrorRequestHandler extends Error {
    kind  : string
    code  : number
    errors: any[]

    constructor(message: string, kind: string, code: number, errors: any[]) {
        super(message)
        this.kind   = kind
        this.code   = code
        this.errors = errors
        this.name   = this.constructor.name
    }
}

export class ErrorResponse extends Error {
  constructor(message: string, public code: CODE, public details?: unknown) {
    super(message)
    this.code    = code
    this.details = details
  }
}

export const errorHandler = (err: ErrorRequestHandler, _req: Request, res: Response, _next: NextFunction) => {
 let statusCode = err.code || CODE.INTERNAL_SERVER_ERROR
 let message    = err.message
 let errors     = err.errors

 if (err.name === KEY.CAST_ERROR && err.kind === KEY.OBJECT_ID) {
    statusCode = 404
    message = RESPONSE.ERROR[404]
 }

 if (err.code === 11000) {
    statusCode = 403
    message    = RESPONSE.ERROR.DOCUMENT_EXISTS
 }

 if (err.errors) {
    const errorStack = Object.values(err.errors).map((err: Error) => err.message)
          statusCode = 400
          errors     = errorStack
 }

 res.status(statusCode).json({
    message: message || errors,
    stack: GLOBAL.ENV === KEY.PRODUCTION ? err.stack : null
 })
}