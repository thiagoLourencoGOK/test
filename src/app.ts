import express from 'express'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import compression from 'compression'
import cors from 'cors'
import passport from 'passport'
import httpStatus from 'http-status'

import apiRoutes from '@/routes/api'
import webRoutes from '@/routes/web'
import { morganSuccessHandler, morganErrorHandler } from '@/config/morgan'
import { IS_TEST, APP_API_PREFIX_PATH, APP_WEB_PREFIX_PATH } from '@/config/config'
import ApiError from './utils/ApiError'
import { errorConverter, errorHandler } from './middlewares/error'
import { anonymousStrategy, jwtStrategy, facebookStrategy } from '@/config/passport'
// import swaggerUi from 'swagger-ui-express'
// import swaggerDocument from '@/swagger.json'

const app = express()

app.use(passport.initialize())
passport.use(jwtStrategy)
passport.use(anonymousStrategy)
passport.use(facebookStrategy)

if (!IS_TEST) {
  app.use(morganSuccessHandler)
  app.use(morganErrorHandler)
}

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
        baseUri: ["'self'"],
        fontSrc: ["'self'", 'https:', 'data:'],
      },
    },
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(mongoSanitize())
app.use(compression())
app.use(cors())

app.get('/', (_req, res) => {
  res.send('Healthy')
})

// Api routes
app.use(APP_API_PREFIX_PATH, apiRoutes)
// Dashboard view routes
app.use(APP_WEB_PREFIX_PATH, webRoutes)

app.use((_req, _res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})
app.use(errorConverter)
app.use(errorHandler)

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

export default app
