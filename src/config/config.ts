export const ENVIRONMENT = process.env.APP_ENV || 'dev'
export const IS_PRODUCTION = ENVIRONMENT === 'production'
export const IS_TEST = ENVIRONMENT === 'test'
export const APP_PORT = Number(process.env.APP_PORT) || 9000
export const APP_WEB_PREFIX_PATH = process.env.APP_WEB_PREFIX_PATH || '/'
export const APP_API_PREFIX_PATH = process.env.APP_API_PREFIX_PATH || '/api'
export const JWT_SECRET = process.env.JWT_SECRET || 'somerandomkeyherena'
export const JWT_EXPIRE = process.env.JWT_EXPIRE || '1m'
export const SEND_EMAIL_FROM = process.env.SEND_EMAIL_FROM || 'contato@praks.digital'
export const DB = {
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_USER_PWD,
  HOST: process.env.DB_HOST,
  NAME: process.env.DB_NAME,
  PORT: Number(process.env.DB_PORT) || 27017,
}
export const DB_URI = process.env.DB_URI || ''
