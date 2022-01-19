import express from 'express'
import passport from 'passport'

const router = express.Router()

/**
 * Facebook routes
 */
router.get(
  '/Oauth/facebook',
  passport.authenticate('facebook', {
    scope: ['email'],
  }),
)
router.get(
  '/Oauth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: `${process.env['FRONTEND_URL']}/login`,
    failureMessage: true,
    session: true,
  }),
  function (req, res) {
    const user = req.user as { name: string; token: string; email: string }
    res.redirect(`${process.env['FRONTEND_URL']}/login?success=true&token=&${user.token}`)
  },
)

export default router
