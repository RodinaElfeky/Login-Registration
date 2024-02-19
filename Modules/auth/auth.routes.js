import {Router} from 'express'
import { signUp, login, confirmEmail, refreshToken, sendCode, forgetPassword,  } from './controller/auth.controller.js'

const router = Router()

router.post("/signup",signUp)
router.get("/confirmEmail/:token",confirmEmail)
router.get("/refreshToken/:token",refreshToken)
router.post("/login",login)
router.post("/sendcode",sendCode)
router.post("/forgetPassword",forgetPassword)

export default router