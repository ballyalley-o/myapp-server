import { Application } from 'express'
import { connect } from 'misc'
import userRoute from 'route/user/user'

export const linkUserRoute = (app: Application, apiVer: string) => {
    app.use(connect(apiVer, 'auth', 'user'), userRoute)
}