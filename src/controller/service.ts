import { Model } from 'mongoose'
import { Response } from 'express'
import { GLOBAL } from 'myapp'
import { User } from 'model'
import { ErrorResponse } from 'middleware'
import { CODE, KEY, RESPONSE, Resp } from 'constant'

const TAG = 'Service'
export class Service {

  public static async checkExistence(
    model       : Model<any>,
    query       : Record<string,                         any>,
    errorMessage: string = RESPONSE.ERROR.RECORD_EXISTS,
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

  public static async createUser(data: any) {
    const { email } = data

    await Service.checkExistence(User, { email }, RESPONSE.ERROR.RECORD_EXISTS)
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