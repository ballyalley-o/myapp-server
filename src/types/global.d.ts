import { Request, Response, NextFunction } from 'express'

declare global {
    declare type RequestHandler = (req : Request, res : Response, next: NextFunction) => void

    declare interface IConnect { (...params: string[]): string }

}