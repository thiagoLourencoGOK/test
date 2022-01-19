/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */

import { LoginController } from '@/controllers/api/user/login.controller'
import { RegisterUserController } from '@/controllers/api/user/register.controller'
import express from 'express'

import passport from 'passport'

const router = express.Router()

router.post('/login', LoginController)

router.post('/register', RegisterUserController)

router.get('/me', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  res.send(req.user)
})

export default router
