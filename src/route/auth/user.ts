import { Router } from 'express'
import { UserController } from 'controller'
import { advanceResult } from 'middleware'
import { User } from 'model'

const router = Router({ mergeParams: true })

router.route('/')
.get(advanceResult(User, 'email'), UserController.getUsers)
.post(UserController.createUser)

router.route('/:id')
.get(UserController.getUser)
.put(UserController.updateUser)
.delete(UserController.deleteUser)


/**
 * @path {apiURL}/auth/user
 */
const userRoute = router
export default userRoute