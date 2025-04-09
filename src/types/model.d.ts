declare global {
    namespace Mongoose {
       interface Schema {
         Types: {
           ObjectId: string
         }
       }
    }
}

type Model = IUser
type Role  = 'customer' | 'admin'

declare interface IUser {
  _id      : Mongoose.Schema.Types.ObjectId
  firstname: string
  lastname : string
  email    : string
  password : string
  role     : Role
}