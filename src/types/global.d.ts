import { Request, Response, NextFunction } from 'express'

declare global {
    declare type RequestHandler = (req : Request, res : Response, next: NextFunction) => void

    declare interface IConnect { (...params: string[]): string }

    declare interface IPagination {
        prev?: { page: number, limit: number }
        next?: { page: number, limit: number }
    }

    declare interface AdvancedResults {
      success    : boolean
      message   ?: string
      count      : number
      pagination : Pagination
      data       : unknown[]
    }

    declare interface IRequestUser extends Request {
      user: { id  : string, role: Role }
    }

    declare interface DecodedToken {
      id : string
      iat: number,
      exp: number
    }

    declare type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>

    declare namespace Express {
        interface Request {
          user: {
            id  : string
            role: Role
          }
        }
        interface Response {
          advanceResult: AdvancedResults
        }
    }
}