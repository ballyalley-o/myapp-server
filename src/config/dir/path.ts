import { GLOBAL } from 'config/global'
import { connect } from 'utility'

export const API = '/api'

export const PATH_DIR = {
  API_WELCOME: connect(API, GLOBAL.API_VERSION),
}