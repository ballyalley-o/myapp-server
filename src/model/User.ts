import { Schema, model } from 'mongoose'
import { GLOBAL } from 'myapp'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { REGEX } from 'constant'


const TAG = 'User'

const UserSchema = new Schema<IUser>(
    {
        firstname: {
            type    : String,
            required: [true, 'Firstname is required'],
            min     : 3,
            max     : 20,
            validate: {
                validator: function(v: string) {
                    return v.length > 3 && v.length < 20
                },
                message: (props) => `Firstname length (${props.value.length}) exceeds the limit of characters`
            }
        },

        lastname: {
            type: String,
            max: 20,
            validate: {
                validator: function(v: string) {
                    return v.length < 20
                },
                message: (props) => `Lastname length (${props.value.length}) exceeds the limit of characters`
            }
        },
        email: {
            type    : String,
            required: [true, 'Email is required'],
            unique  : true,
            match: [REGEX.EMAIL, 'Invalid email']
        },
        password: {
            type    : String,
            required: [true, 'Password is required'],
            min     : 6,
            select  : false
        },

    },
    {
        toJSON    : { virtuals: true },
        toObject  : { virtuals: true },
        collection: TAG,
        timestamps: true
    }
)

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt          = await bcrypt.genSalt(10)
          this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, GLOBAL.JWT_SECRET || '', {
    expiresIn: GLOBAL.JWT_EXP,
  })
}