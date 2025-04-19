import { Application } from 'express'
import { linkAuthRoute } from 'route/auth'

export const mainRoute = (app: Application, apiVer: string) => {
    linkAuthRoute(app, apiVer)
}

export { default as ServerStatic } from './server-static'

