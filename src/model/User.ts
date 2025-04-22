import { Schema, model } from 'mongoose'
import { GLOBAL } from 'myapp'
import DB_INDEX from 'config/db-index'
import argon2 from 'argon2'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { oneDayFromNow, REGEX } from 'constant'
import { getLocale } from 'utility'

const TAG = 'User'
const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    firstname: {
      type    : String,
      required: [true, getLocale('validation.default.required', { field: 'Firstname' })],
      min     : 3,
      max     : 20,
      validate: {
        validator: function (v: string) {
          return v.length > 3 && v.length < 20
        },
        message: (props) => getLocale('validation.default.length', { field: 'Firstname', value: props.value.length, min: 3, max: 20 }),
      },
    },

    lastname: {
      type    : String,
      max     : 20,
      validate: {
        validator: function (v: string) {
          return v.length < 20
        },
        message: (props) => getLocale('validation.default.max_length', { field: 'Lastname', value: props.value.length }),
      },
    },
    email: {
      type    : String,
      required: [true, getLocale('validation.default.length', { field: 'Email' })],
      unique  : [true, getLocale('validation.default.unique', { field: 'Email' })],
      match   : [REGEX.EMAIL, getLocale('validation.default.invalid', { field: 'email' })],
      index   : true
    },
    password: {
      type    : String,
      required: [true, getLocale('validation.default.length', { field: 'Password', min: 6, max: 20 })],
      min     : 6,
      select  : false,
    }
  },
  {
    toJSON    : { virtuals: true },
    toObject  : { virtuals: true },
    collection: TAG,
    timestamps: true,
  }
)

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next()
    }

    const hashTypeMap = {
      argon2d : argon2.argon2d,
      argon2i : argon2.argon2i,
      argon2id: argon2.argon2id
    } as const

    const type = hashTypeMap[GLOBAL.HASH.TYPE as keyof typeof hashTypeMap]

    if (!type) {
      throw new Error(`Invalid hash type: ${GLOBAL.HASH.TYPE}`)
    }

    this.password = await argon2.hash(this.password, {
      type       : type,
      memoryCost : GLOBAL.HASH.MEMORY_COST,
      timeCost   : GLOBAL.HASH.TIME_COST,
      parallelism: GLOBAL.HASH.PARALLELISM
    })
})

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, GLOBAL.JWT_SECRET, {
    expiresIn: GLOBAL.JWT_EXP
  })
}

UserSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await argon2.verify(this.password, enteredPassword)
}

UserSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString(GLOBAL.ENCRYPTION.ENCODING as BufferEncoding)

    this.resetPasswordToken  = crypto.createHash(GLOBAL.ENCRYPTION.ALG).update(resetToken).digest(GLOBAL.ENCRYPTION.ENCODING as crypto.BinaryToTextEncoding)
    this.resetPasswordExpire = oneDayFromNow
    return resetToken
}

UserSchema.index(DB_INDEX.USER)
export default model(TAG, UserSchema)