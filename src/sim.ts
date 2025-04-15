import { App } from 'myapp'
import goodlog from "good-logs"
import { User } from 'model'
import { user } from '_mock'
import { RESPONSE } from 'constant'

const app = new App()
app.connectDb()

const TAG = 'Seed'
const seed = async () => {
    try {
        await User.deleteMany()
        await User.insertMany(user)
        goodlog.warn(RESPONSE.SUCCESS.COLLECTION_SEED)
        process.exit()
    } catch (error: any) {
        goodlog.error(error?.message, TAG, 'sim')
        throw new Error(RESPONSE.ERROR.FAILED_SEED)
    }
}

const destroy = async () => {
    try {
        await User.deleteMany()
        goodlog.custom('bgRed', RESPONSE.SUCCESS.COLLECTION_DESTROYED)
        process.exit(1)
    } catch (error: any) {
        goodlog.error(error?.message, TAG, 'destroy')
        throw new Error(RESPONSE.ERROR.FAILED_DESTROY)
    }
}

if (process.argv[2] === '-d') {
    destroy()
} else if (process.argv[2] === '-i') {
    seed()
}