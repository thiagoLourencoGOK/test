import { JWT_SECRET } from '@/config/config'
import { UserModel } from '@/models/user.model'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { Strategy as AnonymousStrategy } from 'passport-anonymous'
import { Strategy as FacebookStrategy } from 'passport-facebook'

interface JWTPayload {
  id: string
  name: string
  email: string
  iat: number
  exp: number
}

export const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (payload: JWTPayload, done) => {
    try {
      const user = await UserModel.findById(payload.id)
      if (!user) return done(null, false)
      done(null, user.toJSON())
    } catch (e) {
      return done(e)
    }
  },
)

export const anonymousStrategy = new AnonymousStrategy()

export const facebookStrategy = new FacebookStrategy(
  {
    clientID: process.env['FACEBOOK_APP_ID'],
    clientSecret: process.env['FACEBOOK_APP_SECRET'],
    callbackURL: process.env['FACEBOOK_CALLBACK_URL'],
    profileFields: ['name', 'id', 'emails'],
  },
  async (accessToken, refreshToken, profile, cb) => {
    const user = await UserModel.find({
      facebook_provider: profile.id,
    })

    // Caso exista
    if (user.length > 0) {
      return cb(null, user[0].toAuthJSON())
      // Caso não exista o token, verifico o email
    } else {
      const userEmail = await UserModel.find({
        email: profile.emails[0].value,
      })

      // Caso o email ja exista, adiciono o token do fb e retorno o user
      if (userEmail.length > 0) {
        userEmail[0].facebook_provider = profile.id
        userEmail[0].save()

        return cb(null, userEmail[0].toAuthJSON())
      } else {
        if (profile.emails && profile.emails.length > 0) {
          const newUser = new UserModel({
            first_name: profile.name.givenName,
            last_name: profile.name.familyName,
            email: profile.emails[0].value,
          })

          await newUser.save()
          return cb(null, newUser.toAuthJSON())
        } else {
          return cb(null, false)
        }
      }
    }
  },
)
