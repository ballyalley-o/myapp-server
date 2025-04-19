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
      code   : CODE.OK,
      message: message || RESPONSE.SUCCESS[200],
      count  : count && count,
      data,
    }
  }

  public static Created(data: unknown, message?: string) {
    return {
      success: true,
      code   : CODE.CREATED,
      message: message || RESPONSE.SUCCESS[201],
      data,
    }
  }

  public static TokenResponse(cookieName: string, user: any, code: CODE = CODE.OK) {
    return {
      success: true,
      code,
      key : cookieName,
      data: user,
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

  public static Default(message: string, code: CODE, data: unknown, success: boolean = true) {
    return {
      success,
      code,
      message,
      data
    }
  }
}

export const RESPONSE = {
  SUCCESS: {
    200                 : 'OK: Request is successful',
    201                 : 'CREATED: Docuemnt created',
    204                 : 'NO CONTENT: The server successfully processed the request but there is no content to send in the response.',
    PHOTO_UPLOADED      : 'OK: Photo Uploaded',
    BADGE_UPLOADED      : 'OK: Badge Uploaded',
    AVATAR_UPLOADED     : 'OK: Avatar Uploaded',
    COURSES_DELETED     : (data: string) => `Courses being deleted from bootcamp ID: ${data}. Reload page to see the effect`,
    COLLECTION_SEED     : ' Mock migration successful 🌱 ',
    COLLECTION_DESTROYED: ' Collection/s destroyed 💥 ',
    LOGOUT              : `User logged out`,
    UPDATED             : `Update successful`,
    DELETED             : `Delete successful`,
    EMAIL_SENT          : 'Email sent',
    SIGNED_IN           : 'Signed Up',
    SIGNED_OUT          : 'Signed Out',
    SIGNED_UP           : 'Signed Up',
  },

  ERROR: {
    400                : 'BAD REQUEST: Client request is Invalid',
    401                : 'UNAUTHORIZED: Request cannot be granted unless Client is Authenticated',
    403                : 'FORBIDDEN: Necessary permissions is required to access the Requested Resource',
    404                : 'NOT FOUND: Resource requested cannot be found',
    422                : 'UNPROCESSABLE ENTITY: The data submitted in a form is in the wrong format or is missing required fields',
    429                : 'REQUEST OVERLOAD: Throttling limit exceeded for an API',
    500                : 'INTERNAL SERVER ERROR: Server encountered an Unhandled Exception',
    503                : 'SERVICE UNAVAILABLE: The server is temporarily unable to handle the Request',
    CORS_NOT_ALLOWED   : 'CORS ERROR: Not allowed by Access-Control-Allow-Origin',
    DOCUMENT_EXISTS    : 'Document already exists',
    EMAIL              : (email: string) => `This email (${email}) already belongs to our records, only one account per email`,
    FAILED_FIND        : 'Failed to find the requested document',
    FAILED_CREATE      : 'Failed to create Record',
    FAILED_UPDATE      : 'Failed to update Record',
    FAILED_DELETE      : 'Failed to delete Record',
    FAILED_SEED        : ' Failed to seed collection/s ',
    FAILED_DESTROY     : ' Failed to destroy collection/s ',
    INVALID_CREDENTIALS: 'Invalid Credentials'
  },
}