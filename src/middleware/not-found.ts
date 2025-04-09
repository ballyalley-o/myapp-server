import { CODE } from 'constant'
import 'colors'

export const notFound: RequestHandler = (req, res, next) => {
  const error = new Error(`[NOT FOUND] - ${req.originalUrl}`.red)
  res.send(CODE.NOT_FOUND)
  next(error)
}