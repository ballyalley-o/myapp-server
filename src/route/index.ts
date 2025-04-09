import { Application } from 'express'
import { linkUserRoute } from 'route/user'

export const mainRoute = (app: Application, apiVer: string) => {
    linkUserRoute(app, apiVer)
}

export { default as ServerStatic } from './server-static'

