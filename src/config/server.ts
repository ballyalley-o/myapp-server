import dotenv from 'dotenv'
dotenv.config()

import { GLOBAL, connectDb as db } from 'myapp'
import express, { Application } from 'express'
import goodlog from 'good-logs'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import mongoSanitize from 'express-mongo-sanitize'
import helmet from 'helmet'
import hpp from 'hpp'
import rateLimit, { Options } from 'express-rate-limit'
import { ServerStatic, mainRoute } from 'route'
import { notFound, errorHandler, corsConfig, xssHandler } from 'middleware'
import { KEY } from 'constant'
import { PATH_DIR } from './dir'

const TAG = 'App'

class App {
  private _app: Application
  private _env: string = GLOBAL.ENV
  isConnected: boolean = false

  public static globalConfig = GLOBAL

  static async app(): Promise<express.Application> {
    const instance = new App()
    await instance.connectDb()
    await instance.start()
    return instance._app
  }

  get app() {
    return this._app
  }

  constructor() {
    this._app = express()
    this._app.use(express.json())
    this._app.use(express.urlencoded({ extended: true }))
    this._app.use(express.static('public'))
    this._app.use(morgan('dev'))
    this._app.use(cookieParser())
    this._app.use(cors(corsConfig))
    // this._app.use(mongoSanitize({ replaceWith: '_' }))
    this._app.use(helmet())
    this._app.use(xssHandler)
    this._app.use(rateLimit(GLOBAL.RATE_LIMIT as Partial<Options>))
    this._app.use(hpp())
    this.registerRoute()
    this._app.use(errorHandler)
    this._app.use(notFound)
  }

  private registerRoute(): void {
    this._app.use(ServerStatic.instance)
    ServerStatic.welcome()
    mainRoute(this._app, PATH_DIR.API_WELCOME)
  }

  public async connectDb(): Promise<void> {
    try {
      await db(true)
    } catch (error) {
      if (error instanceof Error) {
        goodlog.error(error.message, TAG, 'connectDb[App]')
        db(false)
      }
    }
  }

  public async start(): Promise<void> {
    try {
      this._app.listen(GLOBAL.PORT, () => {
        goodlog.server(GLOBAL.PORT, GLOBAL.API_VERSION, this._env, true)
      })
    } catch (error: any) {
      process.on(KEY.UNHANDLED_REJECTION, (err: Error) => {
        goodlog.server(Number(GLOBAL.PORT), GLOBAL.API_VERSION, this._env, false)
        goodlog.error(error.message, TAG, 'start')
      })
    }
  }
}

export default App