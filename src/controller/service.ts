import { Model } from 'mongoose'
import { Response } from 'express'
import { GLOBAL } from 'myapp'
import goodlog from 'good-logs'
import { User } from 'model'
import { ErrorResponse } from 'middleware'
import { CODE, KEY, RESPONSE, Resp } from 'constant'

const TAG = 'Service'
export class Service {

  public static async checkExistence(
    model       : Model<any>,
    query       : Record<string,                         any>,
    errorMessage: string = RESPONSE.ERROR.DOCUMENT_EXISTS,
    errorCode   : CODE = CODE.CONFLICT
  ): Promise<void> {
    const record = await model.findOne(query)
    if (record) {
      throw new ErrorResponse(errorMessage, errorCode)
    }
  }

  public static async sendTokenResponse(user: any, code: CODE, res: Response) {
    const token   = user.getSignedJwtToken()
    const options = {
      expires : GLOBAL.COOKIE.EXP,
      httpOnly: true,
      secure  : false
    }

    if (GLOBAL.ENV === KEY.PRODUCTION) {
      options.secure = true
    }

    res.status(code).cookie(GLOBAL.COOKIE.NAME, token, options).send(Resp.TokenResponse(token, user))
  }

  public static notFound(): never {
    throw new ErrorResponse(RESPONSE.ERROR[404], CODE.NOT_FOUND)
  }

  public static invalid(message: string = RESPONSE.ERROR.INVALID_CREDENTIALS, code: CODE = CODE.UNAUTHORIZED): never {
    throw new ErrorResponse(message, code)
  }

  public static alreadyExist(email: string): never {
    throw new ErrorResponse(RESPONSE.ERROR.EMAIL(email), CODE.CONFLICT)
  }

  public static catchError(error: any, tag: string, target: string, res: Response) {
      goodlog.error(error?.message || error?.stack, tag, target)
      const code = error instanceof ErrorResponse ? error?.code : CODE.BAD_REQUEST
      res.status(code).send(Resp.Error(error?.message, code, error?.details))
  }

  public static async createUser(data: any) {
    const newUser = await User.create(data)
    return newUser
  }

  public static async updateUser(userId: string, data: any) {
    const updatedUser = await User.findByIdAndUpdate(userId, data, { new: true })
    if (!updatedUser) {
      throw new ErrorResponse(RESPONSE.ERROR.FAILED_FIND, CODE.NOT_FOUND)
    }
    return updatedUser
  }

  public static async deleteUser(userId: string) {
    const deletedUser = await User.findByIdAndDelete(userId)
    if (!deletedUser) {
      throw new ErrorResponse(RESPONSE.ERROR.FAILED_FIND, CODE.NOT_FOUND)
    }
    return {}
  }
}