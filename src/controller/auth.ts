import { Request, Response, NextFunction } from 'express'
import { GLOBAL } from 'myapp'
import { Service } from 'controller'
import { User } from 'model'
import { CODE, fiveSecFromNow, KEY, Resp, RESPONSE } from 'constant'

const TAG = 'Auth.Controller'
export class AuthController {
    public static async signIn(req: Request, res: Response, _next: NextFunction) {
        try {
            const { email, password }  = req.body

            if (!email || !password) Service.invalid()

            const user = await User.findOne({ email }).select(KEY.ADD_PASSWORD) || Service.invalid()

            await user.matchPassword(password) || Service.invalid()

            await Service.sendTokenResponse(user, CODE.OK, res)
        } catch (error: any) {
            Service.catchError(error, TAG, 'signIn', res)
        }
    }

    public static async signUp(req: Request, res: Response, _next: NextFunction) {
        try {
            const { email } = req.body
            const userExists = await User.findOne({ email })

            if (userExists) Service.alreadyExist(email)

            const newUser = await User.create(req.body)

            await Service.sendTokenResponse(newUser, CODE.CREATED, res)
        } catch (error: any) {
            Service.catchError(error, TAG, 'signUp', res)
        }
    }

    public static async signOut(_req: Request, res: Response, _next: NextFunction) {
        res.cookie(GLOBAL.COOKIE.NAME, "none", {
            expires : fiveSecFromNow,
            httpOnly: true
        })

        try {
            res.status(CODE.OK).send(Resp.TokenResponse('', {}))
        } catch (error: any) {
            Service.catchError(error, TAG, 'signOut', res)
        }
    }

    public static async myAccount(req: Request, res: Response, _next: NextFunction) {
        try {
            if (!req.user?.id) {
                return Service.invalid(RESPONSE.ERROR[401], CODE.UNAUTHORIZED)
            }
            const user = await User.findById(req.user.id) || Service.notFound()
            res.status(CODE.OK).send(Resp.Ok(user))
        } catch (error: any) {
            Service.catchError(error, TAG, 'myAccount', res)
        }
    }

    public static async updateAccount(req: Request, res: Response, _next: NextFunction) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
                new          : true,
                runValidators: true
            }).select(KEY.REMOVE_PASSWORD) || Service.notFound()

            res.status(CODE.OK).send(Resp.Ok(updatedUser))
        } catch (error: any) {
            Service.catchError(error, TAG, 'updateAccount', res)
        }
    }
}