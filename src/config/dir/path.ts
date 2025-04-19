import { GLOBAL } from 'config/global'
import { connect } from 'utility'

export const API = '/api'
export const ID = '/:id'
export const ROOT = '/'

export const MODULE = {
  AUTH: 'auth',
  USER: 'user'
}

const AUTH = {
  ACCOUNT : '/account',
  SIGN_IN : '/sign-in',
  SIGN_OUT: '/sign-out',
  SIGN_UP : '/sign-up',
}

export const PATH_DIR = {
  ACCOUNT    : connect(AUTH.ACCOUNT),
  API_WELCOME: connect(API, GLOBAL.API_VERSION),
  ID         : connect(ID),
  ROOT       : connect(ROOT),
  SIGN_IN    : connect(AUTH.SIGN_IN),
  SIGN_OUT   : connect(AUTH.SIGN_OUT),
  SIGN_UP    : connect(AUTH.SIGN_UP)
}