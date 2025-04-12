import { Model } from 'mongoose'
import { User } from 'model'
import { ErrorResponse } from 'middleware'
import { CODE, RESPONSE } from 'constant'

const TAG = 'Service'
export class Service {

  public static async checkExistence(
    model       : Model<any>,
    query       : Record<string,                         any>,
    errorMessage: string = RESPONSE.ERROR.RECORD_EXISTS,
    errorCode   : CODE = CODE.BAD_REQUEST
  ): Promise<void> {
    const record = await model.findOne(query)
    if (record) {
      throw new ErrorResponse(errorMessage, errorCode)
    }
  }

  public static async createUser(data: any) {
    const { email } = data

    await Service.checkExistence(User, { email }, RESPONSE.ERROR.RECORD_EXISTS)
    const newUser = await User.create(data)
    if (!newUser) {
      throw new ErrorResponse(RESPONSE.ERROR.FAILED_CREATE, CODE.BAD_REQUEST)
    }
    return newUser
  }

  public static async updateUser(userId: string, data: any) {
    const { email } = data
    await Service.checkExistence(User, { email, _id: { $ne: userId } })

    const updatedUser = await User.findByIdAndUpdate(userId, data, { new: true })
    if (!updatedUser) {
        throw new ErrorResponse(RESPONSE.ERROR.FAILED_UPDATE, CODE.BAD_REQUEST)
    }
    return updatedUser
  }

  public static async deleteUser(userId: string) {
    await Service.checkExistence(User, { userId })

    const deletedUser = await User.findByIdAndDelete(userId)
    if (!deletedUser) {
        throw new ErrorResponse(RESPONSE.ERROR.FAILED_UPDATE, CODE.BAD_REQUEST)
    }
    return {}
  }
}