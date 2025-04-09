import { PATH_DIR } from 'config/dir'
import express, { Router } from 'express'
import { RESPONSE } from 'constant'

class ServerStatic {
  private static _router: Router

  static get instance(): express.Router {
    if (!ServerStatic._router) {
        ServerStatic._router = express.Router()
    }
    return ServerStatic._router
  }

  static welcome() {
    this._router?.get(PATH_DIR.API_WELCOME, RESPONSE.SERVER)
  }
}

export default ServerStatic