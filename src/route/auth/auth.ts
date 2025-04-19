import { Router } from 'express'
import { PATH_DIR } from 'config/dir'
import { AuthController } from 'controller'
import { protect } from 'middleware'

const router = Router({ mergeParams: true })

router.post(PATH_DIR.SIGN_IN, AuthController.signIn)
router.post(PATH_DIR.SIGN_OUT, AuthController.signOut)
router.post(PATH_DIR.SIGN_UP, AuthController.signUp)
router.get(PATH_DIR.ACCOUNT, protect, AuthController.myAccount)
router.put(PATH_DIR.ACCOUNT, protect, AuthController.updateAccount)

/**
 * @path {apiURL}/auth
 */
const authRoute = router
export default authRoute