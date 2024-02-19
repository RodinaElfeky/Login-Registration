import {Router} from 'express'
import { updatePassword } from './controller/user.controller.js'
import { auth } from '../../Middleware/auth.js'


const router = Router()

router.patch("/updatePassword",auth(),updatePassword)

export default router