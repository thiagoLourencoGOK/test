import { model, Schema } from 'mongoose'
import { ITag } from './tag.model'
import { IUser } from './user.model'

export interface IProjects {
  name: string
  description: string
  url: string
  tags: ITag[]
  image?: string
  createdAt?: Date
  updatedAt?: Date
  user: IUser
}

export default interface IProjectsModel extends Document, IProjects {}

const schema = new Schema<IProjectsModel>(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    description: {
      type: String,
      required: true,
      minlength: 3,
    },
    url: {
      type: String,
      required: true,
      minlength: 3,
    },

    tags: {
      type: Schema.Types.ObjectId,
      ref: 'Tag',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true },
)

export const ProjectModel = model<IProjectsModel>('Projects', schema)
