import mongoose from 'mongoose'
import { GLOBAL } from 'myapp'
import goodlog from 'good-logs'

const TAG = 'DB'

export const connectDb = async (isConnected: boolean) => {
    try {
        const db    = await mongoose.connect(String(GLOBAL.DB_URI))
        const _host = GLOBAL.DB_HOST(db.connection)
        const _name = GLOBAL.DB_NAME(db.connection)
        goodlog.db(_host, _name, isConnected)
    } catch (error: any) {
        goodlog.error(error.message, TAG, 'connectDb')
        process.exit()
    }
}

const createIndex = <T extends Record<string, number>>(index: T): IndexType<T> => {
  return index as IndexType<T>
}

export const DB_INDEX = {
  USER: createIndex({ firstname: 1 })
}