import { Request, Response, NextFunction } from 'express'
import goodlog from 'good-logs'
import { User } from 'model'
import { ErrorResponse } from 'middleware'
import { Service } from 'controller'
import { CODE, Resp, RESPONSE } from 'constant'

const TAG = 'User.Controller'
export class UserController {
    public static async getUsers(_req: Request, res: Response, _next:NextFunction) {
        try {
            res.status(CODE.OK).json(res.advanceResult)
        } catch (error: any) {
            goodlog.error(error?.message || error, TAG, 'getUsers')
            const code = error instanceof ErrorResponse ? error.code : CODE.BAD_REQUEST
            res.status(code).send(Resp.Error(error?.message, code))
        }
    }

    public static async getUser(req:Request, res: Response, _next: NextFunction) {
        try {
            const user = await User.findById(req.params.id)
            res.status(CODE.OK).send(Resp.Ok(user))
        } catch (error: any) {
            goodlog.error(error?.message || error, TAG, 'getUser')
            const code = error instanceof ErrorResponse ? error.code : CODE.BAD_REQUEST
            res.status(code).send(Resp.Error(error?.message, code))
        }
    }

    public static async createUser(req: Request, res: Response, _next: NextFunction) {
        try {
            const newUser = await Service.createUser(req.body)
            res.status(CODE.CREATED).send(Resp.Created(newUser))
        } catch (error: any) {
            goodlog.error(error?.message || error, TAG, 'createUser')
            const code = error instanceof ErrorResponse ? error.code : CODE.BAD_REQUEST
            res.status(code).send(Resp.Error(error?.message, code))
        }
    }

    public static async updateUser(req: Request, res: Response, _next: NextFunction) {
        try {
            const userId = req.params.id
            const updatedUser = await Service.updateUser(userId, req.body)
            res.status(CODE.OK).send(Resp.Ok(updatedUser))
        } catch (error: any) {
            goodlog.error(error?.message || error, TAG, 'updateUser')
            const code = error instanceof ErrorResponse ? error.code : CODE.BAD_REQUEST
            res.status(code).send(Resp.Error(error?.message, code))
        }
    }

    public static async deleteUser(req: Request, res: Response, _next: NextFunction) {
        try {
            const userId = req.params.id
            const deletedUser = await Service.deleteUser(userId)
            res.status(CODE.OK).send(Resp.Ok(deletedUser, 0, RESPONSE.SUCCESS.DELETED))
        } catch (error: any) {
            goodlog.error(error?.message || error, TAG, 'deleteUser')
            const code = error instanceof ErrorResponse ? error.code : CODE.BAD_REQUEST
            res.status(code).send(Resp.Error(error?.message,code))
        }
    }
}