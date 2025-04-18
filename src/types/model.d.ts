
declare global {
    namespace Mongoose {
       interface Schema {
         Types: {
           ObjectId: any
         }
       }
    }
}

declare type IndexType<T extends Record<string, number>> = {
    [K in typeof T]: IndexDirection }

type Model = IUser
declare type Role  = 'customer' | 'admin'


declare interface IUser {
  _id                                   ?: Mongoose.Schema.Types.ObjectId
  firstname                              : string
  lastname                               : string
  email                                  : string
  password                               : string
  role                                   : Role
}