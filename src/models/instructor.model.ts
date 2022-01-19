import { model, Schema } from 'mongoose'

export interface IInstructor {
  id: number
  name: string
  image?: string
  job: string
  description?: string
  social?: {
    facebook?: string
    twitter?: string
    instagram?: string
    linkedin?: string
  }
  createdAt?: Date
  updatedAt?: Date
}

export default interface IInstructorModel extends Document, IInstructor {}

const schema = new Schema<IInstructorModel>(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    image: {
      type: String,
    },
    job: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    social: {
      type: {
        facebook: String,
        twitter: String,
        instagram: String,
        linkedin: String,
      },
    },
  },
  { timestamps: true },
)

export const InstructorModel = model<IInstructorModel>('Instructor', schema)
