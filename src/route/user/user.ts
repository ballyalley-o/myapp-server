import { Request, Response, NextFunction } from 'express'
import { Router } from 'express'

const router = Router({ mergeParams: true })

router.route('/')
.get((_req: Request, res: Response, _next: NextFunction) => { res.send({ message: 'GET request to /' })})
.post((_req: Request, res: Response, _next: NextFunction) => { res.send({ message: 'POST request to /' })})

router.route('/:id')
.get((_req: Request, res: Response, _next: NextFunction) => { res.send({ message: 'GET request to /:id' })})
.put((_req: Request, res: Response, _next: NextFunction) => { res.send({ message: 'PUT request to /:id' })})
.delete((_req: Request, res: Response, _next: NextFunction) => { res.send({ message: 'DELETE request to /:id' })})


/**
 * @path {apiURL}/auth/user
 */
const userRoute = router
export default userRoute