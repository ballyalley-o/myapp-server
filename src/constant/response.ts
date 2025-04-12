import { Request, Response } from 'express'
import { GLOBAL } from 'myapp'
import { CODE } from 'constant'

abstract class AbstractLogger {
  public abstract log(...args: any[]): void
}

export class Resp extends AbstractLogger {
  public log(...args: any[]): void {
    console.log('[LogResponse]', ...args)
  }

  constructor() {
    super()
  }

  public static Server(_req: Request, res: Response) {
    const response = {
      name: GLOBAL.APP_NAME,
      status: 'Running',
      version: GLOBAL.API_VERSION,
      environment: GLOBAL.ENV,
    }
    res.send(response)
  }

  public static AdvancedResult(data: unknown[], count: number, pagination?: IPagination) {
    return {
      success: true,
      message: RESPONSE.SUCCESS[200],
      count,
      pagination,
      data,
    }
  }

  public static Ok(data: unknown, count?: number, message?: string) {
    return {
      success: true,
      code: CODE.OK,
      message: message || RESPONSE.SUCCESS[200],
      count: count && count,
      data,
    }
  }

  public static Created(data: unknown, message?: string) {
    return {
      success: true,
      code: CODE.CREATED,
      message: message || RESPONSE.SUCCESS[201],
      data,
    }
  }

  public static Error(message: string, code: CODE = CODE.BAD_REQUEST, details?: unknown) {
    return {
      success: false,
      code,
      message,
      details: details || undefined,
    }
  }
}

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

  SUCCESS: {
    200: 'OK: Request is successful',
    201: 'CREATED: Docuemnt created',
    204: 'NO CONTENT: The server successfully processed the request but there is no content to send in the response.',
    PHOTO_UPLOADED: 'OK: Photo Uploaded',
    BADGE_UPLOADED: 'OK: Badge Uploaded',
    AVATAR_UPLOADED: 'OK: Avatar Uploaded',
    COURSES_DELETED: (data: string) => `Courses being deleted from bootcamp ID: ${data}. Reload page to see the effect`,
    COLLECTION_SEED: ' Mock migration successful 🌱 ',
    COLLECTION_DESTROYED: ' Collection/s destroyed 💥 ',
    LOGOUT: `User logged out`,
    UPDATED: `Entity updated`,
    DELETED: `Entity deleted`,
    EMAIL_SENT: 'Email sent',
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
    FAILED_FIND     : 'Failed to find the requested entity',
    FAILED_CREATE   : 'Failed to create Record',
    FAILED_UPDATE   : 'Failed to update Record',
    FAILED_DELETE   : 'Failed to delete Record',
    RECORD_EXISTS   : 'Record already exists',
  },
}