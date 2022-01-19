import express from 'express'
import { authenticate } from 'passport'

import { ResetPasswordSend } from '@/controllers/api/forgot_password/reset_password_send'
import { ResetPassword } from '@/controllers/api/forgot_password/reset_password'

const router = express.Router()

router.post('/', authenticate(['jwt', 'anonymous'], { session: false }), ResetPasswordSend)
router.post('/:token', authenticate(['jwt', 'anonymous'], { session: false }), ResetPassword)

export default router
