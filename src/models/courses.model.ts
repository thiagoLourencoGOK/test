import mongoose, { model, Schema } from 'mongoose'
import IInstructorModel from './instructor.model'
import { ITag } from './tag.model'
import IUserModel from './user.model'

export interface IWaitList {
  name: string
  email: string
  createdAt: Date
}

interface ILessons {
  title: string
  description: string
  position: number
  videoUrl: string
  videoLength: number
  viewed: boolean
  active: boolean
}
interface ICourseModule {
  title: string
  lessons: ILessons[]
}

export interface ICourse {
  _id?: string
  name: string
  title: string
  subtitle: string
  released: boolean
  start_date: Date
  end_date?: Date
  image: string
  createdAt?: Date
  updatedAt?: Date
  tags: ITag[]
  status: string
  modules: ICourseModule[]
  instructor: IInstructorModel
  usersSubscribed: IUserModel[]
  waitList: IWaitList[]
  description: string
  hours?: number
  trailer?: string
  active: boolean
  playlist_url: string
  slug: string
  button_name?: string
}

export default interface ICourseModel extends Document, ICourse {}

const schema = new Schema<ICourseModel>(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
    },
    subtitle: {
      type: String,
      required: true,
      minlength: 3,
    },
    description: {
      type: String,
      required: true,
    },
    hours: {
      type: Number,
      required: true,
    },
    trailer: {
      type: String,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
    },
    image: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
    status: {
      type: String,
      required: true,
    },
    instructors: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Instructor',
        required: true,
      },
    ],
    usersSubscribed: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    waitList: [
      {
        name: {
          type: String,
        },
        email: {
          type: String,
        },
        createdAt: {
          type: Date,
        },
      },
    ],
    modules: [
      {
        title: {
          type: String,
          required: true,
        },
        lessons: [
          {
            _id: {
              type: Schema.Types.ObjectId,
              default: new mongoose.Types.ObjectId(),
              unique: true,
            },
            title: {
              type: String,
              required: true,
            },
            description: {
              type: String,
              required: true,
            },
            position: {
              type: Number,
              required: true,
            },
            videoUrl: {
              type: String,
              required: true,
            },
            videoLength: {
              type: Number,
              required: true,
            },
            active: {
              type: Boolean,
            },
          },
        ],
      },
    ],
    button_name: {
      type: String,
    },
    released: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
)

export const CourseModel = model<ICourseModel>('Course', schema)
