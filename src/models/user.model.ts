import { Schema, Document, model } from 'mongoose'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

import { JWT_EXPIRE, JWT_SECRET } from '@/config/config'
import privateValidator from 'mongoose-private'

import { ICourse } from './courses.model'

export interface IUser {
  name: string
  email: string
  hash_password?: string
  salt: string
  courses?: {
    _id?: string
    course: ICourse
    lessons_finished: string[]
    last_video_id: string
    last_video_time: number
    finished: boolean
    finished_date: string
    certificate_url: string
  }[]
  role?: string
  active?: boolean
  createdAt?: Date
  updatedAt?: Date
  followers?: IUser[]
  following?: IUser[]
  links?: string[]
  bio?: string
  avatar?: string
  facebook_provider?: string
  google_provider?: string
  social?: {
    facebook?: string
    twitter?: string
    instagram?: string
    linkedin?: string
  }
  projects?: string[]
  resetPasswordToken?: string
  resetPasswordExpires?: number
}

export interface IUserToAuthJSON {
  name: string
  email: string
}

export default interface IUserModel extends Document, IUser {
  setPassword(password: string): void
  validPassword(password: string): boolean
  toAuthJSON(): IUserToAuthJSON
  generateJWT(): string
  generateAccessJWT(): string
  generatePasswordReset(): void
  name: string
}

const schema = new Schema<IUserModel>(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hash_password: {
      type: String,
      private: true,
    },
    salt: {
      type: String,
      private: true,
    },
    courses: {
      type: [
        {
          course: {
            type: Schema.Types.ObjectId,
            ref: 'Course',
          },
          lessons_finished: {
            type: [String],
            default: [],
          },
          last_video_id: {
            type: String,
            default: '',
          },
          last_video_time: {
            type: Number,
            default: 0,
          },
          finished: {
            type: Boolean,
            default: false,
          },
          finished_date: {
            type: Date,
            default: '',
          },
          certificate_url: {
            type: String,
            default: '',
          },
        },
      ],
      default: [],
    },
    role: {
      type: String,
      default: 'user',
    },
    active: {
      type: Boolean,
      default: false,
    },
    followers: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
    following: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
    links: {
      type: Object,
      default: {},
    },
    bio: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      default: '',
    },
    social: {
      type: {
        facebook: String,
        twitter: String,
        instagram: String,
        linkedin: String,
      },
      default: {},
    },
    projects: {
      type: [String],
      default: [],
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
)

// Plugins
schema.plugin(privateValidator)

schema.methods.setPassword = function (password: string) {
  this.salt = crypto.randomBytes(16).toString('hex')
  this.hash_password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
}

schema.methods.validPassword = function (password: string): boolean {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
  return this.hash_password === hash
}

schema.methods.generatePasswordReset = function () {
  this.resetPasswordToken = crypto.randomBytes(16).toString('hex')
  this.resetPasswordExpires = Date.now() + 3600000
}

schema.methods.generateJWT = function (): string {
  return jwt.sign(
    {
      id: this._id,
      name: this.name,
      email: this.email,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRE,
    },
  )
}

schema.methods.toAuthJSON = function () {
  const { name, email, _id } = this
  return {
    _id,
    name,
    email,
    token: this.generateJWT(),
  }
}

export const UserModel = model<IUserModel>('User', schema)
