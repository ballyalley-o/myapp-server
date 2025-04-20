import mongoose from 'mongoose'
import { GLOBAL } from 'myapp'
import goodlog from 'good-logs'
import { User } from 'model'

const TAG = 'DB'
export const connectDb = async (isConnected: boolean) => {
  try {
    const db = await mongoose.connect(String(GLOBAL.DB_URI))
    await User.syncIndexes()
    const _host = GLOBAL.DB_HOST(db.connection)
    const _name = GLOBAL.DB_NAME(db.connection)
    goodlog.db(_host, _name, isConnected)
  } catch (error: any) {
    goodlog.error(error.message, TAG, 'connectDb')
    process.exit()
  }
}