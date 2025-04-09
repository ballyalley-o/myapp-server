import { Request, Response } from 'express'
import { GLOBAL } from 'myapp'

export const RESPONSE = {
  SERVER: (_req: Request, res: Response) => {
    const response = {
      name: GLOBAL.APP_NAME,
      status: 'Running',
      version: GLOBAL.API_VERSION,
      environment: GLOBAL.ENV,
    }
    res.send(response)
  },

  ERROR: {
    400             : 'BAD REQUEST: Client request is Invalid',
    401             : 'UNAUTHORIZED: Request cannot be granted unless Client is Authenticated',
    403             : 'FORBIDDEN: Necessary permissions is required to access the Requested Resource',
    404             : 'NOT FOUND: Resource requested cannot be found',
    422             : 'UNPROCESSABLE ENTITY: The data submitted in a form is in the wrong format or is missing required fields',
    429             : 'REQUEST OVERLOAD: Throttling limit exceeded for an API',
    500             : 'INTERNAL SERVER ERROR: Server encountered an Unhandled Exception',
    503             : 'SERVICE UNAVAILABLE: The server is temporarily unable to handle the Request',
    CORS_NOT_ALLOWED: 'CORS ERROR: Not allowed by Access-Control-Allow-Origin',
    RECORD_EXISTS   : 'Record already exists',
  },
}