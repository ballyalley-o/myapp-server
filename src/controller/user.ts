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
            res.status(CODE.BAD_REQUEST).send(Resp.Error(error?.message))
        }
    }

    public static async getUser(req:Request, res: Response, _next: NextFunction) {
        try {
            const user = await User.findById(req.params.id)
            res.status(CODE.OK).send(Resp.Ok(user))
        } catch (error: any) {
            goodlog.error(error?.message || error, TAG, 'getUser')
            res.status(CODE.BAD_REQUEST).send(Resp.Error(error?.message))
        }
    }

    public static async createUser(req: Request, res: Response, _next: NextFunction) {
        try {
            const newUser = await Service.createUser(req.body)
            res.status(CODE.CREATED).send(Resp.Created(newUser))
        } catch (error: any) {
            goodlog.error(error?.message || error, TAG, 'createUser')
            res.status(CODE.BAD_REQUEST).send(Resp.Error(error?.message))
        }
    }

    public static async updateUser(req: Request, res: Response, _next: NextFunction) {
        try {
            const { _id } = req.body
            const updatedUser = await Service.updateUser(_id, req.body)
            res.status(CODE.OK).send(Resp.Ok(updatedUser))
        } catch (error: any) {
            goodlog.error(error?.message || error, TAG, 'updateUser')
            res.status(CODE.BAD_REQUEST).send(Resp.Error(error?.message))
        }
    }

    public static async deleteUser(req: Request, res: Response, _next: NextFunction) {
        try {
            const { _id } = req.body
            const deletedUser = await Service.deleteUser(_id)
            res.status(CODE.OK).send(Resp.Ok(deletedUser, 0, RESPONSE.SUCCESS.DELETED))
        } catch (error: any) {
            goodlog.error(error?.message || error, TAG, 'deleteUser')
            res.status(CODE.BAD_REQUEST).send(Resp.Error(error?.message))
        }
    }
}